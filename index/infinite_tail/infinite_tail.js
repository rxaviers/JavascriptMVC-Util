steal(
'jquery/controller',
function() {

$.Controller.extend('Util.Index.InfiniteTail',
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
    id: 'id',
    initial_tail_id: null,
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
        tail_id = this.options.initial_tail_id;

    // Find
    this.element
      .bind(this.options.bind.find, function(ev, callback) {
        self.options.find(tail_id, callback);
      })
      .bind(this.options.bind.more, function(ev, items) {
        if(items.length > 0) {
          self.element.triggerHandler(self.options.trigger.insertion, [items]);
          tail_id = items[items.length-1][self.options.id];
        }
        return items.length > 0;
      });
  }
}
);

});
