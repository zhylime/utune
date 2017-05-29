class Stars extends MLP.apps.MLPModule {
  init() {
    super.init();
    this.event();
  }

  event(){
    var _canvasId = this.el.target.find("canvas").attr("id"),
      _canvas = document.getElementById(_canvasId),
      _ctx;
    if(_canvas){
      _ctx = _canvas.getContext("2d");
      _canvas.width = window.innerWidth;
      _canvas.height = window.innerHeight;
      var stars = [],
        FPS = 30,
        x = _canvas.width;
      for (var i = 0; i < x; i++) {
        stars.push({
          x: Math.random() * _canvas.width,
          y: Math.random() * _canvas.height,
          radius: Math.random(),
          vx: Math.floor(Math.random() * 10) - 5,
          vy: Math.floor(Math.random() * 10) - 5
        });
      }
      tick();
    }
    function draw() {
      _ctx.clearRect(0,0,_canvas.width,_canvas.height);
      _ctx.globalCompositeOperation = "lighter";
      for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
        _ctx.fillStyle = "#fff";
        _ctx.beginPath();
        _ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        _ctx.fill();
      }
    }
    function update() {
      for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;
        if (s.x < 0 || s.x > _canvas.width) s.x = -s.x;
        if (s.y < 0 || s.y > _canvas.height) s.y = -s.y;
      }
    }
    function tick(){
      draw();
      update();
      requestAnimationFrame(tick);
    }

  }
}
$.mlpPlugin(Stars, 'Stars', false);