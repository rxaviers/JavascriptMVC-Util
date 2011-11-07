steal(
'jquery/controller',
function() {

$.Controller.extend('Util.Index.InfinitePage',
/* @static */
{
  /**
   * See infinite_common defaults
   */
  defaults: {
    bind: {
      find: 'find',
      more: 'more'
    },
    trigger: {
      insertion: 'append'
    },
    find: null // Required
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(more_call, more_options) {
    var self = this,
        page = 1;

    // Find
    this.element
      .bind(this.options.bind.find, function(ev, callback) {
        self.options.find(page, callback);
      })
      .bind(this.options.bind.more, function(ev, items) {
        var stats = items.pop(),
            remaining_pages = stats.remaining_pages;

        self.element.triggerHandler(self.options.trigger.insertion, [items]);

        page++;
        return remaining_pages > 0 ? true : false;
      });
  }
}
);

});
