const IMAGE_FILENAME_MAP = {
  'diagnostics-1.png': 'diagnostics 1.png',
  'optical-test-fixtures-and-production-hardware.png': 'photovoltaics.png',
  'turbofan-engine-structures.png': 'turbofan.png',
  'prosthetic-quality-assurance.png': 'prosthetics.png',
  'neurosurgeon-training-device.png': 'trainiers.png',
  'robotic-workflow-training-device.png': 'robotrainer.png',
  'microsatellite-test-hardware.png': 'startrackers.png',
  'ai-research-collaboration.png': 'xdgan.png',
  'circular-r-d-strategy.png': 'hpc.png',
  'presentation-attack-detection.png': 'orb.png',
  'additive-machine-scoping.png': 'nike2050.png',
  'sustainable-design-narrative.png': 'nike2050.png',
  'brain-imaging-prototype-strategy.png': 'terahertzimaging.png',
  'high-altitude-balloon-microsatellite.png': 'student_microsat.png',
  'co-founder-matchmaking.png': 'secret_project.png',
  'go-to-market-strategy-development.png': 'secret_project.png',
  'film-development-technical-advisory.png': 'secret_project.png',
  'tech-scouting.png': 'raman.png',
}

export function getProjectImageUrl(project) {
  const url = project.images?.[0]
  if (!url) return null
  let filename = url.replace(/^.*\//, '').replace(/%20/g, ' ')
  filename = IMAGE_FILENAME_MAP[filename] ?? filename
  return `/work-images/${filename}`
}

export function formatProjectTitle(title) {
  if (title === 'BlankAI') return title
  if (!title) return title
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
}
