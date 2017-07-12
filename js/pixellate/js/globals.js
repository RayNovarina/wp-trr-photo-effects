function exp_statusLog( msg ) {
  if ( msg == 'init-done') {
    console.log(' ');
    console.log('******************************************');
    console.log('************* INIT DONE ******************');
    console.log('******************************************');
    return;
  } else if (msg.indexOf('..*16  Clicked on') != -1) {
    console.log(' ');
    console.log('******************************************');
    console.log('*************** CLICK ********************');
    console.log('******************************************');
  } else if ( (msg.indexOf('..*16a: swap_in_bio') != -1) ||
              (msg.indexOf('..*16b: swap_in_bio') != -1) ) {
    console.log(' ');
    console.log('******************************************');
    console.log('************** SWAP IN *******************');
    console.log('******************************************');
  } else if (msg.indexOf('..*17: swap_out_bio') != -1) {
    console.log(' ');
    console.log('******************************************');
    console.log('************** SWAP OUT ******************');
    console.log('******************************************');
  } else if (msg.indexOf('..*18: Scrolled ') != -1) {
    console.log(' ');
    console.log('******************************************');
    console.log('************* SCROLLED TO ****************');
    console.log('******************************************');
  }
  console.log(msg);
};

var globals = {
  pluginName: 'trr_pixellate',
  // pluginName: 'trr_halftone_dots'
//};
//var trr_pixellate_globals = {
  pluginInstanceName: 'trr_plugin_pixellate',

  pixellate_class: 'trr-photo-effect',
  pixellate_class_ref: '.trr-photo-effect',
  pixellate_elem_def: '<img class="trr-photo-effect title="photo_url halftone_url"/>',
  // pixellate_photo_class_ref: '.bio-photo',
  //pixellate_target_class: 'trr-pe-photo-background-image',
  //pixellate_target_class_ref: '.trr-pe-photo-background-image',
  pixellate_pixels_container_class: 'trr-pe-pixell-array',
  pixellate_pixels_container_class_ref: '.trr-pe-pixell-array',
  pixellate_pixel_class: 'trr-pe-pixellate-pixel',
  pixellate_pixel_class_ref: '.trr-pe-pixellate-pixel',

  // bio_containers_class_ref: '.bios-container',
  // bio_container_class_ref: '.bio-container',

  fixups_target_page_class_ref: '.page-id-874',

  defaults: {
    // Grid divisions
    columns: 30,
    rows: 30,
    background_image_width: 400,
    background_image_height: 400,

    // Duration of explosion animation
    duration: 1500,

    // Direction of explosion animation ('out', 'in', or 'none')
    direction: 'out',

    // Resize pixels during animation
    scale: true,

    // Coordinates representing the source of the explosion force
    //(e.g. [-1, 1] makes the explodey bits go up and to the right)
    explosionOrigin: [0,0],

    // Profile who's bio is visible.
    active_profile_idx: 0,

    // Bio that is visible.
    active_bio_idx: 0,

    // Scrolling results in change of profile.
    scroll_events: false,

    // Click on profile photo results in change of profile.
    click_events: false,
  }
};

//if ( globals.pluginName == 'trr_pixellate') {
//  jQuery.extend( globals, trr_pixellate_globals );
//} else if ( globals.pluginName == 'trr_halftone_dots') {
//  jQuery.extend( globals, trr_halftone_dots_globals );
//}

exp_statusLog( "  ..*4-global data done for PluginName '" + globals.pluginName + "'*" );
