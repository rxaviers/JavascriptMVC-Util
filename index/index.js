steal(
'jquery/controller',
'util/index/infinite_scroll',
function() {

$.Controller.extend('Util.Index',
/* @static */
{
  defaults: {
    array: false,
    infinite_scroll: false 
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    // Data
    if(this.options.array) {
      // Local data:
      this.element.triggerHandler('append', [this.options.array]);
    }
    else if(this.options.infinite_scroll) {
      // Server data:
      this.element.util_index_infinite_scroll({
        find: this.options.infinite_scroll
      });
    }
  }
}
);

});
