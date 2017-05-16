class TopNav extends MLP.apps.MLPModule {

  // defaults() {
  //   this.defaults = {
  //     property: 'foo'
  //   };
  // }

  init() {
    super.init();
    this.el = {
      navItems: this.el.target.find('a'),
    };
    this.event();
  }

  event(){
    var _this = this;
    this.el.navItems.on('click', function(){
      _this.el.navItems.removeClass('active');
      $(this).addClass('active');
    });
  }
}
$.mlpPlugin(TopNav, 'TopNav', false);