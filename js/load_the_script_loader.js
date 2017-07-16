// NOTE: per: https://api.jquery.com/jquery.getscript/
// By default, $.getScript() sets the cache setting to false. This appends a
// timestamped query parameter to the request URL to ensure that the browser
// downloads the script each time it is requested. You can override this
// feature by setting the cache property globally using $.ajaxSetup():

// NOTE: If cache = true, browser javascript debugger Breakpoints will not
// work in the loaded file(s) because the file name with the Breakpoints has
// changed.
jQuery.ajaxSetup({
  cache: true
});

jQuery.getScript( 'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/script_loader.js' )
  .done(function( script, textStatus ) {
    console.log( " ..*0a-trr_pe_lib_v0: '" + textStatus + "'. For loading trr-loader <script> file *" );
  })
  .fail(function( jqxhr, settings, exception ) {
    console.log( " ..*0b-trr_pe_lib_v0: ** ERROR: Triggered ajaxError handler. For trr-loader <script> file *" );
  });
