###
  Auto formats phone/fax number for mobile.
  Usage:
    a(data-js-intent='tel:0354618432', href='#') 03-5461-8432
    meta(name='format-detection', content='telephone=no')
###
class Intent extends MLP.apps.MLPModule
  defaults:
    screen: 
      mobile: MLP.config.mobile || 767

  init: ->
    super()
    @events()
    @format()

  events: ->
    $(window).bind 'resize orientationchange', (e) =>
      @format()

  contains: (haystack) ->
    @intent.indexOf(haystack) > -1

  formatFax: ->
    $anchors = @el.target.find('a')
    if $anchors.length 
      $anchors.addClass('link-fax')
      $anchors.removeAttr('href')

  formatPhone: ->
    if @width <= @ops.screen.mobile
      @el.target.attr('href', @intent)
    else 
      @el.target.removeAttr('href')

  format: ->
    @width = $(window).width()
    @intent = @el.target.data 'js-intent'
    if @intent
      if @contains('tel')
        @formatPhone()

      if @contains('fax')
        @formatFax()
      

$.mlpModule(Intent, 'Intent', true)