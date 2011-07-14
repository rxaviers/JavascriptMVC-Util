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
    undo_class: 'undo',
    count: 4,
    total_time: 12000
  }
},
/* @prototype */
{
  /**
   * @param {Object} options: {
   *   ['do']: optional A callback function called when timeout is reached.
   *   ['undo']: optional A callback function called when aborted.
   *   ['finally']: optional A callback function called anyway after do or undo.
   * }
   */
  init: function(el, options) {
    this.count = this.options.count;
    this.tick_time = this.options.total_time / this.count;
    this.count_el = this.find('.' + this.options.counter_class);

    this.count_el.html(this.count);

    // Set undo timeout:
    this.undoTimeout = window.setTimeout(this.callback('do'),
          this.options.total_time);

    // Set counter tick:
    this.setDecrCounter();

    this.element.bind('abort', this.callback('abort'));
    this.find('a.' + this.options.undo_class).click(function(ev) {
      ev.preventDefault();
      $(this).trigger('abort');
    });
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
  'do': function() {
    if(this.options['do']) {
      this.options['do']();
    }

    this['finally'](); 
  },

  /**
   *
   */
  'finally': function() {
    this.element.fadeOut('fast', function() {
      $(this).remove();
    });

    if(this.options['finally']) {
      this.options['finally']();
    }
  },

  /**
   *
   */
  abort: function() {
    window.clearTimeout(this.undoTimeout);
    window.clearTimeout(this.counterTick);

    if(this.options.undo) {
      this.options.undo();
    }

    this['finally'](); 
  }
}
);

});
