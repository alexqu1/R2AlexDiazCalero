let video;
let facemesh;
let predictions = [];

let started = false;
let mouthOpen = false;
let openTime = 0;

let particles = [];
let brushSound;

// ---------------- PRELOAD ----------------
function preload() {
  brushSound = loadSound('assets/cepillado.mp3');
  brushSound.setVolume(0.9);
}

// ---------------- SETUP ----------------
function setup() {
  createCanvas(640, 480);

  // ⚠️ IMPORTANTE: NO creamos la cámara aquí
  // se creará al pulsar el botón

  document.getElementById("startBtn").onclick = startExperience;
}

// ---------------- INICIAR EXPERIENCIA ----------------
function startExperience() {
  started = true;

  // Crear cámara SOLO ahora
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Iniciar facemesh
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });

  // Ocultar UI
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("info").style.display = "none";
}

// ---------------- MODELO LISTO ----------------
function modelReady() {
  console.log("Modelo listo");
}

// ---------------- DRAW ----------------
function draw() {
  background(0);

  if (!started) {
    showStartScreen();
    return;
  }

  image(video, 0, 0);

  detectMouth();
  updateParticles();
  drawParticles();
  drawProgressBar();
  drawText();
}

// ---------------- DETECCIÓN BOCA ----------------
function detectMouth() {
  if (predictions.length > 0) {
    let top = predictions[0].scaledMesh[13];
    let bottom = predictions[0].scaledMesh[14];

    let d = dist(top[0], top[1], bottom[0], bottom[1]);

    if (d > 20) {
      mouthOpen = true;
      openTime++;

      let mouthX = (top[0] + bottom[0]) / 2;
      let mouthY = (top[1] + bottom[1]) / 2;

      for (let i = 0; i < 6; i++) {
        particles.push(new Particle(mouthX, mouthY));
      }

      if (!brushSound.isPlaying()) {
        brushSound.loop();
      }

    } else {
      mouthOpen = false;
      openTime = max(0, openTime - 2);

      if (brushSound.isPlaying()) {
        brushSound.stop();
      }
    }
  }
}

// ---------------- PARTÍCULAS ----------------
class Particle {
  constructor(x, y) {
    this.x = x + random(-30, 30);
    this.y = y + random(-15, 15);
    this.size = random(5, 15);
    this.life = 255;
    this.speed = random(0.5, 2);
  }

  update() {
    this.y -= this.speed;
    this.life -= 4;
  }

  show() {
    noStroke();
    fill(0, 255, 100, this.life);
    ellipse(this.x, this.y, this.size);
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  for (let p of particles) {
    p.show();
  }
}

// ---------------- UI ----------------
function showStartScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Pulsa empezar para activar la cámara", width/2, height/2);
}

function drawText() {
  textAlign(CENTER);
  textSize(22);

  if (mouthOpen) {
    fill(0, 255, 0);
    text("👻 Cepillando dientes...", width/2, height - 20);
  } else {
    fill(255);
    text("😐 Abre la boca", width/2, height - 20);
  }
}

// ---------------- BARRA PROGRESO ----------------
function drawProgressBar() {
  let progress = constrain(openTime / 300, 0, 1);

  fill(80);
  rect(120, 20, 400, 20, 10);

  fill(0, 255, 0);
  rect(120, 20, 400 * progress, 20, 10);

  if (progress >= 1) {
    fill(255, 255, 0);
    textSize(26);
    text("✨ ¡Dientes Mostruosamente Limpios!", width/2, 60);
  }
}