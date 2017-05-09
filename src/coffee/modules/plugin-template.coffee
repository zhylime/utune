# Create plugins using the following template.
#
# Usage:
# $('[data-js-plugin-name]').PluginName({ property: 'not-foo' });
# $('[data-js-plugin-name]').PluginName('print', 'Hello, world');

class PluginName extends MLP.apps.MLPModule
  defaults:
    property: 'foo'

  init: ->
    @el.click ->
      return false

  print: (echo) ->
    console.log(@ops.property + ': ' + echo)

$.mlpPlugin(PluginName, 'PluginName')