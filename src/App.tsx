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

        <section className="intro-strip" id="how-it-works">
          <div className="container intro-grid">
            <p className="section-kicker">FROM DATA TO DECISIONS</p>

            <div>
              <h2>Data matters when it changes what you do next.</h2>
              <p>
                Monitoring is only the beginning. AquaINT helps connect field conditions, crop
                response, and irrigation decisions so the information becomes useful in the real
                world.
              </p>
            </div>
          </div>
        </section>

        <section className="placeholder-section" id="what-we-do">
          <div className="container">
            <p>What We Do</p>
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
