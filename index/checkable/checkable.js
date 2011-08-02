steal.plugins(
  'jquery/controller',
  'util/check_all',
  'util/checkbox')
  .css()
  .views()
  .then(function() {

$.Controller.extend('Util.Index.Checkable',
/* @static */
{
  defaults: {
    checkbox: {
      id: function(item_el) {return item_el.model().id;},
      container: 'td',
      name: 'items_id[]'
    },
    check_all: {
      el: false, // required
      info_el: false  // required
      // inherits Util.CheckAll options
    }
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var self = this;
    this.all_param = false;

    // Index
    this.element.bind('appended', function(ev, item_el) {
      item_el
        .each(function() {
          var $this = $(this);

          // Checkbox
          $this.util_checkbox({
            checked: self.all_param ? true : false,
            container_tag: self.options.checkbox.container,
            name: self.options.checkbox.name,
            value: self.options.checkbox.id($this)
          });
        })

        // Check click
        .find('input[type=checkbox]').click(function() {
          self.setAllParam.call(self, false);
          self.options.check_all.info_el.html('');
        });
      })

    // Check all
    this.options.check_all.el
      .bind('check_all_visible', function(ev, check) {
        self.find('input[type=checkbox]').attr('checked', check);
        if(!check) {
          self.setAllParam.call(self, false);
        }
      })
      .bind('check_all', function(ev, key) {
        self.setAllParam.call(self, {all:true});
      })
      .util_check_all(this.options.check_all);
  },

  /**
   *
   */
  setAllParam: function(value) {
    this.all_param = value;
    this.element.triggerHandler('checkall-param-change', [this.all_param]);
  }
}
);

});
