class SideNav extends MLP.apps.MLPModule {


  init() {
    super.init();
    this.el = {
      navBtn: this.el.target.find('.js-hamburger'),
      menuPanel: this.el.target.find('.js-panel')
    };
    this.event();
  }

  event(){
    var _this = this;
    

    this.initMenuPanel();


    
    
  }

  initMenuPanel(){
    var _this = this;

    var toggleLeft;


    this.el.navBtn.on('click', function(){
      toggleLeft = $(_this.el.menuPanel).css('left') == '-400px' ? '0' : '-400px';
      $(this).children('div').eq(0).toggleClass('active');
      $(_this.el.menuPanel).animate({
        left: toggleLeft
      });
    });

  }
}
$.mlpPlugin(SideNav, 'SideNav', false);