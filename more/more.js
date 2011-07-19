steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .css()
  .views(
    '//util/more/views/init.ejs')
  .resources('jquery.inview') // https://github.com/protonet/jquery.inview
  .then(function() {

$.Controller.extend('More',
/* @static */
{
  defaults: {
    find: false,                                    // Required.
    more_text: 'More...'
  }
},
/* @prototype */
{
  /**
   * 
   */
  init: function(el, options) {
    var self = this;
    this.find = this.options.find;

    // Create the 'more' element
    //this.more_el = $(this.view('init'));
    this.more_el = $( $.View('//util/more/views/init.ejs') );
    this.more_el.find('span').html(this.options.more_text);
    this.element.append(this.more_el);
    this.loading = false;

    // Listener: when inview
    this.more_el.bind('inview', this.callback('run'));
    this.element.trigger('inviewcheck');
  },

  /**
   * 
   */
  run: function() {
    this.more_el.unbind('inview');
    this.find(this.callback('more'));
  },

  /**
   * 
   */
  more: function(data) {
    if(this.options.more) {
      if(!this.options.more(data, this.more_el)) {
        this.more_el.remove();
      }
    }
    else {
      this.more_el.before(data);
    }
    this.more_el.bind('inview', this.callback('run'));
    this.element.trigger('inviewcheck');
  }
}
);

});
