
function exp_init() {
  // console.clear();
  console.log("************************ exp_init( scroll_events: " + globals.scroll_events + ") ************************");
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
  <div class="profile-container">
    <div class="profile-photo">
      <img src="../images/jamer_hunt.jpg" />
    </div>
    <div class="info">
      <div class="name">Jamer Hunt</div>
      <div class="title">Grunt 2</div>
    </div>
    <div class="short-bio">
      Jamar is Grunt 2. He sorta leads the The Climate Corporation's Engineering team. He has more than 15 years of experience leading the development of large-scale systems in a variety of industries. Prior to The Climate Corporation, Brian worked at Orbitz as a Senior Architect responsible for the development of their distributed service platform and overall architecture. Before Orbitz, Brian worked at the investment bank UBS where he built global interest rate trading systems. He has contributed frequently to the open source community, including having been the lead developer for the Jython project. He holds a B.S. in Finance from the University of Illinois at Champaign.
    </div>
    <div class="bio-photo">
      <img src="../images/jamar_hunt-halftone-image-generator.png" />
    </div>
  </div>
  */

  exp_statusLog( "  ..*13: exp_init(): START data to html conversion.*" );
  $bios_containers = jQuery( globals.bio_containers_class_ref);

  jQuery.each( jQuery( '.profile-container' ).toArray(), function( index, el ) {
    var name = jQuery(el).find( '.name' ).html().split(' ')[0].toLowerCase();
    jQuery(el).attr( 'id', ('profile-' + (index + '') + '-' + name) );
    jQuery(el).attr('profile-idx', index + '');
    jQuery(el).attr( 'profile-name', name );

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

      /*
      new ScrollMagic.Scene({
        triggerElement: '.bio-container-for-' + jQuery(el).attr( 'id')
        + ' .info' // point of execution
        ,triggerHook: 'onLeave' //
      })
      .on('start', function () {
          exp_scroll_trigger( '.bio-container-for-', '.bio-container-for-' + jQuery(el).attr( 'id') );
      })
      .addTo(globals.scrollMagic_controller);
    */
    }

    if (index > 0) {
      jQuery( ".init-status" ).addClass('status-ignore');
    }
    jQuery(el).pixellate('', jQuery(el)); // chop up bio image into 'div.profile-container.bio-pixell-array' $pixel <span> array.
    jQuery(el).pixellate('out', jQuery(el)); // initial state is an exploded image.
    if ( globals.defaults.click_events) {
      exp_add_click_handler( index, el);
    }
  });
  jQuery( ".init-status" ).removeClass('status-ignore');
  exp_statusLog( "  ..*14: exp_init(): END data to html conversion.*" );
};

function exp_build_default_view() {
  exp_statusLog( "  ..*15: exp_init(): Create default bio image from profile " + globals.defaults.active_profile_idx + ".*" );
  jQuery( globals.bio_containers_class_ref ).attr('active_bio_idx', globals.defaults.active_bio_idx + '');
  // NOTE: upload, scroll event will trigger for 1st bio. Use that event to init bio page.
  if ( !globals.defaults.scroll_events) {
    // Put default profile into bio page, implode/create its bio image.
    swap_in_bio( globals.defaults.active_profile_idx, 'implode', 0, '',
    /*1-Callback when done*/ function() {
    /*1-*/});
  }
};
