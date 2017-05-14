/*
# extends masonry.pkgb.js
#

*/

class MasonryGallery extends MLP.apps.MLPModule {

  init() {
    super.init();

    this.event();
  }

  event(){
    var _this = this;
    this.el.target.masonry({
      columnWidth: 0,
      itemSelector: '.c-masonry-gallery__item'
    });




  }
}
$.mlpPlugin(MasonryGallery, 'MasonryGallery', false);