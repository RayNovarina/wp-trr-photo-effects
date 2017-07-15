
// Update the active photo slot with the specified photo.
// params: photo_idx: integer
//         action: string - 'appear' or 'disappear' or 'init'
//         action_delay: ms to delay before performing action.
//         callback: code to resume when done
function trr_swap_in_photo( photo_idx, action, action_delay, event_name, /*Code to resume when done*/ callback ) {
  var parms = {};
  trr_make_swap_in_parms( parms, photo_idx, action, action_delay );
  trr_statusLog( "  ..*6a: trr_swap_in_photo for photo_idx " + parms.photo_idx +
                   ". Action: '" + parms.action + "'. Handler: '" + parms.handler_name_for_action +
                   "'" + //". Active photoId: " + parms.dest_photo.attr('active_id') +
                   //". New photoId: " + parms.src_photo.attr('id') +
                   //". ScrollTo photoId:" + parms.scroll_to_photo.attr('active_id') +
                   ".*" );

  trr_globals.animation_container.attr( 'active_photo_idx', parms.photo_idx + '' );
  trr_globals.animation_container.attr( 'active_id', parms.$swap_in_photo.attr( 'id' ) );
  trr_hlpr_add_action_handlers( parms.photo_idx, trr_globals.animation_container )

  // NOTE: initial state of default photo is a disappeared image.
  trr_swap_in_update_animation_area_before_action( parms,
  /*1-Resume here when done*/ function() {
  setTimeout(function() {
    trr_animation_effect( parms,
    /*1a-Resume here when done*/ function() {
    callback();
    return;
    /*1a-*/});
  }, action_delay);
  /*1-*/});
};

// params: photo_idx: integer,
//         action: 'appear' or 'disappear'
//         action_delay: ms to delay after performing action.
//         callback: code to resume when done
function trr_swap_out_photo( photo_idx, action, action_delay, event_name, /*Code to resume when done*/ callback ) {
  if ( trr_globals.animation_container.attr( 'active_photo_idx') == undefined ) {
    trr_statusLog( "  ..*6b: trr_swap_out_photo: animation_container is empty. Ignore swap_out. *");
    callback();
    return;
  }
  var parms = {};
  trr_make_swap_in_parms( parms, photo_idx, action, action_delay );
  trr_statusLog( "  ..*6b.2: trr_swap_out_photo for photo_idx " + parms.photo_idx +
                   ". Action: '" + parms.action + "'. Handler: '" + parms.handler_name_for_action +
                   "'" + //". Active photoId: " + parms.dest_photo.attr('active_id') +
                   //". New photoId: " + parms.src_photo.attr('id') +
                   //". ScrollTo photoId:" + parms.scroll_to_photo.attr('active_id') +
                   ".*" );

  /*
  trr_globals.animation_container.attr( 'active_photo_idx', parms.photo_idx + '' );
  trr_globals.animation_container.attr( 'active_id', parms.$swap_in_photo.attr( 'id' ) );
  trr_hlpr_add_action_handlers( parms.photo_idx, trr_globals.animation_container )

    if (action == 'explode') {
      // explode halftone image in the bio page. NOTE: this is the normal state of
      // the pixel array for an inactive profile.
      dest_profile.pixellate( 'out', src_bio );
    }
    setTimeout(function() {
      // Put the updated pixel array of the specified bio (active) and put it back
      // in its profile container.
      // globals.pixellate_pixels_container_class_ref
      src_bio.find( '.bio-pixell-array' ).insertAfter( dest_profile.find('.bio-photo') );
      jQuery( globals.bio_containers_class_ref ).attr('active_profile_idx', '');
*/
      callback();
//      return;
//    }, action_delay);
};


function trr_make_swap_in_parms( parms, photo_idx, action, action_delay ) {
  trr_statusLog( "  ..*6b.3: trr_make_swap_in_parms(): photo_idx " + photo_idx + ". Action: " + action + ".*" );
  // if first time/init, active id is undefined.
  var active_photo_idx = parseInt( trr_globals.animation_container.attr( 'active_photo_idx') || ( trr_globals.defaults.active_photo_idx + '' ) ),
      $active_photo = jQuery( trr_globals.photos[ active_photo_idx ] ),
      $swap_in_photo = jQuery( trr_globals.photos[ photo_idx ] ),
      $swap_out_photo = $active_photo;

  jQuery.extend( parms, { photo_idx: photo_idx, action: action,
                          action_delay: action_delay,
                          $swap_in_photo: $swap_in_photo,
                          $swap_out_photo: $swap_out_photo,
                        }
               );
  parms.handler_name_for_action = trr_hlpr_action2handlerName( $swap_in_photo, parms.action );

  trr_make_swap_in_parms_if_dots_effect( parms );
  trr_make_swap_in_parms_if_pixellate_effect( parms );
  return parms;
};

function trr_hlpr_add_action_handlers( index, $el ) {
  $el.attr( 'effect_handler_for_appear', trr_globals.dots_effect.pluginName );
  $el.attr( 'effect_handler_for_disappear', trr_globals.dots_effect.pluginName );
  $el.attr( 'effect_handler_for_fade_in', trr_globals.dots_effect.pluginName );
  $el.attr( 'effect_handler_for_fade_out', trr_globals.dots_effect.pluginName );
  $el.attr( 'effect_handler_for_scroll_event', trr_globals.dots_effect.pluginName );
  $el.attr( 'effect_handler_for_click_event', trr_globals.dots_effect.pluginName );
};

function trr_hlpr_action2handlerName( $photo, action ) {
  return $photo.attr( 'effect_handler_for_' + action );
};

function trr_hlpr_i_am_the_effects_handler_for_this( photo_idx, action, handler_name ) {
  return trr_hlpr_action2handlerName( jQuery(trr_globals.photos[ photo_idx ]), action ) == handler_name;
};

function trr_make_swap_in_parms_if_dots_effect( parms ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_make_swap_in_parms_for_dots_effect !== 'undefined') {
    return trr_make_swap_in_parms_for_dots_effect( parms );
  }
  return {};
};

function trr_make_swap_in_parms_if_pixellate_effect( parms ) {
  if ( trr_globals.pixellate_effect.enabled &&
       typeof trr_make_swap_in_parms_for_pixellate_effect !== 'undefined') {
    return trr_make_swap_in_parms_for_pixellate_effect( input_parms, output_parms );
  }
  return {};
};

function trr_swap_in_update_animation_area_before_action( parms, callback ) {
  trr_statusLog( "  ..*6c: trr_swap_in_update_animation_area_before_action(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );
  trr_swap_in_update_animation_area_before_action_if_dots_effect( parms,
  /*1-Resume here when done*/ function() {
  trr_swap_in_update_animation_area_before_action_if_pixellate_effect( parms,
  /*2-Resume here when done*/ function() {
  callback();
  /*2-*/});/*1-*/});
};

function trr_swap_in_update_animation_area_before_action_if_dots_effect( parms, callback ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_swap_in_update_animation_area_before_action_for_dots_effect !== 'undefined') {
    trr_swap_in_update_animation_area_before_action_for_dots_effect( parms,
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};

function trr_swap_in_update_animation_area_before_action_if_pixellate_effect( parms, callback ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_swap_in_update_animation_area_before_action_for_pixellate_effect !== 'undefined') {
    trr_swap_in_update_animation_area_before_action_for_pixellate_effect( parms,
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};

function trr_animation_effect( parms, callback ) {
  trr_statusLog( "  ..*6d: trr_animation_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );
  trr_animation_effect_if_dots_effect( parms,
  /*1-Resume here when done*/ function() {
  trr_animation_effect_if_pixellate_effect( parms,
  /*2-Resume here when done*/ function() {
  callback();
  /*2-*/});/*1-*/});
};

// parms.handler_name_for_action
function trr_animation_effect_if_dots_effect( parms, callback ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_animation_effect_for_dots_effect !== 'undefined') {
    if ( trr_hlpr_i_am_the_effects_handler_for_this( parms.photo_idx, parms.action, trr_globals.dots_effect.pluginName ) ) {
      trr_animation_effect_for_dots_effect( parms,
      /*1-Resume here when done*/ function() {
      callback();
      /*1-*/});
      return;
    }
  }
  callback();
};

function trr_animation_effect_if_pixellate_effect( parms, callback ) {
  if ( trr_globals.pixellate_effect.enabled &&
       typeof trr_animation_effect_for_pixellate_effect !== 'undefined') {
    trr_animation_effect_for_pixellate_effect( parms,
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};
