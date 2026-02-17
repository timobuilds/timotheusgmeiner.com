import { useState, useEffect } from 'react'
import { Nav } from './components/Nav'
import { AboutSection } from './components/AboutSection'
import { PrinciplesSection } from './components/PrinciplesSection'
import { WorksSection } from './components/WorksSection'
import { PatentsSection } from './components/PatentsSection'
import { PressSection } from './components/PressSection'
import { TalksSection } from './components/TalksSection'
import { ArticlesSection } from './components/ArticlesSection'

export default function App() {
  const [siteData, setSiteData] = useState(null)

  useEffect(() => {
    fetch('/site.json')
      .then((r) => r.json())
      .then(setSiteData)
  }, [])

  if (!siteData) {
    return (
      <div className="app" style={{ alignItems: 'center', justifyContent: 'center' }}>
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
      </main>
    </div>
  )
}
