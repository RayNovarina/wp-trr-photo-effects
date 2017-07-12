var trr_globals = {
  //logging: true,
  logging: false,
  log_id: "trr-pe-loader()",
  fatal_err: false,
  plugin_required_class: 'trr-photo-effect',
  plugin_required_class_ref: '.trr-photo-effect',
  plugin_required_elem_def: '<img class="trr-photo-effect trr-pe-canvas-dots trr-pe-pixellete title="photo_ur"/>',
  dots_effect_class: 'trr-pe-canvas-dots',
  dots_effect_class_ref: '.trr-pe-canvas-dots',
  pixellate_effect_class: 'trr-pe-pixellete',
  pixellate_effect_class_ref: '.trr-pe-pixellete',

  scripts_remaining_to_finish_loading_count: -1,

  scripts_to_be_loaded: [
      // 3rd party libs.
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/ThreeJs/three.min.js',

      // Plugin core libs.
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/globals.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/lib.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/init.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/click-event.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/scroll-event.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/page-fixups.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/main.js',
    ],

  dot_effect_scripts: [
      // for the dots effect extensions.
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/globals-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/management-page-fixes-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/init-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/lib-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/images/image-data-canvas-dots.js',
    ],

}; // end of trr_globals{}

trr_globals.window_location_origin = window.location.origin;

trr_globals.classes = jQuery('body').attr('class');
trr_globals.page_num_begin = trr_globals.classes.indexOf('page-id-');
trr_globals.wp_page_id = trr_globals.classes.slice( (trr_globals.page_num_begin + 'page-id-'.length), (trr_globals.page_num_begin + trr_globals.classes.slice(trr_globals.page_num_begin).indexOf(' ')) );

trr_log( "  ..*1a: " + trr_globals.log_id + ": host domain '" + trr_globals.window_location_origin + "' " +
         "fixups_target_page_class_ref: '" + trr_globals.plugin_required_class_ref +
         "WP page id: '" + trr_globals.wp_page_id + "' *" );

function trr_log (msg) {
  if (trr_globals.logging) {
    console.log(msg);
  }
};

/*
if page has our plugin tag, load basics.
load effect lib for each mentioned effect.
 */

trr_globals.photos = jQuery( trr_globals.plugin_required_class_ref ).toArray();
trr_log( "  ..*1b: " + trr_globals.log_id + ": Load plugin files for " + trr_globals.photos.length + " photos.*" );

if ( trr_globals.photos.length == 0 ) {
  trr_log( "  ..*1c: " + trr_globals.log_id + ": No photo effects requested for this page. *" );

} else {
  trr_globals.dots_effect_photos = jQuery( trr_globals.dots_effect_class_ref ).toArray();
  trr_globals.pixellate_effect_photos = jQuery( trr_globals.pixellate_effect_class_ref ).toArray();
  trr_log( "  ..*1d: " + trr_globals.log_id + ": Load animation effect files for " +
           trr_globals.dots_effect_photos.length + " canvas-dot Effect photos.  " +
           trr_globals.pixellate_effect_photos.length + " pixellate Effect photos.  " +
           "*" );

  if ( trr_globals.dots_effect_photos.length > 0 ) {
    jQuery.merge( trr_globals.scripts_to_be_loaded, trr_globals.dot_effect_scripts );
  }
  trr_globals.scripts_remaining_to_finish_loading_count = trr_globals.scripts_to_be_loaded.length;

  trr_log( trr_globals.log_id + "  ..*1f: scripts_to_be_loaded = " + trr_globals.scripts_to_be_loaded.length +
           ". scripts_remaining_to_finish_loading_count = " + trr_globals.scripts_remaining_to_finish_loading_count );

  jQuery.each( trr_globals.scripts_to_be_loaded, function( index, url_src ) {
    // NOTE: per: https://api.jquery.com/jquery.getscript/
    // By default, $.getScript() sets the cache setting to false. This appends a
    // timestamped query parameter to the request URL to ensure that the browser
    // downloads the script each time it is requested. You can override this
    // feature by setting the cache property globally using $.ajaxSetup():

    // NOTE: If cache = true, browser javascript debugger Breakpoints will not
    // work in the loaded file(s) because the file name with the Breakpoints has
    // changed.
    //jQuery.ajaxSetup({
    //  cache: true
    //});

    jQuery.getScript( url_src )
      .done(function( script, textStatus ) {
        trr_globals.scripts_remaining_to_finish_loading_count --;
        trr_log( trr_globals.log_id + "  ..*1e(" + trr_globals.scripts_remaining_to_finish_loading_count +
                 " remaining): '" +
                 textStatus + "'. For loading <script> file " +
                 index + ": "+ url_src  );
      })
      .fail(function( jqxhr, settings, exception ) {
        trr_globals.scripts_remaining_to_finish_loading_count --;
        console.log( trr_globals.log_id + "  ..*1f(" + trr_globals.scripts_remaining_to_finish_loading_count +
                     " remaining): " +
                     ": ** ERROR: Triggered ajaxError handler. For <script> file " + index + ": "+ url_src  );
      });
  }); // end of jQuery.each( trr_globals.load_always_scripts
} // end else {}
