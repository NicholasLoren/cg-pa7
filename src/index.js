import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

// These variables will hold the scene, camera, renderer, and controls for our
// 3D scene.
let scene, camera, renderer, controls

/**
 * Initializes the scene, camera, renderer, and controls. Also sets up the
 * lighting, the axes helper, the plane, the function graph, the grid, and the
 * default axes using ArrowHelper. Finally, it starts the animation loop.
 */
function init() {
  // Scene setup
  scene = new THREE.Scene() // Create a new scene
  camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
  )
  renderer = new THREE.WebGLRenderer() // Create a new renderer
  renderer.setSize(window.innerWidth, window.innerHeight) // Set the size of the renderer
  document.body.appendChild(renderer.domElement) // Add the renderer to the webpage

  // Camera position
  camera.position.set(2, 2, 2) // Set the position of the camera
  camera.lookAt(0, 0, 0) // Set the target of the camera

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040) // Create a new ambient light
  scene.add(ambientLight) // Add the ambient light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) // Create a new directional light
  directionalLight.position.set(1, 1, 1) // Set the position of the directional light
  scene.add(directionalLight) // Add the directional light to the scene

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(1) // Create a new axes helper
  scene.add(axesHelper) // Add the axes helper to the scene

  // Plane
  const planeGeometry = new THREE.PlaneGeometry(2, 2) // Create a new plane geometry
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide,
  }) // Create a new material for the plane
  const plane = new THREE.Mesh(planeGeometry, planeMaterial) // Create a new mesh using the plane geometry and material
  plane.rotation.x = Math.PI / 2 // Rotate the plane by 90 degrees around the x-axis
  // scene.add(plane) // Uncomment this line to add the plane to the scene

  // Function graph
  const geometry = new ParametricGeometry(parameterizedFunction, 50, 50) // Create a new parametric geometry using the parameterizedFunction
  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
    wireframe: false,
    flatShading: true,
  }) // Create a new material for the function graph
  const mesh = new THREE.Mesh(geometry, material) // Create a new mesh using the geometry and material
  scene.add(mesh) // Add the mesh to the scene

  let grid = new THREE.GridHelper(5, 10, 0xffff00, 0xffff00) // Create a new grid helper
  grid.position.y = -0.001 // Move the grid down slightly
  scene.add(grid, new THREE.AxesHelper(1)) // Add the grid and axes helper to the scene

  // Create default axes using ArrowHelper
  const axisLength = 1 // Length of each axis arrow
  const arrowX = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    axisLength,
    0xff0000
  ) // Create a new arrow helper for the x-axis
  const arrowY = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    axisLength,
    0x0000ff
  ) // Create a new arrow helper for the y-axis
  const arrowZ = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    axisLength,
    0x00ff00
  ) // Create a new arrow helper for the z-axis

  scene.add(arrowX) // Add the x-axis arrow to the scene
  scene.add(arrowY) // Add the y-axis arrow to the scene
  scene.add(arrowZ) // Add the z-axis arrow to the scene

  // Controls
  controls = new OrbitControls(camera, renderer.domElement) // Create a new OrbitControls object

  // Animation loop
  animate() // Start the animation loop
}

/**
 * This function calculates the position of a point on a parameterized function
 * surface. The parameters u and v are values between 0 and 1 that define the
 * position of the point on the surface. The target is a Vector3 object that
 * will be used to store the calculated position of the point.
 *
 * @param {number} u - A value between 0 and 1 that defines the position of the
 * point on the surface in the u direction.
 * @param {number} v - A value between 0 and 1 that defines the position of the
 * point on the surface in the v direction.
 * @param {THREE.Vector3} target - The Vector3 object that will be used to
 * store the calculated position of the point.
 */
function parameterizedFunction(u, v, target) {
  const x = (u - 0.5) * 2 // Calculate the x-coordinate of the point
  const y = (v - 0.5) * 2 // Calculate the y-coordinate of the point
  const z = Math.pow(x, 2) - Math.pow(y, 2) // Calculate the z-coordinate of the point

  target.set(x, z, y) // Set the target Vector3 object to the calculated position of the point
}

/**
 * This function is called repeatedly to update the animation. It updates the
 * controls and renders the scene using the camera and renderer.
 */
function animate() {
  requestAnimationFrame(animate) // Call animate again on the next frame
  controls.update() // Update the controls
  renderer.render(scene, camera) // Render the scene using the camera and renderer
}

init() // Call the init function to start the animation loop
 

