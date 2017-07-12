function trr_make_swap_in_parms_for_dots_effect( parms ) {
  trr_statusLog( "  ..*6.1b: trr_make_swap_in_parms_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );
  /*var input_parms = { photo_idx: photo_idx, action: action,
                      action_delay: action_delay, effect: effect  },
trr_globals.dots_effect.photos
    trr_globals.animation_container.attr( 'profile-idx', trr_globals.active_photo_idx + '' );
    trr_globals.animation_container.attr( 'active_id', '*init*');

  */
  parms.src_photo = jQuery( trr_globals.dots_effect.photos[ 0 ] ),
  parms.active_photo_idx = parseInt( trr_globals.animation_container.attr( 'photo-idx' ) ),
  parms.dest_photo = trr_globals.animation_container,
  parms.scroll_to_photo = trr_globals.animation_container;
  parms.photo_tag = 'photo_tag';
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
  parms.src_photo.trr_halftone_dots( parms,
  /*1-Resume here when done*/ function( return_info ) {
  callback( return_info );
  return;
  /*1-*/});
};

function CanvasDotsPlugin(el, parms ) {
  // Note: jQuery(el) = '<img class="trr-photo-effect />'
  this.$el = jQuery(el);
  this._name = trr_globals.dots_effect.pluginName;
  trr_statusLog( "  ..*6.1d.3-creating CanvasDotsPlugin: photo with id: '" +
                 this.$el.attr('id') + "' class(s): '" + this.$el.attr('class') +
                 "' action: '" + parms.action + "' *" );

  this.create( parms,
  /*1-Resume here when done*/ function( self, return_info ) {
  trr_statusLog( "  ..*6.1d.4-after creating CanvasDotsPlugin: create done for id: '" + self.$el.attr('id') + "' *" );
  return self;
  /*1-*/});
};

CanvasDotsPlugin.prototype = {
  create: function( parms, callback ) {
    // Note: this.$el = <img class="trr-photo-effect title="photo_url halftone_url"/>
    trr_statusLog( "  ..*6.1d.5-CanvasDotsPlugin create for el.id: '" + this.$el.attr('id') +
                   "' action: '" + parms.action + "' *");
    callback( this );
    return;
  },

  init: function( parms, callback ) {
    // Note: this.$el = <img class="trr-photo-effect title="photo_url halftone_url"/>
    trr_statusLog( "  ..*6.1d.6-CanvasDotsPlugin init for el.id: '" + this.$el.attr('id') +
                   "' action: '" + parms.action + "' *");

    trr_dots_effect_plugin_init( this, parms,
    /*1-Resume here when done*/ function( self, return_info ) {
    trr_statusLog( "  ..*6.1d.7-after trr_dots_effect_plugin_init for id: '" + self.$el.attr('id') + "' *" );
    callback( self, return_info );
    /*1-*/});
    return;
  },

  action: function( parms, callback ) {
    trr_statusLog( "  ..*6.1d.8-CanvasDotsPlugin: Perform action '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");
    if ( parms.action == 'init' ) {
      this.init( parms,
      /*1a-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1a-*/});
      return;
    } else if ( parms.action == 'appear' ) {
      this.appear( parms,
      /*1b-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1b-*/});
      return;
    } else if ( parms.action == 'disappear' ) {
      this.disappear( parms,
      /*1c-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1c-*/});
      return;
    } else {
      trr_statusLog( "  ..*6.1d.9-CanvasDotsPlugin: **ERR: unknown action '" + parms.action +
                     "' for el.id: '" + this.$el.attr('id') + "' *");
      callback();
      return;
    }
  },

  renderFunc: function(a) {
    //trr_statusLog( "  ..*6.1d.15-CanvasDotsPlugin renderFunc: action '" + this.$el.attr('render_action') +
    //               "' for el.id: '" + this.$el.attr('id') +
    //               "' camera.position.x: '" + trr_globals.dots_effect.camera.position.x +
    //               "' camera.position.y: '" + trr_globals.dots_effect.camera.position.y +
    //               "' *");

    //requestAnimationFrame(trr_dots_effect_renderFunc);

    // HACK: to stop animation loop? - else we just render forever.
    if ( trr_globals.dots_effect.camera.position.x > 0.001 ) {
      requestAnimationFrame( this.renderFunc.bind(this) );
    } else {
      return;
    }

    trr_globals.dots_effect.particles.geometry.verticesNeedUpdate = true;
    //if(!isMouseDown){
    trr_globals.dots_effect.camera.position.x += (0-trr_globals.dots_effect.camera.position.x)*0.06;
    trr_globals.dots_effect.camera.position.y += (0-trr_globals.dots_effect.camera.position.y)*0.06;
    trr_globals.dots_effect.camera.lookAt(trr_globals.dots_effect.centerVector);
    //}

    trr_globals.dots_effect.renderer.render(trr_globals.dots_effect.scene, trr_globals.dots_effect.camera);
  },

  appear: function( parms, callback ) {
    trr_statusLog( "  ..*6.1d.10-CanvasDotsPlugin appear '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");

    /* The next step is to call
      requestAnimationFrame(renderFunc) to animate/draw the 3D image.
    */
    //trr_dots_effect_renderTheAnimatedImage( this, this.$el, parms,
    //                                        trr_dots_effect_renderFunc,

    /* Draw the image. Get the data from the scene, select
    the pixels we want to keep and store in a scene.particles array and call
    requestAnimationFrame(renderFunc) to animate/draw the 3D image.
    */
    //var trr_dots_effect_renderTheAnimatedImage = function( plugin_instance, $el, parms,
    //                                                       renderFunc, callback ) {
    //  trr_statusLog( "  ..*6.1d.13-trr_dots_effect_renderTheAnimatedImage: action '" + parms.action +
    //                 "' for el.id: '" + $el.attr('id') + "' *");

      // per: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      // The window.requestAnimationFrame() method tells the browser that you wish
      // to perform an animation and requests that the browser call a specified
      // function to update an animation before the next repaint. The method takes
      // as an argument a callback to be invoked before the repaint.
      // Note: Your callback routine must itself call requestAnimationFrame() if
      // you want to animate another frame at the next repaint.
    	//
      //var return_info = requestAnimationFrame( trr_dots_effect_renderFunc );

      this.$el.attr('render_action', parms.action )
      var return_info = requestAnimationFrame( this.renderFunc.bind(this) );

    ///*1-Resume here when done*/ //function( return_info ) {
    callback( return_info );
    return;
    /*1-*///});
  },

  disappear: function( parms, callback ) {
    trr_statusLog( "  ..*6.1d.11-CanvasDotsPlugin disappear '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");
    callback();
    return;
  },

};

var trr_dots_effect_plugin_init = function( plugin_instance, parms, callback ) {
  var $el = plugin_instance.$el;
  trr_statusLog( "  ..*6.1d.10-trr_dots_effect_plugin_init: action '" + parms.action +
                 "' for el.id: '" + $el.attr('id') + "' *");

  // per: https://api.jquery.com/data/
  // Writing a statement like $( "body" ).data( { "my-name": "aValue" } ).data(); will return { myName: "aValue" }.
  // When the data attribute is an object (starts with '{') or array (starts with '[') then jQuery.parseJSON is used to parse the string; it must follow valid JSON syntax including quoted property names. If the value isn't parseable as a JavaScript value, it is left as a string.
  // $el.data( "trr-pe-dots_effect", state: {} );

  // NOTE: it seems that there is a processing delay in these new THREE.xxx funcs, use callbacks to pace??
  trr_globals.dots_effect.centerVector = new THREE.Vector3(0, 0, 0);

  trr_globals.dots_effect.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById(trr_globals.dots_effect.animation_container_dom_id),
    antialias: true
  });

  trr_globals.dots_effect.renderer.setSize(trr_globals.window_width, trr_globals.window_height);
  // background color of canvas.
  trr_globals.dots_effect.renderer.setClearColor(trr_globals.dots_effect.defaults.renderer_canvas_background_color);

  trr_globals.dots_effect.scene = new THREE.Scene();

  trr_globals.dots_effect.camera = new THREE.OrthographicCamera(
    trr_globals.window_width / - 2,
    trr_globals.window_width / 2,
    trr_globals.window_height / 2,
    trr_globals.window_height / - 2,
    1,
    1000 );

  trr_globals.dots_effect.camera.position.set(7, 0, 4);
  trr_globals.dots_effect.camera.lookAt(trr_globals.dots_effect.centerVector);
  trr_globals.dots_effect.scene.add(trr_globals.dots_effect.camera);
  trr_globals.dots_effect.camera.zoom = 4;
  trr_globals.dots_effect.camera.updateProjectionMatrix();

  /* Now that we have our basic scene we need to convert our image into an
    array of data. Create a new image element and execute the 'drawScene'
    function when it is loaded.
  */
  trr_dots_effect_getTheJpeqImageData( plugin_instance, $el, parms,
  /*1-Callback when done*/ function( imagedata ) {
  trr_globals.dots_effect.imagedata = imagedata;
  /* The next step is to get the data from the scene, select
     the pixels we want to keep and store in a scene.particles array so we can
     later animate/draw the 3D image.
  */
  trr_dots_effect_initSceneData( plugin_instance, $el, parms,
    trr_globals.dots_effect.imagedata, trr_globals.dots_effect.defaults.dots_size,
    trr_globals.dots_effect.defaults.dots_color, trr_globals.dots_effect.defaults.vertex_speed,
    trr_globals.dots_effect.scene,
  /*2-Callback when done*/ function( scene ) {
  callback( plugin_instance, scene );
  /*2-*/});/*1-*/});
};

/* Convert our image into an array of data. Create a new image element and
execute the 'drawScene' function when it is loaded.
*/
var trr_dots_effect_getTheJpeqImageData = function( plugin_instance, $el, parms, callback ) {
  trr_statusLog( "  ..*6.1d.11-trr_dots_effect_getTheJpeqImageData: action '" + parms.action +
                 "' for el.id: '" + $el.attr('id') + "' *");

  canvas = document.createElement("canvas");
  image = document.createElement("img");

  // NOTE: single image file is defined in images/image_data_uri.js
  //       all images are in images/image_data.js
  image.src = trr_dots_effect_image_data_as_uri;
  image_name = trr_dots_effect_image_name;

	canvas.width = image.width;
	canvas.height = image.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  trr_statusLog( "  ..*6.1d.11.a: image_name = " + image_name);
  trr_statusLog( "  ..*6.1d.11.a: image.width = " + image.width + ". image.height = " + image.height);
  trr_statusLog( "  ..*6.1d.11.a: canvas.width = " + canvas.width + ". canvas.height = " + canvas.height);
  trr_statusLog( "  ..*6.1d.11.a: move canvas image: " +
              (trr_globals.dots_effect.defaults.move_canvas_image_left ? 'left' : trr_globals.dots_effect.defaults.move_canvas_image_right ? 'right' : 'NO') +
              ' by ' + trr_globals.dots_effect.defaults.move_canvas_image_by_px + ' pixels.');

  //return ctx.getImageData(0, 0, image.width, image.height);
  callback( ctx.getImageData(0, 0, image.width, image.height) );
  return;
}

/* The next step is to get the data from the scene, select
   the pixels we want to keep and store in a scene.particles array so we can
   later animate/draw the 3D image.
*/
var trr_dots_effect_initSceneData = function( plugin_instance, $el, parms,
                                              imagedata, dots_size, dots_color,
                                              vertex_speed, scene, callback) {
  trr_statusLog( "  ..*6.1d.12-trr_dots_effect_initSceneData: action '" + parms.action +
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

				vertex.speed = Math.random() / trr_globals.dots_effect.defaults.vertex_speed + 0.015;

				geometry.vertices.push(vertex);
			}
		}
	}
	trr_globals.dots_effect.particles = new THREE.Points(geometry, material);
	scene.add(trr_globals.dots_effect.particles);
  callback( scene );
};

//=============================

/* Draw the image. Get the data from the scene, select
the pixels we want to keep and store in a scene.particles array and call
requestAnimationFrame(renderFunc) to animate/draw the 3D image.
*/
var trr_dots_effect_renderTheAnimatedImage = function( plugin_instance, $el, parms,
                                                       renderFunc, callback ) {
  trr_statusLog( "  ..*6.1d.13-trr_dots_effect_renderTheAnimatedImage: action '" + parms.action +
                 "' for el.id: '" + $el.attr('id') + "' *");

  // per: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  // The window.requestAnimationFrame() method tells the browser that you wish
  // to perform an animation and requests that the browser call a specified
  // function to update an animation before the next repaint. The method takes
  // as an argument a callback to be invoked before the repaint.
  // Note: Your callback routine must itself call requestAnimationFrame() if
  // you want to animate another frame at the next repaint.
	requestAnimationFrame( renderFunc );
  callback();
};

var trr_dots_effect_renderFunc = function(a) {
  trr_statusLog( "  ..*6.1d.14-trr_dots_effect_renderFunc: action '" + "' *");

	requestAnimationFrame(trr_dots_effect_renderFunc);

	trr_globals.dots_effect.particles.geometry.verticesNeedUpdate = true;
	//if(!isMouseDown){
	trr_globals.dots_effect.camera.position.x += (0-trr_globals.dots_effect.camera.position.x)*0.06;
	trr_globals.dots_effect.camera.position.y += (0-trr_globals.dots_effect.camera.position.y)*0.06;
	trr_globals.dots_effect.camera.lookAt(trr_globals.dots_effect.centerVector);
	//}

	trr_globals.dots_effect.renderer.render(trr_globals.dots_effect.scene, trr_globals.dots_effect.camera);
};
