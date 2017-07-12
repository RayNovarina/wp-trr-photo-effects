
function trr_init( callback ) {
  // console.clear();
  console.log("************************ 4a: trr_init( scroll_events: " + trr_globals.defaults.scroll_events + ") ************************");
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

  // my plugin effect libs:
  if ( typeof trr_globals.dots_effect !== 'undefined' ) {
    console.debug("dots_effect_libs are loaded");
  } else {
    console.debug("dots_effect_libs NOT loaded");
  }
  if (typeof trr_globals.pixellate_effect !== 'undefined') {
    console.debug("pixellate_effect_libs are loaded");
  } else {
    console.debug("pixellate_effect_libs NOT loaded");
  }

  trr_globals.window_location_origin = window.location.origin,
  trr_globals.window_width = window.innerWidth,
  trr_globals.window_height = window.innerHeight;
  
  var classes = jQuery('body').attr('class');
  var page_num_begin = classes.indexOf('page-id-');
  trr_globals.wp_page_id = classes.slice( (page_num_begin + 'page-id-'.length), (page_num_begin + classes.slice(page_num_begin).indexOf(' ')) );
  trr_globals.fixups_target_page_class_ref = '.page-id-' + trr_globals.wp_page_id; // '.page-id-874',

  var target_page_class_ref = trr_globals.fixups_target_page_class_ref, // i.e. '.page-id-874'
      plugin_class_ref = trr_globals.photo_effect_class_ref; // i.e. '.trr-photo-effect'
  trr_globals.target_page_references = jQuery( target_page_class_ref );
  trr_globals.plugin_references = jQuery( plugin_class_ref );

  trr_statusLog( "  ..*4b: trr_init(): host domain '" + trr_globals.window_location_origin + "' " +
                 "  fixups_target_page_class_ref '" + target_page_class_ref +
                 "'. References = " + trr_globals.target_page_references.length +
                 ". plugin class ref '" + plugin_class_ref +
                 "'. References = " + trr_globals.plugin_references.length +
                 "*");

  if ( trr_globals.target_page_references.length == 0 ||
       trr_globals.plugin_references.length == 0 ) {
    trr_statusLog( "  ..*4c: trr_init(): Plugin not enabled for this page. WP page class or plugin references NOT FOUND. Nothing to do.'*");
    trr_globals.status.enabled = false;
    callback();
    return;
  }
  // We are wanted.
  trr_globals.status.enabled = true;

  // Determine which extensions are enabled.
  var effect_class_ref = '';
  if ( typeof trr_globals.dots_effect == 'undefined') {
    trr_globals.dots_effect = {
      enabled: false,
    }
    trr_statusLog( "  ..*4d: trr_init(): dots photo effect not loaded for this page. Nothing to do.'*");
  } else {
    effect_class_ref = trr_globals.photo_effect_class_ref + trr_globals.dots_effect.photo_effect_class_ref,
    trr_globals.dots_effect.photos = jQuery( effect_class_ref );
    if ( trr_globals.dots_effect.photos.length == 0 ) {
      trr_statusLog( "  ..*4e: trr_init(): dots photo effect not enabled for this page. " + effect_class_ref + " references NOT FOUND. Nothing to do.'*");
      trr_globals.dots_effect.enabled = false;
    } else {
      trr_globals.dots_effect.enabled = true;
      trr_statusLog( "  ..*4f: trr_init(): dots photo effect enabled for this page. effect class ref '" + effect_class_ref +
                     "'. References = " + trr_globals.dots_effect.photos.length +
                     " *");
      }
  }

  if ( typeof trr_globals.pixellate_effect == 'undefined') {
    trr_globals.pixellate_effect = {
      enabled: false,
    }
    trr_statusLog( "  ..*4g: trr_init(): pixellate photo effect not loaded for this page. Nothing to do.'*");
  } else {
    effect_class_ref = trr_globals.photo_effect_class_ref + trr_globals.pixellate_effect.photo_effect_class_ref,
    trr_globals.pixellate_effect.photos = jQuery( effect_class_ref );
    if ( trr_globals.pixellate_effect.photos.length == 0 ) {
      trr_statusLog( "  ..*4h: trr_init(): pixellate photo effect not enabled for this page. " + effect_class_ref + " references NOT FOUND. Nothing to do.'*");
      trr_globals.pixellate_effect.enabled = false;
    } else {
      trr_globals.pixellate_effect.enabled = true;
      trr_statusLog( "  ..*4i: trr_init(): pixellate photo effect enabled for this page. effect class ref '" + effect_class_ref +
                     "'. References = " + trr_globals.pixellate_effect.photos.length +
                     " *");
    }
  }

  window.scrollTo(0,0);
  callback();
};

function trr_convert_data_to_html( callback ) {
  trr_globals.photos = jQuery( trr_globals.photo_effect_class_ref ).toArray();
  trr_statusLog( "  ..*4j: trr_convert_data_to_html(): START data to html conversion for " + trr_globals.photos.length + " photos.*" );

  trr_convert_data_before_main_loop_if_dots_effect(
  /*1-Resume here when done*/ function() {
  trr_convert_data_before_main_if_loop_pixellate_effect(
  /*2-Resume here when done*/ function() {

  var last_photo = trr_globals.photos.length - 1;
  jQuery.each( trr_globals.photos, function( index, el ) {
    var $el = jQuery(el);
    $el.attr( 'id', ('photo-' + (index + '') ) );
    $el.attr('photo-idx', index + '');
    trr_statusLog( "  ..*4k: trr_convert_data_to_html().for_each: index: " + index + ".*" );
    trr_convert_data_for_each_if_dots_effect( index, $el,
    /*2a-Resume here when done*/ function() {
    trr_convert_data_for_each_if_pixellate_effect( index, $el,
    /*2b-Resume here when done*/ function() {
    if ( index == last_photo ) {
      trr_statusLog( "  ..*4l: trr_convert_data_to_html(): END data to html conversion.*" );
      callback();
      return;
    }
    /*2b-*/});/*2a-*/});
  }); // end of jQuery.each()
  /*2-*/});/*1-*/});
};


function trr_build_default_view( callback ) {
  trr_statusLog( "  ..*4m: trr_init(): Create default bio animation from profile " + trr_globals.defaults.active_photo_idx + ".*" );
  trr_build_default_view_before_first_swap_in_if_dots_effect(
  /*1-Resume here when done*/ function() {
  trr_build_default_view_before_first_swap_in_if_pixellate_effect(
  /*2-Resume here when done*/ function() {

  // NOTE: upload, scroll event will trigger for 1st bio. Use that event to init bio page.
  if ( !trr_globals.defaults.scroll_events) {
    // Put default profile into bio page, make photo animation appear.
    trr_swap_in_photo( trr_globals.defaults.active_photo_idx, 'appear', 0, '',
    /*2a-Resume here when done*/ function() {
    callback();
    /*2a-*/});
    return;
  }
  callback();
  /*2-*/});/*1-*/});
};

//===============================================
function trr_convert_data_before_main_loop_if_dots_effect( callback ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_convert_data_before_main_loop_for_dots_effect !== 'undefined') {
    trr_convert_data_before_main_loop_for_dots_effect(
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};

function trr_convert_data_before_main_if_loop_pixellate_effect( callback ) {
  if ( trr_globals.pixellate_effect.enabled &&
       typeof trr_convert_data_before_main_loop_for_pixellate_effect !== 'undefined') {
    trr_convert_data_before_main_loop_for_pixellate_effect(
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};

function trr_build_default_view_before_first_swap_in_if_dots_effect( callback ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_build_default_view_before_first_swap_in_for_dots_effect !== 'undefined') {
    trr_build_default_view_before_first_swap_in_for_dots_effect(
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};

function trr_build_default_view_before_first_swap_in_if_pixellate_effect( callback ) {
  if ( trr_globals.pixellate_effect.enabled &&
       typeof trr_build_default_view_before_first_swap_in_for_pixellate_effect !== 'undefined') {
    trr_build_default_view_before_first_swap_in_for_pixellate_effect(
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};

function trr_convert_data_for_each_if_dots_effect(  index, $el, callback ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_convert_data_for_each_for_dots_effect !== 'undefined') {
    trr_convert_data_for_each_for_dots_effect( index, $el,
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};

function trr_convert_data_for_each_if_pixellate_effect(  index, $el, callback ) {
  if ( trr_globals.pixellate_effect.enabled &&
       typeof trr_convert_data_for_each_for_pixellate_effect !== 'undefined') {
    trr_convert_data_for_each_for_pixellate_effect( index, $el,
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};
