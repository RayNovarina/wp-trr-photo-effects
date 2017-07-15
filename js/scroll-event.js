
// Params:
//  direction (string): moving_up_into_view
//                      moving_down_out_of_view
function trr_scroll_trigger( event, photo_idx, direction, handler_name_for_action ) {
  // trr_globals.dots_effect.animation_container =
  // <canvas id =" 'animation_container_for_' + trr_globals.dots_effect.pluginName + '_effect'>
  //   class="trr-pe-animation-container-for-0"
  //   active_photo_idx="0"
  //   active_id="photo-0"
  //   attr( 'effect_handler_for_scroll_event', trr_globals.dots_effect.pluginName );

  var photo_idx_triggering_event = parseInt( photo_idx ),
    animation_container_photo_idx = trr_globals.animation_container.attr( 'active_photo_idx'),
    scrolling_photo_idx_out_of_view = '?',
    scrolling_photo_idx_into_view = '?',
    scroll_result_msg = '?';

  // If direction == down then new photo (scrolled_to_photo_idx) is coming into view.
  // If direction == up   then current photo (scrolled_to_photo_idx) is scrolling off the bottom of the page.

  if ( animation_container_photo_idx == undefined ) {
    // Upon load, init case.
    scrolling_photo_idx_into_view = trr_globals.defaults.active_photo_idx;
    scrolling_photo_idx_out_of_view = trr_globals.defaults.active_photo_idx;
    scroll_result_msg = ". *uponLoad* no one is moving out.";

  } else if (direction == 'moving_up_into_view' ) {
    scrolling_photo_idx_into_view = photo_idx_triggering_event;
    scrolling_photo_idx_out_of_view = photo_idx_triggering_event - 1;
    scroll_result_msg = "Moving out of view(" + scrolling_photo_idx_out_of_view + "): '." +
        jQuery( trr_globals.photos[ scrolling_photo_idx_out_of_view ] ).attr('id') +
        "'.  Moving in(" + scrolling_photo_idx_into_view + "): '." +
        jQuery( trr_globals.photos[ scrolling_photo_idx_into_view ] ).attr('id') + "' ";

  } else { // direction == 'moving_down_out_of_view'
    scrolling_photo_idx_out_of_view = photo_idx_triggering_event;
    scrolling_photo_idx_into_view = photo_idx_triggering_event - 1;
    scroll_result_msg = "Moving into view(" + scrolling_photo_idx_into_view + "): '." +
        jQuery( trr_globals.photos[ scrolling_photo_idx_into_view ] ).attr('id') +
        "'.  Moving out(" + scrolling_photo_idx_out_of_view + "): '." +
        jQuery( trr_globals.photos[ scrolling_photo_idx_out_of_view ] ).attr('id') + "' ";
  }
  trr_statusLog( "  ..*7: Scrolled (" + direction + ") " + scroll_result_msg + "*" );

  if ( (scrolling_photo_idx_into_view ) == animation_container_photo_idx ) {
    trr_statusLog( "  ..*7a: exp_scroll_trigger() scrolling_photo_idx_into_view(" +
                   scrolling_photo_idx_into_view + ") = current(" +
                   animation_container_photo_idx + "). Ignore scroll event. *");
  } else {
    trr_swap_out_photo( scrolling_photo_idx_out_of_view, 'disappear', 1500, 'scroll_event',
    /*1-Callback when done*/ function() {
    // swapped in scrolled to photo into animation_container, implode/recreate the new photo image.
    trr_swap_in_photo( scrolling_photo_idx_into_view, 'appear', 0, 'scroll_event',
    /*2-Callback when done*/ function() {
    /*2-*/})/*1-*/});
  }
};

// new ScrollMagic.Scene({ triggerElement: ".Screen", duration: 100, offset: iScreenSize })
// http://scrollmagic.io/docs/ScrollMagic.Scene.html#triggerHook
//
