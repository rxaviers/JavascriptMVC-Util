steal.plugins(
  'jquery/controller')
  .css()
  .views()
  .then(function() {

$.Controller.extend('Util.Resetable',
/* @static */
{
  defaults: {
    bind: 'reset',
    container: '<div/>'
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    this.element.bind(this.options.bind, this.callback('set'));
    this.set();
  },

  /**
   *
   */
  set: function() {
    if(this.options.container && this.options.container.length > 0) {
      var container_el = $(this.options.container);
      this.element
        .html(container_el)
        .triggerHandler('set', [container_el]);
    }
    else {
      this.element
        .html('')
        .triggerHandler('set', [this.element]);
    }
  }
}
);

});
