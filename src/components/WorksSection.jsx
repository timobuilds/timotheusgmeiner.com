import { useState } from 'react'
import { WorkDetail } from './WorkDetail'

export function WorksSection({ projects, intro }) {
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="section section-muted works-section">
      <div className="works-intro">
        <span className="section-title-muted">Works</span>
        <p className="body-text" style={{ margin: 0 }}>
          {intro}
        </p>
      </div>
      <div className="works-list">
        <div className="works-grid works-header">
          <span className="works-col">Case</span>
          <span className="works-col">Partner</span>
          <span className="works-col works-col-industry">Industry</span>
          <span className="works-col works-col-year">Year</span>
        </div>
        {projects?.map((project) => (
          <WorkDetail
            key={project.id}
            project={project}
            open={openId === project.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  )
}
