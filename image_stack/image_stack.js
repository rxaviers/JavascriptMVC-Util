steal.plugins(
  'jquery/controller')
  .css('image_stack')
  .resources('jquery.transform.lite') // https://github.com/lrbabe/jquery.transform.js/blob/master/jquery.transform.lite.js
  .then(function() {

$.Controller.extend('ImageStack',
/* @static */
{
  defaults: {
    animation: 'semi_circular',               // animation type
    angle_delta: 30                           // in degrees
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    var i, r;

    this.imgs = this.find('img');
    this.num = this.imgs.length;
    this.initial_angle = [];

    // Set initial angle
    for(i=1; i<this.num; i++) {
      r = Math.floor((Math.random() - 0.5) * this.options.angle_delta);
      this.initial_angle[i] = r;
    }

    this['setup_' + this.options.animation]();

    this.animate(0);
    this.listen();
  },

  /**
   *
   */
  listen: function() {
    var img_side = this.imgs.height(),
        event_side = img_side * 3;

    this.element.append(
      $('<div/>').css({
        'position': 'absolute',
        'width': event_side + 'px',
        'height': event_side + 'px',
        'top': -img_side + 'px',
        'left': -img_side + 'px',
        'z-index': this.num + 1
      }).mousemove(this.callback('animate'))
    );
  },

  /**
   *
   */
  proximity: function(ev) {
    var img_side = this.imgs.height(),
        event_side = img_side * 3,
        x = ev.layerX - event_side/2,
        y = ev.layerY - event_side/2,
        distance = Math.sqrt(x*x + y*y),
        normal_distance = distance / (event_side/2);
    return normal_distance;
  },

  /**
   *
   */
  phase: function(normal_distance) {
    var staged_normal_distance;
    if (normal_distance < 0.2) {
      staged_normal_distance = 0;
    }
    else if (normal_distance < 0.8) {
      staged_normal_distance = (normal_distance - 0.2) / 0.6;
    }
    else {
      staged_normal_distance = 1;
    }
    return Math.cos(staged_normal_distance * Math.PI/2);
  },

  /**
   * Figure out the phase by mouse proximity and call the selected animation type.
   */
  animate: function(ev) {
    var phase = this.phase( this.proximity(ev) );

    // Hide the surplus images when collapsed
    if(phase < 0.001) {
      for(i=3; i<this.num; i++) {
        $(this.imgs[i]).hide();
      }
    }
    else {
      this.imgs.show();
    }

    this['animate_' + this.options.animation]( phase );
  },

  /**
   * Semi-circular disposal setup.
   */
  setup_semi_circular: function() {
    // Set initial z-index
    for(i=0; i<this.num; i++) {
      $(this.imgs[i]).css(
        'z-index', (i < this.num / 2 ?  this.num - i : i)
      );
    }
  },

  /**
   * Semi-circular disposal animation.
   */
  animate_semi_circular: function(phase) {
    var A = Math.PI,
        R = this.imgs.height() * 1.15,
        i, tx, ty, r;

    for(i=1; i<this.num; i++) {
      r = (this.initial_angle[i] * (1 - phase));
      tx = R * Math.cos( A * (i - 1) / (this.num - 2)) * phase;
      ty = R * Math.sin( A * (i - 1) / (this.num - 2)) * phase;
      $(this.imgs[i]).css('transform',
        'translate(' + tx + 'px, ' + ty*-1 + 'px) ' +
        'rotate(' + r + 'deg)'
      );
    }
  }
}
);

});
