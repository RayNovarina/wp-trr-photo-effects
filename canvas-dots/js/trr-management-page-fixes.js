/*
<script src=" https://4e73598e.ngrok.io/Sites/exploding-profiles/js/exploding-profiles-trr-fixes.js"></script>
<script src=" https://4e73598e.ngrok.io/Sites/exploding-profiles/js/exploding-profiles-globals.js"></script>
*/
function trr_target_page_fixups() {
if ( jQuery( globals.fixups_target_page_class_ref ).length > 0 ) {

trr_statusLog( "  ..*0: trr_target_page_fixups(): for WP page class '" + globals.fixups_target_page_class_ref + "'. References = " + jQuery( globals.fixups_target_page_class_ref ).length + "*");
//jQuery('.page-id-874 header').html()

//jQuery('.page-id-874 header').toArray()[0]
//<header class="tc-header clearfix row-fluid tc-tagline-off tc-title-logo-on  tc-shrink-on tc-menu-on logo-left tc-second-menu-on tc-second-menu-in-sn-before-when-mobile" role="banner" style="height: auto; top: 32px;">

jQuery('body' + globals.fixups_target_page_class_ref).removeClass('tc-sticky-header');

// Scrubs top nav header. Logo, nav links, tagline, etc.
jQuery( globals.fixups_target_page_class_ref + ' header').toArray()[0].innerHTML =
'<div class="brand span3 pull-left">' +
'  <a class="site-logo" href="http://trafficrevenueresults.com/" title="Translarity | ">' +
'    <img src="http://trafficrevenueresults.com/wp-content/uploads/2017/06/Translarity-Logo-April-V1.200.png" alt="Back Home" width="1050" height="195" class=" attachment-657"/></a>' +
'</div>' +
'<div class="navbar-wrapper clearfix span9 tc-submenu-move tc-open-on-hover pull-menu-right">' +
'<div class="navbar resp">' +
'<div class="navbar-inner" role="navigation">' +
'<div class="row-fluid">' +
'<div class="nav-collapse collapse tc-hover-menu-wrapper">' +
'<div class="menu-primary-menu-container">' +
'  <ul id="menu-primary-menu-2" class="nav tc-hover-menu">' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-170"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/">Home</a></li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-169"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/wafer-translator-technology/">Technology</a></li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-345"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/news/">News</a></li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children dropdown menu-item-172"' +
'      ><a style="font-size: 16px; color: rgb(0, 136, 204);" ' +
'          href="http://trafficrevenueresults.com/about/">About Us <strong class="caret"></strong></a>' +
'      <ul class="dropdown-menu">' +
'	       <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-295 current_page_item menu-item-297"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/management-team/">Translarity Management Team</a></li>' +
'	       <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-298"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/board-of-directors/">Board of Directors</a></li>' +
'      </ul>' +
'    </li>' +
'    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-171"' +
'      ><a style="font-size: 16px;" href="http://trafficrevenueresults.com/contact/">Contact</a></li>' +
'    </ul>' +
'</div></div>' +
//'  <div class="btn-toggle-nav pull-right"><button type="button" class="btn menu-btn" data-toggle="collapse" data-target=".nav-collapse" title="Open the menu" aria-label="Open the menu"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span> </button>' +
//'  </div>' +
'</div>' +
'</div><!-- /.navbar-inner -->' +
'</div><!-- /.navbar resp -->' +
'</div><!-- /.navbar-wrapper -->' +
'';

//jQuery('.page-id-874 #tc-reset-margin-top')
//Object { 0: <div#tc-reset-margin-top.container-fluid>, selector: ".page-id-874 #tc-reset-margin-top", length: 1, prevObject: Object, context: HTMLDocument → management-team }

// Move page title up. After zapping mobile flex css?
jQuery( globals.fixups_target_page_class_ref + ' #tc-reset-margin-top').attr('style', 'margin-top: 40px;');

// jQuery('.entry-header').html()
//"<h1 class="entry-title ">Translarity Management Team</h1><hr class="featurette-divider __before_content">        "

//jQuery('.page-id-874 .entry-content').attr('style', 'font-size: 18px; line-height: 1.6em;');

// Make page title and intro paragraphs disappear so we can play with positioning our <canvas>
jQuery( globals.fixups_target_page_class_ref + ' .entry-header' ).attr('style', 'display: none;');

jQuery( jQuery( globals.fixups_target_page_class_ref + ' p.full' ).toArray()[0] ).attr('style', 'display: none;');
jQuery( jQuery( globals.fixups_target_page_class_ref + ' p.full' ).toArray()[1] ).attr('style', 'display: none;');

//jQuery( jQuery( globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).attr('style', 'display: none;');
jQuery( jQuery( globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).attr('style', '');
jQuery( jQuery( globals.fixups_target_page_class_ref + ' .entry-content div').toArray()[0] ).html( '' );


//
//jQuery( jQuery( globals.fixups_target_page_class_ref + ' header').toArray()[0] ).attr('style', 'height: 60px; top: 0px;');

//
jQuery( jQuery( globals.fixups_target_page_class_ref + ' header').toArray()[0] ).attr('style', 'display:none;');

} else {
  trr_statusLog( "  ..*0a: trr_target_page_fixups(): WP page class '" + globals.fixups_fixups_target_page_class_ref + "' NOT FOUND.'*");
};

};
