
function exp_init() {
  // console.clear();
  console.log("************************ exp_init( scroll_events: " + globals.defaults.scroll_events + ") ************************");
  // jQuery:
  if (typeof jQuery !== 'undefined') {
    // jQuery is loaded
    console.debug("jQuery "+ jQuery.fn.jquery +" loaded");
    /* As for the prefix, jQuery should always work. If you want to use $ you
       can wrap your code to a function and pass jQuery to it as the parameter:
        (function( $ ) {
          $( '.class' ).doSomething();  // works always
        })( jQuery )
    */
  } else {
    console.debug("jQuery NOT loaded");
  }

  // ScrollMagic:
  if (typeof ScrollMagic !== 'undefined') {
    console.log("ScrollMagic v%s loaded", ScrollMagic.version);
    if ( globals.defaults.scroll_events) {
      globals.scrollMagic_controller = new ScrollMagic.Controller();
    }
  } else {
    console.debug("ScrollMagic NOT loaded");
  }

  // TweenMax:
  if (typeof TweenMax !== 'undefined') {
    console.log("TweenMax v%s loaded", TweenMax.version);
    // if ( !globals.defaults.scroll_events) {
      // Create a timeline
      // var tl = new TimelineMax({options});
    // }
  } else {
    console.debug("TweenMax NOT loaded");
  }

  // ScrollToPlugin:
  if (typeof ScrollToPlugin !== 'undefined') {
    console.log("ScrollToPlugin v%s loaded", ScrollToPlugin.version);

  } else {
    console.debug("ScrollToPlugin NOT loaded");
  }

  jQuery(window).load(function () {
   window.scrollTo(0,0);
  });

};

function exp_convert_data_to_html() {
  // Bind events and initialize plugin
  /*
  <img class="trr-photo-effect title="photo_url halftone_url"/>
  */

  globals.state = {};
  globals.photos = jQuery( globals.pixellate_class_ref ).toArray();
  exp_statusLog( "  ..*13: exp_convert_data_to_html(): START data to html conversion for " + globals.photos.length + " photos.*" );

  if ( globals.photos.length == 0 ) {
    exp_statusLog( "  ..*13a: exp_convert_data_to_html(): pixellate_class_ref '" + globals.pixellate_class_ref + "' NOT FOUND.'*");
    return;
  }
  jQuery.each( globals.photos, function( index, el ) {
    jQuery(el).attr( 'id', ('photo-' + (index + '') ) );
    jQuery(el).attr('photo-idx', index + '');
    jQuery('<div class="trr-pe-pixell-array" ' +
           'style="display: none; ' +
                  'width: ' + globals.defaults.background_image_width + 'px; ' +
                  'height: ' + globals.defaults.background_image_height + 'px;"></div>')
          .insertAfter( jQuery(el) );

    /*
    $bios_containers.append(
      '<div class="row bio-container' +
                 ' bio-container-for-' + jQuery(el).attr( 'id') + '"' +
          ' profile-idx="' + jQuery(el).attr('profile-idx') + '"' +
          ' active_id="' + jQuery(el).attr( 'id') + '">' +
        '<div class="col-sm-10">' +
          '<div class="info">' +
            '<div class="name">' + jQuery(el).find( '.name' ).html() + '</div>' +
            '<div class="title">' + jQuery(el).find( '.title' ).html() + '</div>' +
            '<div class="short-bio">' + jQuery(el).find( '.short-bio' ).html() + '</div>' +
          '</div>' +
          '<div class="bio-background-image"></div>' +
        '</div>' +
      '</div>');
      */

    if ( globals.defaults.scroll_events) {
      // Add scrollMagic hook for this bio.
      // create a scene
      // trigger position:
      //   default: element CROSSES THE MIDDLE of the viewport
      //   onEnter: element CROSSES THE BOTTOM of the viewport - either scroll up or down.
      //   onLeave: element
      //
      // function callback (event) {
      //  console.log("Event fired! (" + event.type + ")");
      // }
      // add listeners
      //   scene.on("change update progress start end enter leave", callback);

      new ScrollMagic.Scene({
        // trigger point is the bio Title line.
        triggerElement: '.bio-container-for-' + jQuery(el).attr( 'id')
        + ' .info' + ' .title', // point of execution
        triggerHook: 'onEnter', // on enter from the bottom.
        // ,offset: 200
      })
      .on('start', function (event) {
          // event.scrollDirection:
          //    PAUSED:
          // event.state:
          //    DURING  - scroll down
          //    BEFORE  - scroll up
          // console.log('event: ' + event.scrollDirection + ': ' + event.state);
          exp_scroll_trigger( event,
            (event.state == 'DURING' ? 'moving_up_into_view' :
             event.state == 'BEFORE' ? 'moving_down_out_of_view' : ''),
            '.bio-container-for-', '.bio-container-for-' + jQuery(el).attr( 'id') );
      })
      .addTo(globals.scrollMagic_controller); // assign the scene to the controller
    }

    // chop up bio image into '<img /><div>trr-pixell-array' $pixel <span> array.</div>
    jQuery(el).trr_pixellate('', jQuery(el).find('+ div'));
    // initial state is an exploded image.
    jQuery(el).trr_pixellate('out', jQuery(el).find('+ div'));
jQuery(el).trr_pixellate('in', jQuery(el).find('+ div'));
    if ( globals.defaults.click_events) {
      exp_add_click_handler( index, el);
    }
  });
  exp_statusLog( "  ..*14: exp_init(): END data to html conversion.*" );
};

function exp_build_default_view() {
  exp_statusLog( "  ..*15: exp_init(): Create default bio image from profile " + globals.defaults.active_profile_idx + ".*" );
  //jQuery( globals.bio_containers_class_ref ).attr('active_bio_idx', globals.defaults.active_bio_idx + '');
  // NOTE: upload, scroll event will trigger for 1st bio. Use that event to init bio page.
  //if ( !globals.defaults.scroll_events) {
  //  // Put default profile into bio page, implode/create its bio image.
  //  swap_in_photo( globals.defaults.active_profile_idx, 'implode', 0, '',
  //  /*1-Callback when done*/ function() {
  //  /*1-*/});
  //}
};
