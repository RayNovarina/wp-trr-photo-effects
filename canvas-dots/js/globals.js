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

var globals = {
  pluginName: 'trr_halftone_dots',
  pluginInstanceName: 'trr_plugin_pixellate',

  photo_effect_class: 'trr-photo-effect',
  photo_effect_class_ref: '.trr-photo-effect',
  photo_effect_elem_def: '<img class="trr-photo-effect trr-pe-canvas-dots title="photo_url"/>',

  fixups_target_page_class_ref: '.page-id-874',

  // threejs
  renderer: null, scene: null, camera: null, renderer_width: null, renderer_height: null,
  particles: null, canvas: null, image: null, centerVector: null,

  defaults: {
    // Profile who's bio is visible.
    active_profile_idx: 0,

    // Scrolling results in change of bio.
    scroll_events: false,

    // Click on profile photo results in change of bio.
    click_events: false,

    // threejs:
    speed: 10,
    // background color of canvas.
    // 0x00010D is very black.
    // 0x0000FF is very blue.
    // 0xFFFFFF is globals.renderer_heightite.
    canvas_background_color: 0xFFFFFF,

    // changes size of dots. lessens the empty space around each dot.
		dots_size: 4, //3,

    // changes color of dots.
    // 0x024059 is blueish.
    // 0x022020 is greenish
    // 0xFFFFFF is white/becomes invisible if white background.
    // 0x059059 is light green.
    // 0x014080 is a good halftone blue.
		dots_color: 0x014080,
  }
};

trr_statusLog( "  ..*4-global data done for PluginName '" + globals.pluginName + "'*" );
