import * as THREE from 'three'

/**
 * Creates the layer stack used in the ProductStack exploder.
 * Returns an array of meshes (one per layer) and the group.
 */
export interface LayerMesh {
  mesh: THREE.Mesh
  layerId: string
  restY: number
}

export function createLayerStack(): { group: THREE.Group; layers: LayerMesh[] } {
  const group = new THREE.Group()
  const layers: LayerMesh[] = []

  const W = 3.2
  const D = 0.12
  const spacing = 0.4

  const defs = [
    { id: 'exterior', color: 0x2B3020, label: 'Parement Extérieur', roughness: 0.85 },
    { id: 'mycelium', color: 0x8A9975, label: 'Âme Mycélium', roughness: 0.9 },
    { id: 'vapor',    color: 0x7A9E8E, label: 'Pare-vapeur',    roughness: 0.3, transparent: true, opacity: 0.7 },
    { id: 'interior', color: 0x1A1F14, label: 'Parement Intérieur', roughness: 0.8 },
  ]

  defs.forEach((def, i) => {
    const geo = new THREE.BoxGeometry(W, D, W * 0.55)
    const mat = new THREE.MeshStandardMaterial({
      color: def.color,
      roughness: def.roughness ?? 0.8,
      metalness: 0,
      transparent: def.transparent ?? false,
      opacity: def.opacity ?? 1,
    })
    const mesh = new THREE.Mesh(geo, mat)
    const y = (i - (defs.length - 1) / 2) * spacing
    mesh.position.y = y
    mesh.userData.layerId = def.id
    group.add(mesh)
    layers.push({ mesh, layerId: def.id, restY: y })
  })

  return { group, layers }
}
