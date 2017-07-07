var getImageData = function(callback) {
  globals.canvas = document.createElement("canvas");
  globals.image = document.createElement("img");

  //image.src = imgData;

  //image.src = cat_original_100x100_jpeg;
  //image_name = 'cat_original_100x100_jpeg';

  //image.src = man_profile_300x300_jpeg;
  //image_name = 'man_profile_300x300_jpeg';

  //image.src = man_profile_100x100_jpeg;
  //image_name = 'man_profile_100x100_jpeg';

  globals.image.src = man_profile_200x200_jpeg;
  globals.image_name = 'man_profile_200x200_jpeg';

	globals.canvas.width = globals.image.width;
	globals.canvas.height = globals.image.height;

  var after_drawImage_delay = 0;
  setTimeout(function() {

    var ctx = globals.canvas.getContext("2d");
    ctx.drawImage(globals.image, 0, 0);

    console.log('image_name = ' + globals.image_name);
    console.log('canvas.width = ' + globals.canvas.width + '. canvas.height = ' + globals.canvas.height);
    console.log('canvas.width = ' + globals.canvas.width + '. canvas.height = ' + globals.canvas.height);

    //return ctx.getImageData(0, 0, image.width, image.height);
    callback( ctx.getImageData(0, 0, globals.image.width, globals.image.height) );
    return;
  }, after_drawImage_delay);
}

globals.render = function(a) {
	requestAnimationFrame(globals.render);

	globals.particles.geometry.verticesNeedUpdate = true;
	//if(!isMouseDown){
	globals.camera.position.x += (0-globals.camera.position.x)*0.06;
	globals.camera.position.y += (0-globals.camera.position.y)*0.06;
	globals.camera.lookAt(globals.centerVector);
	//}

	globals.renderer.render(globals.scene, globals.camera);
};

var drawTheMap = function(imagedata, dots_size, dots_color, vertex_speed,
                          render, scene, callback) {
	var geometry = new THREE.Geometry();
	var material = new THREE.PointsMaterial({
    // changes size of dots. lessens the empty space around each dot.
		size: dots_size,
    // changes color of dots.
		color: dots_color,
		sizeAttenuation: false
	});

	for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
		for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
			if (imagedata.data[(x * 4 + y * 4 * imagedata.width)] < 128) {

				var vertex = new THREE.Vector3();
				vertex.x = x - imagedata.width / 2;
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random()*500;

				vertex.speed = Math.random() / vertex_speed + 0.015;

				geometry.vertices.push(vertex);
			}
		}
	}
	var particles = new THREE.Points(geometry, material);

	scene.add(particles);

	requestAnimationFrame(render);
  callback(particles);
};
