// Creamos la escena
const scene = new THREE.Scene();

const galaxyGroup = new THREE.Group()
scene.add(galaxyGroup);

galaxyGroup.position.set(21, 2, 1);

// Creamos la cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Creamos el renderizador
const renderer = new THREE.WebGLRenderer();

const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);
controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.enablePan = true;

controls.enableZoom = true;

controls.minDistance = 5;

controls.maxDistance = 80;

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "0";

// El renderizador ocupará toda la ventana
renderer.setSize(window.innerWidth, window.innerHeight);

// Agregamos el renderizador al documento HTML
document.body.appendChild(renderer.domElement);

// Alejamos la cámara
camera.position.set(
    0,
    0,
    250
);

const light = new THREE.PointLight(0xffffff, 2);

light.position.set(20, 20, 20);

scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(ambient);

// Creamos una esfera
//const geometry = new THREE.SphereGeometry(1, 32, 32);

// Creamos un material blanco
//const material = new THREE.MeshBasicMaterial({
  //  color: 0xffffff
//});

// Unimos geometría y material
//const sphere = new THREE.Mesh(geometry, material);

// Añadimos la esfera a la escena
//scene.add(sphere);
const starsGeometry = new THREE.BufferGeometry();

const starsCount = 455000;

const positions = [];

const sizes = [];

const colors = [];

const branches = 4;

const radius =  35;

const spin = 1.2;

for (let i = 0; i < starsCount; i++){

    const r = Math.random() * radius;

    const branchAngle = (i % branches) / branches * Math.PI * 2;

    const spinAngle = r * spin;

    const randomStrength = 0.35 + (r / radius) * 0.8;

    const randomX = (Math.random() -0.5) * randomStrength;
    const randomY = (Math.random() - 0.5) * 0.15;
    const randomZ = (Math.random() -0.5) * randomStrength;

    const x =
        Math.cos(branchAngle + spinAngle) * r + randomX;
    
    const y = randomY;

    const z =
        Math.sin(branchAngle + spinAngle) * r + randomZ;

    positions.push(x, y, z);
    
    const distanceFactor = 1 - (r / radius);
    // tamaño segun la distancia 
    const starSize = 0.05 + distanceFactor * 0.18 + Math.random() * 0.05;

    sizes.push(starSize);

    // ============================================
// COLOR SEGÚN LA DISTANCIA AL CENTRO
// ============================================

const color = new THREE.Color();

if (distanceFactor > 0.90) {

    // Centro blanco intenso
    color.set("#ffffff");

}
else if (distanceFactor > 0.70) {

    // Blanco cálido
    color.set("#fff7fd");

}
else if (distanceFactor > 0.50) {

    // Rosa muy claro
    color.set("#ffe4f2");

}
else if (distanceFactor > 0.30) {

    // Rosa brillante
    color.set("#ffb6dc");

}
else {

    // Lila suave para los extremos
    color.set("#d8c3ff");

}

colors.push(color.r, color.g, color.b);


}
starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
);
starsGeometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(sizes, 1)
);
starsGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
);
const textureLoader = new THREE.TextureLoader();

const starTexture = textureLoader.load(
    "/static/img/disc.png");

const saturnTexture = textureLoader.load(
    "static/img/saturn.1.jpg"
);
const sunTexture = textureLoader.load(
    "static/img/sol.jpg"
);
const earthTexture = textureLoader.load(
    "static/img/tierra.jpg"
);
const marsTexture = textureLoader.load(
    "static/img/mars.jpg"
);
const jupiterTexture = textureLoader.load(
    "static/img/jupiter.jpg"
);
const neptuneTexture = textureLoader.load(
    "static/img/neptune.jpg"
);
const starsMaterial = new THREE.PointsMaterial({
    map: starTexture,
    vertexColors: true,
    size: 0.14,
    transparent: true,
    alphaTest: 0.01,
    depthWrite: false,
    blending: THREE.AdditiveBlending    
});
starsMaterial.opacity = 0.95;

const stars = new THREE.Points(
    starsGeometry,
    starsMaterial
);
galaxyGroup.add(stars);
// halo galactico
const haloGeometry = new THREE.BufferGeometry();

const haloPositions = [];

const haloCount = 35000;
// creamos las particulas de halo

for ( let i = 0; i <haloCount; i++) {

    const r = Math.random() * radius;
    const branchAngle = (i % branches) / branches * Math.PI * 2;
    const spinAngle = r * spin;
    const randomStrength = 1.8;

    const x = Math.cos(branchAngle + spinAngle) * r +(Math.random() - 0.5) * randomStrength;
    const y = (Math.random() -0.5 ) * 0.6;
    const z = Math.sin(branchAngle + spinAngle) * r + (Math.random() -0.5) * randomStrength;

    haloPositions.push(x, y, z);
}

haloGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(haloPositions, 3 )
    );

const haloMaterial = new THREE.PointsMaterial({
    map: starTexture,
    color: "#ffb6dc",
    size: 0.45,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
const halo = new THREE.Points(
    haloGeometry,
    haloMaterial
);

galaxyGroup.add(halo);

halo.rotation.x = -0.10;

halo.position.set(0, 1, 0);

// creando el fondo del espacio 

const fondoGeometry = new THREE.BufferGeometry();

const fondoPosiciones = [];

const fondoCantidad = 10000;

for (let i = 0; i < fondoCantidad; i++) {

    const x = (Math.random() - 0.5) * 1200;
    const y = (Math.random() - 0.5) * 1200;
    const z = (Math.random() - 0.5) * 1200;

    fondoPosiciones.push(x, y, z);

}
fondoGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(fondoPosiciones, 3)
);
const fondoMaterial = new THREE.PointsMaterial({

    color: "#ffffff",
    size: 0.68,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    blending: THREE.AdditiveBlending

});
const fondo = new THREE.Points(
    fondoGeometry,
    fondoMaterial
);

scene.add(fondo);

// estrellas del HIPERESPACIO

const warpGeometry = new THREE.BufferGeometry();

const warpCantidad = 5000;

const warpPosiciones = [];

for(let i = 0; i<warpCantidad;i++){
    warpPosiciones.push(
        (Math.random()-0.5) * 600,
        (Math.random()-0.5) * 600,
        -Math.random() * 3000

    );
}
warpGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        warpPosiciones,
        3
    )
);
const warpMaterial = new THREE.PointsMaterial({

    color:"#ffffff",

    size:0.8,

    transparent:true,

    opacity:1,

    depthWrite:false,

    blending:THREE.AdditiveBlending

});
const warpStars = new THREE.Points(

    warpGeometry,

    warpMaterial

);

scene.add(warpStars);

// centro de la galxia 

const coreGeometry = new THREE.BufferGeometry();

const corePositions = [];

const coreCount = 15000;

//rotacion del centro de la galaxia 

stars.rotation.x = -0.10;

for (let i = 0; i <coreCount; i++) {

    const r = Math.pow(Math.random(), 4) * 1.2;

    const theta = Math.random() * Math.PI * 2;

    const phi = Math.acos(2 * Math.random() -1 );

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    corePositions.push(x, y, z);

}
coreGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(corePositions, 3)

);

const coreMaterial = new THREE.PointsMaterial({

    map: starTexture,

    color: 0xffffff,

    size: 0.20,

    transparent: true,

    alphaTest: 0.01,

    depthWrite: false,

    blending: THREE.AdditiveBlending

});

const core = new THREE.Points(
    coreGeometry,
    coreMaterial
);
// scene.add(core);

 core.rotation.x = -0.35;

 // Bulbo brillante del centro
const glowTexture = textureLoader.load("/static/img/disc.png");

const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const glow = new THREE.Sprite(glowMaterial);

glow.scale.set(6, 6, 1);

//scene.add(glow);

glow.rotation.x = -0.35;
// =======================================================
// CORAZÓN RELLENO
// =======================================================

const heartGeometry = new THREE.BufferGeometry();

const heartPositions = [];

const heartColors = [];

const heartCount = 30000;

for (let i = 0; i < heartCount; i++) {

    const t = Math.random() * Math.PI * 2;

    // Distancia desde el centro del corazón
    const fill = Math.sqrt(Math.random());

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    heartPositions.push(

        x * fill * 0.36,

        y * fill * 0.36,

        (Math.random() - 0.5) * 0.18

    );

    const color = new THREE.Color();

    color.set("rgb(247, 3, 48)");

    heartColors.push(

        color.r,

        color.g,

        color.b

    );

}
heartGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        heartPositions,

        3

    )

);

heartGeometry.setAttribute(

    "color",

    new THREE.Float32BufferAttribute(

        heartColors,

        3

    )

);

const heartMaterial = new THREE.PointsMaterial({

    map: starTexture,

    vertexColors: true,

    size: 0.98,

    transparent: true,

    opacity: 0.65,

    alphaTest: 0.01,

    depthWrite: false,

    blending: THREE.AdditiveBlending

});
const heart = new THREE.Points(

    heartGeometry,

    heartMaterial

);

galaxyGroup.add(heart);

heart.position.set(0, 6, 0);

heart.rotation.x = -0.35;
heart.rotation.y = 0;
heart.rotation.z = 0;

// creamos saturno
const saturnoGeometry = new THREE.SphereGeometry(
    1.6,
    32,
    32
);
const saturnoMaterial = new THREE.MeshStandardMaterial({
    map: saturnTexture,
    roughness: 1,
    metalness: 0
});
const saturno = new  THREE.Mesh(
    saturnoGeometry,
    saturnoMaterial
);
saturno.position.set(
    18,
    2,
    -10
);
galaxyGroup.add(saturno);

const earthGeometry = new THREE.SphereGeometry(
    1.2,
    64,
    64   
);

const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture
});
const earth = new THREE.Mesh(
    earthGeometry,
    earthMaterial
);

earth.position.set(
    -8,
    4,
    10
);
galaxyGroup.add(earth)

const marsGeometry = new THREE.SphereGeometry(
    1,
    64,
    64
);

const marsMaterial = new THREE.MeshStandardMaterial({

    map: marsTexture

});

const mars = new THREE.Mesh(
    marsGeometry,
    marsMaterial
);

mars.position.set(
    18,
    5,
    20
);

galaxyGroup.add(mars);

const anilloGeometry = new THREE.RingGeometry(
    1.7,
    3.7,
    128
);
const jupiterGeometry = new THREE.SphereGeometry(
    2.2,
    64,
    64
);

const jupiterMaterial = new THREE.MeshStandardMaterial({

    map: jupiterTexture

});

const jupiter = new THREE.Mesh(
    jupiterGeometry,
    jupiterMaterial
);

jupiter.position.set(
    -22,
    4,
    14
);
galaxyGroup.add(jupiter);

const neptuneGeometry = new THREE.SphereGeometry(
    1.4,
    64,
    64
);

const neptuneMaterial = new THREE.MeshStandardMaterial({

    map: neptuneTexture,
    emissive: "#1d7cff",
emissiveIntensity: 0.15
});

const neptune = new THREE.Mesh(
    neptuneGeometry,
    neptuneMaterial
);

neptune.position.set(
    22,
    2,
    10
);

galaxyGroup.add(neptune);

const anilloMaterial = new THREE.MeshBasicMaterial({
    color: "#d9c39a",
    side: THREE.DoubleSide,
    transparent: true,
    opacity : 1,
    blending: THREE.AdditiveBlending,
    depthWrite: false

});
const anillo = new THREE.Mesh(
    anilloGeometry,
    anilloMaterial
);
anillo.rotation.x  = Math.PI / 2.5;

saturno.add(anillo);


let angle = 0;
// intro cinematicas
let intro = true;
let introVelocidad = 2.5;
let introTiempo = 0;

// lista de estrelllas  especiales

const estrellasEspeciales = [];

let shootingActive = false;
let shootingSpeed = 2;
let shootingTimer = 0;

// ======================================
//  FUNCION PARA CREAR ESTRELLAS ESPECIALES 
// ======================================

function crearEstrellasEspeciales(x, y, z, mensaje) {

    const geometry = new THREE.SphereGeometry(
    0.55,
    64,
    64
);

const material = new THREE.MeshStandardMaterial({

    map: sunTexture,

    emissive: "#ffb000",

    emissiveIntensity: 2.5

});

const estrella = new THREE.Mesh(
    geometry,
    material
);
estrella.position.set(x, y, z);

galaxyGroup.add(estrella);

const luz = new THREE.PointLight(
    "#ffdd88",
    20,
    30
);

luz.position.copy(
    estrella.position
);

galaxyGroup.add(luz);

const distancia = Math.sqrt(x * x + z * z);
const angulo = Math.atan2(z, x);

;estrellasEspeciales.push({
    objeto: estrella,
    mensaje: mensaje,
    distancia: distancia,
    angulo: angulo,
    velocidad: 0.002 + Math.random() * 0.002
});
}
crearEstrellasEspeciales(

    20,
    1,
    2,
    "Eres la estrella mas bonita de toda mi Galaxia💖😍❤️"
);
crearEstrellasEspeciales(
    20,
    6,
    15,
    "felices 26 MESES juntos mi amor lindooo💖💕"
);
crearEstrellasEspeciales(
    30,
    3,
    6,
    "dentro de mi sistema solar eres mi mundo entero, te amo mucho Hannah sofia, mi bbita chiquita te amoooo"
);
crearEstrellasEspeciales(
    15,
    6,
    16,
    "no solo cuando creo proyectos enfocados en ti, pienso en ti, yo pienso en ti todos los dias en ti mi amor lindo💕😍, eres mi corazón, mi universo entero, tambien eres la estrella que mas brila en mi sistema Galactico🌟🌠 "

);
crearEstrellasEspeciales(
    -18,
    -1,
    -6,
    "Tu sonrisa ilumina mi universo ✨💖"
);

crearEstrellasEspeciales(
    10,
    -5,
    -15,
    "Cada día contigo es un regalo, por eso cada dia que paso a tu lado mi hinnita, lo disfruto❤️"
);

crearEstrellasEspeciales(
    -8,
    7,
    18,
    "Gracias por existir, mi Hannita bella 🥰"
);

crearEstrellasEspeciales(
    15,
    5,
    12,
    "si fuera autista tu Siempre seriás mi lugar favorito, mi hannita bella 💕"
);

crearEstrellasEspeciales(
    -22,
    3,
    8,
    "Eres mi sueño hecho realidad 🌹 mi hannita bella"
);

crearEstrellasEspeciales(
    5,
    -6,
    -20,
    "Te amo más de lo que las palabras pueden decir 💖"
);
const shootingGeometry = new THREE.BufferGeometry();

shootingGeometry.setAttribute ("position", new THREE.Float32BufferAttribute([0, 0, 0], 3)
);
 const shootingMaterial = new THREE.PointsMaterial({
    map: starTexture,
    color: "#ffffff",
    size: 3,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending

 });

 const  shootingStar = new THREE.Points(
    shootingGeometry,
    shootingMaterial
 );
galaxyGroup.add(shootingStar)


const raycaster = new THREE.Raycaster();

// Hace más fácil detectar estrellas (Points)
raycaster.params.Points.threshold = 3;

const mouse = new THREE.Vector2();
window.addEventListener("click", function(event){

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse,camera);

    let estrellaSeleccionada = null;

    for (const estrella of estrellasEspeciales) {

        const intersects = raycaster.intersectObject(estrella.objeto);

        if (intersects.length > 0){

            estrellaSeleccionada = estrella;

            break;

        }
    }
    if (estrellaSeleccionada) {

        const box = document.getElementById("messageBox");

        const text = document.getElementById("messageText");

        box.style.display = "block";

        text.innerHTML = estrellaSeleccionada.mensaje;

    }
});
document.getElementById("closeBtn").onclick=function(){

    document.getElementById("messageBox").style.display="none";

}
const musica = new Audio("static/audio/teamo.mp3/ComeBack.mp3");

musica.loop = true;
musica.volume = 0;
window.addEventListener("click", function () {

    console.log(musica.src);

    musica.play()
.then(() => {
    console.log("La música comenzó");
})
.catch(error => {
    console.log(error);
});

    musica.play();

    let volumen = 0;

    const fade = setInterval(() => {

        volumen += 0.01;

        musica.volume = volumen;

        if (volumen >= 0.35) {

            clearInterval(fade);

        }

    }, 100);

}, { once: true });

// Función que se repetirá muchas veces por segundo
function animate() {
    
   requestAnimationFrame(animate);

   // Temporizador de la estrella fugaz
shootingTimer++;

if (!shootingActive && shootingTimer > 300) {

    shootingActive = true;

    shootingTimer = 0;

    // Posición inicial aleatoria
    shootingStar.position.set(

        -60 + Math.random() * 20,

        10 + Math.random() * 15,

        -40 + Math.random() * 20

    );

    // La hacemos visible
    shootingMaterial.opacity = 1;

}

   controls.update()

   galaxyGroup.rotation.y += 0.008;

   estrellasEspeciales.forEach((estrella) => {

    estrella.angulo += estrella.velocidad;

    estrella.objeto.position.x =
        Math.cos(estrella.angulo) * estrella.distancia;

    estrella.objeto.position.z =
        Math.sin(estrella.angulo) * estrella.distancia;

});
earth.rotation.y += 0.05;

mars.rotation.y += 0.04;

jupiter.rotation.y += 0.03;

neptune.rotation.y += 0.05;

// intro
if(intro){

    const posiciones = warpGeometry.attributes.position.array;

for(let i=2;i<posiciones.length;i+=3){

    posiciones[i]+=25;

    if(posiciones[i]>40){

        posiciones[i]=-3000;

    }

}

warpGeometry.attributes.position.needsUpdate=true;
    camera.position.z -= introVelocidad;

    introTiempo++;
}
if(introTiempo > 350){

    intro = false;

}
   //dibujar la escena 
   renderer.render(scene, camera);
}
animate();