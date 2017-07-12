function trr_convert_data_before_main_loop_for_dots_effect( callback ) {
  trr_statusLog( "  ..*4.1j: trr_convert_data_before_main_loop_for_dots_effect for " + trr_globals.dots_effect.photos.length + " photos.*" );

  // Bind events and initialize plugin

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

  trr_globals.animation_container =
    jQuery('<canvas  id="' + trr_globals.dots_effect.animation_container_dom_id + '" ' +
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
  // NOTE: code goes where? I guess we need a short code to indicate begin of bio area?
  // Make the background of the bio text transparent so that we can scoll over the canvas animation.
  jQuery('article').css('opacity', '0.8');

  trr_globals.animation_container.addClass( 'trr-pe-animation-container-for-*init*' );
  trr_globals.animation_container.attr( 'active_photo_idx', trr_globals.defaults.active_photo_idx + '' );
  trr_globals.animation_container.attr( 'active_id', '*init*');

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

  $el.trr_halftone_dots( { action: 'create' },
  /*1-Resume here when done*/ function() {
  $el.trr_halftone_dots( { action: 'init' },
  /*2-Resume here when done*/ function() {
  callback();
  /*2-*/});/*1-*/});

};

function trr_build_default_view_before_first_swap_in_for_dots_effect( callback ) {
  trr_statusLog( "  ..*4.1m: trr_build_default_view_before_first_swap_in_for_dots_effect().*" );

  callback();
};
