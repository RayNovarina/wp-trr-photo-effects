/**********************************************************************************
Fixups for www.bucklingbeam.com Home Page:
/**********************************************************************************
1) <head><title>
	   BuckingBeam :: Superior, Handcrafted Vertical Probe Applications for Precision Testing
   </title>
2) (within <head>)
   <style> #nav { height:39px; } </style>
   <meta property="og:url" content="/home" />
   <meta name="description" content="BucklingBeam creates superior, handcrafted
      vertical probe applications that empower the world’s leading flip-chip
      semiconductor manufactures with precision testing capabilities." />
   <meta name="keywords" content="Vertical probe card, buckling  beam,
      probe card, probe card test, wafer test, package test, final test, QFN,
      CSP, WLCSP, Southwest Test, southwest test workshop, cobra, cobra probe,
      wentworth, cascade, microprobe, bucklingbeam, Kelvin probe,
      space transformer, mipox, probe clean, socket, wafer probe, probe,
      flip chip, flipchip, area array, contact resistance,
      Integrated Test Corporation, Probilt 6500, cantilever probe,
      micro-drilling, logic, wafer probe, probes, test probes,
      formfactor, technopr" />
  </head>
3) <within <body>)
   <header>
      <a href="/" id="logo"><img src="/images/logo.png" alt="Buckling Beam" border="0" /></a>
      <div class="social-links">
        <a class="facebook" href="http://www.facebook.com/bucklingbeam" target="_blank"></a>
        <a class="twitter" href="http://www.twitter.com/bucklingbeam" target="_blank"></a>
      </div>
      <ul id="nav">
	       <li><a href="/home">Home</a></li>
         <li><a href="/our-story">Our Story</a></li>
         <li><a href="/products-technology">Products & Technology</a></li>
         <li><a href="/gallery">Gallery</a></li>
         <li><a href="/service">Service</a></li>
         <li><a href="/news">News</a></li>
         <li><a href="/careers">Careers</a></li>
         <li><a href="/contact">Contact</a></li>
      </ul>
   </header>
4) (within <body>)
  <div id="banners">
    <a href="#" class="banner-left"><img src="/images/arrow-l.png" border="0" width="36" height="98" alt="" /></a>
    <ul>
      <li>
        <a id="MainContent_ctl00_bannerRepeater_lnkBanner_0"
           href="/service">
          <img id="MainContent_ctl00_bannerRepeater_imgBanner_0"
               src="/images/details/2-1-BucklingBeam-Slider-1.jpg"
               style="border-width:0px; height:471px; width:928px;" />
        </a>
      </li>
      <li><a id="MainContent_ctl00_bannerRepeater_lnkBanner_1" href="/products-technology"><img id="MainContent_ctl00_bannerRepeater_imgBanner_1" src="/images/details/6-3-BucklingBeam-Slider-2.jpg" style="border-width:0px;height:471px;width:928px;" /></a></li>
      <li><a id="MainContent_ctl00_bannerRepeater_lnkBanner_2" href="/service"><img id="MainContent_ctl00_bannerRepeater_imgBanner_2" src="/images/details/8-4-BucklingBeam-Slider-3.jpg" style="border-width:0px;height:471px;width:928px;" /></a></li>
      <li><a id="MainContent_ctl00_bannerRepeater_lnkBanner_3" href="/our-story"><img id="MainContent_ctl00_bannerRepeater_imgBanner_3" src="/images/details/10-5-BucklingBeam-Slider-4.jpg" style="border-width:0px;height:471px;width:928px;" /></a></li>
      <li><a id="MainContent_ctl00_bannerRepeater_lnkBanner_4" href="/products-technology"><img id="MainContent_ctl00_bannerRepeater_imgBanner_4" src="/images/details/79-29-buckling-beam-slider-5.jpg" style="border-width:0px;height:471px;width:928px;" /></a></li>
    </ul>
    <a href="#" class="banner-right"><img src="/images/arrow-r.png" border="0" width="36" height="98" alt="" /></a>
  </div>
  <div id="bannericons">
    <a href="#" class="banner4"
       style="margin-left: 454px;">
      <i class="fa fa-circle"></i>
    </a>
    <a href="#" class="banner3">...</a>
    <a href="#" class="banner2">...</a>
    <a href="#" class="banner1">...</a>
    <a href="#" class="banner0 active">...</a>
  </div>
5) (within <body)
  <div class="home content">
    <ul>
      <li>
        <a href="/products-technology">
          <img src="/UserFiles/image/home-motus.jpg"
               alt="Precision testing with motus technology"
               width="226" height="102" border="0" />
        </a>&nbsp;
      </li>
      <li><a href="our-story"><img src="/UserFiles/image/home-video.jpg" alt="Behind BucklingBeam - watch now" width="226" height="102" border="0" /></a></li>
      <li><a href="/products-technology"><img src="/UserFiles/image/home-motus-3.jpg" alt="Modis III" width="226" height="102" border="0" /></a></li>
      <li><a href="/service"><img src="/UserFiles/image/home-testing.jpg" alt="Custom-Designed Testing Solutions" width="226" height="102" border="0" /></a></li>
    </ul>
  </div>
6) (within <body>)
  <footer>
    <div class="credit">
      &copy 2017 BucklingBeam Solutions, LLC.  All Rights Reserved.<br />
      Website by <a href="http://www.currycomm.com">CurryComm</a>
    </div>
    <ul id="footernav">
	    <li>
        <a href="/home">Home</a></li>
      <li><a href="/our-story">Our Story</a></li>
      <li><a href="/products-technology">Products & Technology</a></li>
      <li><a href="/gallery">Gallery</a></li>
      <li><a href="/service">Service</a></li>
      <li><a href="/news">News</a></li>
      <li><a href="/careers">Careers</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </footer>
7) CSS file all.css:

body{
    font-family: 'Helvetica Neue','Arial',sans-serif;
	font-size:17px;
    line-height:23px;
    background-color:#d0d0d0;
    margin:0;padding:0;
}
img{border-style:none;}
a{
	color:#999;
	text-decoration:underline;
}
a:hover{text-decoration:none;}
input,
textarea,
select{vertical-align:top;}
form,
fieldset{
	margin:0;
	padding:0;
	border:0;
}
.formFieldBlank {color:#cccccc;}
h1{
	font-size:30px;line-height:36px;font-weight:200;margin:15px 0 25px 0;
}
h2{
	font-size:19px;line-height:25px;margin-bottom:30px;
}
p {margin:0.6em 0;}
#nav{
	list-style:none;
	padding:0;
	margin:0 0 0 60px;
    z-index:100;position:relative;
}
#nav li{
	padding:0;
	margin:0 12px;
	float:left;
    z-index:110;position:relative;
}
#nav li a{
	text-decoration:none;
	color:#000;
    display:inline-block;
    font-size:14px;line-height:20px;
    z-index:120;position:relative;
    margin-bottom:2px;
}
#nav li a:hover,
#nav .active a{
    border-bottom:2px solid #f1cb12;
    margin-bottom:0;
}

#w1 {
    background-color: #f0f0f0;
    width:1028px;margin:0 auto;
    padding:15px 0;
}
header {
    position: relative;padding:66px 48px 15px 48px;margin-top:15px;
}
#logo {
    position: absolute;
    top: 0;
    left: 48px;
    z-index:10;
}
#logo img {z-index:20;}
.social-links {
    float: right;
    position: relative;
    top: -65px;
}
.social-links .facebook {
    background: url("../images/social-sprite.gif") no-repeat scroll -1px -1px rgba(0, 0, 0, 0);
    display: inline-block;
    height: 30px;
    width: 30px;
}
.social-links .twitter {
    background: url("../images/social-sprite.gif") no-repeat scroll -65px -33px rgba(0, 0, 0, 0);
    display: inline-block;
    height: 30px;
    width: 30px;
}
#footernav {
	list-style:none;
	padding:0;
	margin:0;
	height:39px;
}
#footernav li{
	padding:0;
	margin:0 0 0 11px;
	float:left;
    font-size:12px;color:#8c8c8c;
}
#footernav li:first-child{margin-left:0;}
#footernav li:after {content: '|';}
#footernav li:last-child:after {content:'';}
#footernav li a{
	text-decoration:none;
	color:#8c8c8c;
    display:inline-block;margin:0 11px 0 0;
    font-size:12px;line-height:14px;
}
footer {
    font-size: 12px;color:#8c8c8c;line-height:18px;padding:24px 48px 0 48px;text-align:right;
    clear:left;
}
footer .credit {
    float:right;
}
footer .credit a {
    text-decoration: none;
    color:#8c8c8c;
}

/* home /
#banners {position:relative;box-shadow:2px 2px 5px #d0d0d0;width:928px;margin:0 48px;}
.banner-left, .banner-right {
    position:absolute;
    top:40%;
}
.banner-left{left:-37px;}
.banner-right{right:-37px;}
#banners ul {
    width:928px;height:471px;
    position:relative;overflow:hidden;
    list-style:none;padding:0;margin:0;
}
#banners li {
    padding:0;margin:0;position:absolute;top:0;left:0;
}
#banners a {display:block;line-height:0;}
#bannericons a {color:white;font-size:12px;margin:0 7px;}
#bannericons a.active {color:#dbdbdb;}

.home {padding:15px 0;}
.home ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.home li {margin:0 3px;display:inline-block;float:left;}
.home li a {box-shadow:2px 2px 5px #d0d0d0;margin:0;display:inline-block;}
.home li a img {display:block;}
.home li:first-child {margin-left:0;}
.home li:last-child {margin-right:0;}

/* content /
.content {
    padding:15px 48px 15px 48px;clear:both;
}
.content img {box-shadow:2px 2px 5px #d0d0d0;margin:0;display:inline-block;}
.content .fa-ul li {margin-bottom:15px;}
.content.main .fa-li {color:#f1cb10;margin:5px 0 0 -5px;font-size:10px;}
.content.alt {background-color:#f7dd64;padding-top:15px;}
.content.alt .fa-li {margin:5px 0 0 -5px;font-size:10px;}

/* form fields /
input[type=text] {
    border:1px solid #e4e4e4;padding:9px;
    font-family:Arial;color:#aaaaaa;
}
textarea {
    border:1px solid #e4e4e4;padding:9px;
    font-family:Arial;color:#aaaaaa;
}

/* gallery /
.content.gallery #gallery {height:613px;width:928px;position:relative;box-shadow:2px 2px 5px #d0d0d0;}
.content.gallery #gallery img {box-shadow:none;}
.content.gallery #bigImg {
    width:928px;height:469px;
    position:relative;
}
.content.gallery #gallery .banner-left, .content.gallery #gallery .banner-right {
    position:absolute;
    top:35%;
}
.content.gallery #bigImg img {position:absolute;top:0;left:0;}
.content.gallery #bigImg i {position:absolute;top:0;left:0;margin:20% 0 0 48%;color:#999999;}
.content.gallery #bigImg span {background:url(/images/caption-back.png);position:absolute;right:0;bottom:8%;color:black;padding:15px 25px 15px 15px;font-size:16px;}
.content.gallery #articleList {
    height:144px;width:100%;background-color:white;
    margin:0;padding:0;list-style:none;position:relative;
}
.content.gallery #articleList div {
    width:90%;margin:0 auto;overflow:hidden;
}
.content.gallery #articleList ul {
    height:144px;width:1000px;
    margin:0;padding:0;list-style:none;
}
.content.gallery #articleList ul li {
    float: left;margin:11px 5px;
}
.content.gallery #articleList ul li a { display:inline-block; }
.content.gallery #articleList ul li img {border:2px solid #cccccc;}
.content.gallery #articleList ul li.active img {border-color:#f1cb10;}
.content.gallery #articleList li span {display:none;}
.content.gallery #articleList .arrow-sm {
    position:absolute;top:65px;
}
.content.gallery #articleList .arrow-sm.left {left:3px;}
.content.gallery #articleList .arrow-sm.right {right:3px;}

/* news /
.content.news #articleList {padding:0;margin:0;list-style:none;}
.content.news .date {color:#666666;}
.content.news .date a {color:black;}
.content.news #articleList {font-size:15px;}
.content.news #articleList h2 {margin-bottom:0;}
.content.news #articleList a {color:black;}
.content.news .share-icons a {color:#f6d143;}
.content.news .share-icons a .fa-inverse {color:#f0f0f0;}

@media all and (max-width:1045px) {
    #w1 {width: 100%;margin: 0;}

    header {margin-bottom:15px;}

    #banners {width:90%;margin:0 auto;clear:both;}
    #banners ul {width:100%;height:auto;margin:0 auto;}

    .content img {max-width:100%;height:auto !important;}
    .content.home {text-align:center;}
    .content.home li {float:none;}
    .home li {margin:3px 6px;}
    .home li:first-child {margin-left:6px;}
    .home li:last-child {margin-right:6px;}

    input[type=text] {width:100% !important;}
    textarea {width:100% !important;}

    /* gallery /
    .content.gallery #gallery {width:100%;}
    .content.gallery #bigImg {width:100%;}
}
@media all and (max-width:750px) {
    header,footer,.content{padding-left:25px;padding-right:25px;}
    #logo {left:25px;}
    #banners {width:80%;margin:0 auto;}
    #banners .banner-left, #banners .banner-right {top:30%;}
}
@media all and (max-width:550px) {
    footer .credit {float:none;margin-bottom:15px;}

    .content.gallery #gallery .banner-left, .content.gallery #gallery .banner-right {top:20%;}
    .content.gallery #articleList, .content.gallery #articleList ul {
        height:72px;
    }
    .content.gallery #articleList .arrow-sm {top:26px;}
    .content.gallery #articleList div {width:85%;}
    .content.gallery #articleList li img {
        height:47px !important;width:47px !important;
    }
    .content.gallery #articleList .arrow-sm {top:32px;}

    table {display:inline;}
    table tbody {display:inline;}
    table tr {display:inline;}
    table td {display:inline;}
}
*******************************************************************************/


// .page-id-1158
jQuery( document ).ready(function() {
  var fixups_target_page_class_ref = '.page-id-1158';
  //alert("in page_fixups.js! To fixup WP pageId: '" + fixups_target_page_class_ref + "' *");

  //jQuery('.page-id-874 header').html()

  //jQuery('.page-id-874 header').toArray()[0]
  //<header class="tc-header clearfix row-fluid tc-tagline-off tc-title-logo-on  tc-shrink-on tc-menu-on logo-left tc-second-menu-on tc-second-menu-in-sn-before-when-mobile" role="banner" style="height: auto; top: 32px;">

  jQuery('body' + fixups_target_page_class_ref).removeClass('tc-sticky-header');

  // Scrubs top nav header. Logo, nav links, tagline, etc.
  jQuery( fixups_target_page_class_ref + ' header').toArray()[0].innerHTML =
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
  jQuery( fixups_target_page_class_ref + ' #tc-reset-margin-top').attr('style', 'margin-top: 40px;');

  //
  //jQuery( jQuery( photo_effect_class_ref + ' header').toArray()[0] ).attr('style', 'height: 60px; top: 0px;');

  //
  //jQuery( jQuery( fixups_target_page_class_ref + ' header').toArray()[0] ).attr('style', 'display:none;');


  //jQuery(jQuery('.page-id-5 .navbar .nav>li>a ').toArray()[0]).css('font-size')
  // "16px"

});
