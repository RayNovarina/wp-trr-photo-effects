//"use strict";

// per: https://learn.jquery.com/using-jquery-core/document-ready/
// A page can't be manipulated safely until the document is "ready."
// jQuery detects this state of readiness for you.
// Code included inside $( document ).ready() will only run once the page
// Document Object Model (DOM) is ready for JavaScript code to execute.
// Code included inside $( window ).on( "load", function() { ... }) will run
// once the entire page (images or iframes), not just the DOM, is ready.
//

jQuery( document ).ready(function() {
//jQuery( window ).on( "load", function() {
  //console.log( "  ..*2a-uponLoad: " + trr_globals.scripts_remaining_to_finish_loading_count +
  //             " Scripts remaining to finish loading.*" );

  trr_globals = { trr_loader_delay: 0, trr_loader_remaining: 0 };
  if ( typeof trr_loader_globals !== 'undefined' &&
    trr_loader_globals.scripts_remaining_to_finish_loading_count > 0 ) {
    trr_globals.trr_loader_remaining = trr_loader_globals.scripts_remaining_to_finish_loading_count;
    trr_globals.trr_loader_delay = trr_globals.trr_loader_remaining * 200;
  }

  setTimeout(function() {
    if ( trr_globals.trr_loader_delay > 0 ) {
      console.log( "  ..*2c-domReady: " + trr_globals.trr_loader_remaining + " Scripts remained to finish loading before we delayed " +
                   trr_globals.trr_loader_delay + " ms before continuing. Now there are " +
                  trr_loader_globals.scripts_remaining_to_finish_loading_count || '0' + " remaining. *" );
      trr_loader_globals = {};
    } else {
      console.log( "  ..*2c-domReady* " );
    }

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
  }, trr_globals.trr_loader_delay);
});

/*
jQuery( document ).ready(function() {
  console.log( "  ..*2c-domReady: *");
  trr_controller = new TrrPhotoEffects.Controller( {
      scroll_starts_animation: false,
      click_starts_animation: false,
  });
}); // end jQuery( document ).ready
*/
