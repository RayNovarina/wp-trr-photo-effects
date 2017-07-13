// per: https://learn.jquery.com/using-jquery-core/document-ready/
// A page can't be manipulated safely until the document is "ready."
// jQuery detects this state of readiness for you.
// Code included inside $( document ).ready() will only run once the page
// Document Object Model (DOM) is ready for JavaScript code to execute.
// Code included inside $( window ).on( "load", function() { ... }) will run
// once the entire page (images or iframes), not just the DOM, is ready.
//

// NOTE: globals.js executes first.
jQuery( window ).on( "load", function() {
  console.log( "  ..*2a-uponLoad: " + trr_globals.scripts_remaining_to_finish_loading_count +
               " Scripts remaining to finish loading.*" );

  trr_globals.loader_delay = 0;
  if ( trr_globals.scripts_remaining_to_finish_loading_count < 1 ) {
    trr_globals = {};
  } else {
    console.log( "  ..*2b-uponLoad: *Trouble to come?*" + trr_globals.scripts_remaining_to_finish_loading_count +
                 " Scripts remaining to finish loading.*" );
    trr_globals.loader_delay = 1000;
  }
  setTimeout(function() {
    trr_statusLog( "  ..*2-domReady*" );
    console.log( "  ..*2c-domReady: " + (typeof trr_globals.scripts_remaining_to_finish_loading_count !== 'undefined' ? trr_globals.scripts_remaining_to_finish_loading_count : '0') +
                 " Scripts remaining to finish loading.*" );

    trr_create_globals(
    /*1-Resume here when done*/ function() {

    trr_init(
    /*2-Resume here when done*/ function() {
    if ( !trr_globals.status.enabled ) {
      return;
    }
    trr_page_fixups(
    /*3-Resume here when done*/ function() {
    trr_convert_data_to_html(
    /*4-Resume here when done*/ function() {
    trr_build_default_view(
    /*5-Resume here when done*/ function() {
    trr_statusLog( "  ..*2c-Init done*" );
    /*5-*/});/*4-*/});/*3-*/});/*2-*/});/*1-*/});
  }, trr_globals.loader_delay);
});
