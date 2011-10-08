steal.plugins(
  'jquery/controller')
  .css()
  .then(function() {

$.Controller.extend('ContentStack',
/* @static */
{
  /**
   * Default options:
   * 
   * pop_ev:                    Animation type.
   *                            options: 'semi_circular', 'grid'
   */
  defaults: {
    listen_to: document,
    push_ev: 'push_content',                  // push content event
    pop_ev: 'pop_content',                    // pop content event
    ready_ev: 'content_ready'                 // content ready event
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    this.content_els = [];
    this.content_stats = [];

    $(this.options.listen_to)
      .html('')
      .bind(this.options.push_ev, this.callback('push'))
      .bind(this.options.pop_ev, this.callback('pop'));
  },

  /**
   *
   */
  push: function(ev, content, stats) {
    this.content_els.push(content);
    this.content_stats.push(stats);

    this.element.children().detach();
    this.element.html(content);

    this.content_ready();
  },

  /**
   *
   */
  pop: function(ev) {
    this.content_els.pop();
    this.content_stats.pop();

    this.element.html(this.content_els[this.content_els.length - 1]);

    this.content_ready();
  },

  /**
   *
   */
  content_ready: function() {
    var stats = this.content_stats[this.content_stats.length - 1];
    this.element.trigger(this.options.ready_ev, [stats]);
  }
}
);

});
