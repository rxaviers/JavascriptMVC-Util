steal.plugins(
  'jquery/controller',
  'jquery/view/ejs',
  'jquery/controller/view')
  .css('more')
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
    this.more_el = $( $.View('//super/more/views/init.ejs') );
    this.more_el.filter('.more').html(this.options.more_text);
    this.element.append(this.more_el);

    // Listener: it toggles once when inview, once when "outview".
    this.more_el.bind('inview', function(ev, is_inview) {
      if(is_inview) {
        self.timer = setInterval(self.callback('run'), 20);
      }
      else {
        clearTimeout(self.timer);
      }
    });
  },

  /**
   * 
   */
  run: function(data) {
    this.find(this.callback('more'));
  },

  /**
   * 
   */
  more: function(data) {
    if(this.options.more) {
      this.options.more(data, this.more_el);
    }
    else {
      this.more_el.before(data);
    }
  }
}
);

});
