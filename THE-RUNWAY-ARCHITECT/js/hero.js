/* ============================================
   THE RUNWAY ARCHITECT — WebGL Displacement Hero
   ============================================ */

const HeroManager = {
  scene: null,
  camera: null,
  renderer: null,
  mesh: null,
  material: null,
  mouse: { x: 0, y: 0 },
  targetMouse: { x: 0, y: 0 },
  clock: null,
  animFrameId: null,
  isReady: false,

  vertexShader: `
    uniform float uTime;
    uniform float uAmplitude;
    uniform vec2 uMouse;

    // Simplex noise
    vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0 / 7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = 1.79284291400159 - 0.85373472095314 *
        vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    void main() {
      vec3 pos = position;

      // Organic breathing displacement
      float noise = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * 0.06));
      float displacement = noise * uAmplitude;

      // Mouse influence — proximity-based warp
      float mouseDist = distance(uMouse, pos.xy);
      float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.15;
      displacement += mouseInfluence * sin(uTime * 2.0 + pos.x * 3.0);

      pos.z += displacement;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;

    // Vignette
    float vignette(vec2 uv, float radius, float softness) {
      float d = distance(uv, vec2(0.5));
      return smoothstep(radius, radius - softness, d);
    }

    // Film grain
    float grain(vec2 uv, float t) {
      return fract(sin(dot(uv, vec2(12.9898, 78.233)) + t) * 43758.5453);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);

      // Three-tone noir palette based on vertical position
      vec3 deepBlack = vec3(0.02, 0.02, 0.02);
      vec3 graphite = vec3(0.08, 0.07, 0.07);
      vec3 steel = vec3(0.15, 0.14, 0.13);

      float elevation = uv.y;
      vec3 baseColor = mix(deepBlack, graphite, smoothstep(0.0, 0.5, elevation));
      baseColor = mix(baseColor, steel, smoothstep(0.5, 1.0, elevation));

      // Subtle burgundy accent at vertical midpoint
      vec3 accent = vec3(0.42, 0.18, 0.24);
      float accentMask = smoothstep(0.35, 0.5, elevation) * smoothstep(0.65, 0.5, elevation);
      baseColor = mix(baseColor, accent, accentMask * 0.15);

      // Mouse-reactive glow
      float mouseGlow = smoothstep(0.5, 0.0, distance(uv, uMouse)) * 0.08;
      baseColor += vec3(mouseGlow);

      // Cinematic vignette
      float v = vignette(uv, 0.7, 0.5);
      baseColor *= v;

      // Subtle film grain
      float g = grain(uv * 500.0, uTime * 0.5) * 0.04;
      baseColor += g;

      // Scanline effect
      float scanline = sin(uv.y * 600.0) * 0.01;
      baseColor += scanline;

      gl_FragColor = vec4(baseColor, 1.0);
    }
  `,

  init() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    try {
      this.clock = new THREE.Clock();

      // Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x050505, 0.008);

      // Camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 5);

      // Renderer — alpha: true so it doesn't block the bg image
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);

    // Geometry — large plane for displacement
    const geometry = new THREE.PlaneGeometry(8, 6, 64, 64);

    // Shader material
    this.material = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: 0.15 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
      },
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    // Mouse-reactive lighting
    this.ambientLight = new THREE.AmbientLight(0x1a1a1a, 0.5);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0x6B2D3E, 1.5, 15);
    this.pointLight.position.set(2, 2, 4);
    this.scene.add(this.pointLight);

    this.pointLight2 = new THREE.PointLight(0xF5F0EB, 0.3, 12);
    this.pointLight2.position.set(-2, -1, 3);
    this.scene.add(this.pointLight2);

    // Events
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = e.clientX / window.innerWidth;
      this.targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    });

    window.addEventListener('resize', () => this.onResize());

    this.isReady = true;
    } catch (e) {
      console.warn('WebGL hero failed:', e);
      canvas.style.display = 'none';
    }
  },

  animate() {
    if (!this.isReady) return;

    this.animFrameId = requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    // Smooth mouse lerp
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.02;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.02;

    // Update uniforms
    this.material.uniforms.uTime.value = elapsed;
    this.material.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);

    // Animate amplitude — high on load, settles down
    const targetAmplitude = 0.02;
    const current = this.material.uniforms.uAmplitude.value;
    this.material.uniforms.uAmplitude.value += (targetAmplitude - current) * 0.005;

    // Mouse-reactive light tracking
    const lightX = (this.mouse.x - 0.5) * 6;
    const lightY = (this.mouse.y - 0.5) * 4;
    this.pointLight.position.x += (lightX - this.pointLight.position.x) * 0.03;
    this.pointLight.position.y += (lightY - this.pointLight.position.y) * 0.03;

    // Subtle camera parallax
    this.camera.position.x += (this.mouse.x * 0.3 - this.camera.position.x) * 0.02;
    this.camera.position.y += (this.mouse.y * 0.2 - this.camera.position.y) * 0.02;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  },

  onResize() {
    if (!this.isReady) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  },

  destroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.renderer) this.renderer.dispose();
  }
};
