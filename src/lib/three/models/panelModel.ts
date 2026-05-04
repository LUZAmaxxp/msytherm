import * as THREE from 'three'

/**
 * Creates a procedural 3D mycelium insulation sandwich panel.
 * Structure: exterior board | mycelium foam core | vapour barrier | interior board
 * Returns a THREE.Group centered at origin.
 */
export function createPanelModel(): THREE.Group {
  const group = new THREE.Group()

  const W = 2.4   // width
  const H = 1.6   // height
  const totalD = 1.0  // total depth

  // Layer thicknesses (z-axis)
  const extD = 0.08
  const mycelD = 0.66
  const vaporD = 0.04
  const intD = 0.08
  const gap = 0.035  // slight gap between layers for exploded effect at rest

  let z = -totalD / 2

  // 1. Exterior board (umber — warm earth tone)
  const extMat = new THREE.MeshStandardMaterial({ color: 0x8C7355, roughness: 0.85, metalness: 0 })
  const extGeo = new THREE.BoxGeometry(W, H, extD)
  const extMesh = new THREE.Mesh(extGeo, extMat)
  extMesh.position.z = z + extD / 2
  group.add(extMesh)
  z += extD + gap

  // 2. Mycelium foam core (straw — the star of the show)
  const mycelMat = new THREE.MeshStandardMaterial({
    color: 0xC4B49A,
    roughness: 0.9,
    metalness: 0,
    emissive: new THREE.Color(0x3a2010),
    emissiveIntensity: 0.06,
  })
  const mycelGeo = new THREE.BoxGeometry(W, H, mycelD)
  const mycelMesh = new THREE.Mesh(mycelGeo, mycelMat)
  mycelMesh.position.z = z + mycelD / 2
  group.add(mycelMesh)

  // Mycelium shell glow — slightly larger, transparent kiln-red
  const shellMat = new THREE.MeshStandardMaterial({
    color: 0x7A4F3A,
    transparent: true,
    opacity: 0.12,
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
  })
  const shellGeo = new THREE.BoxGeometry(W + 0.05, H + 0.05, mycelD + 0.05)
  const shellMesh = new THREE.Mesh(shellGeo, shellMat)
  shellMesh.position.z = z + mycelD / 2
  group.add(shellMesh)

  z += mycelD + gap

  // 3. Vapour barrier (celadon — semi-transparent)
  const vaporMat = new THREE.MeshStandardMaterial({
    color: 0x5C7068,
    transparent: true,
    opacity: 0.7,
    roughness: 0.3,
    metalness: 0.1,
    side: THREE.DoubleSide,
  })
  const vaporGeo = new THREE.BoxGeometry(W, H, vaporD)
  const vaporMesh = new THREE.Mesh(vaporGeo, vaporMat)
  vaporMesh.position.z = z + vaporD / 2
  group.add(vaporMesh)
  z += vaporD + gap

  // 4. Interior board (obsidian — full opacity)
  const intMat = new THREE.MeshStandardMaterial({ color: 0x2A2318, roughness: 0.8, metalness: 0 })
  const intGeo = new THREE.BoxGeometry(W, H, intD)
  const intMesh = new THREE.Mesh(intGeo, intMat)
  intMesh.position.z = z + intD / 2
  group.add(intMesh)

  // Center group on z-axis
  group.position.z = -totalD / 4

  return group
}
