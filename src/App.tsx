import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './App.css'

const markets = [
  {
    id: 'row-crops',
    name: 'Row Crops',
    label: 'Field Intelligence',
    description:
      'Turn field conditions, weather, and crop response into practical intelligence across broad-acre operations.',
    type: 'collage',
    images: [
      '/images/markets/row-crops/row-crops-corn.webp',
      '/images/markets/row-crops/row-crops-soybeans.webp',
      '/images/markets/row-crops/row-crops-wheat.webp',
      '/images/markets/row-crops/row-crops-alfalfa.webp',
    ],
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    label: 'High-Value Crops',
    description:
      'Support high-value crop decisions where timing, soil conditions, and water management can directly affect quality and yield.',
    type: 'single',
    images: ['/images/markets/potatoes/potatoes-field.webp'],
  },
  {
    id: 'specialty-crops',
    name: 'Specialty Crops',
    label: 'Precision Management',
    description:
      'Bring greater visibility to production systems where management is intensive and small changes can carry significant consequences.',
    type: 'collage',
    images: [
      '/images/markets/specialty-crops/specialty-strawberries.webp',
      '/images/markets/specialty-crops/specialty-blueberries.webp',
      '/images/markets/specialty-crops/specialty-carrots.webp',
      '/images/markets/specialty-crops/specialty-greenhouses.webp',
      '/images/markets/specialty-crops/specialty-tomatoes.webp',
      '/images/markets/specialty-crops/specialty-hops.webp',
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
      '/images/markets/vineyard-and-perm/v-and-p-almonds.webp',
      '/images/markets/vineyard-and-perm/v-and-p-pistachio.webp',
      '/images/markets/vineyard-and-perm/v-and-p-vineyard-1.webp',
      '/images/markets/vineyard-and-perm/v-and-p-vineyard-2.webp',
    ],
  },
  {
    id: 'irrigated',
    name: 'Irrigated Agriculture',
    label: 'Water Management',
    description:
      'Improve visibility into the soil profile, crop demand, and water movement so irrigation becomes a more informed management decision.',
    type: 'single',
    images: ['/images/markets/irrigated/irrigated-cp-mtns.webp'],
  },
]

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.8)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
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

        <section className="markets-story" id="who-we-serve">
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

          <div className="markets-carousel-wrap">
            <Swiper
              className="markets-swiper"
              modules={[Autoplay, Navigation, Pagination, A11y]}
              slidesPerView={1}
              loop
              speed={700}
              navigation
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              a11y={{
                enabled: true,
              }}
            >
              {markets.map((market, index) => (
                <SwiperSlide key={market.id}>
                  <article className="market-slide">
                    {market.type === 'single' ? (
                      <img
                        src={market.images[0]}
                        alt=""
                        className={`market-scene-image market-scene-image-${market.id}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding="async"
                      />
                    ) : (
                      <div className={`market-collage market-collage-${market.id}`}>
                        {market.images.map((image, imageIndex) => (
                          <img
                            key={image}
                            src={image}
                            alt=""
                            className={`market-collage-image market-collage-image-${imageIndex + 1}`}
                            loading={index <= 1 ? 'eager' : 'lazy'}
                            fetchPriority={index <= 1 ? 'high' : 'auto'}
                            decoding="async"
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

                    <div className="market-count">
                      {String(index + 1).padStart(2, '0')}
                      <span>/</span>
                      {String(markets.length).padStart(2, '0')}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="container approach-layout">
            <div className="approach-intro">
              <p className="section-kicker">OUR APPROACH</p>

              <h2>Technology should make decisions clearer, not more complicated.</h2>

              <p>
                AquaINT combines useful technology with practical interpretation and long-term
                relationships. The goal is not more data. The goal is better understanding and
                better decisions.
              </p>
            </div>

            <div className="approach-principles">
              <article className="approach-principle">
                <span className="principle-number">01</span>

                <div>
                  <h3>Clarity</h3>
                  <p>
                    Complex field information should become easier to understand, not harder. We
                    focus on the signals that help people see what matters.
                  </p>
                </div>
              </article>

              <article className="approach-principle">
                <span className="principle-number">02</span>

                <div>
                  <h3>Stewardship</h3>
                  <p>
                    Water, time, capital, and attention are finite resources. Better information
                    should help use each of them more intentionally.
                  </p>
                </div>
              </article>

              <article className="approach-principle">
                <span className="principle-number">03</span>

                <div>
                  <h3>Practicality</h3>
                  <p>
                    Insight only matters if it works in the field. Recommendations must fit real
                    operations, real constraints, and real decisions.
                  </p>
                </div>
              </article>

              <article className="approach-principle">
                <span className="principle-number">04</span>

                <div>
                  <h3>Partnership</h3>
                  <p>
                    The best decisions improve over time. We build relationships that create
                    context, trust, and a deeper understanding of each operation.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="placeholder-section" id="contact">
          <div className="container">
            <p>Contact</p>
          </div>
        </section>
      </main>

      {showBackToTop && (
        <button
          type="button"
          className="back-to-top-button"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <span aria-hidden="true">↑</span>
          <span className="back-to-top-text">Back to Top</span>
        </button>
      )}
    </div>
  )
}

export default App
