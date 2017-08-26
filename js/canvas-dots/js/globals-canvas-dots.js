function trr_globals_for_dots_effect( callback ) {
  trr_statusLog( "  ..*3.1a-globals_for_dots_effect() *" );

  trr_globals.dots_effect = {
    loaded: true,
    enabled: false,
    pluginName: 'trr_halftone_dots',
    pluginInstanceName: 'trr_plugin_trr_halftone_dots',

    photo_effect_class: 'trr-pe-canvas-dots',
    photo_effect_class_ref: '.trr-pe-canvas-dots',
    photo_effect_elem_def: '<img class="trr-photo-effect trr-pe-canvas-dots title="photo_ur"/>',

    // threejs
    window_width: null, window_height: null,
    renderer: null, scene: null, camera: null, renderer_width: null, renderer_height: null,
    particles: null, canvas: null, image: null, centerVector: null, myRenderFunc: null,

    defaults: {
      // Profile who's bio is visible.
      active_photo_idx: 0,

      // Scrolling results in change of bio.
      scroll_events: true,

      // Click on profile photo results in change of bio.
      click_events: false,

      // threejs:
      // ?? used in lib.js:
      //   var vertex = new THREE.Vector3();
      //   vertex.speed = Math.random() / trr_globals.defaults.vertex_speed + 0.015;
      vertex_speed: 10,

      // background color of canvas used by THREE.WebGLRenderer() as in
      //  THREE.WebGLRenderer.setClearColor(HEX integer);
      // 0x00010D is very black.
      // 0x0000FF is very blue.
      // 0xFFFFFF is white.
      renderer_canvas_background_color: 0xF0F8FF,

      // changes size of dots. lessens the empty space around each dot.
      dots_size: 3, //3,

      // changes color of dots.
      // 0x024059 is blueish.
      // 0x022020 is greenish
      // 0xFFFFFF is white/becomes invisible if white background.
      // 0x059059 is light green.
      // 0x014080 is a good halftone blue.
      dots_color: 0x014080,

      move_canvas_image_left: false,
      move_canvas_image_right: true,
      // 0 px puts canvas animation in the center of viewport/html body.
      // should be a % to be responsive?
      move_canvas_image_by_px: 80,

      // pixell select strategy:
      //    pixel array contains 4 values for each pixel: one for each color (RGB)
      //    and at last one for the Alpha. We only want specific pixels. Select only
      //    the pixel with less than the specified transparency.
      //      Default is 128.
      //      if smaller we get less dots for laura_100x100.jpeg
      //      255 is too much, almost solid block.
      //      200 is much better than 128.
      // laura_150x150: best is 220.
      // christopher_lane_150x135: best is 180;
      select_pixels_with_transparency_value_less_than_this_value: 180,
    }, // end of defaults{}
  };// end of trr_globals.dots_effect = {}

  callback();
};
