function trr_convert_data_before_main_loop_for_dots_effect( callback ) {
  trr_statusLog( "  ..*4.1j: trr_convert_data_before_main_loop_for_dots_effect for " + trr_globals.dots_effect.photos.length + " photos.*" );

  // Bind events and initialize plugin

  /*
  canvas {
    width:100%;
    height:100%;
    overflow: hidden;

    display: block;
    position: fixed;
    z-index: -1;
    top: 0; // 40px;
    left: 0; // 22%;

    //background: #F0F8FF; // no effect
    border: 2px solid red;
  }
  */

  trr_globals.animation_container =
    jQuery('<canvas  id="' + trr_globals.dots_effect.animation_container_dom_id + '" ' +
                    'style="' +
                        'width: 100%; ' + //44
                        'height: 100%; ' + //84
                        'padding: 0; ' +
                        'margin: 0; ' +
                        'overflow: hidden; ' +
                        'display: block; ' +
                        'position: fixed; ' +
                        'z-index: -1; ' +
                        'top: 0; ' + // 15%;
                        'left: 0; ' + // 54%; ' +
                        //'border: 2px solid red;' +
                        '" ' +
            '></canvas>').insertBefore( jQuery( '.entry-header' ) );
  // NOTE: code goes where? I guess we need a short code to indicate begin of bio area?
  // Make the background of the bio text transparent so that we can scoll over the canvas animation.
  jQuery('article').css('opacity', '0.8');

  trr_globals.animation_container.addClass( 'animation_container-container-for-*init*' );
  trr_globals.animation_container.attr( 'active_photo_idx', trr_globals.defaults.active_photo_idx + '' );
  trr_globals.animation_container.attr( 'active_id', '*init*');

  callback();
};

function trr_convert_data_for_each_for_dots_effect( index, $el, callback ) {
  trr_statusLog( "  ..*4.1k: trr_convert_data_for_each_for_dots_effect() index = " + index + ".*" );

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
  trr_dots_effect_getTheJpeqImageData(
  /*1-Callback when done*/ function(imagedata) {
  trr_globals.dots_effect.imagedata = imagedata;
  /* The next step is to get the data from the scene, select
     the pixels we want to keep and store in a scene.particles array so we can
     later animate/draw the 3D image.
  */
  trr_dots_effect_initSceneData(
    trr_globals.dots_effect.imagedata, trr_globals.dots_effect.defaults.dots_size,
    trr_globals.dots_effect.defaults.dots_color, trr_globals.dots_effect.defaults.vertex_speed,
    trr_globals.dots_effect.scene,
  /*2-Callback when done*/ function() {
  callback();
  /*2-*/});/*1-*/});
};

/* The next step is to get the data from the scene, select
   the pixels we want to keep and store in a scene.particles array so we can
   later animate/draw the 3D image.
*/
var trr_dots_effect_initSceneData = function(imagedata, dots_size, dots_color, vertex_speed,
                          scene, callback) {
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
  callback();
};

/* Convert our image into an array of data. Create a new image element and
execute the 'drawScene' function when it is loaded.
*/
var trr_dots_effect_getTheJpeqImageData = function(callback) {
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

  console.log('image_name = ' + image_name);
  console.log('image.width = ' + image.width + '. image.height = ' + image.height);
  console.log('canvas.width = ' + canvas.width + '. canvas.height = ' + canvas.height);
  console.log('move canvas image: ' +
              (trr_globals.dots_effect.defaults.move_canvas_image_left ? 'left' : trr_globals.dots_effect.defaults.move_canvas_image_right ? 'right' : 'NO') +
              ' by ' + trr_globals.dots_effect.defaults.move_canvas_image_by_px + ' pixels.');

  //return ctx.getImageData(0, 0, image.width, image.height);
  callback( ctx.getImageData(0, 0, image.width, image.height) );
  return;
}

function trr_build_default_view_before_first_swap_in_for_dots_effect( callback ) {
  trr_statusLog( "  ..*4.1m: trr_build_default_view_before_first_swap_in_for_dots_effect().*" );

  callback();
};
