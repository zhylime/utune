

class GalleryPopup extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.el.btns = $('.js-popup-btn');
    this.el.gallery = $('.js-gallery-images');
    this.el.cover = $('.js-gallery-cover');
    this.el.close = $('.js-gallery-close');
    this.el.carousel = $('.gallery-carousel');
    this.el.carouselPrev = $('.js-carousel-prev');
    this.el.carouselNext = $('.js-carousel-next');

    this.event();

  }

  event(){
    var _this = this;

    this.el.carousel.owlCarousel({
      dots: false,
      items: 1,
      smartSpeed: 0,
      loop: true
    });

    this.el.gallery.hide();
    
    this.el.btns.each(function(index){
      $(this).on('click', function(e){
        e.preventDefault();
        var num = index;
        console.log(num);
        _this.openPopup(num);
      });
    });

    this.el.close.on('click', function(){
      _this.closePopup();
    });

    this.el.carouselPrev.on('click', function(){
      console.log('clicked');
      _this.el.carousel.trigger('prev.owl.carousel');
      // _this.goPrev();
    });

    this.el.carouselNext.on('click', function(){
      _this.el.carousel.trigger('next.owl.carousel');
      // _this.goNext();
    })




  }

  openPopup(num){
    var _this = this;
    var _top = $(window).scrollTop();
    var _height = $(window).height();
    

    this.el.carousel.trigger('to.owl.carousel',num);

    this.el.cover.css({
      top: _top,
      height: _height
    });
    this.el.gallery.css({
      top:_top+_height*0.1,
      height: _height*0.8
    });

    $('body').css({
      'overflow-y': 'hidden'
    });

    this.el.cover.show();
    this.el.gallery.show();




  }

  closePopup(){
    var _this = this;
    this.el.cover.hide();
    this.el.gallery.hide();
    $('body').css({
      overflow: 'auto'
    });
  }

  goPrev(){
    console.log('prev');
    this.el.carousel.trigger('prev.owl.carouse');
  }

  goNext(){
    console.log('next');
    this.el.carousel.trigger('next.owl.carouse');
  }
}
$.mlpPlugin(GalleryPopup, 'GalleryPopup', false, false);