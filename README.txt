cd /Applications/MAMP/htdocs/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects
//---------------------------------------------------
based on:
https://codepen.io/anon/pen/rwWGME
http://www.hongkiat.com/blog/less-basic/
http://getbootstrap.com/getting-started/#template
http://www.picturetopeople.org/image_effects/photo-halftone/halftone-image-generator.html
https://www.climate.com/about/leadership

local dev path for this file:
  /Applications/MAMP/htdocs/Sites/wordpress-5-trr-staging/wp-content/plugins/trr-photo-effects/README.txt

browser access: start OSX Mamp. Apache server at localhost:8888
  browser only access: http://localhost:8888/Sites/translarity/index.html.en

Base code cloned via
  $ git clone https://github.com/RayNovarina/harp-heroku-photo-effects.git trr-photo-effects

github repository:
  https://github.com/RayNovarina/wp-trr-phpto-effects.git
staging site:
  http://trafficrevenueresults.com/management-team/

login: http://localhost:8888/Sites/wordpress-5-trr-staging/wp-login.php

===================
jQuery( '<canvas id="myCanvas" style="width:100%; height:100%; "></canvas>' ).insertBefore( jQuery(globals.photo_effect_class_ref).first() );

========================
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

	globals.canvas.width = image.width;
	globals.canvas.height = image.height;

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

var render = function(a) {
	requestAnimationFrame(render);

	particles.geometry.verticesNeedUpdate = true;
	//if(!isMouseDown){
	globals.camera.position.x += (0-globals.camera.position.x)*0.06;
	globals.camera.position.y += (0-globals.camera.position.y)*0.06;
	globals.camera.lookAt(globals.centerVector);
	//}

	renderer.render(globals.scene, globals.camera);
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

===================
original canvas-dots-cat:
per: https://codepen.io/Mamboleoo/pen/wKqwPN
     https://codepen.io/Mamboleoo/post/how-to-convert-an-image-into-particles

Tutorial:

In this tutorial I will just explain how to generate an array filled with
coordinates from the pixels of our image. Those pens above are using ThreeJs
to create a depth effect but I won't get into 3D over here. I will just use
the Canvas API ;)

You need a basic canvas tag in your HTML
<canvas id="scene"></canvas>

We will use some CSS to make our result nicer
body, html{
  width:100%;
  height:100%;
  overflow: hidden;
  background: black;
}
canvas{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}

And finally you need your image
CodePen logo: 100x100 .png 72 DPI Color mode RGB

Get the infos of your image
Now that we have our basic scene we need to convert our image into an array of data.

Create a new image element and execute the 'drawScene' function when it is loaded.
var png = new Image();
png.onload = drawScene;
png.src = "codepen.png";
Now that our image is loaded, we can init our canvas scene.
var canvas    = document.getElementById("scene");
var ctx       = canvas.getContext("2d");

canvas.width = png.width;
canvas.height = png.height;
The next step is to draw the image, get the data from the scene and finally clearing it. To get the data we will use the getImageData method from the Canvas API.
This method returns an object with an array in it that contains 4 values for each pixel: one for each color (RGB) and a last one for the Alpha.
You can find more infos about the getImageData method here
ctx.drawImage(png, 0, 0);
var data = ctx.getImageData(0, 0, png.width, png.height);
ctx.clearRect(0,0,canvas.width, canvas.height);
We now have an array with the data of every pixel from the image. But we only want specific pixels. In this case I will select only the pixel with no transparency (but you can target all the blue pixels, the darker pixels [...] It's up to you !). To select the pixels we need, we will loop through the Y and the X axis of our image. That's why we have a loop into another one.
I check if it's four value (Alpha) is over than 128, the average value. (Each value is between 0 and 255).
If the Alpha is over 128, I push the pixel into my particles array.
var particles = [];
for (var y = 0, y2 = data.height; y < y2; y++) {
    for (var x = 0, x2 = data.width; x < x2; x++) {
        if (data.data[(x * 4 + y * 4 * data.width) + 3] > 128) {
            var particle = {
                x : x,
                y : y
            };
            particles.push(particle);
        }
    }
}
#Check if the array is correct
We can do a quick check by drawing every particle on our scene.

Set the fillStyle to white.
Loop through all the particles.
Draw each particle with its coordinates.
And voila !
ctx.fillStyle = "white";
for(var i=0, j=particles.length;i<j;i++){
    var particle = particles[i];
    ctx.fillRect(particle.x, particle.y, 1, 1);
}

----------------------------
function drawScene(){

	var canvas 	  = document.getElementById("scene");
	var ctx       = canvas.getContext("2d");

	canvas.width = png.width;
	canvas.height = png.height;

	ctx.drawImage(png, 0, 0);

	var data = ctx.getImageData(0, 0, png.width, png.height);
	ctx.clearRect(0,0,canvas.width, canvas.height);

	var	particles = [];
	for (var y = 0, y2 = data.height; y < y2; y++) {
		for (var x = 0, x2 = data.width; x < x2; x++) {
			if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
				var particle = {
					x : x,
					y : y
				};
				particles.push(particle);
			}
		}
	}

	ctx.fillStyle = "white";
	for(var i=0, j=particles.length;i<j;i++){
		var particle = particles[i];
		ctx.fillRect(particle.x, particle.y, 1, 1);
	}

}

var png = new Image();
png.onload = drawScene;
png.src = "data:image/png;base64,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";

===========================

<canvas id="map"></canvas>

canvas {
  width: 100%; height:100%;
  padding: 0; margin: 0;
  overflow: hidden;
}

image = canvas-dots-original-cat is 100x100 as .jpg 72


ww = window.innerWidth,
wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);

==================================
per: https://davidwalsh.name/convert-canvas-image

To convert an image to canvas, you use a canvas element's context's drawImage method:

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}

The 0, 0 arguments map to coordinates on the canvas where the image data should be placed.

Convert Canvas to an Image with JavaScript

Assuming modifications to the image have been made, you can easily convert the canvas data to image data with the following snippet:

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

The code above magically converts the canvas to a PNG data URI!
