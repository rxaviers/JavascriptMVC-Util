steal(
'jquery/controller',
'util/index/infinite_page',
'util/index/infinite_head',
'util/index/infinite_tail',
function() {

$.Controller.extend('Util.Index',
/* @static */
{
  /**
   * Required to pick `array` or an `infinite_<any>` option.
   */
  defaults: {
    array: false,
    infinite_page: false,
    infinite_head: false,
    infinite_tail: false
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
    else {
      // Server data:
      if(this.options.infinite_page) {
        this.element.util_index_infinite_page(this.options.infinite_page);
      }
      else if(this.options.infinite_head) {
        this.element.util_index_infinite_head(this.options.infinite_head);
      }
      else if(this.options.infinite_tail) {
        this.element.util_index_infinite_tail(this.options.infinite_tail);
      }
    }
  }
}
);

});
