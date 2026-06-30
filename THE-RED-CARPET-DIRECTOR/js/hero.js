/* THE RED CARPET DIRECTOR — WebGL Hero */
var HeroManager = {
  scene: null, camera: null, renderer: null, mesh: null, material: null,
  mouse: { x: 0, y: 0 }, targetMouse: { x: 0, y: 0 },
  clock: null, animFrameId: null, isReady: false,

  vertexShader: [
    'uniform float uTime;',
    'uniform float uAmplitude;',
    'uniform vec2 uMouse;',
    'vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}',
    'float snoise(vec3 v){',
    '  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);',
    '  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);',
    '  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);',
    '  vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;',
    '  vec3 x3=x0-D.yyy;i=mod(i,289.0);',
    '  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));',
    '  float n_=1.0/7.0;vec3 ns=n_*D.wyz-D.xzx;',
    '  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);',
    '  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);',
    '  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);',
    '  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));',
    '  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
    '  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);',
    '  vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));',
    '  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;',
    '  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;',
    '  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));',
    '}',
    'void main(){',
    '  vec3 pos=position;',
    '  float noise=snoise(vec3(pos.x*1.5,pos.y*1.5,uTime*0.06));',
    '  float displacement=noise*uAmplitude;',
    '  float mouseDist=distance(uMouse,pos.xy);',
    '  float mouseInfluence=smoothstep(0.6,0.0,mouseDist)*0.15;',
    '  displacement+=mouseInfluence*sin(uTime*2.0+pos.x*3.0);',
    '  pos.z+=displacement;',
    '  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);',
    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform float uTime;uniform vec2 uMouse;',
    'float vignette(vec2 uv,float r,float s){return smoothstep(r,r-s,distance(uv,vec2(0.5)));}',
    'float grain(vec2 uv,float t){return fract(sin(dot(uv,vec2(12.9898,78.233))+t)*43758.5453);}',
    'void main(){',
    '  vec2 uv=gl_FragCoord.xy/vec2(800.0,600.0);',
    '  vec3 deep=vec3(0.055,0.047,0.039);',
    '  vec3 mid=vec3(0.10,0.085,0.07);',
    '  vec3 light=vec3(0.16,0.14,0.12);',
    '  float e=uv.y;',
    '  vec3 c=mix(deep,mid,smoothstep(0.0,0.5,e));',
    '  c=mix(c,light,smoothstep(0.5,1.0,e));',
    '  vec3 bronze=vec3(0.61,0.49,0.33);',
    '  float am=smoothstep(0.35,0.5,e)*smoothstep(0.65,0.5,e);',
    '  c=mix(c,bronze,am*0.12);',
    '  float mg=smoothstep(0.5,0.0,distance(uv,uMouse))*0.08;',
    '  c+=vec3(mg);',
    '  c*=vignette(uv,0.7,0.5);',
    '  c+=grain(uv*500.0,uTime*0.5)*0.04;',
    '  c+=sin(uv.y*600.0)*0.01;',
    '  gl_FragColor=vec4(c,1.0);',
    '}'
  ].join('\n'),

  init: function() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    try {
      this.clock = new THREE.Clock();
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x0E0E0E, 0.008);
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, 0, 5);

      this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);

      var geometry = new THREE.PlaneGeometry(8, 6, 64, 64);
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

      this.scene.add(new THREE.AmbientLight(0x1a1a1a, 0.5));
      this.pointLight = new THREE.PointLight(0x9A7C52, 1.5, 15);
      this.pointLight.position.set(2, 2, 4);
      this.scene.add(this.pointLight);

      var self = this;
      window.addEventListener('mousemove', function(e) {
        self.targetMouse.x = e.clientX / window.innerWidth;
        self.targetMouse.y = 1.0 - e.clientY / window.innerHeight;
      });
      window.addEventListener('resize', function() { self.onResize(); });

      this.isReady = true;
    } catch (e) {
      console.warn('WebGL hero failed:', e);
      canvas.style.display = 'none';
    }
  },

  animate: function() {
    if (!this.isReady) return;
    var self = this;
    this.animFrameId = requestAnimationFrame(function() { self.animate(); });

    var elapsed = this.clock.getElapsedTime();
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.02;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.02;

    this.material.uniforms.uTime.value = elapsed;
    this.material.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);

    var target = 0.02;
    this.material.uniforms.uAmplitude.value += (target - this.material.uniforms.uAmplitude.value) * 0.005;

    var lx = (this.mouse.x - 0.5) * 6;
    var ly = (this.mouse.y - 0.5) * 4;
    this.pointLight.position.x += (lx - this.pointLight.position.x) * 0.03;
    this.pointLight.position.y += (ly - this.pointLight.position.y) * 0.03;

    this.camera.position.x += (this.mouse.x * 0.3 - this.camera.position.x) * 0.02;
    this.camera.position.y += (this.mouse.y * 0.2 - this.camera.position.y) * 0.02;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  },

  onResize: function() {
    if (!this.isReady) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
};
