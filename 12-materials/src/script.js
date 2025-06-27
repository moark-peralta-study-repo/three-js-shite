import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

//Textures
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

colorTexture.colorSpace = THREE.SRGBColorSpace;

// Scene
const scene = new THREE.Scene();

// Geometry
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 64, 128);
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);

// Material
// const material = new THREE.MeshBasicMaterial({
//   map: colorTexture,
// });
// const material = new THREE.MeshBasicMaterial({});
// material.map = colorTexture;
// material.color = new THREE.Color(0xffffff);
// material.transparent = true;
// material.opacity = 0.2;
// material.side = THREE.DoubleSide;

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial({});
// material.flatShading = true;

//Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial({});
// material.matcap = matcapTexture;

//Mesh Depth Material
// const material = new THREE.MeshDepthMaterial({});

// Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial({});

//Mesh Lambert Material
// const material = new THREE.MeshPhongMaterial({});
// material.shininess = 50;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial({});
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;
// const material = new THREE.MeshStandardMaterial({});
const material = new THREE.MeshPhysicalMaterial({});
material.metalness = 0;
material.roughness = 0;

// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alphaTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

material.transmission = 1;
material.ior = 2.417;
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(1).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];
//
// gui.add(material, "iridescence").min(0).max(1).step(0.0001);
// gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001);
// gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

// material.clearcoat = 1;
// material.crearcoatRoughness = 0;
//
// gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);
// gui.add(material, "sheen").min(0).max(1).step(0.0001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
// gui.addColor(material, "sheenColor");
// Mesh
const torusMesh = new THREE.Mesh(torusGeometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const planeMesh = new THREE.Mesh(planeGeometry, material);
scene.add(sphereMesh, torusMesh, planeMesh);

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 2);
// scene.add(pointLight);

sphereMesh.position.x = -1.5;
torusMesh.position.x = 1.5;

const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update Objects
  sphereMesh.rotation.y = 0.1 * elapsedTime;
  planeMesh.rotation.y = 0.1 * elapsedTime;
  torusMesh.rotation.y = 0.1 * elapsedTime;

  sphereMesh.rotation.x = -0.15 * elapsedTime;
  planeMesh.rotation.x = -0.15 * elapsedTime;
  torusMesh.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
