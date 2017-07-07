
trr_statusLog( "  ..*1-uponLoad*" );

jQuery(function() {
  trr_statusLog( "  ..*2-domReady*" );
  trr_init();
  trr_target_page_fixups();
  trr_convert_data_to_html();

  var after_init_delay = 0;
  trr_build_default_view(
  /*1-Callback when done*/ function() {
  setTimeout(function() {
    trr_statusLog( "  ..*3-Init done*" );
    trr_statusLog('init-done');
  }, after_init_delay);
  /*1-*/});
});
