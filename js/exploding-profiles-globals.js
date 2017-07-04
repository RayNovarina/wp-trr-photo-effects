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
  //return;
  /*
  // if ( msg == 'init-done')
  // if ( msg == 'cycle-done')
  if ( $( ".status-ignore" ).length > 0) {
    return;
  }
  if ( msg == "init-done" ) {
    globals.status_msgs_class_ref = globals.cycle_msgs_class_ref;
  } else {
    $( globals.status_msgs_class_ref ).append( msg );
  }
  */
};

var globals = {
    pluginName: 'pixellate',
    pluginInstanceName: 'plugin_pixellate',

    init_msgs_class_ref: '.init-status',
    cycle_msgs_class_ref: '.cycle-status',
    status_msgs_class_ref: '.init-status',

    pixellate_class: 'profile-container',
    pixellate_class_ref: '.profile-container',
    pixellate_elem_def: 'div class="profile-container"',
    pixellate_photo_class_ref: '.bio-photo',
    pixellate_pixels_container_class_ref: '.bio-pixell-array',
    pixellate_target_class_ref: '.bio-background-image',

    bio_containers_class_ref: '.bios-container',
    bio_container_class_ref: '.bio-container',

    defaults: {
      // Grid divisions
      columns: 30,
      rows: 30,

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
      scroll_events: true,

      // Click on profile photo results in change of profile.
      click_events: false,
    }
  };
exp_statusLog( "  ..*4-global data done*" );
