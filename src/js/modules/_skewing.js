class Skewing extends MLP.apps.MLPModule {
  init() {
    super.init();
    this.el = {
      _hills: this.el.target.find('.hill'),
      "scale":0.3,
      "x":0,
      "y":0,
      "direction":0.2,
      "windowX":0,
      "winWidth":0
    };
    this.el.winWidth = $(document).width();
    this.el.windowX = this.el.winWidth/2;
    this.event();
  }

  event(){
    var _this = this;
    $(document).on('mousemove',function (evt) {
      $(_this.el._hills).each(function (index,item) {
        _this.el.x = -(evt.pageX-_this.el.windowX)*_this.el.scale*_this.el.direction*(index-1.8);
        $(item).css({"transform":"translateX("+_this.el.x+"px)"});
      });
    });
  }
}
$.mlpPlugin(Skewing, 'Skewing', false);