/*
# Create plugins using the following template.
#
# Usage:
# $('[data-js-plugin-name]').PluginName({ property: 'not-foo' });
# $('[data-js-plugin-name]').PluginName('print', 'Hello, world');
*/

class PluginName extends MLP.apps.MLPModule {

  defaults() {
    this.defaults = {
      property: 'foo'
    };
  }

  init() {
    super.init();
    return this.el.click(() => false);
  }

  print(echo) {
    return console.log(`${this.ops.property}: ${echo}`);
  }
}
$.mlpPlugin(PluginName, 'PluginName');