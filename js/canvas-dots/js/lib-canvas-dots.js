function trr_make_swap_in_parms_for_dots_effect( parms ) {
  trr_statusLog( "  ..*6.1b: trr_make_swap_in_parms_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );
  /*var input_parms = { photo_idx: photo_idx, action: action,
                      action_delay: action_delay, effect: effect  },
trr_globals.dots_effect.photos
    trr_globals.animation_container.attr( 'profile-idx', trr_globals.active_photo_idx + '' );
    trr_globals.animation_container.attr( 'active_id', '*init*');

  */
  parms.src_photo = jQuery( trr_globals.dots_effect.photos[ 0 ] ),
  parms.active_photo_idx = parseInt( trr_globals.animation_container.attr( 'photo-idx' ) ),
  parms.dest_photo = trr_globals.animation_container,
  parms.scroll_to_photo = trr_globals.animation_container;
  parms.photo_tag = 'photo_tag';
  return parms;
};

function trr_swap_in_update_animation_area_before_action_for_dots_effect( parms, callback ) {
  trr_statusLog( "  ..*6.1c: trr_swap_in_update_animation_area_before_action_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );


  callback();
};

function trr_animation_effect_for_dots_effect( parms, callback ) {
  trr_statusLog( "  ..*6.1d: trr_animation_effect_for_dots_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );

    /* The next step is to call
    requestAnimationFrame(renderFunc) to animate/draw the 3D image.
    */
    trr_dots_effect_renderTheAnimatedImage(trr_dots_effect_renderFunc,
    /*1-Callback when done*/ function() {
    callback();
    return;
  /*1-*/});

};
//=============================

/* Draw the image. Get the data from the scene, select
the pixels we want to keep and store in a scene.particles array and call
requestAnimationFrame(renderFunc) to animate/draw the 3D image.
*/
var trr_dots_effect_renderTheAnimatedImage = function( renderFunc, callback ) {
  // per: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  // The window.requestAnimationFrame() method tells the browser that you wish
  // to perform an animation and requests that the browser call a specified
  // function to update an animation before the next repaint. The method takes
  // as an argument a callback to be invoked before the repaint.
  // Note: Your callback routine must itself call requestAnimationFrame() if
  // you want to animate another frame at the next repaint.
	requestAnimationFrame(renderFunc);
  callback();
};

var trr_dots_effect_renderFunc = function(a) {

	requestAnimationFrame(trr_dots_effect_renderFunc);

	trr_globals.dots_effect.particles.geometry.verticesNeedUpdate = true;
	//if(!isMouseDown){
	trr_globals.dots_effect.camera.position.x += (0-trr_globals.dots_effect.camera.position.x)*0.06;
	trr_globals.dots_effect.camera.position.y += (0-trr_globals.dots_effect.camera.position.y)*0.06;
	trr_globals.dots_effect.camera.lookAt(trr_globals.dots_effect.centerVector);
	//}

	trr_globals.dots_effect.renderer.render(trr_globals.dots_effect.scene, trr_globals.dots_effect.camera);
};
