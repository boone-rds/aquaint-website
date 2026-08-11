import './App.css'

function App() {
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

        <section className="placeholder-section" id="who-we-serve">
          <div className="container">
            <p>Who We Serve</p>
          </div>
        </section>

        <section className="placeholder-section" id="approach">
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
    </div>
  )
}

export default App
