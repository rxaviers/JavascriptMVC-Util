steal.plugins(
  'jquery/controller')
  .then(function() {

$.Controller.extend('Undo',
/* @static */
{
  /**
   * Default options:
   */
  defaults: {
    counter_class: 'count',
    count: 4,
    total_time: 12000
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    this.count = this.options.count;
    this.tick_time = this.options.total_time / this.count;
    this.count_el = this.find('.' + this.options.counter_class);

    this.count_el.html(this.count);

    // Set undo timeout:
    this.undoTimeout = window.setTimeout(this.options.callback,
          this.options.total_time);

    // Set counter tick:
    this.setDecrCounter();

    this.element.bind('abort', this.callback('abort'));
  },

  /**
   *
   */
  setDecrCounter: function() {
    this.counterTick = window.setTimeout(this.callback('decrCounter'),
          this.tick_time);
  },

  /**
   *
   */
  decrCounter: function() {
    this.count--;
    this.count_el.html(this.count);
    if(this.count == 1) {
      this.element.css({opacity: 0.3});
    }
    if(this.count >= 0) {
      this.setDecrCounter();
    }
  },

  /**
   *
   */
  abort: function() {
    window.clearTimeout(this.undoTimeout);
    window.clearTimeout(this.counterTick);
  }
}
);

});
