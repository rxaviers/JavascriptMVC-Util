steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .views(
    '//util/checkbox/views/init.ejs')
  .then(function() {

$.Controller.extend('Util.Checkbox',
/* @static */
{
  /**
   * 
   */
  defaults: {
    checked: true,
    container_tag: 'div',
    ins_method: 'prepend',
    name: false,
    value: false
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    this.element[this.options.ins_method](this.view('init', this.options));
    this.find('input[type=checkbox]').attr('checked', this.options.checked);
  }
}
);

});
