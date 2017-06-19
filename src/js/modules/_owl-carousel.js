/*
# extends own.carousel.js
#

*/

class OwlCarousel extends MLP.apps.MLPModule {

  init() {
    super.init();

    this.el = {
      container: this.el.target,
      prevBtn: $('.js-carousel-prev'),
      nextBtn: $('.js-carousel-next')
    };

    this.event();
  }

  event(){
    var _this = this;
    var _screenHeight = $(window).height();
    this.el.container.owlCarousel({
      dots: false,
      responsiveClass: true,
      items: 4
      // responsive:{
      //   0:{
      //     items:1
      //   },
      //   720:{
      //     items:2
      //   },
      //   768:{
      //     items:2
      //   },
      //   960:{
      //     items:3
      //   },
      //   1200:{
      //     items:4
      //   }
      // }
    });

    $('.owl-item').css('height',_screenHeight);

    // nav arrows
    this.el.prevBtn.on('click', function(){
      $(_this.el.container).trigger('prev.owl.carousel');
    });

    this.el.nextBtn.on('click', function(){
      $(_this.el.container).trigger('next.owl.carousel');
    });


  }
}
$.mlpPlugin(OwlCarousel, 'OwlCarousel', false);