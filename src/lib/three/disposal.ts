import * as THREE from 'three'

export function disposeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer): void {
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => disposeMaterial(m))
      } else {
        disposeMaterial(obj.material)
      }
      obj.geometry.dispose()
    }
  })
  renderer.dispose()
  renderer.forceContextLoss()
}

function disposeMaterial(material: THREE.Material): void {
  const mat = material as THREE.MeshStandardMaterial
  mat.map?.dispose()
  mat.normalMap?.dispose()
  mat.roughnessMap?.dispose()
  mat.dispose()
}
