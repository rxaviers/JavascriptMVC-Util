steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .views(
    '//util/check_all/views/checked_all_visible.ejs',
    '//util/check_all/views/checked_all.ejs')
  .then(function() {

$.Controller.extend('Util.CheckAll',
/* @static */
{
  defaults: {
    /**
     * @param {jQuery} info_el (optional)
     * Element used to show messages.
     */
    info_el: null,
    
    /**
     * @param {Function} all_visible_checked_text (required if info_el)
     * Text to let user know that all visible items have been checked.
     */
    all_visible_checked_text: function() {},

    /**
     * @param {Hash} check_all_texts (required if info_el)
     * Hash mapping all relations { key : select-all-text }
     */
    check_all_texts: {},
    
    /**
     * @param {Function} all_checked_text (optional)
     * Text to let user know that all existing items (or whatever criteria) have
     * been checked.
     * @param {Function} all
     * The all_checked_text function receives the all-key as 1st argument.
     */
    all_checked_text: function(all) {},
    
    /**
     * @param {String} clear_selection_text (required if info_el)
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
        info_el = this.options.info_el,
        o = this.options,
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
      self.element.triggerHandler('check_all_visible', [check]);

      if(check) {
        info_el.html(self.view('checked_all_visible', {
          all_visible_checked_text: o.all_visible_checked_text(),
          check_all_texts: o.check_all_texts
        }));
        function clear(ev) {
          ev.preventDefault();
          check_all_checkbox_el.attr('checked', false);
          self.element.triggerHandler('check_all_visible', [false]);
          info_el.html('');
          all_param = false;
        }
        info_el.find('.all').click(function(ev) {
          var all = $(this).data('all');
          ev.preventDefault();
          info_el.html(self.view('checked_all', {
            all_checked_text: o.all_checked_text(all),
            clear_selection_text: o.clear_selection_text
          }));
          info_el.find('.clear').click(clear);
          self.element.triggerHandler('check_all', [all]);
        });
        info_el.show();
      }
      else {
        info_el.html('');
      }
    });
  },

  setOptions: function(options) {
    $.extend(this.options, options);
  }
}
);

});
