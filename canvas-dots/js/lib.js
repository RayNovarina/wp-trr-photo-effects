/* Convert our image into an array of data. Create a new image element and
execute the 'drawScene' function when it is loaded.
*/
var getTheJpeqImageData = function(callback) {
  globals.canvas = document.createElement("canvas");
  globals.image = document.createElement("img");

  // NOTE: single image file is defined in images/image_data_uri.js
  //       all images are in images/image_data.js
  globals.image.src = image_data_as_uri;
  globals.image_name = image_name;

	globals.canvas.width = globals.image.width;
	globals.canvas.height = globals.image.height;

  var after_drawImage_delay = 0;
  setTimeout(function() {

    var ctx = globals.canvas.getContext("2d");
    ctx.drawImage(globals.image, 0, 0);

    console.log('image_name = ' + globals.image_name);
    console.log('image.width = ' + globals.image.width + '. image.height = ' + globals.image.height);
    console.log('canvas.width = ' + globals.canvas.width + '. canvas.height = ' + globals.canvas.height);
    console.log('move canvas image: ' +
                (globals.defaults.move_canvas_image_left ? 'left' : globals.defaults.move_canvas_image_right ? 'right' : 'NO') +
                ' by ' + globals.defaults.move_canvas_image_by_px + ' pixels.');

    //return ctx.getImageData(0, 0, image.width, image.height);
    callback( ctx.getImageData(0, 0, globals.image.width, globals.image.height) );
    return;
  }, after_drawImage_delay);
}

globals.myRenderFunc = function(a) {

	requestAnimationFrame(globals.myRenderFunc);

	globals.particles.geometry.verticesNeedUpdate = true;
	//if(!isMouseDown){
	globals.camera.position.x += (0-globals.camera.position.x)*0.06;
	globals.camera.position.y += (0-globals.camera.position.y)*0.06;
	globals.camera.lookAt(globals.centerVector);
	//}

	globals.renderer.render(globals.scene, globals.camera);
};

/* Draw the image. Get the data from the scene, select
the pixels we want to keep and store in a scene.particles array and call
requestAnimationFrame(renderFunc) to animate/draw the 3D image.
*/
var drawTheAnimatedImage = function(imagedata, dots_size, dots_color, vertex_speed,
                          myRenderFunc, scene, callback) {
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
			if (imagedata.data[(x * 4 + y * 4 * imagedata.width)] < globals.defaults.select_pixels_with_transparency_value_less_than_this_value) {

				var vertex = new THREE.Vector3();
        // The x,y coordinates of where the particle will end up on our canvas.
        // Decrease x to move drawn map to left. Increase to move right.
        var x_adjustment = 0;
        if (globals.defaults.move_canvas_image_left) {
          x_adjustment = -globals.defaults.move_canvas_image_by_px;
        } else if (globals.defaults.move_canvas_image_right) {
          x_adjustment = globals.defaults.move_canvas_image_by_px;
        }

        // x, y of where the particle ends up?
				vertex.x = (x - imagedata.width / 2) + x_adjustment;
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random()*500;

				vertex.speed = Math.random() / globals.defaults.vertex_speed + 0.015;

				geometry.vertices.push(vertex);
			}
		}
	}
	var particles = new THREE.Points(geometry, material);

	scene.add(particles);
  // per: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  // The window.requestAnimationFrame() method tells the browser that you wish
  // to perform an animation and requests that the browser call a specified
  // function to update an animation before the next repaint. The method takes
  // as an argument a callback to be invoked before the repaint.
  // Note: Your callback routine must itself call requestAnimationFrame() if
  // you want to animate another frame at the next repaint.
	requestAnimationFrame(myRenderFunc);
  callback(particles);
};
