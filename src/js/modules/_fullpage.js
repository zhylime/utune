/*
# extends jquery.fullpage.js, scrolloverflow.js
#

*/

class FullPage extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el = {
      fullpageContainer: this.el.target,
      navItems: $('[data-js-top-nav]').find('a')
    };

    this.event();
  }

  event(){
    var _this = this;
    this.el.fullpageContainer.fullpage({
      'navigation': true,
      'scrollOverflow': true,
      afterLoad: function(anchor, index){
        var _index = index - 1;
        var navLong = $(_this.el.navItems).length;
        $(_this.el.navItems).removeClass('active'); 
        
        // 前两个section 分别对应前两个导航active
        if(_index < 2){
          
          $(_this.el.navItems[_index]).addClass('active');
        }

        // 最后一个section 导航倒数第二个加active
        else if(_index == navLong){
          _index -= 2;
          $(_this.el.navItems[_index]).addClass('active');
        }

        else{
          _index -= 1;
          $(_this.el.navItems[_index]).addClass('active');
        }
        
      }
    });

    // next button
    $('.js-fullpage-next-button').on('click', function(){
      $.fn.fullpage.moveSectionDown();
    });

    // 点击nav页面滚动到特定section
    this.el.navItems.each(function(index){
      var _index = index + 1;
      $(this).on('click', function(){
        $.fn.fullpage.moveTo(_index);
      });
    });






  }
}
$.mlpPlugin(FullPage, 'FullPage', false);