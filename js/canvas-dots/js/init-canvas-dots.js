function trr_convert_data_before_main_loop_for_dots_effect( callback ) {
  // NOTE: not all plugin tagged photos are going to be using this effect. i.e. trr_globals.photos vs. trr_globals.dots_effect.photos
  trr_statusLog( "  ..*4.1j: trr_convert_data_before_main_loop_for_dots_effect for " + trr_globals.photos.length + " photos.*" );

  // Bind events and initialize plugin

  //----------------------------------------------------------------------------
  //---- BEGIN: Add jQuery function --------------------------------------------
  // Extend the jquery lib/Create a global method in the jquery space via the
  // jQuery.fn array of registered funcs.
  //
  // The 'pixellate()' plugin operates on a <img> 'trr-photo-effect' class.
  // Create and attach the plugin instance to that <img>, and run the
  // pixellate.init() method against it.
  // First call stack: main.js(L16) --> exp_convert_data_to_html(this)
  //                   exp_convert_data_to_html(L111): el = jQuery( globals.pixellate_class_ref ).toArray().first
  //                   exp_convert_data_to_html(L116) --> jQuery(el).pixellate('', jQuery(el));
  //                            sooo.... this is set to the elem that is calling pixellete()

  // Params: this is set to the elem that is calling trr-pixellete(), i.e.
  //           the jQuery object (HTML '<img class="trr-photo-effect />')
  //         $pix_obj = jQuery object (HTML '<div class="bio-pixell-array"></div>')
  //         options = '' or 'in' or 'out'
  jQuery.fn[ trr_globals.dots_effect.pluginName ] = function ( parms, callback ) {
    return this.each(function() {
      // NOTE: not all plugin tagged photos are going to be using this effect. i.e. trr_globals.photos vs. trr_globals.dots_effect.photos
      if ( !jQuery.data( this, trr_globals.dots_effect.pluginInstanceName ) ) {
        // This 'trr-photo-effect' <img> does not have a 'trr_halftone_dots' method in its jquery data hash.
        trr_statusLog( "  ..*6.1d.1: jQuery.fn[ " + trr_globals.dots_effect.pluginName +
                       " ] FIRST time for el.id: '" + this.id + "' action: '" + parms.action + "' *" );
        jQuery.data( this, trr_globals.dots_effect.pluginInstanceName, new CanvasDotsPlugin( this, parms ) );
        // Now this img's jQuery.data has a plugin_trr_halftone_dots() Plugin instance
        // referenced via 'jQuery.data( this, "plugin_" + trr_globals.dots_effect.pluginName ).action(callback);''
        callback();
        return;
      }
      trr_statusLog( "  ..*6.1d.2: jQuery.fn[ " + trr_globals.dots_effect.pluginName +
                     " ] el.id: '" + this.id + "' action: '" + parms.action + "' *" );
      jQuery.data( this, trr_globals.dots_effect.pluginInstanceName ).action( parms,
      /*1b-Resume here when done*/ function( return_info ) {
      callback( return_info );
      return;
      /*1b-*/});
    });
  };
  //------ END: Add jQuery function --------------------------------------------
  //----------------------------------------------------------------------------

  callback();
};

function trr_convert_data_for_each_for_dots_effect( index, $el, callback ) {
  trr_statusLog( "  ..*4.1k: trr_convert_data_for_each_for_dots_effect() index = " + index + ".*" );

  $el.trr_halftone_dots( { action: 'create', photo_idx: index },
  /*1-Resume here when done*/ function() {
  $el.trr_halftone_dots( { action: 'init', photo_idx: index },
  /*2-Resume here when done*/ function() {
  callback();
  /*2-*/});/*1-*/});

};


function trr_add_scroll_event_for_each_for_dots_effect( photo_idx, $el ) {
  if ( !trr_globals.defaults.scroll_events || !trr_globals.dots_effect.defaults.scroll_events) {
    return null;
  }
  var img_position = $el.position(),
      img_height = $el.height(),
      offset_y = 0; // img_position.top + img_height;
  trr_statusLog( "  ..*4.1l: trr_add_scroll_event_for_each_for_dots_effect() photo_idx: " + photo_idx +
                 " photo.position.top: '" + img_position.top + "' photo.height: '" + img_height + "' *" );

  var effect_event_parms = {
    handler_name_for_action: trr_globals.dots_effect.pluginName,
    photo_idx: photo_idx,
    triggerElement_selector: "#" + $el.attr('id'),
    triggerElement_offset_y: offset_y,
  };

  trr_statusLog( "  ..*4.1l.1: trr_add_scroll_event_for_each_for_dots_effect() effect_event_parms:" +
                 " photo_idx: " + effect_event_parms.photo_idx +
                 ".  handler_name_for_action: '" + effect_event_parms.handler_name_for_action +
                 "'.  triggerElement_selector: '" + effect_event_parms.triggerElement_selector +
                 "'.  triggerElement_offset_y: '" + effect_event_parms.triggerElement_offset_y +
                 "'. *" );
  return effect_event_parms;
};


function trr_build_default_view_before_first_swap_in_for_dots_effect( default_view_photo_idx, default_view_action, callback ) {
  trr_statusLog( "  ..*4.1m: trr_build_default_view_before_first_swap_in_for_dots_effect().*" );

  callback();
};
