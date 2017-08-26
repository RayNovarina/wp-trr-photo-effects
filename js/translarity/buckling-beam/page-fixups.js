
jQuery( document ).ready(function() {
  var fixups_target_page_class_ref = '.page-id-1302';
  //alert("in page_fixups.js! To fixup WP pageId: '" + fixups_target_page_class_ref + "' *");

  // Scrubs top nav header. Logo, nav links, tagline, etc.
  var $first_header_tag = jQuery( jQuery( fixups_target_page_class_ref + ' header').toArray()[0] );
  $first_header_tag.html( '' );
  $first_header_tag.attr( 'class', '' );

  var $div_main_wrapper = jQuery( '#main-wrapper');
  $div_main_wrapper.css('margin-top', '0');
  $div_main_wrapper.css('margin-bottom', '0');

  var $h1_entry_title = jQuery( '.entry-title' );
  $h1_entry_title.css( 'margin', '0' );

  // Scrubs top nav header. Logo, nav links, tagline, etc.
  var $footer_tag = jQuery( jQuery( fixups_target_page_class_ref + ' footer').toArray()[0] );
  $footer_tag.html( '');

  var stop = 'here';
});
