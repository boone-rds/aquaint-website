import './FieldConditions.css'
import ConditionsSnapshot from '../components/ConditionsSnapshot'

const WINDY_URL =
  'https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=%C2%B0F&metricWind=mph&zoom=5&overlay=rain&product=ecmwf&level=surface&lat=39.5&lon=-98.35'

function FieldConditions() {
  return (
    <main className="field-conditions">
      <header className="conditions-header">
        <div className="conditions-container conditions-header-inner">
          <a className="conditions-brand" href="/" aria-label="AquaINT home">
            <img src="/images/brand/aquaint-logo.png" alt="AquaINT" />
          </a>

          <a className="conditions-back" href="/">
            ← Back to AquaINT
          </a>
        </div>
      </header>

      <section className="conditions-hero">
        <div className="conditions-container">
          <p className="conditions-kicker">FIELD CONDITIONS</p>

          <h1>See what&apos;s happening across the field.</h1>

          <p className="conditions-hero-copy">
            Explore current weather patterns, precipitation, drought conditions, and the
            environmental signals shaping agricultural decisions.
          </p>
        </div>
      </section>

      <section className="conditions-section">
        <div className="conditions-container">
          <div className="conditions-heading">
            <div>
              <p className="conditions-kicker">LIVE WEATHER</p>
              <h2>Watch the weather develop.</h2>
            </div>

            <p>
              Explore precipitation, temperature, wind, and forecast conditions across the country
              using the interactive map.
            </p>
          </div>

          <div className="conditions-map-shell">
            <iframe
              className="conditions-map"
              src={WINDY_URL}
              title="Interactive agricultural weather map"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <p className="conditions-source">Interactive weather map provided by Windy.</p>
        </div>
      </section>

      <section className="conditions-section conditions-snapshot-section">
        <div className="conditions-container">
          <ConditionsSnapshot />
        </div>
      </section>

      <section className="conditions-section conditions-section-alt">
        <div className="conditions-container conditions-context-layout">
          <div>
            <p className="conditions-kicker">AGRICULTURAL CONTEXT</p>

            <h2>Put current conditions in perspective.</h2>

            <p>
              Regional weather and modeled field conditions can provide useful context, but
              conditions can vary significantly from one field to the next.
            </p>

            <a
              className="conditions-link"
              href="https://droughtmonitor.unl.edu/"
              target="_blank"
              rel="noreferrer"
            >
              View U.S. Drought Monitor
            </a>
          </div>

          <div className="conditions-context-card">
            <p className="conditions-card-label">COMING NEXT</p>

            <h3>AquaINT Crop Tools</h3>

            <p>
              We&apos;re building additional tools around rainfall history, crop water demand, and
              other field-level decision inputs.
            </p>
          </div>
        </div>
      </section>

      <section className="conditions-cta">
        <div className="conditions-container">
          <p className="conditions-kicker">DATA IS THE STARTING POINT</p>

          <h2>Conditions tell you what&apos;s happening. Context helps you decide what to do.</h2>

          <a className="conditions-cta-link" href="/#contact">
            Start a Conversation
          </a>
        </div>
      </section>
    </main>
  )
}

export default FieldConditions
