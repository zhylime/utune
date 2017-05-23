class Galaxy extends MLP.apps.MLPModule
  defaults:
    size: 
      w: window.innerWidth
      h: null

    img:
      lens: MLP.paths.img + 'thumb-lensflare-200x200.png'
      smoke: MLP.paths.img + 'thumb-smoke.png'

  init: ->
    super()

    @klass.shooter = 'c-galaxy__shooter'

    @sel.shooter =
      l: '.js-galaxy__shooter--l'
      r: '.js-galaxy__shooter--r'

    @createScene()
    @render()
    @animate()

  randInt: (min, max) ->
    return (~~((Math.random()*max)+min))
  
  getHeight: ->
    @el.target.height() || @ops.size.h

  createScene: ->
    @clock = new THREE.Clock()
    @scene = new THREE.Scene()
    @camera = new THREE.PerspectiveCamera( 75, @ops.size.w / @getHeight(), 0.1, 1000 )

    @renderer = new THREE.WebGLRenderer({ alpha: true})
    @renderer.setSize( @ops.size.w, @getHeight() )
    @renderer.setClearColor( 0x001f28, 0 )
    @el.target.append( @renderer.domElement )

  render: ->
    @particles()
    @shooters()

  shooters: =>
    shooters = ['l', 'r']
    i = @randInt(0, 2)
    key = shooters[i]
    shooter = @klass.shooter+'--'+shooters[i]
    @el.target.find(@sel.shooter[key]).addClass(shooter)

    time = @randInt(4000, 5000)
    clearTimeout(@timeHandler)
    @timeHandler = setTimeout (=>
      @el.target.find(@sel.shooter[key]).removeClass(shooter)
      @shooters()
    ), time

  particles: ->
    particles = new THREE.Geometry
    p = 0
    while p < 15000
      particle = new (THREE.Vector3)(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250)
      particles.vertices.push particle
      p++

    particleTexture = THREE.ImageUtils.loadTexture(@ops.img.lens)
    particleMaterial = new THREE.PointCloudMaterial({ map: particleTexture, transparent: true, size: .8 })
    @particleSystem = new THREE.PointCloud(particles, particleMaterial)

    @scene.add(@particleSystem)

  animate: =>
    requestAnimationFrame(@animate)
     
    delta = @clock.getDelta() * .03
    @particleSystem.rotation.y += delta
     
    @renderer.render(@scene, @camera)


$.mlpModule(Galaxy, 'Galaxy')