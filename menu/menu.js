steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .css('menu',
    'jquery-ui')
  .resources(
    'jquery-ui.min')            // http://jqueryui.com/download
  .views(
    '//util/menu/views/init.ejs',
    '//util/menu/views/show_each.ejs')
  .then(function() {

$.Controller.extend('Util.Menu',
/* @static */
{
  /**
   * Default options:
   */
  defaults: {
    'map': null,
    offset: 0
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var self = this,
        active = false,
        mouse_in;

    // hack to fix this.view
    window.Util.Menu = {};

    // Menu

    // Starter
    this.element
      .bind('hide', this.callback('hide'))
      .hover(function(){ 
        mouse_in = true; 
      }, function(){ 
        mouse_in = false; 
      })
      .click(function(ev) {
        if(!active) {
          ev.preventDefault();
          active = true;
          self.show.call(self);
        }
      });

    // Outside
    $(document).click(function(ev) {
      if(active && !mouse_in) {
        self.hide.call(self);
        active = false;
      }
    });
  },

  /**
   *
   */
  show: function() {
    var self = this;
    this.menu_el = $(this.view('init'));

    $.map(this.options.map, function(value, key) {
      self.append.call(self, key, value);
    });

    var pos = $.extend({}, this.element.offset(), {
        width: this.element[0].offsetWidth,
        height: this.element[0].offsetHeight
    });

    var actualWidth = this.menu_el[0].offsetWidth,
        actualHeight = this.menu_el[0].offsetHeight;

    var tp = {top: pos.top + pos.height + this.options.offset, left: pos.left};

    this.menu_el
    .css($.extend(tp, {
      'position':'absolute',
      'overflow-x':'hidden', 'overflow-y':'auto',
       display:'block'
    }))
    .menu({
      selected: function(ev, ui) {
        self.element.triggerHandler('selected', ui.item.data('value'));
        self.close.call(self);
      }
    })
    .appendTo(document.body);

    this.element.triggerHandler('menu-created', [this.menu_el]);
  },

  /**
   *
   */
  append: function(name, value) {
    this.menu_el.append(
      $(this.view('show_each', {name: name}))
      .css({'white-space': 'nowrap'})
      .data('value', value)
    );
  },

  /**
   *
   */
  hide: function() {
    this.menu_el.fadeOut('fast', function() {
      $(this).remove();
    });
  },
  
  /**
   *
   */
  close: function() {
    this.menu_el.remove();
  }
}
);

});
