steal.plugins(
  'jquery/controller')
  .then(function() {

$.Controller.extend('ContentHash',
/* @static */
{
  /**
   * Default options:
   */
  defaults: {
    set_ev: 'hash-set',                       // set content event
    show_ev: 'hash-show',                     // show content event
    clear_ev: 'hash-clear'                    // clear hash
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    this.content_els = {};

    this.element
      .html('')
      .bind(this.options.set_ev, this.callback('set'))
      .bind(this.options.show_ev, this.callback('show'))
      .bind(this.options.clear_ev, this.callback('clear'));
  },

  /**
   *
   */
  set: function(ev, key, el) {
    this.content_els[key] = el;
  },

  /**
   *
   */
  show: function(ev, key) {
    this.element.children().detach();
    this.element.html(this.content_els[key]);
  },

  /**
   *
   */
  clear: function(ev, key) {
    this.element.children().detach();
    this.content_els = {};
  }
}
);

});
