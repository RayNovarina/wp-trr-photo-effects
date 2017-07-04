
function exp_add_click_handler( profile_idx, profile_div) {
  $(profile_div).click(function(attribs) {
    var self = $(attribs.currentTarget);
    //alert( 'Clicked on \'' + self.attr('id') + '\'' +
    //       '.  Active halftone profile: ' + globals.active_bio.attr('active_idx') + ':' + globals.active_bio.attr('active_id')
    var profile_idx_triggering_event = parseInt( self.attr('profile-idx') ),
        active_bio_idx = parseInt( $( globals.bio_containers_class_ref ).attr('active_bio_idx') ),
        active_bio = $( $('.bio-container').toArray()[ active_bio_idx ] ),
        scrolling_profile_idx_into_view = profile_idx_triggering_event,
        scroll_to_bio = $( $('.bio-container').toArray()[ scrolling_profile_idx_into_view ] );

    exp_statusLog( "  ..*16  Clicked on '" + self.attr('id') +
                   "'.  Explode profile bio: " + active_bio.attr('profile-idx') + ":" +
                    active_bio.attr('active_id') +
                    "'.  Implode/recreate profile bio: " + scroll_to_bio.attr('profile-idx') + ":" +
                     scroll_to_bio.attr('active_id') +
                   "*" );
    // '.bio-container-for-profile-1-christopher'
    // '.bio-container-for-' + scroll_to_bio.attr('active_id')
    //var offset = $('.bio-container-for-' + scroll_to_bio.attr('active_id')).offset().top;
    //TweenMax.to( $( '.css-management-profile-column' ), 2, {scrollTo:400});

    // explode halftone image background of active bio, restore updated content
    // of active bio to its profile.
    //swap_out_bio( active_bio_idx , 'explode', 1500,
    ///*1-Callback when done*/ function() {
    // swap in clicked profile into active bio slot, implode/recreate the bio image.
    //swap_in_bio( scrolling_profile_idx_into_view, 'implode', 0, 'click',
    ///*2-Callback when done*/ function() {
    ///*2-*/})/*1-*/});
  } );
};
