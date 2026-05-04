import * as THREE from 'three'

export function setupResize(
  container: HTMLElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): () => void {
  let debounceTimer: ReturnType<typeof setTimeout>

  const observer = new ResizeObserver(() => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }, 100)
  })

  observer.observe(container)

  return () => {
    clearTimeout(debounceTimer)
    observer.disconnect()
  }
}
