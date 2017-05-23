###
  @depends slick slider
  Usage:
    .c-carousel(data-js-carousel)
      .c-carousel__slide Slide 1
      .c-carousel__slide Slide 2
      .c-carousel__slide Slide 3
###

class Carousel extends MLP.apps.MLPModule
  init: ->
    super()
    @el.next = @el.target.find('.js-next')
    @el.prev = @el.target.find('.js-prev')

    _this = @

    MLP.instances.slick = this.el.target.slick(
      'autoplay': true
      'autoplaySpeed': 3000
      'speed': 1000
      'dots': this.el.target.data('has-dots')
      'infinite': true
      'variableWith': true
      'slidesToShow': 1
      'prevArrow': '<div class="c-parallax__prev c-parallax__btn"><img data-role="none" alt="previous" src="' + this.el.target.data('btn-prev') + '"> </div>'
      'nextArrow': '<div class="c-parallax__next c-parallax__btn"><img data-role="none" alt="next" src="' + this.el.target.data('btn-next') + '"> </div>')


$.mlpModule(Carousel, 'Carousel')