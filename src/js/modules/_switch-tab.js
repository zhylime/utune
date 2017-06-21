class SwitchTab extends MLP.apps.MLPModule {
  init() {
    super.init();
    this.el = {
      _tabs: this.el.target.find('li')
    };
    this.event();
  }

  event(){
    var _this = this, _currnetIndex;
    $(_this.el._tabs).on("mouseover", function(){
      _currnetIndex = $(this).index()+1;
      $(_this.el._tabs).each(function(index,item){
        var _index = index+1;
        $(item).find(".c-homepage__tab-panel__button").removeClass("active");
        $(".c-homepage__tab-"+_index).addClass("outPanel");
        $(".c-homepage__tab-"+_index).removeClass("inPanel");
      });
      $(this).find(".c-homepage__tab-panel__button").addClass("active");
      $(".c-homepage__tab-"+_currnetIndex).addClass("inPanel");
      $(".c-homepage__tab-"+_currnetIndex).removeClass("outPanel");

      // tab2 trigger mirror light
      if($('.c-homepage__tab-2').hasClass('inPanel')){
        $('.js-mirror-light').addClass('active');
      }
    });
  }
}
$.mlpPlugin(SwitchTab, 'SwitchTab', false);