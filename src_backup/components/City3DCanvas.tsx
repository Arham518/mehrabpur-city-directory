import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { usePortalStore } from "../store/usePortalStore";
import { 
  Compass, Eye, Play, Pause, RotateCcw, 
  MapPin, Train, Wheat, Building2, Sparkles 
} from "lucide-react";

export const City3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkMode = usePortalStore((s) => s.darkMode);
  
  // Interactive UI state
  const [activeView, setActiveView] = useState<"orbit" | "station" | "drone">("orbit");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  // References to communicate with Three.js loop
  const cameraTargetRef = useRef<{ pos: THREE.Vector3; look: THREE.Vector3 }>({
    pos: new THREE.Vector3(0, 5, 8.5),
    look: new THREE.Vector3(0, 0, 0),
  });
  const isPlayingRef = useRef<boolean>(true);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 400;
    let isVisible = true;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    
    // Colorful ambient atmosphere fog
    scene.fog = new THREE.FogExp2(
      darkMode ? 0x070b14 : 0xf1f5f9, 
      0.035
    );

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    camera.position.set(0, 5, 8.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = darkMode ? 1.25 : 1.1;
    container.appendChild(renderer.domElement);

    // Root Master World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- Materials Palette (Rich & Vibrant) ---
    const matPalette = {
      ground: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x0b1120 : 0xe2e8f0,
        roughness: 0.9,
        metalness: 0.1,
      }),
      railBallast: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x1e293b : 0xcbd5e1,
        roughness: 0.95,
      }),
      steelRail: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x94a3b8 : 0x64748b,
        metalness: 0.9,
        roughness: 0.2,
      }),
      sleeper: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x334155 : 0x78350f,
        roughness: 0.8,
      }),
      stationBrick: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x991b1b : 0xb91c1c, // Colonial heritage red brick
        roughness: 0.7,
      }),
      stationSandstone: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x64748b : 0x94a3b8, // Clean architectural stone
        roughness: 0.6,
      }),
      stationRoof: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x1e293b : 0x334155, // Slate roof
        roughness: 0.5,
      }),
      clockFace: new THREE.MeshBasicMaterial({
        color: 0xffffff,
      }),
      trainEngine: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x0284c7 : 0x0369a1, // Deep cobalt locomotive blue
        metalness: 0.7,
        roughness: 0.3,
      }),
      trainStripe: new THREE.MeshStandardMaterial({
        color: 0xf1f5f9, // Crisp silver striping
        metalness: 0.5,
      }),
      trainCarriage: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x0f172a : 0x1e293b,
        metalness: 0.6,
        roughness: 0.4,
      }),
      windowGlow: new THREE.MeshBasicMaterial({
        color: 0xffffff, // Crisp passenger cabin light
      }),
      headlightGlow: new THREE.MeshBasicMaterial({
        color: 0xffffff,
      }),
      siloChrome: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x64748b : 0x94a3b8, // Stainless steel silos
        metalness: 0.85,
        roughness: 0.25,
      }),
      siloGold: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x475569 : 0x64748b, // Brushed steel hopper
        metalness: 0.6,
        roughness: 0.4,
      }),
      glassFacade: new THREE.MeshStandardMaterial({
        color: darkMode ? 0x38bdf8 : 0x0284c7, // Modern cyan glass
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.75,
      }),
      signalGreen: new THREE.MeshBasicMaterial({ color: 0x10b981 }),
      signalRed: new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      signalCyan: new THREE.MeshBasicMaterial({ color: 0x38bdf8 }),
    };

    // --- 1. Base Platform & Concentric Radar Grid ---
    const basePlate = new THREE.Mesh(
      new THREE.CylinderGeometry(6.5, 6.8, 0.3, 48),
      matPalette.ground
    );
    basePlate.position.y = -0.65;
    worldGroup.add(basePlate);

    // Glowing Neon Rings on Ground (Mehrabpur City Boundary)
    const ringColor = darkMode ? 0x38bdf8 : 0x0284c7;
    const boundaryRing = new THREE.Mesh(
      new THREE.RingGeometry(6.1, 6.18, 64),
      new THREE.MeshBasicMaterial({
        color: ringColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: darkMode ? 0.6 : 0.4,
      })
    );
    boundaryRing.rotation.x = Math.PI / 2;
    boundaryRing.position.y = -0.49;
    worldGroup.add(boundaryRing);

    // Secondary Inner Ring
    const innerAgriRing = new THREE.Mesh(
      new THREE.RingGeometry(3.8, 3.84, 48),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: darkMode ? 0.4 : 0.25,
      })
    );
    innerAgriRing.rotation.x = Math.PI / 2;
    innerAgriRing.position.y = -0.49;
    worldGroup.add(innerAgriRing);

    // Grid Floor Overlay
    const gridHelper = new THREE.GridHelper(
      12,
      20,
      darkMode ? 0x475569 : 0x94a3b8,
      darkMode ? 0x1e293b : 0xe2e8f0
    );
    gridHelper.position.y = -0.495;
    worldGroup.add(gridHelper);

    // --- 2. Curved ML-1 Main Railway Track System ---
    const curvePoints = [
      new THREE.Vector3(-5.5, -0.4, 3.2),
      new THREE.Vector3(-2.8, -0.4, 1.4),
      new THREE.Vector3(0, -0.4, 0.2),
      new THREE.Vector3(2.8, -0.4, -1.2),
      new THREE.Vector3(5.5, -0.4, -2.8),
    ];
    const trackCurve = new THREE.CatmullRomCurve3(curvePoints);

    // Ballast track embankment
    const ballastPoints = trackCurve.getPoints(50);
    const ballastGeo = new THREE.BufferGeometry().setFromPoints(ballastPoints);
    const ballastLine = new THREE.Line(
      ballastGeo,
      new THREE.LineBasicMaterial({
        color: darkMode ? 0x334155 : 0x94a3b8,
        linewidth: 4,
      })
    );
    worldGroup.add(ballastLine);

    // Twin Steel Rails
    const railOffset = 0.16;
    const railPointsLeft: THREE.Vector3[] = [];
    const railPointsRight: THREE.Vector3[] = [];

    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const pt = trackCurve.getPoint(t);
      const tangent = trackCurve.getTangent(t).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      railPointsLeft.push(
        new THREE.Vector3().copy(pt).addScaledVector(normal, -railOffset)
      );
      railPointsRight.push(
        new THREE.Vector3().copy(pt).addScaledVector(normal, railOffset)
      );
    }

    const railMat = new THREE.LineBasicMaterial({
      color: darkMode ? 0x38bdf8 : 0x0284c7, // Neon steel blue rails
      linewidth: 3,
    });
    const leftRail = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(railPointsLeft),
      railMat
    );
    leftRail.position.y = 0.04;
    worldGroup.add(leftRail);

    const rightRail = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(railPointsRight),
      railMat
    );
    rightRail.position.y = 0.04;
    worldGroup.add(rightRail);

    // Sleepers (Cross ties)
    const sleeperGeo = new THREE.BoxGeometry(0.5, 0.04, 0.09);
    for (let i = 0; i <= 36; i++) {
      const t = i / 36;
      const pt = trackCurve.getPoint(t);
      const tangent = trackCurve.getTangent(t).normalize();
      const sleeperMesh = new THREE.Mesh(sleeperGeo, matPalette.sleeper);
      sleeperMesh.position.copy(pt);
      sleeperMesh.position.y = -0.44;
      sleeperMesh.rotation.y = Math.atan2(tangent.x, tangent.z);
      worldGroup.add(sleeperMesh);
    }

    // Modern Trackside Signal Mast with Glowing Lights
    const signalMast = new THREE.Group();
    signalMast.position.set(-1.2, -0.4, 1.3);

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8),
      matPalette.steelRail
    );
    pole.position.y = 0.7;
    signalMast.add(pole);

    const signalBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.45, 0.12),
      matPalette.trainCarriage
    );
    signalBox.position.set(0, 1.1, 0);
    signalMast.add(signalBox);

    const redLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      matPalette.signalRed
    );
    redLight.position.set(0.07, 1.22, 0);
    signalMast.add(redLight);

    const greenLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      matPalette.signalGreen
    );
    greenLight.position.set(0.07, 0.98, 0);
    signalMast.add(greenLight);

    worldGroup.add(signalMast);

    // --- 3. High-Detail Locomotive & 2 Passenger Carriages ---
    const trainTrain = new THREE.Group();

    // A. Diesel Engine Locomotive Cab
    const locomotive = new THREE.Group();
    
    // Main Body
    const engineBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.46, 0.32),
      matPalette.trainEngine
    );
    engineBody.position.y = 0.28;
    locomotive.add(engineBody);

    // Aerodynamic Nose Slant
    const engineNose = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.32, 16, 1, false, 0, Math.PI),
      matPalette.trainEngine
    );
    engineNose.rotation.z = Math.PI / 2;
    engineNose.rotation.y = Math.PI / 2;
    engineNose.position.set(0.6, 0.28, 0);
    locomotive.add(engineNose);

    // Cab Windshield Glass
    const windshield = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.16, 0.3),
      matPalette.glassFacade
    );
    windshield.position.set(0.45, 0.38, 0);
    locomotive.add(windshield);

    // Golden Racing Stripe along side
    const stripeLeft = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.05, 0.01),
      matPalette.trainStripe
    );
    stripeLeft.position.set(0, 0.22, 0.165);
    locomotive.add(stripeLeft);

    const stripeRight = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.05, 0.01),
      matPalette.trainStripe
    );
    stripeRight.position.set(0, 0.22, -0.165);
    locomotive.add(stripeRight);

    // Dual High-Power Headlights
    const lightL = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      matPalette.headlightGlow
    );
    lightL.position.set(0.68, 0.2, 0.08);
    locomotive.add(lightL);

    const lightR = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      matPalette.headlightGlow
    );
    lightR.position.set(0.68, 0.2, -0.08);
    locomotive.add(lightR);

    // Roof Exhaust Vents
    const vent = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.07, 0.08, 12),
      matPalette.steelRail
    );
    vent.position.set(-0.2, 0.54, 0);
    locomotive.add(vent);

    trainTrain.add(locomotive);

    // B. Carriage 1 (Passenger Coach)
    const coach1 = new THREE.Group();
    coach1.position.set(-1.4, 0, 0);

    const coachBody1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.44, 0.3),
      matPalette.trainCarriage
    );
    coachBody1.position.y = 0.28;
    coach1.add(coachBody1);

    // Warm Illuminated Windows (Row of 4 on each side)
    for (let w = -0.4; w <= 0.4; w += 0.26) {
      const winL = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.12, 0.01),
        matPalette.windowGlow
      );
      winL.position.set(w, 0.32, 0.155);
      coach1.add(winL);

      const winR = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.12, 0.01),
        matPalette.windowGlow
      );
      winR.position.set(w, 0.32, -0.155);
      coach1.add(winR);
    }
    trainTrain.add(coach1);

    // C. Carriage 2 (Express AC Coach)
    const coach2 = new THREE.Group();
    coach2.position.set(-2.65, 0, 0);

    const coachBody2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.44, 0.3),
      matPalette.trainCarriage
    );
    coachBody2.position.y = 0.28;
    coach2.add(coachBody2);

    for (let w = -0.4; w <= 0.4; w += 0.26) {
      const winL = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.12, 0.01),
        matPalette.windowGlow
      );
      winL.position.set(w, 0.32, 0.155);
      coach2.add(winL);

      const winR = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.12, 0.01),
        matPalette.windowGlow
      );
      winR.position.set(w, 0.32, -0.155);
      coach2.add(winR);
    }
    trainTrain.add(coach2);

    worldGroup.add(trainTrain);

    // --- 4. Architectural Landmark: Historic Mehrabpur Railway Station (EST. 1914) ---
    const stationComplex = new THREE.Group();
    stationComplex.position.set(-2.4, -0.45, -1.8);

    // Station Main Building Hall
    const mainHall = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.85, 1.1),
      matPalette.stationBrick
    );
    mainHall.position.y = 0.425;
    stationComplex.add(mainHall);

    // Sandstone Arched Entrance Porch
    const porch = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.7, 0.4),
      matPalette.stationSandstone
    );
    porch.position.set(0, 0.35, 0.65);
    stationComplex.add(porch);

    // Entrance Archway Cutout Effect
    const archHole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.45, 16, 1, false, 0, Math.PI),
      matPalette.trainCarriage
    );
    archHole.rotation.z = Math.PI / 2;
    archHole.position.set(0, 0.4, 0.75);
    stationComplex.add(archHole);

    // Station Pitched Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 0.4, 4),
      matPalette.stationRoof
    );
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 1.05, 0);
    roof.scale.set(1.5, 1, 0.8);
    stationComplex.add(roof);

    // Iconic Clock Tower
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 1.6, 0.55),
      matPalette.stationSandstone
    );
    tower.position.set(0.95, 0.8, 0.15);
    stationComplex.add(tower);

    // Tower Pyramid Spire
    const spire = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 0.6, 4),
      matPalette.stationRoof
    );
    spire.rotation.y = Math.PI / 4;
    spire.position.set(0.95, 1.9, 0.15);
    stationComplex.add(spire);

    // Glowing Circular Clock Dial (Front & Side)
    const clockDialFront = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 16),
      matPalette.clockFace
    );
    clockDialFront.position.set(0.95, 1.35, 0.43);
    stationComplex.add(clockDialFront);

    const clockDialSide = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 16),
      matPalette.clockFace
    );
    clockDialSide.rotation.y = Math.PI / 2;
    clockDialSide.position.set(1.23, 1.35, 0.15);
    stationComplex.add(clockDialSide);

    // Station Canopy Platform
    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.06, 0.6),
      matPalette.stationRoof
    );
    canopy.position.set(0, 0.75, 1.1);
    stationComplex.add(canopy);

    worldGroup.add(stationComplex);

    // --- 5. Architectural Landmark: Ghalla Mandi Agro Terminal Silos ---
    const mandiComplex = new THREE.Group();
    mandiComplex.position.set(2.6, -0.45, 1.6);

    // 3 Cylindrical Silos with Conical Tops
    const siloRadius = 0.35;
    const siloHeights = [1.5, 1.8, 1.3];
    const siloPositions = [
      new THREE.Vector3(-0.45, 0, 0),
      new THREE.Vector3(0.35, 0, -0.2),
      new THREE.Vector3(0.0, 0, 0.5),
    ];

    siloPositions.forEach((pos, idx) => {
      const h = siloHeights[idx];
      const siloCol = new THREE.Mesh(
        new THREE.CylinderGeometry(siloRadius, siloRadius, h, 20),
        matPalette.siloChrome
      );
      siloCol.position.set(pos.x, h / 2, pos.z);
      mandiComplex.add(siloCol);

      // Conical Dome Top
      const dome = new THREE.Mesh(
        new THREE.ConeGeometry(siloRadius * 1.05, 0.28, 20),
        matPalette.siloGold
      );
      dome.position.set(pos.x, h + 0.14, pos.z);
      mandiComplex.add(dome);
    });

    // Connecting Gantry Bridge Pipe
    const gantry = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8),
      matPalette.steelRail
    );
    gantry.rotation.z = Math.PI / 2;
    gantry.position.set(0, 1.4, 0);
    mandiComplex.add(gantry);

    worldGroup.add(mandiComplex);

    // --- 6. Civic Administrative Tower & Modern THQ Block ---
    const civicComplex = new THREE.Group();
    civicComplex.position.set(1.9, -0.45, -2.1);

    // Modern Glass Tower Block (Taluka Secretariat / THQ)
    const towerBlock = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.9, 0.9),
      matPalette.glassFacade
    );
    towerBlock.position.y = 0.95;
    civicComplex.add(towerBlock);

    // Terraced Podium Base
    const podium = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.3, 1.3),
      matPalette.stationRoof
    );
    podium.position.y = 0.15;
    civicComplex.add(podium);

    // Rotating Communications Microwave Dish on Tower
    const commPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8),
      matPalette.steelRail
    );
    commPole.position.set(0, 2.15, 0);
    civicComplex.add(commPole);

    const commDish = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2),
      matPalette.signalCyan
    );
    commDish.position.set(0, 2.35, 0);
    commDish.rotation.x = Math.PI / 3;
    civicComplex.add(commDish);

    // Red Aviation Hazard Light on Mast
    const aviationBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      matPalette.signalRed
    );
    aviationBeacon.position.set(0, 2.45, 0);
    civicComplex.add(aviationBeacon);

    worldGroup.add(civicComplex);

    // --- 7. Rich Atmospheric Particles (Floating Golden & Cyan Light Motes) ---
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xe2e8f0);
    const cyanColor = new THREE.Color(0x38bdf8);

    for (let p = 0; p < particleCount; p++) {
      const idx = p * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 11;
      particlePositions[idx + 1] = Math.random() * 4.5 - 0.3;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 11;

      const chosenColor = Math.random() > 0.4 ? goldColor : cyanColor;
      particleColors[idx] = chosenColor.r;
      particleColors[idx + 1] = chosenColor.g;
      particleColors[idx + 2] = chosenColor.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: darkMode ? 0.75 : 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // --- 8. Dynamic Professional Multi-Light Rig ---
    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(
      darkMode ? 0x0f172a : 0xf8fafc,
      darkMode ? 1.5 : 2.0
    );
    scene.add(ambientLight);

    // Clean Sun Directional Light (Casting highlights across rails & buildings)
    const sunLight = new THREE.DirectionalLight(0xffffff, darkMode ? 1.8 : 1.4);
    sunLight.position.set(6, 10, 5);
    scene.add(sunLight);

    // Cyan Fill Light from opposite quadrant
    const skyFill = new THREE.DirectionalLight(0x38bdf8, darkMode ? 1.2 : 0.8);
    skyFill.position.set(-6, 8, -5);
    scene.add(skyFill);

    // Clean Accent Point Light near the Station Entrance
    const stationPointLight = new THREE.PointLight(0xffffff, 2.5, 6);
    stationPointLight.position.set(-2.4, 0.6, -1.1);
    worldGroup.add(stationPointLight);

    // Cyan Accent Point Light near the Silos
    const mandiPointLight = new THREE.PointLight(0x06b6d4, 2.0, 5);
    mandiPointLight.position.set(2.6, 0.8, 1.6);
    worldGroup.add(mandiPointLight);

    // --- 9. Orbit Drag & Touch Interaction System (Silky Smooth) ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0.2;
    let targetRotationX = 0.15;
    let currentRotationY = 0.2;
    let currentRotationX = 0.15;
    let targetZoom = 8.5;
    let currentZoom = 8.5;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.005;

      // Clamp vertical tilt
      targetRotationX = Math.max(-0.25, Math.min(0.65, targetRotationX));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.005;
      targetZoom = Math.max(5.0, Math.min(13.0, targetZoom));
    };

    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });

    // --- 10. Animation & Render Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let trainT = 0.35;

    // Viewport intersection observer to eliminate CPU usage when scrolled off
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera position interpolation towards active view preset
      camera.position.lerp(cameraTargetRef.current.pos, 0.05);
      camera.lookAt(cameraTargetRef.current.look);

      // Smooth inertia rotation interpolation
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentZoom += (targetZoom - currentZoom) * 0.08;

      worldGroup.rotation.y = currentRotationY;
      worldGroup.rotation.x = currentRotationX;
      camera.position.z = currentZoom;

      // Animate Train Along Track
      if (isPlayingRef.current) {
        trainT += delta * 0.08; // High speed passenger express
        if (trainT > 1) trainT = 0;

        const pos = trackCurve.getPoint(trainT);
        const tangent = trackCurve.getTangent(trainT).normalize();
        
        trainTrain.position.copy(pos);
        const angle = Math.atan2(tangent.x, tangent.z);
        trainTrain.rotation.y = angle - Math.PI / 2;
      }

      // Rotate Communications Radar Dish
      commDish.rotation.y = elapsedTime * 1.5;

      // Pulse Aviation Hazard Beacon
      aviationBeacon.scale.setScalar(0.9 + Math.sin(elapsedTime * 6) * 0.25);

      // Rotate atmospheric motes
      particles.rotation.y = elapsedTime * 0.03;

      // Subtle pulse on ground rings
      boundaryRing.scale.setScalar(1 + Math.sin(elapsedTime * 1.8) * 0.015);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup on unmount or theme switch
    return () => {
      observer.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [darkMode]);

  // View presets switcher
  const handleViewChange = (view: "orbit" | "station" | "drone") => {
    setActiveView(view);
    if (view === "orbit") {
      cameraTargetRef.current = {
        pos: new THREE.Vector3(0, 5, 8.5),
        look: new THREE.Vector3(0, 0, 0),
      };
    } else if (view === "station") {
      cameraTargetRef.current = {
        pos: new THREE.Vector3(-2.0, 2.5, 4.0),
        look: new THREE.Vector3(-2.4, 0.4, -1.8),
      };
    } else if (view === "drone") {
      cameraTargetRef.current = {
        pos: new THREE.Vector3(0, 11, 2),
        look: new THREE.Vector3(0, 0, 0),
      };
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900/5 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        className="w-full h-[360px] sm:h-[420px] lg:h-[460px] relative cursor-grab active:cursor-grabbing select-none touch-none"
        title="Interactive 3D Digital Twin — Click & drag to rotate 360°, scroll to zoom"
      />

      {/* Floating HUD: Live Status Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        
        {/* Live Corridor Status Badge */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">
            MEHRABPUR 3D TWIN
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500">|</span>
          <span className="hidden sm:inline text-[11px] text-slate-600 dark:text-slate-300 font-mono font-semibold">
            ML-1 PASSENGER ARTERY
          </span>
        </div>

        {/* Play/Pause & Reset Utility */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-1 rounded-lg shadow-xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isPlaying ? "Pause Express Animation" : "Resume Express Animation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => handleViewChange("orbit")}
            className="p-1.5 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset 3D Perspective"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Floating Interactive Landmark Pins & Live Inspector */}
      <div className="absolute top-14 left-4 z-10 hidden sm:flex flex-col gap-1.5 pointer-events-none">
        <button
          onMouseEnter={() => setHoveredLandmark("station")}
          onMouseLeave={() => setHoveredLandmark(null)}
          onClick={() => handleViewChange("station")}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 backdrop-blur-sm text-[11px] font-semibold transition-all cursor-pointer shadow-xs"
        >
          <Train className="w-3 h-3 text-slate-600 dark:text-slate-300" />
          <span>MHR Junction (Est. 1914)</span>
        </button>

        <button
          onMouseEnter={() => setHoveredLandmark("mandi")}
          onMouseLeave={() => setHoveredLandmark(null)}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 backdrop-blur-sm text-[11px] font-semibold transition-all cursor-pointer shadow-xs"
        >
          <Wheat className="w-3 h-3 text-slate-600 dark:text-slate-300" />
          <span>Ghalla Mandi Silos</span>
        </button>

        <button
          onMouseEnter={() => setHoveredLandmark("civic")}
          onMouseLeave={() => setHoveredLandmark(null)}
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 backdrop-blur-sm text-[11px] font-semibold transition-all cursor-pointer shadow-xs"
        >
          <Building2 className="w-3 h-3 text-slate-600 dark:text-slate-300" />
          <span>Taluka Secretariat</span>
        </button>
      </div>

      {/* Dynamic Landmark Inspector Tooltip */}
      {hoveredLandmark && (
        <div className="absolute top-14 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white dark:bg-slate-800/95 backdrop-blur-md border border-slate-700 text-xs shadow-md animate-fade-scale">
          <span className="w-2 h-2 rounded-full bg-slate-300 animate-ping" />
          <span className="font-medium">
            {hoveredLandmark === "station" && "Historic 1914 Colonial Junction Station & ML-1 Platform"}
            {hoveredLandmark === "mandi" && "Sindh Grain Elevators, Silos & Cotton Trade Hub"}
            {hoveredLandmark === "civic" && "Taluka Administrative Secretariat & Medical Precinct"}
          </span>
        </div>
      )}

      {/* Camera View Preset Bar at Bottom */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Preset Selector */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm">
          <button
            onClick={() => handleViewChange("orbit")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === "orbit"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>360° Orbit</span>
          </button>

          <button
            onClick={() => handleViewChange("station")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === "station"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Station View</span>
          </button>

          <button
            onClick={() => handleViewChange("drone")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === "drone"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Drone Overhead</span>
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 shadow-xs">
          <MapPin className="w-3 h-3 text-slate-400" />
          <span>Drag to orbit • Wheel to zoom</span>
        </div>

      </div>

    </div>
  );
};
