steal.plugins(
  'jquery/controller')
  .css('image_stack')
  .resources('jquery.transform.lite') // https://github.com/lrbabe/jquery.transform.js/blob/master/jquery.transform.lite.js
  .then(function() {

$.Controller.extend('ImageStack',
/* @static */
{
  /**
   * Default options:
   * 
   * animation:                 Animation type.
   *                            options: 'semi_circular', 'grid'
   * 
   * angle_delta:               Initial angle delta (in degrees), default 30.
   * 
   * listener_area_mult:        x times of imgs.height
   * 
   * semi_circular: {           Semi Circular specific parameters
   *   radium:                    x times of imgs.height
   * }
   * 
   * grid: {                    Grid specific parameters
   *   grid_spacing:              in pixels, default 20.
   *   rows:                      n rows, default 2
   * }
   *
   * margin:                    in pixels, margin from document
   * 
   * initial_shadow:            shadow components, initial
   * final_shadow:              shadow components, final
   * 
   * flying_zindex_incr         increment of z-index when imgs are expanded.
   */
  defaults: {
    animation: 'grid',                        // animation type
    angle_delta: 30,                          // in degrees
    listener_area_mult: 2.2,                  // x times of imgs.height
    semi_circular: {                          // semi_circular specific parameters
      radium: 1.15                            // x times of imgs.height
    },
    grid: {                                   // grid specific parameters
      grid_spacing: 20,                       // in pixels
      rows: 2                                 // n rows
    },
    margin: 10,                               // in pixels, margin from document
    initial_shadow: [1,0,3,0],                // shadow components, initial
    final_shadow: [1,1,10,1],                 // shadow components, final
    initial_color: [0,0,0],                   // color components, initial
    final_color: [0,9,0],                     // color components, final
    flying_zindex_incr: 100                   // increment of z-index when imgs are expanded
  }
},
/* @prototype */
{
  /**
   *
   */
  init: function(el, options) {
    this.imgs = this.find('img');
    this.num = this.imgs.length;
    this.initial = {}
    this.initial.angle = [];
    this.initial.x = [];
    this.initial.y = [];
    this.initial.offset = this.imgs.offset();
    this.initial.offset.right = this.initial.offset.left + this.imgs.width();
    this.zindex = [];
    this.top_margin = this.left_margin = this.options.margin;
    this.right_margin = $(document).width() - this.options.margin;
    this.height = this.imgs.outerHeight(true);
    this.width = this.imgs.outerWidth(true);

    this['setup_' + this.options.animation]();

    // Set div container width and height.
    this.element.css({
      'height':this.height,
      'width':this.width
    });

    this.listen();
    this.animate(0);
  },

  /**
   *
   */
  default_init_angle: function() {
    var i, r;
    // Set initial angle
    for(i=0; i<this.num; i++) {
      r = Math.floor((Math.random() - 0.5) * this.options.angle_delta);
      this.initial.angle[i] = r;
    }
  },

  /**
   *
   */
  default_init_position: function() {
    var i;
    // Set initial x, y
    for(i=0; i<this.num; i++) {
      this.initial.x[i] = 0;
      this.initial.y[i] = 0;
    }
  },

  /**
   *
   */
  set_zindexes: function(increment) {
    var i;

    for(i=0; i<this.num; i++) {
      $(this.imgs[i]).css(
        'z-index', this.zindex[i] + increment
      );
    }

    this.listen_el.css('z-index', this.num + 1 + increment);
  },

  stationay_zindexes: function() {
    this.set_zindexes(0);
  },

  flying_zindexes: function() {
    this.set_zindexes(this.options.flying_zindex_incr);
  },

  /**
   *
   */
  listen: function() {
    var img_side = this.height,
        mult = this.options.listener_area_mult,
        event_side = img_side * mult,
        self = this;

    this.listen_el = $('<div/>').css({
      // Listener element stands center-aligned and on top of all others.
        'position': 'absolute',
        'width': event_side + 'px',
        'height': event_side + 'px',
        'top': img_side * (-mult + 1)/2 + 'px',
        'left': img_side * (-mult + 1)/2 + 'px'
      })
      .mousemove(function(ev) {
        // Figure out the phase by mouse proximity and call animation.
        self.animate(self.phase( self.proximity(ev) ));
      })
      .mouseleave(function(ev) {
        // Call animation with phase = 0.
        self.animate(0);
      });

    this.element
      .append(this.listen_el)
      .bind('collapsed', function(ev) {
        // Hide the surplus images
        for(i=3; i<self.num; i++) {
          $(self.imgs[i]).hide();
        }
        self.stationay_zindexes();
      })
      .bind('expanded', function(ev) {
        // Show images
        self.imgs.show();
        self.flying_zindexes();
      });


  },

  /**
   * Proximity function, based on the mouse approximation of the center.
   * Output: normal_distance, where 0 reached the center, and 1 farthest point.
   */
  proximity: function(ev) {
    var img_side = this.height,
        event_side = img_side * this.options.listener_area_mult,
        x = ev.layerX - event_side/2,
        y = ev.layerY - event_side/2,
        distance = Math.sqrt(x*x + y*y),
        normal_distance = distance / (event_side/2);
    return normal_distance;
  },

  /**
   * Phase function, based on a normalized approximation value:
   * Output: phase, where phase = [1-0] when normal_distance = [0-1]
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
   * Runs the default and specific animation uppon phase.
   */
  animate: function(phase) {
    if(phase < 0.001) {
      if(!this.state || this.state == 'expanded') {
        this.element.trigger('collapsed');
        this.state = 'collapsed';
      }
    }
    else {
      if(this.state == 'collapsed') {
        this.element.trigger('expanded');
        this.state = 'expanded';
      }
    }

    this['animate_' + this.options.animation]( phase );
  },

  default_shadowing: function(phase) {
    var shadow = [], color = [], i;
    for(i=0; i<4; i++) {
      shadow.push( this.linear(
        phase, this.options.initial_shadow[i], this.options.final_shadow[i]
      ));
    }
    for(i=0; i<3; i++) {
      color.push( parseInt(this.linear(
        phase, this.options.initial_color[i], this.options.final_color[i]
      ), 16));
    }
    this.shadow( shadow.join("px ") + 'px #' + color.join("") );
  },

  /**
   * Find linear mean value
   */
  linear: function(phase, v0, v1) {
    return v0 * (1 - phase) + v1 * phase;
  },

  /**
   * 
   */
  keep_boundaries: function(phase, max_boundaries, transformation) {
    var i = 0,
        max_top = max_boundaries['top'] * phase + this.initial.offset['top'],
        max_left = max_boundaries['left'] * phase + this.initial.offset['left'],
        max_right = max_boundaries['right'] * phase + this.initial.offset['right'];

    if(max_top < this.top_margin) {
      for(i=0; i<this.num; i++) {
        transformation[i].ty = transformation[i].ty -
          (max_top - this.top_margin) * -1;
      }
    }
    if(max_left < this.left_margin) {
      for(i=0; i<this.num; i++) {
        transformation[i].tx = transformation[i].tx -
          (max_left - this.left_margin);
      }
    }
    if(max_right > this.right_margin) {
      for(i=0; i<this.num; i++) {
        transformation[i].tx = transformation[i].tx -
          (max_right - this.right_margin);
      }
    }

    return transformation;
  },

  /**
   * Apply the css transformation
   */
  transform: function(transformation) {
    var i;
    for(i=0; i<this.num; i++) {
      $(this.imgs[i]).css('transform',
        'translate(' + transformation[i].tx + 'px, ' +
                       transformation[i].ty * -1 + 'px) ' +
        'rotate(' + transformation[i].r + 'deg)'
      );
    }
  },

  /**
   * 
   */
  shadow: function(value) {
    this.imgs.css({
      '-moz-box-shadow':value,
      '-webkit-box-shadow':value,
      'box-shadow':value
    });
  },

  /**
   * Semi-circular disposal setup.
   */
  setup_semi_circular: function() {
    this.A = Math.PI,
    this.R = this.height * this.options.semi_circular.radium,
    this.max_boundaries =  {
      'top': -this.R,
      'left': -this.R,
      'right': this.R
    };

    // Initialize angle of 1st img with zero.
    this.default_init_angle();
    this.initial.angle[0] = 0;

    // Set z-index'es
    for(i=0; i<this.num; i++) {
      this.zindex[i] = (i < this.num / 2 ?  this.num - i : i);
    }
  },

  /**
   * Semi-circular disposal animation.
   */
  animate_semi_circular: function(phase) {
    var self = this,
        transformation = [],
        i;

    function x(i) {
      return self.R * Math.cos( self.A * (i - 1) / (self.num - 2));
    }

    function y(i) {
      return self.R * Math.sin( self.A * (i - 1) / (self.num - 2));
    }

    transformation[0] = {r: 0, tx:0, ty:0};
    for(i=1; i<this.num; i++) {
      transformation[i] = {
        r: this.linear(phase, this.initial.angle[i], 0),
        tx: this.linear(phase, 0, x(i)),
        ty: this.linear(phase, 0, y(i))
      };
    }
    this.transform(
      this.keep_boundaries(phase, this.max_boundaries, transformation)
    );
    this.default_shadowing(phase);
  },

  /**
   * Grid disposal setup.
   */
  setup_grid: function() {
    this.rows = this.options.grid.rows;                     // num of rows
    this.cols = Math.ceil(this.num / this.rows);            // num of cols
    this.w = this.width;                                    // image width
    this.h = this.height;                                   // image height
    this.grid_spacing = this.options.grid.grid_spacing;     // inter grid spacing
    this.W = this.cols * this.w + (this.cols - 1) * this.grid_spacing; // grid width
    this.H = this.rows * this.h + (this.rows - 1) * this.grid_spacing; // grid height
    this.max_boundaries =  {
      'top': -this.H/2 + this.h/2,
      'left': -this.W/2 + this.w/2,
      'right': this.W/2 - this.w/2 
    };

    // Initialize angle of 1st img with zero.
    this.default_init_angle();
    this.initial.angle[0] = 0;

    // Initialize positions.
    this.default_init_position();

    // Set z-index'es
    for(i=0; i<this.num; i++) {
      this.zindex[i] = (i < this.num / 2 ?  this.num - i : i);
    }
  },

  /**
   * Grid disposal animation.
   */
  animate_grid: function(phase) {
    var self = this,
        transformation = [],
        i;

    function x(i) {
      var pos = i % self.cols;
      return -self.W / 2 + (self.w + self.grid_spacing) * pos + self.w / 2;
    }

    function y(i) {
      var pos = parseInt(i / self.cols);
      return self.H / 2 - (self.h + self.grid_spacing) * pos - self.h / 2;
    }

    for(i=0; i<this.num; i++) {
      transformation[i] = {
        r: this.linear(phase, this.initial.angle[i], 0),
        tx: this.linear(phase, this.initial.x[i], x(i)),
        ty: this.linear(phase, this.initial.y[i], y(i))
      };
    }
    this.transform(
      this.keep_boundaries(phase, this.max_boundaries, transformation)
    );
    this.default_shadowing(phase);
  }
}
);

});
