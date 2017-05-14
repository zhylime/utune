/*
# extends jquery.fullpage.js, scrolloverflow.js
#

*/

class FullPage extends MLP.apps.MLPModule {

  init() {
    super.init();

    this.event();
  }

  event(){
    var _this = this;
    this.el.target.fullpage({
      'navigation': true,
      'scrollOverflow': true,
      'anchors': ['homepage', 'what-we-do', 'about-us', 'contact', 'mall']
    });


    $('.js-fullpage-next-button').on('click', function(){
      $.fn.fullpage.moveSectionDown();
    });


  }
}
$.mlpPlugin(FullPage, 'FullPage', false);