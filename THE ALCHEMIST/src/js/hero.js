/* ============================================
   THE ALCHEMIST — Hero (THE SLOW EMERGENCE)
   Three.js displacement portrait
   ============================================ */

import * as THREE from 'three';

export function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = null;
  scene.fog = new THREE.FogExp2(0x0D0A07, 0.008);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xF5EDE0, 0.2);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xC4A265, 0.8, 20);
  pointLight.position.set(2, 3, 4);
  scene.add(pointLight);

  // Atmospheric plane with displacement
  const geometry = new THREE.PlaneGeometry(12, 8, 64, 64);

  // Atmospheric displacement material — cinematic, not tech demo
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: 0.15 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color(0x0D0A07) },  // Deep espresso
      uColor2: { value: new THREE.Color(0x1A1510) },  // Warm charcoal
      uColor3: { value: new THREE.Color(0xC4A265) }   // Muted gold accent
    },
    vertexShader: `
      uniform float uTime;
      uniform float uAmplitude;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vElevation;

      // Simplex noise — simplified for atmosphere
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vUv = uv;

        // Slow, atmospheric breathing — not chaotic
        float noise = snoise(vec2(
          position.x * 0.3 + uTime * 0.06,
          position.y * 0.3 + uTime * 0.03
        ));
        float elevation = noise * uAmplitude;

        // Gentle mouse influence — like candlelight following presence
        float mouseDist = distance(uv, uMouse);
        float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.03;
        elevation += mouseInfluence;

        vElevation = elevation;

        vec3 newPosition = position;
        newPosition.z += elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        float mixFactor = smoothstep(-0.1, 0.1, vElevation);
        vec3 color = mix(uColor1, uColor2, mixFactor);

        // Subtle gold accent — like light catching texture
        float accent = smoothstep(0.6, 0.4, vUv.y) * smoothstep(0.4, 0.6, vUv.y);
        color = mix(color, uColor3, accent * 0.08);

        // Cinematic vignette — deeper at edges
        float vignette = 1.0 - smoothstep(0.2, 1.3, length(vUv - 0.5));
        color *= vignette;

        // Subtle film grain
        float grain = (fract(sin(dot(vUv * uTime * 0.01, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
        color += grain;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Mouse tracking
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    material.uniforms.uMouse.value.set(
      e.clientX / window.innerWidth,
      1.0 - e.clientY / window.innerHeight
    );
  });

  // Animation loop
  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);

    material.uniforms.uTime.value += 0.005;

    // Subtle camera movement based on mouse
    camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    // Point light follows mouse subtly
    pointLight.position.x = 2 + mouse.x * 1.5;
    pointLight.position.y = 3 + mouse.y * 1;

    renderer.render(scene, camera);
  }

  // Hero entrance animation
  function heroEntrance() {
    const heroTL = gsap.timeline({ delay: 0.3 });

    // Animate split text inner spans (created by splitText function)
    const heroNameSpans = document.querySelectorAll('.hero-name-line span > span');

    heroTL
      .to(material.uniforms.uAmplitude, {
        value: 0.02,
        duration: 4,
        ease: 'power2.inOut'
      })
      .to(heroNameSpans, {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
      }, 1)
      .from('.hero-statement', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out'
      }, 2)
      .from('.hero-label', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 2.5)
      .from('.hero-scroll-cue', {
        opacity: 0,
        duration: 0.6
      }, 3);
  }

  // Start animation
  animate();

  // Expose heroEntrance so main.js can call it after text is split
  window.heroEntrance = heroEntrance;

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Cleanup on page leave
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(rafId);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
  });
}
