function trr_page_fixups_for_pixellate_effect( callback ) {
  var effect_class_ref = trr_globals.photo_effect_class_ref + trr_globals.pixellate_effect.photo_effect_class_ref,
      photos_with_my_effect = jQuery( effect_class_ref );
  if ( photos_with_my_effect.length == 0 ) {
    trr_statusLog( "  ..*5.2a: trr_page_fixups_for_pixellate_effect(): WP page class '" + effect_class_ref + "' NOT FOUND.'*");
    callback();
    return;
  }

  trr_statusLog( "  ..*5.2b: trr_page_fixups_for_pixellate_effect(): for WP page class '" + effect_class_ref + "'. References = " + photos_with_my_effect.length + "*");

  // jQuery('.entry-header').html()
  //"<h1 class="entry-title ">Translarity Management Team</h1><hr class="featurette-divider __before_content">        "

  //jQuery('.page-id-874 .entry-content').attr('style', 'font-size: 18px; line-height: 1.6em;');

  // Make page title and intro paragraphs disappear so we can play with positioning our <canvas>
  jQuery( trr_globals.fixups_target_page_class_ref + ' .entry-header' ).attr('style', 'display: none;');

  jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' p.full' ).toArray()[0] ).attr('style', 'display: none;');
  jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' p.full' ).toArray()[1] ).attr('style', 'display: none;');

  jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).attr('style', '');
  jQuery( jQuery( trr_globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).html( '' );

  callback();
};
