function trr_make_swap_in_parms_for_dots_effect( parms ) {
  //trr_statusLog( "  ..*6.1b: trr_make_swap_in_parms_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );
  /*var input_parms = { photo_idx: photo_idx, action: action,
                      action_delay: action_delay, effect: effect  },
trr_globals.photos
    trr_globals.animation_container.attr( 'profile-idx', trr_globals.active_photo_idx + '' );
    trr_globals.animation_container.attr( 'active_id', '*init*');

  */
  //parms.active_photo_idx = parseInt( trr_globals.animation_container.attr( 'active_photo_idx' ) ),
  //parms.src_photo = jQuery( trr_globals.photos[ parms.active_photo_idx ] ),
  //parms.dest_photo = jQuery( trr_globals.photos[ parms.photo_idx ] ),
  //parms.scroll_to_photo = parms.dest_photo;
  return parms;
};

function trr_swap_in_update_animation_area_before_action_for_dots_effect( parms, callback ) {
  trr_statusLog( "  ..*6.1c: trr_swap_in_update_animation_area_before_action_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );
  callback();
};

function trr_animation_effect_for_dots_effect( parms, callback ) {
  trr_statusLog( "  ..*6.1d: trr_animation_effect_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );

  // src_profile.pixellate( 'in', dest_bio );
  // jQuery.data( this, trr_globals.dots_effect.pluginInstanceName ).action
  // jQuery.each( trr_globals.photos, function( index, el ) {
  // $el.trr_halftone_dots( { action: 'create', photo_idx: index },
  // swap_in_photo: jQuery( trr_globals.photos[ parms.photo_idx ] ),
  parms.$swap_in_photo.trr_halftone_dots( parms,
  /*1-Resume here when done*/ function( return_info ) {
  callback( return_info );
  return;
  /*1-*/});
};

function CanvasDotsPlugin(el, parms ) {
  // Note: jQuery(el) = '<img class="trr-photo-effect />'
  this.$el = jQuery(el),
  this._name = trr_globals.dots_effect.pluginName;
  var $el = this.$el;

  trr_statusLog( "  ..*6.1d.3-creating CanvasDotsPlugin: photo with id: '" +
                 $el.attr('id') + "' class(s): '" + $el.attr('class') +
                 "' action: '" + parms.action + "' *" );

  this.create( $el, parms,
  /*1-Resume here when done*/ function( self, return_info ) {
  // NOTE: after callback this points to window elem, not our instance. So all
  // references going forward refer to 'self', not 'this'
  $el = self.$el;
  trr_statusLog( "  ..*6.1d.4-after creating CanvasDotsPlugin: create done for id: '" + $el.attr('id') + "' *" );
  return self;
  /*1-*/});
};

CanvasDotsPlugin.prototype = {
  // dispatch by action.
  action: function( parms, callback ) {
    var $el = this.$el;
    trr_statusLog( "  ..*6.1d.8-CanvasDotsPlugin: Perform action '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");
    if ( parms.action == 'init' ) {
      this.init( parms,
      /*1a-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1a-*/});
    } else if ( parms.action == 'appear' ) {
      this.appear( parms,
      /*1b-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1b-*/});
    } else if ( parms.action == 'disappear' ) {
      this.disappear( parms,
      /*1c-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1c-*/});
    } else {
      trr_statusLog( "  ..*6.1d.9-CanvasDotsPlugin: **ERR: unknown action '" + parms.action +
                     "' for el.id: '" + this.$el.attr('id') + "' *");
      callback();
    }
    return;
  },

  // NOTE: action methods are listed alphabetically.
  appear: function( parms, callback ) {
    var $el = this.$el;
    trr_statusLog( "  ..*6.1d.10-CanvasDotsPlugin appear '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");

    // NOTE: each time we scroll back to a photo, we need to animate it again.
    
    //$el.data('camera').position.x = 7;
    //$el.data('camera').position.y = $el.data('camera').position.y;
    // camera 'home' position.
    $el.data('camera').position.set( 7, 0, 4 );
    //$el.data('camera').lookAt( $el.data('centerVector') );
    //$el.data('scene').add( $el.data('camera') );
    //$el.data('camera').zoom = 4;
    //$el.data('camera').updateProjectionMatrix();

    // The next step is to call
    //  requestAnimationFrame(renderFunc) to animate/draw the 3D image.
    // per: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // The window.requestAnimationFrame() method tells the browser that you wish
    // to perform an animation and requests that the browser call a specified
    // function to update an animation before the next repaint. The method takes
    // as an argument a callback to be invoked before the repaint.
    // Note: Your callback routine must itself call requestAnimationFrame() if
    // you want to animate another frame at the next repaint.
    //
    var return_info = requestAnimationFrame( this.hlpr_renderFunc.bind(this) );
    callback( this, return_info );
    return;
  },

  create: function( $el, parms, callback ) {
    // Note: this.$el = <img class="trr-photo-effect title="photo_url halftone_url"/>
    trr_statusLog( "  ..*6.1d.5-CanvasDotsPlugin create for el.id: '" + $el.attr('id') +
                   "' action: '" + parms.action + "' *");
    callback( this );
    return;
  },

  disappear: function( parms, callback ) {
    var $el = this.$el;
    trr_statusLog( "  ..*6.1d.11-CanvasDotsPlugin disappear '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");
    // per: https://davidburgos.blog/how-to-change-a-threejs-scene/
    //trr_globals.animation_container.remove()

    callback( this );
    return;
  },

  init: function( parms, callback ) {
    // Note: this.$el = <img class="trr-photo-effect title="photo_url halftone_url"/>
    var $el = this.$el;
    trr_statusLog( "  ..*6.1d.6-CanvasDotsPlugin init for el.id: '" + $el.attr('id') + "' action: '" + parms.action + "' *");

    $el.data('$el', $el );
    $el.data('centerVector', new THREE.Vector3(0, 0, 0) );
    $el.data('renderer', new THREE.WebGLRenderer(
                                      { canvas: document.getElementById(trr_globals.dots_effect.animation_container_dom_id),
                                        antialias: true } ) );
    $el.data('renderer').setSize(trr_globals.window_width, trr_globals.window_height);
    // background color of canvas.
    $el.data('renderer' ).setClearColor(trr_globals.dots_effect.defaults.renderer_canvas_background_color);
    $el.data('scene', new THREE.Scene() );
    $el.data('camera', new THREE.OrthographicCamera(
                                  trr_globals.window_width / - 2, trr_globals.window_width / 2,
                                  trr_globals.window_height / 2,  trr_globals.window_height / - 2,
                                  1, 1000 ) );
    // camera 'home' position.
    $el.data('camera').position.set( 7, 0, 4 );
    $el.data('camera').lookAt( $el.data('centerVector') );
    $el.data('scene').add( $el.data('camera') );
    $el.data('camera').zoom = 4;
    $el.data('camera').updateProjectionMatrix();

    /* Now that we have our basic scene we need to convert our image into an
      array of data. Create a new image element and execute the 'drawScene'
      function when it is loaded.
    */
    this.hlpr_getTheJpeqImageData( $el, parms,
    /*1-Callback when done*/ function( self, imagedata ) {
    // NOTE: after callback this points to window elem, not our instance. So all
    // references going forward refer to 'self', not 'this'
    if (imagedata == null || imagedata.length == 0) {
      // load err occurred.
      callback( self, null );
      return;
    }
    $el = self.$el;
    $el.data('imagedata_len', imagedata.data.length);
    trr_statusLog( "  ..*6.1d.6a-CanvasDotsPlugin init for el.id: '" + $el.attr('id') + "' action: '" + parms.action +
                   "'. imagedata.length: '" + $el.data('imagedata_len') +
                   "'. for file name: '" + $el.data('image_name') + "'. *");
    /* The next step is to get the data from the scene, select
       the pixels we want to keep and store in a scene.particles array so we can
       later animate/draw the 3D image.
    */
    $el.data('dots_size', trr_globals.dots_effect.defaults.dots_size);
    $el.data('dots_color', trr_globals.dots_effect.defaults.dots_color);
    $el.data('vertex_speed', trr_globals.dots_effect.defaults.vertex_speed);

    self.hlpr_initSceneData( $el, parms,
      imagedata, $el.data('dots_size'),
      $el.data('dots_color'), $el.data('vertex_speed'),
      $el.data('scene'),
    /*2-Callback when done*/ function( self, scene ) {
    // NOTE: after callback this points to window elem, not our instance. So all
    // references going forward refer to 'self', not 'this'
    $el = self.$el;
    callback( self, scene );
    /*2-*/});/*1-*/});
    return;
  },

  // NOTE: action helper methods, listed alphabetically.
  hlpr_getTheJpeqImageData: function( $el, parms, callback ) {
    var self = this;
    /* Convert our image into an array of data. Create a new image element and
    execute the 'drawScene' function when it is loaded.
    */
    trr_statusLog( "  ..*6.1d.91-getTheJpeqImageData: action '" + parms.action +
                   "' for el.id: '" + $el.attr('id') + "' *");
    // NOTE: single image file is defined in images/image_data_uri.js
    //       all images are in images/image_data.js

    var img = new Image();
    $el.data( 'image_name', trr_dots_effect_image_info[ parms.photo_idx ].image_name );
    // NOTE: after callback 'this' points to <img> elem, not our instance. So all
    // references going forward refer to 'self', not 'this'
    img.onerror = function() { // trigger if the image wasn't loaded
      trr_statusLog( "  ..*6.1d.91.a-getTheJpeqImageData: action '" + parms.action +
                     "' for el.id: '" + $el.attr('id') + "'. **ERROR** (img.onerror) loading file '" + $el.data('image_name') + "'. *");
      callback( self, null );
      return;
    };
    img.onAbort = function() { // trigger if the image load was abort
      trr_statusLog( "  ..*6.1d.91.b-getTheJpeqImageData: action '" + parms.action +
                     "' for el.id: '" + $el.attr('id') + "'. **ERROR** (img.onAbort) loading file '" + $el.data('image_name') + "'. *");
      callback( self, null );
      return;
    };
    img.onload = function() { // triggered if the image was loaded
      if ( !img.complete || img.naturalHeight == 0 ) {
        trr_statusLog( "  ..*6.1d.91.c-getTheJpeqImageData: action '" + parms.action +
                       "' for el.id: '" + $el.attr('id') + "'. **ERROR** (img.onload: !img.complete || img.naturalHeight == 0) loading file '" + $el.data('image_name') + "'. *");
        callback( self, null );
        return;
      }
      trr_statusLog( "  ..*6.1d.91.d-getTheJpeqImageData: action '" + parms.action +
                     "' for el.id: '" + $el.attr('id') + "'. file '" + $el.data('image_name') + "' loaded.*");
      canvas = document.createElement("canvas");
     	canvas.width = img.width;
    	canvas.height = img.height;

      var ctx = canvas.getContext( "2d" );
      ctx.drawImage( img, 0, 0 );

      trr_statusLog( "  ..*6.1d.11.91e: image_name: '" + $el.data('image_name') +
                     "'. image.width: '" + img.width + "'. image.height: '" + img.height +
                     "'. canvas.width: '" + canvas.width + "'. canvas.height: '" + canvas.height +
                     "'. *");
      trr_statusLog( "  ..*6.1d.11.91f: move canvas image: " +
                      ( trr_globals.dots_effect.defaults.move_canvas_image_left ? 'left' : trr_globals.dots_effect.defaults.move_canvas_image_right ? 'right' : 'NO') +
                        ' by ' + trr_globals.dots_effect.defaults.move_canvas_image_by_px + ' pixels.' +
                     " *");
     callback( self, ctx.getImageData( 0, 0, img.width, img.height ) );
     return;
    };

    img.src = trr_dots_effect_image_info[ parms.photo_idx ].image_data_as_uri; // pass src to image object
    // Logic resumed from the img.onload callback.
    return;
  },

  hlpr_initSceneData: function( $el, parms, imagedata, dots_size,
                           dots_color, vertex_speed, scene, callback) {
    /* The next step is to get the data from the scene, select
    the pixels we want to keep and store in a scene.particles array so we can
    later animate/draw the 3D image.
    */
    trr_statusLog( "  ..*6.1d.92-initSceneData: action '" + parms.action +
                   "' for el.id: '" + $el.attr('id') + "' *");

  	var geometry = new THREE.Geometry();
  	var material = new THREE.PointsMaterial({
      // changes size of dots. lessens the empty space around each dot.
  		size: dots_size,
      // changes color of dots.
  		color: dots_color,
  		sizeAttenuation: false  // NOTE: leave at false else weird effect.
  	});

    /* We now have an array with the data of every pixel from the image in an
    array that contains 4 values for each pixel: one for each color (RGB) and
    a last one for the Alpha.
      We only want specific pixels. In this case I will select only the pixel
    with no transparency (but you can target all the blue pixels, the darker
    pixels [...] It's up to you !).
      To select the pixels we need, we will loop through the Y and the X axis
    of our image. That's why we have a loop into another one.
    */
  	for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
  		for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
        /* Keep the pixels we want. Check if it's four value (Alpha) is
        over 128, the average value. (Each value is between 0 and 255).
        If the Alpha is over 128, push the pixel into the particles array.
        */
  			if (imagedata.data[(x * 4 + y * 4 * imagedata.width)] < trr_globals.dots_effect.defaults.select_pixels_with_transparency_value_less_than_this_value) {

  				var vertex = new THREE.Vector3();
          // The x,y coordinates of where the particle will end up on our canvas.
          // Decrease x to move drawn map to left. Increase to move right.
          var x_adjustment = 0;
          if (trr_globals.dots_effect.defaults.move_canvas_image_left) {
            x_adjustment = -trr_globals.dots_effect.defaults.move_canvas_image_by_px;
          } else if (trr_globals.dots_effect.defaults.move_canvas_image_right) {
            x_adjustment = trr_globals.dots_effect.defaults.move_canvas_image_by_px;
          }

          // x, y of where the particle ends up?
  				vertex.x = (x - imagedata.width / 2) + x_adjustment;
  				vertex.y = -y + imagedata.height / 2;
  				vertex.z = -Math.random()*500;

  				vertex.speed = Math.random() / $el.data('vertex_speed') + 0.015;

  				geometry.vertices.push(vertex);
  			}
  		}
  	}
    $el.data('particles', new THREE.Points(geometry, material));
    // NOTE: once scene.particles has been created, the imagedata can be discarded.
    // AND the get photo data, make scene logic can be reduced to just storing
    // the large(1460) vertices array as a json string in our db AND NOT having to recalc
    // it. i.e. store { vertices: [ x: nnn, y: nnn, z: nnn, speed: nnn ] }
  	scene.add($el.data('particles'));
    callback( this, scene );
  },

  hlpr_renderFunc: function(a) {
    var $el = this.$el;
    //trr_statusLog( "  ..*6.1d.93-CanvasDotsPlugin renderFunc: action '" + $el.attr('render_action') +
    //               "' for el.id: '" + $el.attr('id') +
    //               "' camera.position.x: '" + $el.data('camera').position.x +
    //               "' camera.position.y: '" + $el.data('camera').position.y +
    //               "' *");

    // HACK: to stop animation loop? - else we just render forever.
    // NOTE: we know we animate from the right to the center vector of x=0, y=0.
    if ( $el.data('camera').position.x > 0.001 ) {
      requestAnimationFrame( this.hlpr_renderFunc.bind(this) );
    } else {
      return;
    }

    $el.data('particles').geometry.verticesNeedUpdate = true;
    $el.data('camera').position.x += ( 0 - $el.data('camera').position.x) * 0.06;
    $el.data('camera').position.y += ( 0 - $el.data('camera').position.y) * 0.06;
    $el.data('camera').lookAt( $el.data('centerVector') );

    $el.data('renderer').render( $el.data('scene'), $el.data('camera') );
    return;
  },
};

/*
var trr_dots_effect_sceneData = {
  geometry: { },
  material: {
    size: dots_size,
    color: dots_color,
    sizeAttenuation: false
  },
  imagedata: {
    photo_name: trr_dots_effect_image_name,
    uri_length: imagedata.length
    height: imagedata.height,
    iwidth: imagedata.width
  },
  pixel_selection: {
    transparency_less_than: trr_globals.dots_effect.defaults.select_pixels_with_transparency_value_less_than_this_value
  },
  canvas_location: {
    x_adjustment: x_adjustment
  },
  vertices: {
    constants: {
      items: geometry.vertices.length,
      z: vertex_z,
      speed: vertex_speed
    },
    array: geometry.vertices
  },
};
*/
