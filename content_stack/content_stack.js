steal.plugins(
  'jquery/controller')
  .css('content_stack')
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
    listen_to: document.documentElement,
    push_ev: 'push_content',                  // push content event
    pop_ev: 'pop_content',                    // pop content event
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
    $(this.options.listen_to)
      .bind(this.options.push_ev, this.callback('push'))
      .bind(this.options.pop_ev, this.callback('pop'));
    this.phaseIn = this.options.phaseIn;
    this.phaseOut = this.options.phaseOut;
  },

  /**
   *
   */
  push: function(ev, content) {
    this.phaseOut(this.element.children());
    this.element.append(content.hide());
    this.phaseIn(content);
  },

  /**
   *
   */
  pop: function(ev) {
    this.phaseOut(this.element.children(':last-child')).remove();
    this.phaseIn(this.element.children(':last-child'));
  }
}
);

});
