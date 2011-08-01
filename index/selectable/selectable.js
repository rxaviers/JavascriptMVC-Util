steal.plugins(
  'jquery/controller')
  .css('selectable')
  .views()
  .then(function() {

$.Controller.extend('Util.Index.Selectable',
/* @static */
{
  defaults: {
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var self = this;

    this.element.bind('appended', function(ev, item_el) {
      item_el.click(function(ev) {
        self.element.triggerHandler('selected', [ev, $(this)]);
      });
    });
  }
}
);

});
