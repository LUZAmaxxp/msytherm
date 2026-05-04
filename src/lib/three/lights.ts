import * as THREE from 'three'

export function addLights(scene: THREE.Scene): void {
  // Straw warm ambient
  const ambient = new THREE.AmbientLight(0xC4B49A, 0.5)
  scene.add(ambient)

  // Key light — bone warm
  const key = new THREE.DirectionalLight(0xF7F2EB, 1.0)
  key.position.set(3, 4, 3)
  scene.add(key)

  // Kiln-red accent point light
  const fill = new THREE.PointLight(0x7A4F3A, 0.35, 12)
  fill.position.set(-2, 1, 2)
  scene.add(fill)

  // Celadon subtle back light
  const back = new THREE.PointLight(0x5C7068, 0.2, 10)
  back.position.set(0, -2, -3)
  scene.add(back)
}
