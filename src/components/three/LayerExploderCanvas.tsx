import { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createScene } from '@/lib/three/sceneFactory'
import { addLights } from '@/lib/three/lights'
import { setupResize } from '@/lib/three/resize'
import { disposeScene } from '@/lib/three/disposal'
import { createLayerStack } from '@/lib/three/models/layerStack'

interface LayerExploderCanvasProps {
  onLayerSelect: (layerId: string | null) => void
}

export default function LayerExploderCanvas({ onLayerSelect }: LayerExploderCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<string | null>(null)

  const handleSelect = useCallback((id: string | null) => {
    selectedRef.current = id
    onLayerSelect(id)
  }, [onLayerSelect])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let mounted = true
    let rafId = 0

    const { scene, camera, renderer } = createScene(container)
    camera.position.set(0, 2, 7)
    addLights(scene)

    const { group, layers } = createLayerStack()
    scene.add(group)

    // Explode animation: layers start collapsed, animate to rest position
    layers.forEach((l) => { l.mesh.position.y = 0 })
    const explodeStart = performance.now()
    const explodeDuration = 1200

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = true
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Raycaster for layer selection
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(layers.map((l) => l.mesh))
      if (hits.length > 0) {
        const id = hits[0].object.userData.layerId as string
        handleSelect(selectedRef.current === id ? null : id)
      } else {
        handleSelect(null)
      }
    }
    renderer.domElement.addEventListener('click', onClick)

    const clock = new THREE.Clock()

    const animate = () => {
      if (!mounted) return
      rafId = requestAnimationFrame(animate)
      clock.getDelta()

      // Explode animation
      const elapsed = performance.now() - explodeStart
      const t = Math.min(elapsed / explodeDuration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      layers.forEach((l) => {
        l.mesh.position.y = l.restY * eased
      })

      // Highlight selected layer
      layers.forEach((l) => {
        const mat = l.mesh.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = l.layerId === selectedRef.current ? 0.3 : 0
        mat.emissive = new THREE.Color(0xffffff)
      })

      // Slow auto-rotate
      group.rotation.y += 0.003

      controls.update()
      renderer.render(scene, camera)
    }

    const stopResize = setupResize(container, camera, renderer)
    animate()

    return () => {
      mounted = false
      cancelAnimationFrame(rafId)
      renderer.domElement.removeEventListener('click', onClick)
      controls.dispose()
      stopResize()
      disposeScene(scene, renderer)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [handleSelect])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] md:min-h-[420px] cursor-pointer"
      role="img"
      aria-label="Vue éclatée 3D des couches du panneau mycélium — cliquez pour sélectionner une couche"
    />
  )
}
