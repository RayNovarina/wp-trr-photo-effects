
// Params:
//  direction (string): moving_up_into_view
//                      moving_down_out_of_view
function exp_scroll_trigger( event, direction, type, tag ) {
  var profile_idx_triggering_event = parseInt( jQuery( globals.bio_containers_class_ref ).find( tag ).attr('profile-idx') ),
      active_bio_idx = parseInt( jQuery( globals.bio_containers_class_ref ).attr('active_bio_idx') ),
      active_bio = jQuery( jQuery('.bio-container').toArray()[ active_bio_idx ] ),
      scrolling_profile_idx_out_of_view = '?',
      scrolling_profile_idx_into_view = '?',
      scroll_result_msg = '?';


  // If direction == down then new profile (scrolled_to_profile_idx) is coming into view.
  // If direction == up   then current profile (scrolled_to_profile_idx) is scrolling off the bottom of the page.

  if ( jQuery( globals.bio_containers_class_ref ).attr('active_profile_idx') == undefined ) {
    // Upon load, init case.
    scrolling_profile_idx_into_view = globals.defaults.active_profile_idx;
    scrolling_profile_idx_out_of_view = globals.defaults.active_profile_idx;
    scroll_result_msg = ". *uponLoad* no one is moving out.";

  } else if (direction == 'moving_up_into_view' ) {
    scrolling_profile_idx_into_view = profile_idx_triggering_event;
    scrolling_profile_idx_out_of_view = profile_idx_triggering_event - 1;
    scroll_result_msg = ". Moving out of view: '." +
                        jQuery( jQuery('.profile-container').toArray()[ scrolling_profile_idx_out_of_view ] ).attr('id') +
                        "' ";

  } else { // direction == 'moving_down_out_of_view'
    scrolling_profile_idx_out_of_view = profile_idx_triggering_event;
    scrolling_profile_idx_into_view = profile_idx_triggering_event - 1;
    scroll_result_msg = ". Moving into view: '." +
                        jQuery( jQuery('.profile-container').toArray()[ scrolling_profile_idx_into_view ] ).attr('id') +
                        "' ";
  }

  var scrolling_bio_into_view = jQuery( jQuery('.bio-container').toArray()[ scrolling_profile_idx_into_view ] );

  exp_statusLog( "  ..*18: Scrolled (" + direction + ") '" + tag + ': profile-idx ' +
                 jQuery( globals.bio_containers_class_ref ).find( tag ).attr('profile-idx') +
                 scroll_result_msg +
                 // "'.  Active halftone profile: " + active_bio.attr('profile-idx') + ":" +
                 // active_bio.attr('active_id') +
                 "*" );
  if ( (scrolling_profile_idx_into_view + '') == jQuery( globals.bio_containers_class_ref ).attr('active_profile_idx') ) {
    exp_statusLog( "  ..*18a: exp_scroll_trigger() scrolled_to_profile_idx = current. Ignore scroll event. *");
  } else {
    // explode halftone image background of active bio, restore updated content
    // of active bio to its profile.
    swap_out_bio( active_bio_idx , 'explode', 1500, 'scroll',
    /*1-Callback when done*/ function() {
    // swap in scrolled to profile into active bio slot, implode/recreate the bio image.
    swap_in_bio( scrolling_profile_idx_into_view, 'implode', 0, 'scroll',
    /*2-Callback when done*/ function() {
    /*2-*/})/*1-*/});
  }
};

// new ScrollMagic.Scene({ triggerElement: ".Screen", duration: 100, offset: iScreenSize })
// http://scrollmagic.io/docs/ScrollMagic.Scene.html#triggerHook
//
