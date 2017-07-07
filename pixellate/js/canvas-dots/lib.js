var getImageData = function(callback) {
  var canvas = document.createElement("canvas");
  var image = document.createElement("img");

  //image.src = imgData;

  //image.src = cat_original_100x100_jpeg;
  //image_name = 'cat_original_100x100_jpeg';

  //image.src = man_profile_300x300_jpeg;
  //image_name = 'man_profile_300x300_jpeg';

  //image.src = man_profile_100x100_jpeg;
  //image_name = 'man_profile_100x100_jpeg';

  image.src = man_profile_200x200_jpeg;
  image_name = 'man_profile_200x200_jpeg';

	canvas.width = image.width;
	canvas.height = image.height;

  var after_drawImage_delay = 000;
  setTimeout(function() {

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    console.log('image_name = ' + image_name);
    console.log('canvas.width = ' + canvas.width + '. canvas.height = ' + canvas.height);
    console.log('canvas.width = ' + canvas.width + '. canvas.height = ' + canvas.height);

    //return ctx.getImageData(0, 0, image.width, image.height);
    callback( ctx.getImageData(0, 0, image.width, image.height) );
    return;
  }, after_drawImage_delay);
}

var render = function(a) {
	requestAnimationFrame(render);

	particles.geometry.verticesNeedUpdate = true;
	//if(!isMouseDown){
	camera.position.x += (0-camera.position.x)*0.06;
	camera.position.y += (0-camera.position.y)*0.06;
	camera.lookAt(centerVector);
	//}

	renderer.render(scene, camera);
};

var drawTheMap = function(imagedata, callback) {
	var geometry = new THREE.Geometry();
	var material = new THREE.PointsMaterial({
    // changes size of dots. lessens the empty space around each dot.
		size: 4,//3,
    // changes color of dots.
    // 0x024059 is blueish.
    // 0x022020 is greenish
    // 0xFFFFFF is white/becomes invisible if white background.
    // 0x059059 is light green.
    // 0x014080 is a good halftone blue.
		color: 0x014080,
		sizeAttenuation: false
	});

	for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
		for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
			if (imagedata.data[(x * 4 + y * 4 * imagedata.width)] < 128) {

				var vertex = new THREE.Vector3();
				vertex.x = x - imagedata.width / 2;
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random()*500;

				vertex.speed = Math.random() / speed + 0.015;

				geometry.vertices.push(vertex);
			}
		}
	}
	particles = new THREE.Points(geometry, material);

	scene.add(particles);

	requestAnimationFrame(render);
  callback();
};

var onResize = function(){
	ww = window.innerWidth;
	wh = window.innerHeight;
	renderer.setSize(ww, wh);
    camera.left    = ww / - 2;
    camera.right   = ww / 2;
    camera.top     = wh / 2;
    camera.bottom  = wh / - 2;
    camera.updateProjectionMatrix();
};
