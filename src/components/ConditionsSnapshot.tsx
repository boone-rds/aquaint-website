import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import { useEffect, useRef, useState, type FormEvent } from 'react'

type PowerParameters = {
  PRECTOTCORR: Record<string, number>
  T2M_MAX: Record<string, number>
  T2M_MIN: Record<string, number>
}

type PowerResponse = {
  properties: {
    parameter: PowerParameters
  }
}

type ConditionsData = {
  rain7: number
  rain30: number
  rain60: number
  gdd: number
  throughDate: string
  locationName: string
}

type EtData = {
  et: number
  units: string
  month: string
  date: string
  source: string
  model: string
}

type SelectedPlace = {
  latitude: number
  longitude: number
  locationName: string
}

type Status = 'idle' | 'locating' | 'loading' | 'success' | 'error'

type EtStatus = 'idle' | 'loading' | 'success' | 'error'

type PlacesLibrary = Awaited<ReturnType<typeof importLibrary>> & {
  PlaceAutocompleteElement?: new (options?: { includedRegionCodes?: string[] }) => HTMLElement & {
    placeholder?: string
    addEventListener(type: 'gmp-select', listener: (event: Event) => void): void
  }
}

type PlacePredictionSelectEventLike = Event & {
  placePrediction: {
    toPlace: () => {
      formattedAddress?: string | null
      displayName?: string | null
      location?: {
        lat: () => number
        lng: () => number
      } | null
      fetchFields: (options: { fields: string[] }) => Promise<void>
    }
  }
}

const MM_TO_INCHES = 0.0393701

const ET_API_URL = 'https://aquaint-field-data.raneydaysolutions.workers.dev/et'

function formatPowerDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll('-', '')
}

function defaultStartDate() {
  const now = new Date()

  return `${now.getFullYear()}-04-01`
}

function calculateGdd(maxTemps: Record<string, number>, minTemps: Record<string, number>) {
  return Object.keys(maxTemps).reduce((total, date) => {
    const max = maxTemps[date]
    const min = minTemps[date]

    if (typeof max !== 'number' || typeof min !== 'number' || max <= -900 || min <= -900) {
      return total
    }

    const maxF = (max * 9) / 5 + 32
    const minF = (min * 9) / 5 + 32

    const dailyGdd = Math.max((maxF + minF) / 2 - 50, 0)

    return total + dailyGdd
  }, 0)
}

function ConditionsSnapshot() {
  const autocompleteContainerRef = useRef<HTMLDivElement>(null)

  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null)

  const [startDate, setStartDate] = useState(defaultStartDate())

  const [data, setData] = useState<ConditionsData | null>(null)

  const [etData, setEtData] = useState<EtData | null>(null)

  const [status, setStatus] = useState<Status>('idle')

  const [etStatus, setEtStatus] = useState<EtStatus>('idle')

  const [error, setError] = useState('')

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error('VITE_GOOGLE_MAPS_API_KEY is not configured.')
      return
    }

    let isMounted = true

    setOptions({
      key: apiKey,
      v: 'weekly',
    })

    async function initializeAutocomplete() {
      try {
        const placesLibrary = (await importLibrary('places')) as PlacesLibrary

        if (!isMounted || !autocompleteContainerRef.current) {
          return
        }

        const PlaceAutocompleteElement = placesLibrary.PlaceAutocompleteElement

        if (!PlaceAutocompleteElement) {
          throw new Error('Google PlaceAutocompleteElement is unavailable.')
        }

        const autocomplete = new PlaceAutocompleteElement({
          includedRegionCodes: ['us'],
        })

        autocomplete.placeholder = 'ZIP code, city and state, or full address'

        autocompleteContainerRef.current.replaceChildren(autocomplete)

        autocomplete.addEventListener('gmp-select', async (rawEvent: Event) => {
          try {
            const event = rawEvent as PlacePredictionSelectEventLike

            const place = event.placePrediction.toPlace()

            await place.fetchFields({
              fields: ['formattedAddress', 'location', 'displayName'],
            })

            if (!place.location) {
              throw new Error('Google could not determine coordinates for that location.')
            }

            const latitude = place.location.lat()

            const longitude = place.location.lng()

            const locationName = place.formattedAddress || place.displayName || 'Selected location'

            setSelectedPlace({
              latitude,
              longitude,
              locationName,
            })

            setError('')
            setData(null)
            setEtData(null)
            setEtStatus('idle')
            setStatus('idle')
          } catch (caughtError) {
            console.error(caughtError)

            setError(
              caughtError instanceof Error ? caughtError.message : 'Unable to use that location.',
            )

            setStatus('error')
          }
        })
      } catch (caughtError) {
        console.error('Google Places initialization failed:', caughtError)
      }
    }

    void initializeAutocomplete()

    return () => {
      isMounted = false
    }
  }, [])

  async function loadEt(latitude: number, longitude: number) {
    try {
      setEtStatus('loading')
      setEtData(null)

      const url = new URL(ET_API_URL)

      url.searchParams.set('lat', latitude.toString())

      url.searchParams.set('lon', longitude.toString())

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('ET data is unavailable.')
      }

      const result = (await response.json()) as EtData

      if (typeof result.et !== 'number' || !Number.isFinite(result.et)) {
        throw new Error('ET data is unavailable.')
      }

      setEtData(result)
      setEtStatus('success')
    } catch (caughtError) {
      console.error('Unable to load OpenET data:', caughtError)

      setEtData(null)
      setEtStatus('error')
    }
  }

  async function loadConditions(latitude: number, longitude: number, locationName: string) {
    try {
      setStatus('loading')
      setError('')
      setData(null)

      /*
       * ET is intentionally loaded independently.
       * If OpenET is slow or unavailable, rainfall and
       * GDD should still render normally.
       */
      void loadEt(latitude, longitude)

      const end = new Date()

      const seasonStart = new Date(`${startDate}T12:00:00`)

      const sixtyFiveDaysAgo = new Date()

      sixtyFiveDaysAgo.setDate(sixtyFiveDaysAgo.getDate() - 65)

      const requestStart = seasonStart < sixtyFiveDaysAgo ? seasonStart : sixtyFiveDaysAgo

      const url = new URL('https://power.larc.nasa.gov/api/temporal/daily/point')

      url.searchParams.set('parameters', 'PRECTOTCORR,T2M_MAX,T2M_MIN')

      url.searchParams.set('community', 'AG')

      url.searchParams.set('latitude', latitude.toString())

      url.searchParams.set('longitude', longitude.toString())

      url.searchParams.set('start', formatPowerDate(requestStart))

      url.searchParams.set('end', formatPowerDate(end))

      url.searchParams.set('format', 'JSON')

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Unable to load field conditions for this location.')
      }

      const result = (await response.json()) as PowerResponse

      const parameters = result.properties.parameter

      const precipitationEntries = Object.entries(parameters.PRECTOTCORR).filter(
        ([, value]) => typeof value === 'number' && value > -900,
      )

      if (!precipitationEntries.length) {
        throw new Error('No recent field conditions were available for this location.')
      }

      const sortedDates = precipitationEntries.map(([date]) => date).sort()

      const startDateKey = startDate.replaceAll('-', '')

      const seasonDates = sortedDates.filter((date) => date >= startDateKey)

      const last7Dates = sortedDates.slice(-7)

      const last30Dates = sortedDates.slice(-30)

      const last60Dates = sortedDates.slice(-60)

      const sumRain = (dates: string[]) =>
        dates.reduce((total, date) => {
          const value = parameters.PRECTOTCORR[date]

          return typeof value === 'number' && value > -900 ? total + value : total
        }, 0) * MM_TO_INCHES

      const seasonMaxTemps = Object.fromEntries(
        seasonDates.map((date) => [date, parameters.T2M_MAX[date]]),
      )

      const seasonMinTemps = Object.fromEntries(
        seasonDates.map((date) => [date, parameters.T2M_MIN[date]]),
      )

      const latestDate = sortedDates.at(-1)

      if (!latestDate) {
        throw new Error('No recent field conditions were available for this location.')
      }

      setData({
        rain7: sumRain(last7Dates),
        rain30: sumRain(last30Dates),
        rain60: sumRain(last60Dates),

        gdd: calculateGdd(seasonMaxTemps, seasonMinTemps),

        throughDate: `${latestDate.slice(4, 6)}/${latestDate.slice(6, 8)}/${latestDate.slice(
          0,
          4,
        )}`,

        locationName,
      })

      setStatus('success')
    } catch (caughtError) {
      console.error(caughtError)

      setError(
        caughtError instanceof Error ? caughtError.message : 'Unable to load field conditions.',
      )

      setStatus('error')
    }
  }

  async function checkSelectedLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedPlace) {
      setError('Start typing a location and select one of the Google suggestions.')

      setStatus('error')
      return
    }

    await loadConditions(
      selectedPlace.latitude,
      selectedPlace.longitude,
      selectedPlace.locationName,
    )
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError('Location services are not supported by this browser.')

      setStatus('error')
      return
    }

    setStatus('locating')
    setError('')
    setData(null)
    setEtData(null)
    setEtStatus('idle')

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        await loadConditions(coords.latitude, coords.longitude, 'Current location')
      },

      () => {
        setError('We could not access your location. Search for an address or ZIP code instead.')

        setStatus('error')
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    )
  }

  const isBusy = status === 'locating' || status === 'loading'

  return (
    <section className="conditions-snapshot">
      <div className="conditions-snapshot-heading">
        <div>
          <p className="conditions-kicker">YOUR FIELD CONDITIONS</p>

          <h2>Turn the regional picture into local context.</h2>
        </div>

        <p>
          Search for an address or use your current location to see recent rainfall, accumulated
          heat, and evapotranspiration context for your area.
        </p>
      </div>

      <form className="conditions-location-form" onSubmit={checkSelectedLocation}>
        <div className="conditions-address-field">
          <span>Location</span>

          <div ref={autocompleteContainerRef} className="conditions-google-autocomplete" />
        </div>

        <div className="conditions-location-actions">
          <button className="conditions-location-button" type="submit" disabled={isBusy}>
            {status === 'loading' ? 'Loading Conditions…' : 'Check Location'}
          </button>

          <span className="conditions-location-or">or</span>

          <button
            className="conditions-location-button conditions-location-button-secondary"
            type="button"
            onClick={useMyLocation}
            disabled={isBusy}
          >
            {status === 'locating' ? 'Finding Your Location…' : 'Use My Location'}
          </button>
        </div>
      </form>

      <div className="conditions-snapshot-controls">
        <label className="conditions-date-field">
          <span>Planting / Start Date</span>

          <input
            type="date"
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value)

              setData(null)
            }}
          />
        </label>
      </div>

      {selectedPlace && !data && (
        <p className="conditions-selected-location">Selected: {selectedPlace.locationName}</p>
      )}

      {error && <p className="conditions-snapshot-error">{error}</p>}

      {data && (
        <>
          <div className="conditions-results-heading">
            <p>Conditions for</p>

            <h3>{data.locationName}</h3>
          </div>

          <div className="conditions-metrics conditions-metrics-five">
            <article className="conditions-metric">
              <p>7-Day Rainfall</p>

              <strong>
                {data.rain7.toFixed(2)}
                &quot;
              </strong>

              <span>Recent precipitation</span>
            </article>

            <article className="conditions-metric">
              <p>30-Day Rainfall</p>

              <strong>
                {data.rain30.toFixed(2)}
                &quot;
              </strong>

              <span>Recent precipitation</span>
            </article>

            <article className="conditions-metric">
              <p>60-Day Rainfall</p>

              <strong>
                {data.rain60.toFixed(2)}
                &quot;
              </strong>

              <span>Extended precipitation context</span>
            </article>

            <article className="conditions-metric">
              <p>Base 50 GDD</p>

              <strong>{Math.round(data.gdd).toLocaleString()}</strong>

              <span>Since selected start date</span>
            </article>

            <article className="conditions-metric">
              <p>Latest Monthly ET</p>

              {etStatus === 'loading' && (
                <>
                  <strong>…</strong>
                  <span>Loading OpenET data</span>
                </>
              )}

              {etStatus === 'success' && etData && (
                <>
                  <strong>
                    {etData.et.toFixed(2)}
                    &quot;
                  </strong>

                  <span>
                    {etData.month} · {etData.source} {etData.model}
                  </span>
                </>
              )}

              {etStatus === 'error' && (
                <>
                  <strong>—</strong>

                  <span>ET temporarily unavailable</span>
                </>
              )}

              {etStatus === 'idle' && (
                <>
                  <strong>—</strong>

                  <span>Monthly evapotranspiration</span>
                </>
              )}
            </article>
          </div>

          <div className="conditions-data-notes">
            <p className="conditions-data-note">
              Rainfall and temperature data available through {data.throughDate}. Weather data
              provided by NASA POWER.
            </p>

            {etData && (
              <p className="conditions-data-note">
                Evapotranspiration is satellite- and model-derived monthly ET from OpenET.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default ConditionsSnapshot
