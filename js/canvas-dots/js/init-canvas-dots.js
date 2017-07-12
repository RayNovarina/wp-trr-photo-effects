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

  trr_globals.animation_container.addClass( 'animation_container-container-for-*init*' );
  trr_globals.animation_container.attr( 'active_photo_idx', trr_globals.defaults.active_photo_idx + '' );
  trr_globals.animation_container.attr( 'active_id', '*init*');

  callback();
};


function trr_convert_data_for_each_for_dots_effect( index, $el, callback ) {
  trr_statusLog( "  ..*4.1k: trr_convert_data_for_each_for_dots_effect().*" );

  callback();
};

function trr_build_default_view_before_first_swap_in_for_dots_effect( callback ) {
  trr_statusLog( "  ..*4.1m: trr_build_default_view_before_first_swap_in_for_dots_effect().*" );

  callback();
};
