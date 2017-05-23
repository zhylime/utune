###
  Loads backgrounds via JS. (Useful for CMS type sites which need to control background images.)
  Usage: div(data-js-bg-loader='$url', data-bg-mobile='$url2')
###

class BgLoader extends MLP.apps.MLPModule
  defaults:
    screen: 
      mobile: MLP.config.mobile || 767
    bg: {}

  init: ->
    $(window).bind 'resize orientationchange', (e) =>
      @setBackground()

    @setBackground()

  getEl: ->
    selector = @el.target.data('bg-selector')
    if selector then $(selector) else @el.target

  setBackground: ->

    if $(window).width() <= @ops.screen.mobile
      bg = @getBackground('bg-mobile')

    if !bg 
      bg = @getBackground()

    if bg
      @getEl().css 
        'background-image': "url('"+bg+"')"

  getBackground: (key = 'js-bg-loader') ->
    bg = @el.target.data key
    if bg then bg else @ops.bg[key]


$.mlpModule(BgLoader, 'BgLoader', true)