steal(
'jquery/controller',
function() {

$.Controller.extend('Util.Index.InfiniteHead',
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
      insertion: 'prepend'
    },
    id: 'id',
    initial_head_id: null,
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
        head_id = this.options.initial_head_id;

    // Find
    this.element
      .bind(this.options.bind.find, function(ev, callback) {
        self.options.find(head_id, callback);
      })
      .bind(this.options.bind.more, function(ev, items) {
        var stats = items.pop(),
            more = stats.more;

        self.element.triggerHandler(self.options.trigger.insertion, [items]);

        head_id = items[0][self.options.id];
        return more;
      });
  }
}
);

});
