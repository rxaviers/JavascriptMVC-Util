steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .views(
    '//util/check_all/views/check_all.ejs',
    '//util/check_all/views/checked_all.ejs')
  .then(function() {

$.Controller.extend('Util.CheckAll',
/* @static */
{
  defaults: {
    /**
     * @param {jQuery} stats_el (optional)
     * Element used to show messages.
     */
    stats_el: null,
    
    /**
     * @param {Integer} all_count (optional)
     * All count number.
     */
    all_count: null,
    
    /**
     * @param {String} all_count_text (optional)
     * Text to check all items.
     */
    all_count_text: null,
    
    /**
     * @param {Integer} all_checked_text (optional)
     * Text to let user know all items have been checked.
     */
    all_checked_text: null,
    
    /**
     * @param {Function} checked_count (required if stats_el)
     * checked_count is a function that returns the current checked count
     * number.
     */
    checked_count: function() {},

    /**
     * @param {Function} checked_count_text (required if stats_el)
     * Text to let user know how many items have been checked.
     */
    checked_count_text: function() {},

    /**
     * @param {String} clear_selection_text (required if stats_el)
     * Text to clear selection.
     */
    clear_selection_text: null
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var self = this,
        stats_el = this.options.stats_el,
        all_count = this.options.all_count,
        all_count_text = this.options.all_count_text,
        all_checked_text = this.options.all_checked_text,
        checked_count = this.options.checked_count,
        checked_count_text = this.options.checked_count_text,
        clear_selection_text = this.options.clear_selection_text,
        check_all_checkbox_el;

    check_all_checkbox_el = this.element.filter('input[type=checkbox]');
    if(check_all_checkbox_el.length == 0) {
      check_all_checkbox_el = this.find('input[type=checkbox]');
    }

    // hack to fix this.view
    window.Util.CheckAll = {};

    // Check all
    this.element.click(function() {
      var $this = $(this),
          check = !check_all_checkbox_el.attr('checked');

      check_all_checkbox_el.attr('checked', check);
      self.element.triggerHandler('check', [check]);

      if(check) {
        stats_el.html(self.view('check_all', {
          all_count: all_count,
          all_count_text: all_count_text,
          checked_count: checked_count(),
          checked_count_text: checked_count_text(checked_count())
        }));
        function clear(ev) {
          ev.preventDefault();
          check_all_checkbox_el.attr('checked', false);
          self.element.triggerHandler('check', [false]);
          stats_el.html('');
          all_param = false;
        }
        stats_el.find('.all').click(function(ev) {
          ev.preventDefault();
          stats_el.html(self.view('checked_all', {
            all_checked_text: all_checked_text,
            clear_selection_text: clear_selection_text
          }));
          stats_el.find('.clear').click(clear);
          self.element.triggerHandler('check_all');
        });
        stats_el.show();
      }
      else {
        stats_el.html('');
      }
    });
  }
}
);

});
