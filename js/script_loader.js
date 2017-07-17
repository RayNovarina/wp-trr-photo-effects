var trr_loader_globals = {
  logging: true,
  //logging: false,
  log_id: "trr-pe-loader()",
  fatal_err: false,
  plugin_required_class: 'trr-photo-effect',
  plugin_required_class_ref: '.trr-photo-effect',
  plugin_required_elem_def: '<img class="trr-photo-effect trr-pe-canvas-dots trr-pe-pixellate title="photo_ur"/>',
  dots_effect_class: 'trr-pe-canvas-dots',
  dots_effect_class_ref: '.trr-pe-canvas-dots',
  pixellate_effect_class: 'trr-pe-pixellate',
  pixellate_effect_class_ref: '.trr-pe-pixellate',

  scripts_remaining_to_finish_loading_count: -1,

  scripts_to_be_loaded: [
  ],

  third_party_scripts: [
      // 3rd party libs.
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/ThreeJs/three.min.js',
  ],

  plugin_core_scripts: [
      // Plugin core libs.
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/main.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/globals.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/lib.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/init.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/scroll-event.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/page-fixups.js',
  ],

  dot_effect_scripts: [
      // for the canvas-dots effect extensions.
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/globals-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/management-page-fixes-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/init-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/lib-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/scroll-event-canvas-dots.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/images/image-data-canvas-dots.js',
    ],

  pixellate_effect_scripts: [
      // for the pixellate effect extensions.
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/globals-pixellate.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/management-page-fixes-pixellate.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/init-pixellate.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/lib-pixellate.js',
      'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/scroll-event-pixellate.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/images/image-data-pixellate.js',
  ],

}; // end of trr_loader_globals{}

trr_loader_globals.window_location_origin = window.location.origin;

trr_loader_globals.classes = jQuery('body').attr('class');
trr_loader_globals.page_num_begin = trr_loader_globals.classes.indexOf('page-id-');
trr_loader_globals.wp_page_id = trr_loader_globals.classes.slice( (trr_loader_globals.page_num_begin + 'page-id-'.length), (trr_loader_globals.page_num_begin + trr_loader_globals.classes.slice(trr_loader_globals.page_num_begin).indexOf(' ')) );

console.log( "  ..*1a: " + trr_loader_globals.log_id + ": host domain '" + trr_loader_globals.window_location_origin + "' " +
         "fixups_target_page_class_ref: '" + trr_loader_globals.plugin_required_class_ref +
         "WP page id: '" + trr_loader_globals.wp_page_id + "' *" );

function trr_log (msg) {
  if (trr_loader_globals.logging) {
    console.log(msg);
  }
};

/*
if page has our plugin tag, load basics.
load effect lib for each mentioned effect.
 */

trr_loader_globals.photos = jQuery( trr_loader_globals.plugin_required_class_ref ).toArray();
trr_log( "  ..*1b: " + trr_loader_globals.log_id + ": Load plugin files for " + trr_loader_globals.photos.length + " photos.*" );

if ( trr_loader_globals.photos.length == 0 ) {
  trr_log( "  ..*1c: " + trr_loader_globals.log_id + ": No photo effects requested for this page. *" );

} else {
  jQuery.merge( trr_loader_globals.scripts_to_be_loaded, trr_loader_globals.third_party_scripts );
  jQuery.merge( trr_loader_globals.scripts_to_be_loaded, trr_loader_globals.plugin_core_scripts );

  trr_loader_globals.dots_effect_photos = jQuery( trr_loader_globals.dots_effect_class_ref ).toArray();
  trr_loader_globals.pixellate_effect_photos = jQuery( trr_loader_globals.pixellate_effect_class_ref ).toArray();

  trr_log( "  ..*1d: " + trr_loader_globals.log_id + ": Load animation effect files for " +
           trr_loader_globals.dots_effect_photos.length + " canvas-dot Effect photos.  " +
           trr_loader_globals.pixellate_effect_photos.length + " pixellate Effect photos.  " +
           "*" );

  if ( trr_loader_globals.dots_effect_photos.length > 0 ) {
    jQuery.merge( trr_loader_globals.scripts_to_be_loaded, trr_loader_globals.dot_effect_scripts );
  }
  if ( trr_loader_globals.pixellate_effect_photos.length > 0 ) {
    jQuery.merge( trr_loader_globals.scripts_to_be_loaded, trr_loader_globals.pixellate_effect_scripts );
  }
  trr_log( trr_loader_globals.log_id + "  ..*1e: Third Party scripts: " + trr_loader_globals.third_party_scripts.length +
           ". Plugin Core scripts: " + trr_loader_globals.plugin_core_scripts.length +
           ". Dots-Effect scripts: " + trr_loader_globals.dot_effect_scripts.length +
           ". Pixellate-Effect scripts: " + trr_loader_globals.pixellate_effect_scripts.length
         );

  trr_loader_globals.scripts_remaining_to_finish_loading_count = trr_loader_globals.scripts_to_be_loaded.length;
  trr_log( trr_loader_globals.log_id + "  ..*1f: Total scripts_to_be_loaded = " + trr_loader_globals.scripts_to_be_loaded.length +
           ". scripts_remaining_to_finish_loading_count = " + trr_loader_globals.scripts_remaining_to_finish_loading_count
         );

  jQuery.each( trr_loader_globals.scripts_to_be_loaded, function( index, url_src ) {
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
        trr_loader_globals.scripts_remaining_to_finish_loading_count --;
        //trr_log( trr_loader_globals.log_id + "  ..*1g(" + trr_loader_globals.scripts_remaining_to_finish_loading_count +
        //         " remaining): '" +
        //         textStatus + "'. For loading <script> file " +
        //         index + ": "+ url_src  );
      })
      .fail(function( jqxhr, settings, exception ) {
        trr_loader_globals.scripts_remaining_to_finish_loading_count --;
        console.log( trr_loader_globals.log_id + "  ..*1h(" + trr_loader_globals.scripts_remaining_to_finish_loading_count +
                     " remaining): " +
                     ": ** ERROR: Triggered ajaxError handler. For <script> file " + index + ": "+ url_src  );
      });
  }); // end of jQuery.each( trr_loader_globals.load_always_scripts
} // end else {}
