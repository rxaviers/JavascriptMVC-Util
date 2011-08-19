steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .views(
    '//util/button/views/init.ejs')
  .then(function() {

$.Controller.extend('Util.Button',
/* @static */
{
  /**
   * 
   */
  defaults: {
    form: true,
    type: 'button'
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var content = this.element.html(),
        el = $(this.view($.extend(this.options, {content:content})));

    this.element.html(el);

    this.find('button').corner();
  }
}
);

});
