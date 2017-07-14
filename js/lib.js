
// Update the active photo slot with the specified photo.
// params: photo_idx: integer
//         action: string - 'appear' or 'disappear' or 'init'
//         action_delay: ms to delay before performing action.
//         callback: code to resume when done
function trr_swap_in_photo( photo_idx, action, action_delay, /*Code to resume when done*/ callback ) {
  // Inputs:
  // globals.animation_container (i.e. <canvas>) has:
  //    .class( 'animation_container-container-for-' + jQuery(active_photo).attr( 'id') )
  //    .attr( 'profile-idx') = jQuery(active_photo).attr('profile-idx')
  //    .attr( 'active_id') = jQuery(el).attr( 'id')
  // trr_globals.photos each have:
  //    .attr( 'id' )
  //    .attr('photo-idx')
  // trr_swap_in_photo() references:
  //    dest_photo.attr('active_id')
  //    src_photo.attr('id')
  //    scroll_to_photo.attr('active_id')
  //  trr_swap_in_photo() adds or modifies:
  //    dest_photo.attr('id')
  //    dest_photo.attr( 'photo-tag')
  var parms = {};
  // NOTE: not all plugin tagged photos are going to be using this effect. i.e. trr_globals.photos vs. trr_globals.dots_effect.photos
  trr_make_swap_in_parms( parms, photo_idx, action, action_delay );
  trr_statusLog( "  ..*6a: trr_swap_in_photo for photo_idx " + parms.photo_idx +
                   ". Action: " + parms.action +
                   //". Active photoId: " + parms.dest_photo.attr('active_id') +
                   //". New photoId: " + parms.src_photo.attr('id') +
                   //". ScrollTo photoId:" + parms.scroll_to_photo.attr('active_id') +
                   ".*" );

  //parms.dest_photo.attr('id', ('active_photo_for_photo-' + (parms.photo_idx + '') + '-' + parms.photo_tag) );
  trr_globals.animation_container.attr( 'active_photo_idx', parms.photo_idx + '' );

  // NOTE: initial state of default photo is an exploded image.
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

function trr_make_swap_in_parms( parms, photo_idx, action, action_delay ) {
  trr_statusLog( "  ..*6b: trr_make_swap_in_parms(): photo_idx " + photo_idx + ". Action: " + action + ".*" );
  // if first time/init, active id is undefined.
  var active_photo_idx = parseInt( trr_globals.animation_container.attr( 'active_photo_idx') || ( trr_globals.defaults.active_photo_idx + '' ) ),
      $active_photo = jQuery( trr_globals.photos[ active_photo_idx ] ),
      $swap_in_photo = jQuery( trr_globals.photos[ photo_idx ] ),
      $swap_out_photo = $active_photo;

  //  // NOTE: leave undefined as init case indicator.
  //  //trr_globals.animation_container.attr( 'active_photo_idx', '' );
  //  trr_globals.animation_container.attr( 'active_id', '*init*');
  //  trr_globals.animation_container.attr( 'effect_handler_for_appear', '*init*');
  //  trr_globals.animation_container.attr( 'effect_handler_for_disappear', '*init*');
  //  trr_globals.animation_container.attr( 'effect_handler_for_fade_in', '*init*');
  //  trr_globals.animation_container.attr( 'effect_handler_for_fade_out', '*init*');
  //
  //  $el.attr( 'id', ('trr-pe-photo-' + (index + '') ) );
  //  $el.attr( 'trr-pe-photo-idx', index + '' );

  jQuery.extend( parms, { photo_idx: photo_idx, action: action,
                          action_delay: action_delay,
                          $swap_in_photo: $swap_in_photo,
                          $swap_out_photo: $swap_out_photo,
                        }
               );

  trr_make_swap_in_parms_if_dots_effect( parms );
  trr_make_swap_in_parms_if_pixellate_effect( parms );
  return parms;
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

function trr_i_am_the_effects_handler_for_this( parms ) {
  return true;
};

function trr_animation_effect_if_dots_effect( parms, callback ) {
  if ( trr_globals.dots_effect.enabled &&
       typeof trr_animation_effect_for_dots_effect !== 'undefined') {
    if ( trr_i_am_the_effects_handler_for_this( parms ) ) {
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
