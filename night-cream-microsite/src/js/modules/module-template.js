/*
# Create module using the following template.
#
# Usage:
# $('[data-js-module-name]').ModuleName({ property: 'not-foo' });
# $('[data-js-module-name]').ModuleName('print', 'Hello, world');
*/

class ModuleName extends MLP.apps.MLPModule {

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
$.mlpModule(ModuleName, 'ModuleName');