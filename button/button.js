steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .views(
    '//super/button/views/init.ejs')
  .then(function() {

$.Controller.extend('Super.Button',
/* @static */
{
  /**
   * 
   */
  defaults: {
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var content = this.element.html(),
        name = this.element.attr('class'),
        el = $(this.view({content:content, name:name}));

    this.element
      .after(el)
      .remove();

    el.find('button').corner();
  }
}
);

});
