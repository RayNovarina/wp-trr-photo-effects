
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
                        // per: https://stackoverflow.com/questions/39132397/how-can-i-overlay-a-canvas-over-a-paragraph-so-that-its-title-is-shown-when-hove
                        //'position: relative; ' +
                        'position: fixed; ' +
                        //'position: absolute' +
                        'z-index: -1; ' +
                        'top: 0; ' + // 15%;
                        'left: 0; ' + // 54%; ' +
                        //'border: 2px solid red;' +
                        '" ' +
         '></canvas>').insertBefore( jQuery( '.entry-header' ) );

  //jQuery('.entry-content').css('opacity', '0.99');
  jQuery('article').css('opacity', '0.8');

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
//callback();
//return;

  trr_statusLog( "  ..*15: trr_init(): Create default bio image from profile " + globals.defaults.active_profile_idx + ".*" );

  globals.window_width = window.innerWidth,
  globals.window_height = window.innerHeight;

  globals.centerVector = new THREE.Vector3(0, 0, 0);
  globals.defaults.vertex_speed = 10;

  globals.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
    antialias: true
  });

  // background color of canvas.
  globals.renderer.setSize(globals.window_width, globals.window_height);
  // changes size of dots. lessens the empty space around each dot.
  globals.renderer.setClearColor(globals.defaults.renderer_canvas_background_color);

  globals.scene = new THREE.Scene();

  globals.camera = new THREE.OrthographicCamera(
    globals.window_width / - 2,
    globals.window_width / 2,
    globals.window_width / 2,
    globals.window_width / - 2,
    1,
    1000 );

  globals.camera.position.set(7, 0, 4);
  globals.camera.lookAt(globals.centerVector);
  globals.scene.add(globals.camera);
  globals.camera.zoom = 4;
  globals.camera.updateProjectionMatrix();

  getImageData(
  /*1-Callback when done*/ function(imagedata) {
  globals.imagedata = imagedata;
  drawTheMap(globals.imagedata, globals.defaults.dots_size,
             globals.defaults.dots_color, globals.defaults.vertex_speed,
             globals.render, globals.scene,
  /*2-Callback when done*/ function(particles) {
  globals.particles = particles;
  callback();
  return;
  /*2-*/});/*1-*/});
};
