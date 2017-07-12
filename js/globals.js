function trr_statusLog( msg ) {
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

// called by main() after page loaded, dom ready.
function trr_create_globals( callback ) {
  // Note: overwrite what our loader created via its var globals = { ... }
  trr_globals = {
    status: {
      enabled: false,
    },
    photo_effect_class: 'trr-photo-effect',
    photo_effect_class_ref: '.trr-photo-effect',
    photo_effect_elem_def: '<img class="trr-photo-effect trr-pe-canvas-dots trr-pe-pixellate title="photo_ur"/>',

    window_location_origin: '',
    window_width: '',
    window_height: '',
    fixups_target_page_num: '',
    fixups_target_page_class_ref: '', // '.page-id-874',

    defaults: {
      // Scrolling results in change of bio.
      scroll_events: false,
      // Click on profile photo results in change of bio.
      click_events: false,
      // Photo's which is being animated in the animation_container.
      active_photo_idx: 0,
    },
  };
  trr_globals_add_effect_extensions(
  /*1-Resume here when done*/ function() {
  callback();
  /*1-*/});
};

// called by main() after page load() and DOM ready()
function trr_globals_add_effect_extensions( callback ) {
  trr_statusLog( "  ..*3a-globals_add_effect_extensions() *" );
  trr_globals_if_dots_effect(
  /*1-Resume here when done*/ function() {
  trr_globals_if_pixellate_effect(
  /*2-Resume here when done*/ function() {
  trr_statusLog( "  ..*3b-global data done*" );
  callback();
  /*2-*/});/*1-*/});
};

//=============================
//=============================
function trr_globals_if_dots_effect( callback ) {
  if ( typeof trr_globals_for_dots_effect !== 'undefined' ) {
    trr_globals_for_dots_effect(
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};


function trr_globals_if_pixellate_effect( callback ) {
  if ( typeof trr_globals_for_pixellate_effect !== 'undefined' ) {
    trr_globals_for_pixellate_effect(
    /*1-Resume here when done*/ function() {
    callback();
    /*1-*/});
    return;
  }
  callback();
};
