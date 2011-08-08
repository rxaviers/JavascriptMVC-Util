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
    ready_ev: 'hash-ready',                   // ready event
    phaseOut: function(el) {
        return el.hide();
      },
    phaseIn: function(el) {
        return el.show();
      }
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
    .bind(this.options.set_ev, this.callback('set'))
    .bind(this.options.show_ev, this.callback('show'));
    this.phaseIn = this.options.phaseIn;
    this.phaseOut = this.options.phaseOut;
  },

  /**
   *
   */
  set: function(ev, key, el) {
    if(this.content_els[key]) {
      this.content_els[key].remove();
    }
    this.content_els[key] = el;
    this.element.append(el.hide());
  },

  /**
   *
   */
  show: function(ev, key) {
    this.phaseOut(this.element.children());
    this.phaseIn(this.content_els[key]);
    this.content_ready(key);
  },

  /**
   *
   */
  content_ready: function(key) {
    this.content_els[key]
    .trigger(this.options.ready_ev);
  }
}
);

});
