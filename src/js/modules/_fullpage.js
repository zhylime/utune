/*
# extends jquery.fullpage.js, jquery.slimscroll.js
#

*/

class FullPage extends MLP.apps.MLPModule {

  defaults() {
    this.defaults = {
      property: 'foo'
    };
  }

  init() {
    super.init();
    this.event();
  }

  event(){
    this.el.target.fullpage({
    // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
    'navigation': true,
    'scrollOverflow': true
  });
  }
}
$.mlpPlugin(FullPage, 'FullPage', false);