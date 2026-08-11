import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const markets = [
  {
    id: 'row-crops',
    name: 'Row Crops',
    label: 'Field Intelligence',
    description:
      'Turn field conditions, weather, and crop response into practical intelligence across broad-acre operations.',
    type: 'collage',
    images: [
      '/images/markets/row-crops/row-crops-corn.jpg',
      '/images/markets/row-crops/row-crops-soybeans.jpg',
      '/images/markets/row-crops/row-crops-wheat.jpg',
      '/images/markets/row-crops/row-crops-alfalfa.jpg',
    ],
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    label: 'High-Value Crops',
    description:
      'Support high-value crop decisions where timing, soil conditions, and water management can directly affect quality and yield.',
    type: 'single',
    images: ['/images/markets/potatoes/potatoes-field.jpg'],
  },
  {
    id: 'specialty-crops',
    name: 'Specialty Crops',
    label: 'Precision Management',
    description:
      'Bring greater visibility to production systems where management is intensive and small changes can carry significant consequences.',
    type: 'collage',
    images: [
      '/images/markets/specialty-crops/specialty-strawberries.jpg',
      '/images/markets/specialty-crops/specialty-blueberries.jpg',
      '/images/markets/specialty-crops/specialty-carrots.jpg',
      '/images/markets/specialty-crops/specialty-greenhouses.jpg',
      '/images/markets/specialty-crops/specialty-tomatoes.jpg',
      '/images/markets/specialty-crops/specialty-hops.jpg',
    ],
  },
  {
    id: 'vineyard-and-perm',
    name: 'Vineyards & Permanent Crops',
    label: 'Site Intelligence',
    description:
      'Understand site-specific conditions and seasonal patterns to support better long-term decisions across vineyards and permanent crops.',
    type: 'collage',
    images: [
      '/images/markets/vineyard-and-perm/v-and-p-almonds.jpg',
      '/images/markets/vineyard-and-perm/v-and-p-pistachio.jpg',
      '/images/markets/vineyard-and-perm/v-and-p-vineyard-1.jpg',
      '/images/markets/vineyard-and-perm/v-and-p-vineyard-2.jpg',
    ],
  },
  {
    id: 'irrigated',
    name: 'Irrigated Agriculture',
    label: 'Water Management',
    description:
      'Improve visibility into the soil profile, crop demand, and water movement so irrigation becomes a more informed management decision.',
    type: 'single',
    images: ['/images/markets/irrigated/irrigated-cp-mtns.jpg'],
  },
]

function App() {
  const [activeMarket, setActiveMarket] = useState(0)
  const [isMarketStoryActive, setIsMarketStoryActive] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const marketsStoryRef = useRef<HTMLElement | null>(null)
  const marketsVisualRef = useRef<HTMLDivElement | null>(null)
  const afterStoryRef = useRef<HTMLDivElement | null>(null)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const exitMarketStory = () => {
    afterStoryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useLayoutEffect(() => {
    const story = marketsStoryRef.current
    const stage = marketsVisualRef.current

    if (!story || !stage) return

    const mediaQuery = window.matchMedia('(min-width: 1081px)')

    if (!mediaQuery.matches) return

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: `+=${window.innerHeight * (markets.length - 1) * 0.65}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.35,

        onEnter: () => setIsMarketStoryActive(true),
        onEnterBack: () => setIsMarketStoryActive(true),
        onLeave: () => setIsMarketStoryActive(false),
        onLeaveBack: () => setIsMarketStoryActive(false),

        onUpdate: (self) => {
          const nextIndex = Math.min(markets.length - 1, Math.floor(self.progress * markets.length))

          setActiveMarket(nextIndex)
        },
      })
    }, story)

    return () => context.revert()
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="AquaINT home">
            <img src="/images/brand/aquaint-logo.png" alt="Aqua Intelligence" />
          </a>

          <nav className="main-nav" aria-label="Primary navigation">
            <a href="#what-we-do">What We Do</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#who-we-serve">Who We Serve</a>
            <a href="#approach">Our Approach</a>
          </nav>

          <a className="header-cta" href="#contact">
            Start a Conversation
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">FIELD INTELLIGENCE FOR BETTER DECISIONS</p>

              <h1>Know what the field is telling you.</h1>

              <p className="hero-lede">
                AquaINT combines field monitoring, technology, and experienced interpretation to
                turn water data into practical decisions.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#how-it-works">
                  Answer Better Questions
                </a>

                <a className="button button-secondary" href="#contact">
                  Start a Conversation
                </a>
              </div>

              <div className="hero-proof">
                <div>
                  <strong>Measure.</strong>
                  <span>See what is happening.</span>
                </div>

                <div>
                  <strong>Interpret.</strong>
                  <span>Understand what it means.</span>
                </div>

                <div>
                  <strong>Decide.</strong>
                  <span>Act with confidence.</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-orbit hero-orbit-large" />
              <div className="hero-orbit hero-orbit-small" />

              <img className="hero-mark" src="/images/brand/aquaint-mark.png" alt="" />
            </div>
          </div>
        </section>

        <section className="decision-section" id="how-it-works">
          <div className="container decision-grid">
            <div className="decision-intro">
              <p className="section-kicker">FROM DATA TO DECISIONS</p>

              <h2>Data is only useful when it improves the next decision.</h2>

              <p>
                AquaINT combines field measurements, weather, crop observations, and practical
                experience to help growers understand what is happening, why it matters, and what to
                do next.
              </p>
            </div>

            <div className="decision-steps">
              <article className="decision-step">
                <span className="step-number">01</span>
                <h3>Measure</h3>
                <p>
                  Capture meaningful field conditions using the right mix of monitoring technology,
                  weather data, and observations.
                </p>
              </article>

              <article className="decision-step">
                <span className="step-number">02</span>
                <h3>Interpret</h3>
                <p>
                  Put the numbers into context so the data becomes understandable and useful instead
                  of another dashboard to watch.
                </p>
              </article>

              <article className="decision-step">
                <span className="step-number">03</span>
                <h3>Decide</h3>
                <p>
                  Use the information to make better decisions about timing, resources, risk, and
                  what deserves attention next.
                </p>
              </article>

              <article className="decision-step">
                <span className="step-number">04</span>
                <h3>Learn</h3>
                <p>
                  Review what happened across the season and carry those lessons forward into better
                  decisions next time.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="services-section" id="what-we-do">
          <div className="container">
            <div className="services-heading">
              <div>
                <p className="section-kicker">WHAT WE DO</p>
                <h2>Turn field information into practical intelligence.</h2>
              </div>

              <p className="services-lede">
                AquaINT helps connect technology, field conditions, and experienced interpretation
                so growers and agricultural teams can focus on the decisions that actually matter.
              </p>
            </div>

            <div className="services-grid">
              <article className="service-card">
                <span className="service-index">01</span>

                <h3>Field Monitoring</h3>

                <p>
                  Bring together soil moisture, weather, environmental conditions, and other useful
                  field measurements to build a clearer picture of what is happening.
                </p>

                <span className="service-link">See the field clearly</span>
              </article>

              <article className="service-card">
                <span className="service-index">02</span>

                <h3>Data Interpretation</h3>

                <p>
                  Translate measurements and trends into understandable field intelligence,
                  separating useful signals from noise.
                </p>

                <span className="service-link">Understand what it means</span>
              </article>

              <article className="service-card">
                <span className="service-index">03</span>

                <h3>Decision Support</h3>

                <p>
                  Use field intelligence to improve timing, prioritize attention, manage risk, and
                  make more confident operational decisions.
                </p>

                <span className="service-link">Know what to do next</span>
              </article>

              <article className="service-card">
                <span className="service-index">04</span>

                <h3>Seasonal Insight</h3>

                <p>
                  Look beyond individual events to identify patterns, evaluate outcomes, and improve
                  the way future decisions are made.
                </p>

                <span className="service-link">Learn from the season</span>
              </article>
            </div>
          </div>
        </section>

        <section className="questions-section">
          <div className="container questions-layout">
            <div className="questions-copy">
              <p className="section-kicker">ANSWER BETTER QUESTIONS</p>

              <h2>Better answers start with better questions.</h2>

              <p>
                AquaINT helps growers move past isolated readings and dashboards to understand the
                relationships between field conditions, crop response, weather, and management
                decisions.
              </p>
            </div>

            <div className="questions-list">
              <article className="question-row">
                <span className="question-number">01</span>

                <div>
                  <h3>What is happening?</h3>
                  <p>
                    Build a clearer picture of field conditions using measurements, observations,
                    weather, and crop response.
                  </p>
                </div>
              </article>

              <article className="question-row">
                <span className="question-number">02</span>

                <div>
                  <h3>Why is it happening?</h3>
                  <p>
                    Put the information into context so patterns, trends, and possible causes become
                    easier to understand.
                  </p>
                </div>
              </article>

              <article className="question-row">
                <span className="question-number">03</span>

                <div>
                  <h3>What matters most?</h3>
                  <p>
                    Separate meaningful signals from background noise and focus attention on the
                    decisions with the greatest impact.
                  </p>
                </div>
              </article>

              <article className="question-row">
                <span className="question-number">04</span>

                <div>
                  <h3>What should we do next?</h3>
                  <p>
                    Turn understanding into practical action with better timing, clearer priorities,
                    and more confident decisions.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="markets-story" id="who-we-serve" ref={marketsStoryRef}>
          <div className="container markets-heading">
            <div>
              <p className="section-kicker">WHO WE SERVE</p>
              <h2>Built for operations where better information matters.</h2>
            </div>

            <p>
              AquaINT works across crop types and production systems, helping agricultural teams
              understand field conditions and make more confident management decisions.
            </p>
          </div>

          <div className="markets-story-shell">
            <div className="markets-stage" ref={marketsVisualRef}>
              {markets.map((market, index) => (
                <div
                  key={market.id}
                  className={`market-scene ${
                    activeMarket === index ? 'is-active' : ''
                  } market-scene-${market.id}`}
                >
                  {market.type === 'single' ? (
                    <img
                      src={market.images[0]}
                      alt=""
                      className={`market-scene-image market-scene-image-${market.id}`}
                    />
                  ) : (
                    <div className={`market-collage market-collage-${market.id}`}>
                      {market.images.map((image, imageIndex) => (
                        <img
                          key={image}
                          src={image}
                          alt=""
                          className={`market-collage-image market-collage-image-${imageIndex + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="market-overlay" />

                  <div className="market-copy">
                    <span className="market-label">{market.label}</span>
                    <h3>{market.name}</h3>
                    <p>{market.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="placeholder-section" id="approach" ref={afterStoryRef}>
          <div className="container">
            <p>Our Approach</p>
          </div>
        </section>

        <section className="placeholder-section" id="contact">
          <div className="container">
            <p>Contact</p>
          </div>
        </section>
      </main>
      <div className="floating-controls">
        {isMarketStoryActive && (
          <button
            type="button"
            className="floating-control exit-story-button"
            onClick={exitMarketStory}
          >
            Exit Story
            <span aria-hidden="true">↓</span>
          </button>
        )}

        {showBackToTop && (
          <button
            type="button"
            className="floating-control back-to-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span aria-hidden="true">↑</span>
            <span className="back-to-top-text">Back to Top</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default App
