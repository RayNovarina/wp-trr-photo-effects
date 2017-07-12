
function trr_init() {
  // console.clear();
  console.log("************************ trr_init( scroll_events: " + globals.defaults.scroll_events + ") ************************");
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
    if ( globals.defaults.scroll_events) {
      globals.scrollMagic_controller = new ScrollMagic.Controller();
    }
  } else {
    console.debug("ScrollMagic NOT loaded");
  }

  // TweenMax:
  if (typeof TweenMax !== 'undefined') {
    console.log("TweenMax v%s loaded", TweenMax.version);
    // if ( !globals.defaults.scroll_events) {
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

  globals.window_location_origin = window.location.origin;

  var classes = jQuery('body').attr('class');
  var page_num_begin = classes.indexOf('page-id-');
  var page_num = classes.slice( (page_num_begin + 'page-id-'.length), (page_num_begin + classes.slice(page_num_begin).indexOf(' ')) );

  globals.fixups_target_page_num = page_num,
  globals.fixups_target_page_class_ref = '.page-id-' + globals.fixups_target_page_num; // '.page-id-874',

  trr_statusLog( "  ..*2a: trr_init(): host domain '" + globals.window_location_origin + "' " +
                 "fixups_target_page_class_ref: '" + globals.fixups_target_page_class_ref + "' *" );

  jQuery(window).load(function () {
   window.scrollTo(0,0);
  });
};

function trr_convert_data_to_html() {
  globals.state = {};
  trr_convert_data_before_main_loop();

  globals.photos = jQuery( globals.photo_effect_class_ref ).toArray();
  trr_statusLog( "  ..*13: trr_convert_data_to_html(): START data to html conversion for " + globals.photos.length + " photos.*" );

  if ( globals.photos.length == 0 ) {
    trr_statusLog( "  ..*13a: trr_convert_data_to_html(): photo_effect_class_ref '" + globals.photo_effect_class_ref + "' NOT FOUND.'*");
    return;
  }
  jQuery.each( globals.photos, function( index, el ) {
    var $el = jQuery(el);
    $el.attr( 'id', ('photo-' + (index + '') ) );
    $el.attr('photo-idx', index + '');
    trr_convert_data_for_each( index, $el );
  });
  trr_statusLog( "  ..*14: trr_init(): END data to html conversion.*" );
};

function trr_build_default_view( callback ) {
  trr_statusLog( "  ..*15: trr_init(): Create default bio image from photo " + globals.defaults.active_photo_idx + ".*" );
  trr_build_default_view_before_first_swap_in();

  // NOTE: upload, scroll event will trigger for 1st bio. Use that event to init bio page.
  if ( !globals.defaults.scroll_events) {
    // Put default photo into bio page, make photo animation appear.
    trr_swap_in_photo( globals.defaults.active_photo_idx, 'appear', 0, '',
    /*1-Callback when done*/ function() {
    /*1-*/});
  }
};

  globals.window_width = window.innerWidth,
  globals.window_height = window.innerHeight;

  globals.centerVector = new THREE.Vector3(0, 0, 0);
  globals.defaults.vertex_speed = 10;

  globals.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
    antialias: true
  });

  globals.renderer.setSize(globals.window_width, globals.window_height);
  // background color of canvas.
  globals.renderer.setClearColor(globals.defaults.renderer_canvas_background_color);

  globals.scene = new THREE.Scene();

  globals.camera = new THREE.OrthographicCamera(
    globals.window_width / - 2,
    globals.window_width / 2,
    globals.window_height / 2,
    globals.window_height / - 2,
    1,
    1000 );

  globals.camera.position.set(7, 0, 4);
  globals.camera.lookAt(globals.centerVector);
  globals.scene.add(globals.camera);
  globals.camera.zoom = 4;
  globals.camera.updateProjectionMatrix();

  /* Now that we have our basic scene we need to convert our image into an
  array of data. Create a new image element and execute the 'drawScene'
  function when it is loaded.
  */
  getTheJpeqImageData(
  /*1-Callback when done*/ function(imagedata) {
  globals.imagedata = imagedata;
  /* The next step is to draw the image, get the data from the scene, select
  the pixels we want to keep and store in a scene.particles array and call
  requestAnimationFrame(renderFunc) to animate/draw the 3D image.
  */
  drawTheAnimatedImage(globals.imagedata, globals.defaults.dots_size,
             globals.defaults.dots_color, globals.defaults.vertex_speed,
             globals.myRenderFunc, globals.scene,
  /*2-Callback when done*/ function(particles) {
  globals.particles = particles;
  callback();
  return;
  /*2-*/});/*1-*/});
};
