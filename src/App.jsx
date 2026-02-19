import { useState, useEffect } from 'react'
import { Nav } from './components/Nav'

const DOTS_SPINNER = {
  interval: 80,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
}
import { AboutSection } from './components/AboutSection'
import { PrinciplesSection } from './components/PrinciplesSection'
import { WorksSection } from './components/WorksSection'
import { PatentsSection } from './components/PatentsSection'
import { PressSection } from './components/PressSection'
import { TalksSection } from './components/TalksSection'
import { ArticlesSection } from './components/ArticlesSection'
import { ContactSection } from './components/ContactSection'

export default function App() {
  const [siteData, setSiteData] = useState(null)
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    fetch('/site.json')
      .then((r) => r.json())
      .then(setSiteData)
  }, [])

  useEffect(() => {
    if (siteData) return
    const id = setInterval(() => {
      setFrameIndex((i) => (i + 1) % DOTS_SPINNER.frames.length)
    }, DOTS_SPINNER.interval)
    return () => clearInterval(id)
  }, [siteData])

  if (!siteData) {
    return (
      <div className="app" style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
        <span aria-hidden="true" style={{ display: 'block', fontSize: '1.5rem' }}>{DOTS_SPINNER.frames[frameIndex]}</span>
        <p>Loading…</p>
      </div>
    )
  }

  const { content, projects, patents, press, publications } = siteData
  const usPatents = patents.filter((p) => p.jurisdiction === 'US')
  const pressAndPublications = [...(press || []), ...(publications || [])]

  return (
    <div className="app">
      <Nav contact={content.contact} />
      <main className="main">
        <AboutSection content={content} />
        <PrinciplesSection principles={content.principles} />
        <WorksSection projects={projects} intro={content.clients?.intro} />
        <PatentsSection patents={usPatents} />
        <PressSection press={pressAndPublications} />
        <TalksSection talks={content.talks} />
        <ArticlesSection articles={content.articles} />
        <ContactSection contactSection={content.contactSection} />
      </main>
    </div>
  )
}
