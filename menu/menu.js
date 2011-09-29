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
        mouse_in = true;

    // hack to fix this.view
    window.Util.Menu = {};

    this.onBlur = function(ev) {
      if(self.active && !mouse_in) {
        self.hide.call(self);
      }
    }

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
        ev.preventDefault();
        if(self.active) {
          self.hide.call(self);
        }
        else {
          self.show.call(self);
        }
      });
  },

  /**
   *
   */
  show: function() {
    var self = this;
    this.active = true;
    this.menu_el = $(this.view('init'));

    $(document).click(this.onBlur);

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
    var maxHeight = $(window).height() - (tp.top - $(window).scrollTop());

    this.menu_el
    .css($.extend(tp, {
      'position':'absolute',
      'overflow-x':'hidden', 'overflow-y':'auto',
      'max-height': maxHeight + 'px',
       display:'block'
    }))
    .bind('menuselect', function(ev, ui) {
      ev.preventDefault();
      self.element.triggerHandler('selected', ui.item.data('value'));
      self.close.call(self);
    })
    .menu()
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
    this.active = false;

    $(document).unbind('click', this.onBlur);

    this.menu_el.fadeOut('fast', function() {
      $(this).remove();
    });
  },
  
  /**
   *
   */
  close: function() {
    this.active = false;

    $(document).unbind('click', this.onBlur);

    this.menu_el.remove();
  }
}
);

});
