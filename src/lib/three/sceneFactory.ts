import * as THREE from 'three'

export interface SceneSetup {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
}

export function createScene(container: HTMLElement): SceneSetup {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  )
  camera.position.set(0, 1.5, 6)
  camera.lookAt(0, 0, 0)

  const canvas = document.createElement('canvas')
  container.appendChild(canvas)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  return { scene, camera, renderer }
}
