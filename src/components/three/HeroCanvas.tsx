import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createScene } from '@/lib/three/sceneFactory'
import { addLights } from '@/lib/three/lights'
import { setupResize } from '@/lib/three/resize'
import { disposeScene } from '@/lib/three/disposal'
import { createPanelModel } from '@/lib/three/models/panelModel'

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let mounted = true
    let rafId = 0

    const { scene, camera, renderer } = createScene(container)
    addLights(scene)

    const panel = createPanelModel()
    scene.add(panel)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = false

    // Auto-rotation state
    let autoRotate = true
    let inactivityTimer = 0

    const onPointerDown = () => {
      autoRotate = false
      clearTimeout(inactivityTimer)
      inactivityTimer = window.setTimeout(() => { autoRotate = true }, 3000)
    }
    renderer.domElement.addEventListener('pointerdown', onPointerDown)

    const clock = new THREE.Clock()

    const animate = () => {
      if (!mounted) return
      rafId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      if (autoRotate) panel.rotation.y += delta * 0.4
      controls.update()
      renderer.render(scene, camera)
    }

    const stopResize = setupResize(container, camera, renderer)
    animate()

    return () => {
      mounted = false
      cancelAnimationFrame(rafId)
      clearTimeout(inactivityTimer)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      controls.dispose()
      stopResize()
      disposeScene(scene, renderer)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[320px] md:min-h-[480px]"
      role="img"
      aria-label="Animation 3D d'un panneau isolant en mycélium"
    />
  )
}
