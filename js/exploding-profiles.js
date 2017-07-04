/*
  This plugin reg a global
*/


/*
1) hide current page contents:
2) build page's default view:
3) On dom ready:
4) On click event:
5) On scroll event:

*/

exp_statusLog( "  ..*1-uponLoad*" );

$(function() {
  exp_statusLog( "  ..*2-domReady*" );
  exp_init();
  exp_convert_data_to_html();
  exp_build_default_view();
  exp_statusLog( "  ..*3-Init done*" );
  exp_statusLog('init-done');
});
