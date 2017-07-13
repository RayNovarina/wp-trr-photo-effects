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
The next step is to draw the image, get the data from the scene and finally
clearing it. To get the data we will use the getImageData method from the
Canvas API.
This method returns an object with an array in it that contains 4 values for
each pixel: one for each color (RGB) and a last one for the Alpha.
You can find more infos about the getImageData method here

ctx.drawImage(png, 0, 0);
var data = ctx.getImageData(0, 0, png.width, png.height);
ctx.clearRect(0,0,canvas.width, canvas.height);

We now have an array with the data of every pixel from the image. But we only
want specific pixels. In this case I will select only the pixel with no
transparency (but you can target all the blue pixels, the darker
pixels [...] It's up to you !).

To select the pixels we need, we will loop through the Y and the X axis of
our image. That's why we have a loop into another one.
I check if it's four value (Alpha) is over than 128, the average value.
(Each value is between 0 and 255).
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

==========================

/*
// index = photo index#.
// $el is jQuery(photo element)
function trr_convert_data_for_each( index, $el ) {

  if ( globals.defaults.scroll_events) {

    trigger_el = trr_
    // Add scrollMagic hook for this bio.
    // create a scene
    // trigger position:
    //   default: element CROSSES THE MIDDLE of the viewport
    //   onEnter: element CROSSES THE BOTTOM of the viewport - either scroll up or down.
    //   onLeave: element
    //
    // function callback (event) {
    //  console.log("Event fired! (" + event.type + ")");
    // }
    // add listeners
    //   scene.on("change update progress start end enter leave", callback);

    new ScrollMagic.Scene({
      // trigger point is the bio Title line.
      triggerElement: '.bio-container-for-' + jQuery(el).attr( 'id')
      + ' .info' + ' .title', // point of execution
          triggerHook: 'onEnter', // on enter from the bottom.
          // ,offset: 200
        })
        .on('start', function (event) {
            // event.scrollDirection:
            //    PAUSED:
            // event.state:
            //    DURING  - scroll down
            //    BEFORE  - scroll up
            // console.log('event: ' + event.scrollDirection + ': ' + event.state);
            trr_scroll_trigger( event,
              (event.state == 'DURING' ? 'moving_up_into_view' :
               event.state == 'BEFORE' ? 'moving_down_out_of_view' : ''),
              '.bio-container-for-', '.bio-container-for-' + jQuery(el).attr( 'id') );
        })
        .addTo(globals.scrollMagic_controller); // assign the scene to the controller
      }

      if ( globals.defaults.click_events) {
        trr_add_click_handler( index, el);
      }


          // chop up bio image into '<img /><div>trr-pixell-array' $pixel <span> array.</div>
          jQuery(el).trr_pixellate('', jQuery(el).find('+ div'));
          // initial state is an exploded image.
          jQuery(el).trr_pixellate('out', jQuery(el).find('+ div'));
}

function trr_build_default_view_before_first_swap_in() {

}
*/

//====================

/*
<script src=" https://4e73598e.ngrok.io/Sites/exploding-profiles/js/exploding-profiles-trr-fixes.js"></script>
<script src=" https://4e73598e.ngrok.io/Sites/exploding-profiles/js/exploding-profiles-globals.js"></script>
*/
function trr_target_page_fixups() {
if ( jQuery( trr_globals.fixups_target_page_class_ref ).length > 0 ) {

trr_statusLog( "  ..*0: trr_target_page_fixups(): for WP page class '" + trr_globals.fixups_target_page_class_ref + "'. References = " + jQuery( trr_globals.fixups_target_page_class_ref ).length + "*");
//jQuery('.page-id-874 header').html()

//jQuery('.page-id-874 header').toArray()[0]
//<header class="tc-header clearfix row-fluid tc-tagline-off tc-title-logo-on  tc-shrink-on tc-menu-on logo-left tc-second-menu-on tc-second-menu-in-sn-before-when-mobile" role="banner" style="height: auto; top: 32px;">

jQuery('body' + trr_globals.fixups_target_page_class_ref).removeClass('tc-sticky-header');

// Scrubs top nav header. Logo, nav links, tagline, etc.
jQuery( trr_globals.fixups_target_page_class_ref + ' header').toArray()[0].innerHTML =
'<div class="brand span3 pull-left">' +
'  <a class="site-logo" href="http://trafficrevenueresults.com/" title="Translarity | ">' +
'    <img src="http://trafficrevenueresults.com/wp-content/uploads/2017/06/Translarity-Logo-April-V1.200.png" alt="Back Home" width="1050" height="195" class=" attachment-657"/></a>' +
'</div>' +
'<div class="navbar-wrapper clearfix span9 tc-submenu-move tc-open-on-hover pull-menu-right">' +
'<div class="navbar resp">' +
'<div class="navbar-inner" role="navigation">' +
'<div class="row-fluid">' +
'<div class="nav-collapse collapse tc-hover-menu-wrapper">' +
'<div class="menu-primary-menu-container">' +
'  <ul id="menu-primary-menu-2" class="nav tc-hover-menu">' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-170"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/">Home</a></li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-169"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/wafer-translator-technology/">Technology</a></li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-345"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/news/">News</a></li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children dropdown menu-item-172"' +
'      ><a style="font-size: 16px; color: rgb(0, 136, 204);" ' +
'          href="http://trafficrevenueresults.com/about/">About Us <strong class="caret"></strong></a>' +
'      <ul class="dropdown-menu">' +
'	       <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-295 current_page_item menu-item-297"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/management-team/">Translarity Management Team</a></li>' +
'	       <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-298"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/board-of-directors/">Board of Directors</a></li>' +
'      </ul>' +
'    </li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-171"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/contact/">Contact</a></li>' +
'    </ul>' +
'</div></div>' +
//'  <div class="btn-toggle-nav pull-right"><button type="button" class="btn menu-btn" data-toggle="collapse" data-target=".nav-collapse" title="Open the menu" aria-label="Open the menu"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span> </button>' +
//'  </div>' +
'</div>' +
'</div><!-- /.navbar-inner -->' +
'</div><!-- /.navbar resp -->' +
'</div><!-- /.navbar-wrapper -->' +
'';

//jQuery('.page-id-874 #tc-reset-margin-top')
//Object { 0: <div#tc-reset-margin-top.container-fluid>, selector: ".page-id-874 #tc-reset-margin-top", length: 1, prevObject: Object, context: HTMLDocument → management-team }

// Move page title up. After zapping mobile flex css?
jQuery( trr_globals.fixups_target_page_class_ref + ' #tc-reset-margin-top').attr('style', 'margin-top: 40px;');

// jQuery('.entry-header').html()
//"<h1 class="entry-title ">Translarity Management Team</h1><hr class="featurette-divider __before_content">        "

//jQuery('.page-id-874 .entry-content').attr('style', 'font-size: 18px; line-height: 1.6em;');

// Make page title and intro paragraphs disappear so we can play with positioning our <canvas>
jQuery( trr_globals.fixups_target_page_class_ref + ' .entry-header' ).attr('style', 'display: none;');

jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' p.full' ).toArray()[0] ).attr('style', 'display: none;');
jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' p.full' ).toArray()[1] ).attr('style', 'display: none;');

//jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).attr('style', 'display: none;');
jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).attr('style', '');
jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).html( '' );


//
//jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' header').toArray()[0] ).attr('style', 'height: 60px; top: 0px;');

//
jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' header').toArray()[0] ).attr('style', 'display:none;');


//jQuery(jQuery('.page-id-5 .navbar .nav>li>a ').toArray()[0]).css('font-size')
// "16px"

} else {
  trr_statusLog( "  ..*0a: trr_target_page_fixups(): WP page class '" + trr_globals.fixups_fixups_target_page_class_ref + "' NOT FOUND.'*");
};

};
//=======================


var globals = {
  pluginName: 'trr_halftone_dots',
  pluginInstanceName: 'trr_plugin_pixellate',

  photo_effect_class: 'trr-photo-effect',
  photo_effect_class_ref: '.trr-photo-effect',
  photo_effect_elem_def: '<img class="trr-photo-effect trr-pe-canvas-dots title="photo_url"/>',

  window_location_origin: '',
  fixups_target_page_num: '',
  fixups_target_page_class_ref: '', // '.page-id-874',

  // threejs
  window_width: null, window_height: null,
  renderer: null, scene: null, camera: null, renderer_width: null, renderer_height: null,
  particles: null, canvas: null, image: null, centerVector: null, myRenderFunc: null,

  defaults: {
    // Profile who's bio is visible.
    active_profile_idx: 0,

    // Scrolling results in change of bio.
    scroll_events: false,

    // Click on profile photo results in change of bio.
    click_events: false,

    // threejs:
    // ?? used in lib.js:
    //   var vertex = new THREE.Vector3();
    //   vertex.speed = Math.random() / trr_globals.dots_effect.defaults.vertex_speed + 0.015;
    vertex_speed: 10,

    // background color of canvas used by THREE.WebGLRenderer() as in
    //  THREE.WebGLRenderer.setClearColor(HEX integer);
    // 0x00010D is very black.
    // 0x0000FF is very blue.
    // 0xFFFFFF is white.
    renderer_canvas_background_color: 0xF0F8FF,

    // changes size of dots. lessens the empty space around each dot.
    dots_size: 3, //3,

    // changes color of dots.
    // 0x024059 is blueish.
    // 0x022020 is greenish
    // 0xFFFFFF is white/becomes invisible if white background.
    // 0x059059 is light green.
    // 0x014080 is a good halftone blue.
    dots_color: 0x014080,

    move_canvas_image_left: false,
    move_canvas_image_right: true,
    // 0 px puts canvas animation in the center of viewport/html body.
    // should be a % to be responsive?
    move_canvas_image_by_px: 80,

    // pixell select strategy:
    //    pixel array contains 4 values for each pixel: one for each color (RGB)
    //    and at last one for the Alpha. We only want specific pixels. Select only
    //    the pixel with less than the specified transparency.
    //      Default is 128.
    //      if smaller we get less dots for laura_100x100.jpeg
    //      255 is too much, almost solid block.
    //      200 is much better than 128.
    // laura_150x150: best is 220.
    // christopher_lane_150x135: best is 180;
    select_pixels_with_transparency_value_less_than_this_value: 180,
  }
};

//console.log( "  ..*4-global data done for PluginName '" + globals.pluginName + "'*" );
//=============================


var image_name = 'christopher_lane_150x135_jpeg';

var image_data_as_uri =
"data:image/jpeg;base64,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";


//---------------------------



function xtrr_init() {
  // console.clear();
  console.log("************************ trr_init( scroll_events: " + trr_globals.dots_effect.defaults.scroll_events + ") ************************");
  // jQuery:
  if (typeof jQuery !== 'undefined') {
    // jQuery is loaded
    console.debug("jQuery "+ jQuery.fn.jquery +" loaded");
    /* As for the prefix, jQuery should always work. If you want to use $ you
       can wrap your code to a function and pass jQuery to it as the parameter:
        (function( $ ) {
          $( '.class' ).doSomething();  // works always
        })( jQuery )
    */
  } else {
    console.debug("jQuery NOT loaded");
  }

  // ScrollMagic:
  if (typeof ScrollMagic !== 'undefined') {
    console.log("ScrollMagic v%s loaded", ScrollMagic.version);
    if ( trr_globals.defaults.scroll_events) {
      trr_globals.scrollMagic_controller = new ScrollMagic.Controller();
    }
  } else {
    console.debug("ScrollMagic NOT loaded");
  }

  // TweenMax:
  if (typeof TweenMax !== 'undefined') {
    console.log("TweenMax v%s loaded", TweenMax.version);
    // if ( !trr_globals.defaults.scroll_events) {
      // Create a timeline
      // var tl = new TimelineMax({options});
    // }
  } else {
    console.debug("TweenMax NOT loaded");
  }

  // ScrollToPlugin:
  if (typeof ScrollToPlugin !== 'undefined') {
    console.log("ScrollToPlugin v%s loaded", ScrollToPlugin.version);

  } else {
    console.debug("ScrollToPlugin NOT loaded");
  }

  // threejs:
  if (typeof THREE !== 'undefined') {
    // threejs is loaded
    console.debug("THREE.js lib loaded");
  } else {
    console.debug("THREE.js lib NOT loaded");
  }

  trr_globals.window_location_origin = window.location.origin;

  var classes = jQuery('body').attr('class');
  var page_num_begin = classes.indexOf('page-id-');
  var page_num = classes.slice( (page_num_begin + 'page-id-'.length), (page_num_begin + classes.slice(page_num_begin).indexOf(' ')) );

  trr_globals.fixups_target_page_num = page_num,
  trr_globals.fixups_target_page_class_ref = '.page-id-' + trr_globals.fixups_target_page_num; // '.page-id-874',

  trr_statusLog( "  ..*2a: trr_init(): host domain '" + trr_globals.window_location_origin + "' " +
                 "fixups_target_page_class_ref: '" + trr_globals.fixups_target_page_class_ref + "' *" );

  jQuery(window).load(function () {
   window.scrollTo(0,0);
  });
};

//================

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

  trr_globals.dots_effect.myRenderFunc = function(a) {

  	requestAnimationFrame(trr_globals.dots_effect.myRenderFunc);

  	trr_globals.dots_effect.particles.geometry.verticesNeedUpdate = true;
  	//if(!isMouseDown){
  	trr_globals.dots_effect.camera.position.x += (0-trr_globals.dots_effect.camera.position.x)*0.06;
  	trr_globals.dots_effect.camera.position.y += (0-trr_globals.dots_effect.camera.position.y)*0.06;
  	trr_globals.dots_effect.camera.lookAt(trr_globals.dots_effect.centerVector);
  	//}

  	trr_globals.dots_effect.renderer.render(trr_globals.dots_effect.scene, trr_globals.dots_effect.camera);
  };

  callback();
};

function trr_animation_effect_for_dots_effect( parms, callback ) {
  trr_statusLog( "  ..*6.1d: trr_animation_effect_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );

  //-------------------------
  //-------------------------
  trr_globals.dots_effect.centerVector = new THREE.Vector3(0, 0, 0);
  trr_globals.dots_effect.defaults.vertex_speed = 10;

  trr_globals.dots_effect.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("trr-pe-dots-Canvas"),
    antialias: true
  });

  trr_globals.dots_effect.renderer.setSize(trr_globals.window_width, trr_globals.window_height);
  // background color of canvas.
  trr_globals.dots_effect.renderer.setClearColor(trr_globals.dots_effect.defaults.renderer_canvas_background_color);

  trr_globals.dots_effect.scene = new THREE.Scene();

  trr_globals.dots_effect.camera = new THREE.OrthographicCamera(
    trr_globals.dots_effect.window_width / - 2,
    trr_globals.dots_effect.window_width / 2,
    trr_globals.dots_effect.window_height / 2,
    trr_globals.dots_effect.window_height / - 2,
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
  trr_animation_dots_effect_getTheJpeqImageData(
  /*1-Callback when done*/ function(imagedata) {
  trr_globals.dots_effect.imagedata = imagedata;
  /* The next step is to draw the image, get the data from the scene, select
  the pixels we want to keep and store in a scene.particles array and call
  requestAnimationFrame(renderFunc) to animate/draw the 3D image.
  */
  trr_animation_dots_effect_drawTheAnimatedImage(trr_globals.dots_effect.imagedata, trr_globals.dots_effect.defaults.dots_size,
                       trr_globals.dots_effect.defaults.dots_color, trr_globals.dots_effect.defaults.vertex_speed,
                       trr_globals.dots_effect.myRenderFunc, trr_globals.dots_effect.scene,
  /*2-Callback when done*/ function(particles) {
  trr_globals.dots_effect.particles = particles;
  callback();
  return;
  /*2-*/});/*1-*/});

  //-------------------------
  //-------------------------
  callback();
};

/* Convert our image into an array of data. Create a new image element and
execute the 'drawScene' function when it is loaded.
*/
function trr_animation_dots_effect_getTheJpeqImageData (callback) {
  trr_globals.dots_effect.canvas = document.createElement("canvas");
  trr_globals.dots_effect.image = document.createElement("img");

  // NOTE: single image file is defined in images/image_data_uri.js
  //       all images are in images/image_data.js
  trr_globals.dots_effect.image.src = trr_dots_effect_image_data_as_uri;
  trr_globals.dots_effect.image_name = trr_dots_effect_image_name;

	trr_globals.dots_effect.canvas.width = trr_globals.dots_effect.image.width;
	trr_globals.dots_effect.canvas.height = trr_globals.dots_effect.image.height;

  var after_drawImage_delay = 0;
  setTimeout(function() {

    var ctx = trr_globals.dots_effect.canvas.getContext("2d");
    ctx.drawImage(trr_globals.dots_effect.image, 0, 0);

    console.log('image_name = ' + trr_globals.dots_effect.image_name);
    console.log('image.width = ' + trr_globals.dots_effect.image.width + '. image.height = ' + trr_globals.dots_effect.image.height);
    console.log('canvas.width = ' + trr_globals.dots_effect.canvas.width + '. canvas.height = ' + trr_globals.dots_effect.canvas.height);
    console.log('move canvas image: ' +
                (trr_globals.dots_effect.defaults.move_canvas_image_left ? 'left' : trr_globals.dots_effect.defaults.move_canvas_image_right ? 'right' : 'NO') +
                ' by ' + trr_globals.dots_effect.defaults.move_canvas_image_by_px + ' pixels.');

    //return ctx.getImageData(0, 0, image.width, image.height);
    callback( ctx.getImageData(0, 0, trr_globals.dots_effect.image.width, trr_globals.dots_effect.image.height) );
    return;
  }, after_drawImage_delay);
}

/* Draw the image. Get the data from the scene, select
the pixels we want to keep and store in a scene.particles array and call
requestAnimationFrame(renderFunc) to animate/draw the 3D image.
*/
function trr_animation_dots_effect_drawTheAnimatedImage( imagedata, dots_size, dots_color, vertex_speed,
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

//====================
//=============================

function xtrr_convert_data_to_html() {
  // Bind events and initialize plugin
  /*
  <img class="trr-photo-effect title="photo_url halftone_url"/>
  */
  //jQuery( '<canvas id="myCanvas" style="width:100%; height:100%; "></canvas>' ).insertBefore( jQuery(globals.photo_effect_class_ref).first() );
  //jQuery( '<canvas id="myCanvas" style="width:500px; height:500px; border: 2px solid red; "></canvas>' ).insertBefore( jQuery( '.entry-content' ) );

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

  jQuery('<canvas id="myCanvas" ' +
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
  // Make the background of the bio text transparent so that we can scoll over the canvas animation.
  jQuery('article').css('opacity', '0.8');

  trr_globals.photos = jQuery( trr_globals.photo_effect_class_ref ).toArray();
  trr_statusLog( "  ..*13: trr_convert_data_to_html(): START data to html conversion for " + trr_globals.photos.length + " photos.*" );

  if ( trr_globals.photos.length == 0 ) {
    trr_statusLog( "  ..*13a: trr_convert_data_to_html(): photo_effect_class_ref '" + trr_globals.photo_effect_class_ref + "' NOT FOUND.'*");
    return;
  }
  jQuery.each( trr_globals.photos, function( index, el ) {
    jQuery(el).attr( 'id', ('photo-' + (index + '') ) );
    jQuery(el).attr('photo-idx', index + '');

    if ( trr_globals.defaults.scroll_events) {
      // Add scrollMagic hook for this bio.
      // create a scene
      // trigger position:
      //   default: element CROSSES THE MIDDLE of the viewport
      //   onEnter: element CROSSES THE BOTTOM of the viewport - either scroll up or down.
      //   onLeave: element
      //
      // function callback (event) {
      //  console.log("Event fired! (" + event.type + ")");
      // }
      // add listeners
      //   scene.on("change update progress start end enter leave", callback);

      new ScrollMagic.Scene({
        // trigger point is the bio Title line.
        triggerElement: '.bio-container-for-' + jQuery(el).attr( 'id')
        + ' .info' + ' .title', // point of execution
        triggerHook: 'onEnter', // on enter from the bottom.
        // ,offset: 200
      })
      .on('start', function (event) {
          // event.scrollDirection:
          //    PAUSED:
          // event.state:
          //    DURING  - scroll down
          //    BEFORE  - scroll up
          // console.log('event: ' + event.scrollDirection + ': ' + event.state);
          trr_scroll_trigger( event,
            (event.state == 'DURING' ? 'moving_up_into_view' :
             event.state == 'BEFORE' ? 'moving_down_out_of_view' : ''),
            '.bio-container-for-', '.bio-container-for-' + jQuery(el).attr( 'id') );
      })
      .addTo(trr_globals.scrollMagic_controller); // assign the scene to the controller
    }

    if ( trr_globals.defaults.click_events) {
      trr_add_click_handler( index, el);
    }
  });
  trr_statusLog( "  ..*14: trr_init(): END data to html conversion.*" );
};

//function xtrr_build_default_view( callback ) {
  trr_statusLog( "  ..*15: trr_init(): Create default bio image from profile " + trr_globals.defaults.active_profile_idx + ".*" );

  trr_globals.window_width = window.innerWidth,
  trr_globals.window_height = window.innerHeight;

  trr_globals.dots_effect.centerVector = new THREE.Vector3(0, 0, 0);
  trr_globals.dots_effect.defaults.vertex_speed = 10;

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
  getTheJpeqImageData(
  /*1-Callback when done*/ function(imagedata) {
  trr_globals.dots_effect.imagedata = imagedata;
  /* The next step is to draw the image, get the data from the scene, select
  the pixels we want to keep and store in a scene.particles array and call
  requestAnimationFrame(renderFunc) to animate/draw the 3D image.
  */
  drawTheAnimatedImage(trr_globals.dots_effect.imagedata, trr_globals.dots_effect.defaults.dots_size,
             trr_globals.dots_effect.defaults.dots_color, trr_globals.dots_effect.defaults.vertex_speed,
             myRenderFunc, trr_globals.dots_effect.scene,
  /*2-Callback when done*/ function(particles) {
  trr_globals.dots_effect.particles = particles;
  callback();
  return;
  /*2-*/});/*1-*/});
//};

//=============================

/* Convert our image into an array of data. Create a new image element and
execute the 'drawScene' function when it is loaded.
*/
var getTheJpeqImageData = function(callback) {
  trr_globals.dots_effect.canvas = document.createElement("canvas");
  trr_globals.dots_effect.image = document.createElement("img");

  // NOTE: single image file is defined in images/image_data_uri.js
  //       all images are in images/image_data.js
  trr_globals.dots_effect.image.src = image_data_as_uri;
  trr_globals.dots_effect.image_name = image_name;

	trr_globals.dots_effect.canvas.width = trr_globals.dots_effect.image.width;
	trr_globals.dots_effect.canvas.height = trr_globals.dots_effect.image.height;

  var after_drawImage_delay = 0;
  setTimeout(function() {

    var ctx = trr_globals.dots_effect.canvas.getContext("2d");
    ctx.drawImage(trr_globals.dots_effect.image, 0, 0);

    console.log('image_name = ' + trr_globals.dots_effect.image_name);
    console.log('image.width = ' + trr_globals.dots_effect.image.width + '. image.height = ' + trr_globals.dots_effect.image.height);
    console.log('canvas.width = ' + trr_globals.dots_effect.canvas.width + '. canvas.height = ' + trr_globals.dots_effect.canvas.height);
    console.log('move canvas image: ' +
                (trr_globals.dots_effect.defaults.move_canvas_image_left ? 'left' : trr_globals.dots_effect.defaults.move_canvas_image_right ? 'right' : 'NO') +
                ' by ' + trr_globals.dots_effect.defaults.move_canvas_image_by_px + ' pixels.');

    //return ctx.getImageData(0, 0, image.width, image.height);
    callback( ctx.getImageData(0, 0, trr_globals.dots_effect.image.width, trr_globals.dots_effect.image.height) );
    return;
  }, after_drawImage_delay);
}

var myRenderFunc = function(a) {

	requestAnimationFrame(myRenderFunc);

	trr_globals.dots_effect.particles.geometry.verticesNeedUpdate = true;
	//if(!isMouseDown){
	trr_globals.dots_effect.camera.position.x += (0-trr_globals.dots_effect.camera.position.x)*0.06;
	trr_globals.dots_effect.camera.position.y += (0-trr_globals.dots_effect.camera.position.y)*0.06;
	trr_globals.dots_effect.camera.lookAt(trr_globals.dots_effect.centerVector);
	//}

	trr_globals.dots_effect.renderer.render(trr_globals.dots_effect.scene, trr_globals.dots_effect.camera);
};

/* Draw the image. Get the data from the scene, select
the pixels we want to keep and store in a scene.particles array and call
requestAnimationFrame(renderFunc) to animate/draw the 3D image.
*/
var drawTheAnimatedImage = function(imagedata, dots_size, dots_color, vertex_speed,
                          renderFunc, scene, callback) {
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
	var particles = new THREE.Points(geometry, material);

	scene.add(particles);
  // per: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  // The window.requestAnimationFrame() method tells the browser that you wish
  // to perform an animation and requests that the browser call a specified
  // function to update an animation before the next repaint. The method takes
  // as an argument a callback to be invoked before the repaint.
  // Note: Your callback routine must itself call requestAnimationFrame() if
  // you want to animate another frame at the next repaint.
	requestAnimationFrame(renderFunc);
  callback(particles);
};

//=============================

/*
var trr_dots_effect_sceneData = {
  geometry: { },
  material: {
    size: dots_size,
    color: dots_color,
    sizeAttenuation: false
  },
  imagedata: {
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
