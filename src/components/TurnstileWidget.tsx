import { useLayoutEffect, useRef } from 'react'

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      theme?: 'light' | 'dark' | 'auto'
      size?: 'normal' | 'compact' | 'flexible'
      callback?: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: (errorCode: string) => boolean | void
    },
  ) => string

  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

type TurnstileWidgetProps = {
  onToken: (token: string) => void
  onError?: () => void
}

function TurnstileWidget({ onToken, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useLayoutEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

    if (!siteKey) {
      console.error('VITE_TURNSTILE_SITE_KEY is not configured.')
      onError?.()
      return
    }

    let cancelled = false
    let retryTimer: number | undefined

    const renderWidget = () => {
      if (cancelled) {
        return
      }

      if (!containerRef.current || !window.turnstile) {
        retryTimer = window.setTimeout(renderWidget, 100)
        return
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'light',
        size: 'flexible',

        callback: (token) => {
          onToken(token)
        },

        'expired-callback': () => {
          onToken('')
        },

        'error-callback': (errorCode) => {
          console.error('Turnstile widget error:', errorCode)

          onToken('')
          onError?.()

          return true
        },
      })
    }

    renderWidget()

    return () => {
      cancelled = true

      if (retryTimer) {
        window.clearTimeout(retryTimer)
      }

      const widgetId = widgetIdRef.current

      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId)
        widgetIdRef.current = null
      }
    }
  }, [onError, onToken])

  return <div ref={containerRef} className="contact-turnstile" />
}

export default TurnstileWidget
