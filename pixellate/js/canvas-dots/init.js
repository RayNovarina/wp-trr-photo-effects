
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

  jQuery(window).load(function () {
   window.scrollTo(0,0);
  });
};

function trr_convert_data_to_html() {
  // Bind events and initialize plugin
  /*
  <img class="trr-photo-effect title="photo_url halftone_url"/>
  */

  jQuery('body').append('<canvas id="myCanvas"></canvas>');
  globals.state = {};
  globals.photos = jQuery( globals.photo_effect_class_ref ).toArray();
  trr_statusLog( "  ..*13: trr_convert_data_to_html(): START data to html conversion for " + globals.photos.length + " photos.*" );

  if ( globals.photos.length == 0 ) {
    trr_statusLog( "  ..*13a: trr_convert_data_to_html(): photo_effect_class_ref '" + globals.photo_effect_class_ref + "' NOT FOUND.'*");
    return;
  }
  jQuery.each( globals.photos, function( index, el ) {
    jQuery(el).attr( 'id', ('photo-' + (index + '') ) );
    jQuery(el).attr('photo-idx', index + '');

    if ( globals.defaults.scroll_events) {
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
  });
  trr_statusLog( "  ..*14: trr_init(): END data to html conversion.*" );
};

function trr_build_default_view( callback ) {
  trr_statusLog( "  ..*15: trr_init(): Create default bio image from profile " + globals.defaults.active_profile_idx + ".*" );
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
    antialias: true
  });
  renderer.setSize(ww, wh);
  // change background color of canvas.
  // 0x00010D is very black.
  // 0x0000FF is very blue.
  // 0xFFFFFF is white.
  renderer.setClearColor(0xFFFFFF);

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera( ww / - 2, ww / 2, wh / 2, wh / - 2, 1, 1000 );
  camera.position.set(7, 0, 4);
  camera.lookAt(centerVector);
  scene.add(camera);
  camera.zoom = 4;
  camera.updateProjectionMatrix();

  getImageData(
  /*1-Callback when done*/ function(imagedata) {
  drawTheMap(imagedata,
  /*2-Callback when done*/ function() {
  callback();
  return;
  /*2-*/});/*1-*/});
};

/*
var init = function( callback ) {
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
    antialias: true
  });
  renderer.setSize(ww, wh);
  // change background color of canvas.
  // 0x00010D is very black.
  // 0x0000FF is very blue.
  // 0xFFFFFF is white.
  renderer.setClearColor(0xFFFFFF);

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera( ww / - 2, ww / 2, wh / 2, wh / - 2, 1, 1000 );
  camera.position.set(7, 0, 4);
  camera.lookAt(centerVector);
  scene.add(camera);
  camera.zoom = 4;
  camera.updateProjectionMatrix();

  // imagedata = getImageData();
  getImageData(
//  /*1-Callback when done*/ /*function(imagedata) {
//  drawTheMap(imagedata,
//  /*2-Callback when done*/ /*function() {
//  callback();
//  return;
//  /*2-*/ //});/*1-*/});
//};
//*/
