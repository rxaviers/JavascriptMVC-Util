steal.plugins(
  'jquery/controller',
  'util/more')
  .css()
  .views()
  .then(function() {

$.Controller.extend('Util.Index.InfiniteScroll',
/* @static */
{
  defaults: {
    find: false  // required
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var self = this,
        page = 1;

    this.element.more({
      more_text:'',
      find: function(callback) {
        self.options.find(page, callback);
      },
      more: function(items) {
        var stats = items.pop(),
            remaining_pages = stats.remaining_pages;

        self.element.triggerHandler('append', [items]);

        page++;
        return remaining_pages > 0 ? true : false;
      }
    });
  }
}
);

});
