class WhiteBox extends MLP.apps.MLPModule {

  // defaults() {
  //   this.defaults = {
  //     property: 'foo'
  //   };
  // }

  init() {
    super.init();
    this.el = {
      canvas: this.el.target.find('canvas'),
      content: this.el.target.find('.js-white-box-content'),
      title: this.el.target.find('h1'),
    };
    this.event();
  }

  event(){
    var _this = this;
    this.drawWhiteBox();

    $(window).resize(function(){
      _this.drawWhiteBox();
    })


  }

  drawWhiteBox(){
    var canvas = $(this.el.canvas);
    var screenH = $(window).height();
    var screenW = $(window).width();

    canvas.attr('height', screenH);
    canvas.attr('width', screenW);

    var spaceLeftRight = 40;
    var spaceUpDown = 80;
    var titleMarginBottom = 100;
    var lineWidth = 3;


    var x0 = $(this.el.title).offset().left - spaceLeftRight;
    var y0 = $(this.el.title).offset().top + $(this.el.title).height()/2;

    var x1 = $(this.el.content).offset().left - spaceLeftRight;
    var y1 = y0;

    var x2 = x1;
    var y2 = y1 + $(this.el.content).height() + $(this.el.title).height()/2 + titleMarginBottom + spaceUpDown;
    
    var x3 = $(this.el.content).offset().left + $(this.el.content).width() + spaceUpDown;
    var y3 = y2;

    var x4 = x3;
    var y4 = y1;

    var x5 = $(this.el.title).offset().left + $(this.el.title).width() + spaceLeftRight;
    var y5 = y0;

    var r = 7;
    

    var context = canvas[0].getContext('2d');

    // Draw White Box
    context.lineWidth = lineWidth;
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    context.lineTo(x5, y5);
    context.stroke();

    // Draw left dot
    context.beginPath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.fillStyle = 'rgb(255, 255, 255)';

    context.arc(x0, y0, r, 0, Math.PI*2, false);

    context.stroke();
    context.fill();

    // Draw right dot
    context.beginPath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.fillStyle = 'rgb(255, 255, 255)';

    context.arc(x5, y5, r, 0, Math.PI*2, false);
    
    context.stroke();
    context.fill();
  }
}
$.mlpPlugin(WhiteBox, 'WhiteBox', false);