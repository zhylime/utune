# Create modules using the following template.
#
# Usage:
# $('[data-js-module-name]').ModuleName({ property: 'not-foo' });
# $('[data-js-module-name]').ModuleName('print', 'Hello, world');

class ModuleName extends MLP.apps.MLPModule
  defaults:
    property: 'foo'

  init: ->
    @el.click ->
      return false

  print: (echo) ->
    console.log(@ops.property + ': ' + echo)

$.mlpModule(ModuleName, 'ModuleName')