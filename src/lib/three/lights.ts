import * as THREE from 'three'

export function addLights(scene: THREE.Scene): void {
  // Sage ambient
  const ambient = new THREE.AmbientLight(0x8A9975, 0.5)
  scene.add(ambient)

  // Key light — parchment warm
  const key = new THREE.DirectionalLight(0xF2F0EA, 1.0)
  key.position.set(3, 4, 3)
  scene.add(key)

  // Resin accent point light
  const fill = new THREE.PointLight(0xC06830, 0.35, 12)
  fill.position.set(-2, 1, 2)
  scene.add(fill)

  // Moss-water subtle back light
  const back = new THREE.PointLight(0x7A9E8E, 0.2, 10)
  back.position.set(0, -2, -3)
  scene.add(back)
}
