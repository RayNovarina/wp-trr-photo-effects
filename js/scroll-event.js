
// Params:
//  direction (string): moving_up_into_view
//                      moving_down_out_of_view
function trr_scroll_trigger( event, direction, effect, container_class_ref ) {
  // trr_globals.dots_effect.animation_container =
  // <canvas id =" 'animation_container_for_' + trr_globals.dots_effect.pluginName + '_effect'>
  //   class="trr-pe-animation-container-for-0"
  //   active_photo_idx="0"
  //   active_id="photo-0"

  var profile_idx_triggering_event =
    parseInt( trr_globals.animation_container.attr( 'active_photo_idx') || ( trr_globals.defaults.active_photo_idx + '' ) );
    scrolling_profile_idx_out_of_view = '?',
    scrolling_profile_idx_into_view = '?',
    scroll_result_msg = '?';

  // If direction == down then new profile (scrolled_to_profile_idx) is coming into view.
  // If direction == up   then current profile (scrolled_to_profile_idx) is scrolling off the bottom of the page.

  if ( trr_globals.animation_container.attr( 'active_photo_idx') == undefined ) {
    // Upon load, init case.
    scrolling_profile_idx_into_view = trr_globals.defaults.active_photo_idx;
    scrolling_profile_idx_out_of_view = trr_globals.defaults.active_photo_idx;
    scroll_result_msg = ". *uponLoad* no one is moving out.";

  } else if (direction == 'moving_up_into_view' ) {
    scrolling_profile_idx_into_view = profile_idx_triggering_event;
    scrolling_profile_idx_out_of_view = profile_idx_triggering_event - 1;
    scroll_result_msg = ". Moving out of view: '." +
        jQuery( trr_globals.photos[ scrolling_profile_idx_out_of_view ] ).attr('id') + "' ";

  } else { // direction == 'moving_down_out_of_view'
    scrolling_profile_idx_out_of_view = profile_idx_triggering_event;
    scrolling_profile_idx_into_view = profile_idx_triggering_event - 1;
    scroll_result_msg = ". Moving into view: '." +
        jQuery( trr_globals.photos[ scrolling_profile_idx_into_view ] ).attr('id') + "' ";
  }
  trr_statusLog( "  ..*18: Scrolled (" + direction + ") '" +
  //            tag + ': profile-idx ' +
  //            jQuery( globals.bio_containers_class_ref ).find( tag ).attr('profile-idx') +
                 scroll_result_msg + "*" );
  if ( (scrolling_profile_idx_into_view + '') == profile_idx_triggering_event ) {
    trr_statusLog( "  ..*18a: exp_scroll_trigger() scrolled_to_profile_idx = current. Ignore scroll event. *");
  } else {
  //  // explode halftone image background of active bio, restore updated content
  //  // of active bio to its profile.
  //  swap_out_bio( active_bio_idx , 'explode', 1500, 'scroll',
  //  /*1-Callback when done*/ function() {
  //  // swap in scrolled to profile into active bio slot, implode/recreate the bio image.
  //  swap_in_bio( scrolling_profile_idx_into_view, 'implode', 0, 'scroll',
  //  /*2-Callback when done*/ function() {
  //  /*2-*/})/*1-*/});
  }
};

// new ScrollMagic.Scene({ triggerElement: ".Screen", duration: 100, offset: iScreenSize })
// http://scrollmagic.io/docs/ScrollMagic.Scene.html#triggerHook
//
