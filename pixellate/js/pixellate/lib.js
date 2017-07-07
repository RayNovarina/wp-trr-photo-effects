
// Extend the jquery lib/Create a global method in the jquery space via the
// jQuery.fn array of registered funcs.
//
// The 'pixellate()' plugin operates on a <img> 'trr-photo-effect' class.
// Create and attach the plugin instance to that <img>, and run the
// pixellate.init() method against it.
// First call stack: main.js(L16) --> exp_convert_data_to_html(this)
//                   exp_convert_data_to_html(L111): el = jQuery( globals.pixellate_class_ref ).toArray().first
//                   exp_convert_data_to_html(L116) --> jQuery(el).pixellate('', jQuery(el));
//                            sooo.... this is set to the elem that is calling pixellete()

// Params: this is set to the elem that is calling trr-pixellete(), i.e.
//           the jQuery object (HTML '<img class="trr-photo-effect />')
//         $pix_obj = jQuery object (HTML '<div class="bio-pixell-array"></div>')
//         options = '' or 'in' or 'out'
jQuery.fn[ globals.pluginName ] = function ( options, $pix_obj ) {
  return this.each(function() {
    if ( !jQuery.data( this, globals.pluginInstanceName ) ) {
      // This 'trr-photo-effect' <img> does not have a 'plugin_pixellate' method in its jquery data hash.
      exp_statusLog( "  ..*5b: jQuery.fn[ " + globals.pluginName + " ]*" );
      jQuery.data( this, globals.pluginInstanceName, new Plugin( this, options, $pix_obj ) );
      // Now this img's jQuery.data has a plugin_pixellate() Plugin instance
      // referenced via 'jQuery.data( this, "plugin_" + exp_pluginName ).init();''
    } else if(typeof options === 'string') {
      exp_statusLog( "  ..*5c: jQuery.fn[ " + globals.pluginName + " ](" + options + ")*" );
      jQuery.data( this, globals.pluginInstanceName ).options.direction = options;
      jQuery.data( this, globals.pluginInstanceName ).$pix_obj = $pix_obj;
      jQuery.data( this, globals.pluginInstanceName ).init();
    }
  });
};

function Plugin(el, options, $pix_obj) {
  // Note: jQuery(el) = '<img class="trr-photo-effect />'
  exp_statusLog( "  ..*5-creating Plugin: for " + jQuery(el).attr('id') + ". On: " + jQuery(el).attr('class') +
                 ".  $pixels at " + $pix_obj.attr('id') + "*");
  this.$el = jQuery(el);
  this.$pix_obj = $pix_obj;
  this.options = jQuery.extend({}, globals.defaults, options);
  this._defaults = globals.defaults;
  this._name = globals.pluginName;

  this.init();
  exp_statusLog( "  ..*6-Plugin init done.*" );
};

Plugin.prototype = {
  init: function() {
    // Note: this.$el = <img class="trr-photo-effect title="photo_url halftone_url"/>
    exp_statusLog( "  ..*7-Plugin init for " + this.$el.attr('id') + "*");
    // this.$pix_obj.trr-pe-pixell-array is an array of spans for each image fragment.
    if(!this.$pix_obj.find( globals.pixellate_pixel_class_ref ).length) {
      var photo_urls = this.$el.attr('title').split(' ');
      var profile_url = photo_urls[0] || '',
          halftone_url = photo_urls[1] || '',
          img = new Image();

      this.$el
        .data('pixellate-image-src', halftone_url)
        .addClass('pixellate-lock');

      jQuery(img).one('file_load_completed', jQuery.proxy(this.createPixels, this));

      img.src = this.$el.data('pixellate-image-src');
      if(img.complete) {
        exp_statusLog( "  ..*7a: halftone-profile file " + this.$el.data('pixellate-image-src') +
                       " loaded.*");
        jQuery(img).trigger('file_load_completed');
      }
    } else {
      this.stylePixels();
    }
  },

  createPixels: function() {
    // this.$pix_obj = <div class="trr-pe-pixell-array"></div>
    this.$pix_obj.append(new Array((this.options.rows * this.options.columns) + 1)
                   .join('<span class="' + globals.pixellate_pixel_class + '"></span>'));
    exp_statusLog( "  ..*9-create $pixels at " + this.$el.attr('id') +
                   ": " + globals.pixellate_pixels_container_class + "[ ].length = '" +
                   this.$pix_obj.find( globals.pixellate_pixel_class_ref ).length + "'*");
    this.stylePixels(true);
    },

  stylePixels: function(initializeStyles) {
    exp_statusLog( "  ..*10-stylePixels( " + (initializeStyles ? "onlyInitStyles" : this.options.direction) +
                   ". Using $pixels at " + this.$el.attr('id') + " )*" );
    var self = this,
        $pixels_container = this.$pix_obj,
        w = $pixels_container.width(),
        h = $pixels_container.height(),
        columns = this.options.columns,
        rows = this.options.rows,
        $pixels = this.$pix_obj.find(globals.pixellate_pixel_class_ref);

    // jQuery('.explode').find('.pixellate-pixel')[0] (length of array = 400)
    // <span class="pixellate-pixel"
    //    style="
    //       position: absolute;
    //       width: 20px; height: 20px;
    //       background-image: url(&quot;./5580042-profile-pictures_halftone-image-generator.png&quot;);
    //       background-size: 400px auto;
    //       backface-visibility: hidden;
    //       left: 0px; top: 0px;
    //       background-position: 0px 0px;
    //       transform: none;
    //       opacity: 1;
    //       transition: all 1500ms ease-in-out 0s;">

    var styles = initializeStyles ? {
      'position': 'absolute',
      'width': (w / columns),
      'height': (h / rows),
      'background-image': 'url('+this.$el.data('pixellate-image-src')+')',
      'background-size': w,
      'backface-visibility': 'hidden'
    } : {};

    for(var idx = 0; idx < $pixels.length; idx++) {
      var pixelStyles = {};

      if(initializeStyles) {
        $pixels_container.addClass('initializeStyles');
        var x = (idx % columns) * styles.width,
            y = (Math.floor(idx / rows)) * styles.height;

        jQuery.extend(pixelStyles, styles, {
          'left': x,
          'top': y,
          'background-position': (-x)+'px '+(-y)+'px'
        });
      } else {
        if(self.options.direction == 'out') {
          $pixels_container.removeClass('imploded');
          $pixels_container.addClass('exploded');
          var randX = (Math.random() * 300) - 150 - (self.options.explosionOrigin[0] * 150),
              randY = (Math.random() * 300) - 150 - (self.options.explosionOrigin[1] * 150);

          var transformString = 'translate('+randX+'px, '+randY+'px)';
          if(self.options.scale) {
            transformString += ' scale('+(Math.random() * 1.5 + 0.5)+')';
          }

          jQuery.extend(pixelStyles, {
            'transform': transformString,
            'opacity': 0,
            'transition': self.options.duration+'ms ease-out'
          });
        } else if(self.options.direction == 'in') {
          $pixels_container.removeClass('exploded');
          $pixels_container.addClass('imploded');
          jQuery.extend(pixelStyles, {
            'transform': 'none',
            'opacity': 1,
            'transition': self.options.duration+'ms ease-in-out'
          });
        }
      }
      $pixels.eq(idx).css(pixelStyles);
    }
  }
};

// Update the active bio slot with the specified profile.
// params: profile_idx: integer
//         action: string - 'implode' or ''
//         action_delay: ms to delay before performing action.
//         effect: string = 'scroll' or '': scroll to the new bio or insert html content.
//         callback: code to resume when done
function swap_in_bio( profile_idx, action, action_delay, effect, /*Code to resume when done*/ callback ) {
  var src_profile = jQuery( jQuery(globals.pixellate_class_ref).toArray()[ profile_idx ] ),
      active_bio_idx = parseInt( jQuery(globals.bio_containers_class_ref ).attr('active_bio_idx') ),
      dest_bio = jQuery( jQuery(globals.bio_container_class_ref).toArray()[ active_bio_idx ] ),
      scroll_to_bio = jQuery( jQuery(globals.bio_container_class_ref).toArray()[ profile_idx ] );

  if (effect == 'scroll') {
    exp_statusLog( "  ..*16a: swap_in_bio('" + action + "':'" + effect + "') for profile_idx " + profile_idx +
                   ". Active bioId: " + dest_bio.attr('active_id') +
                   ". New ProfileId: " + src_profile.attr('id') +
                   ". ScrollTo BioId:" + scroll_to_bio.attr('active_id') + ".*" );

    //jQuery('html, body').animate({
    //  scrollTop: 2000 // scroll_to_bio.offset().top
    //}, 1000);
  } else { // if (effect == 'click')
    exp_statusLog( "  ..*16b: swap_in_bio('" + action + "':'" + effect + "') " + profile_idx +
                   ". Active bioId: " + dest_bio.attr('active_id') +
                   ". New ProfileId: " + src_profile.attr('id') +
                   ". ScrollTo BioId:" + scroll_to_bio.attr('active_id') + ".*" );

    //TweenMax.to( window, 2, { scrollTo: "#someID" } );

    //dest_bio.attr('active_id', src_profile.attr('id'));
    //dest_bio.attr('active_idx', src_profile.attr('profile-idx'));
    //dest_bio.find('.name').html(src_profile.find('.name').html());
    //dest_bio.find('.title').html(src_profile.find('.title').html());
    //dest_bio.find('.short-bio').html(src_profile.find('.short-bio').html());
  }

  var profile_tag = src_profile.find( '.name' ).html().split(' ')[0].toLowerCase();
  dest_bio.attr('id', ('active_bio_for_profile-' + (profile_idx + '') + '-' + profile_tag) );
  dest_bio.attr( 'bio-profile-tag', profile_tag );
  jQuery( globals.bio_containers_class_ref ).attr('active_profile_idx', profile_idx + '');

  // NOTE: initial state of default profile is an exploded image.
  // 1) Move profile pixell array of spans into bio display page.

  // 'div.bio-container'.find('
  //                    .bio-background-image')
  //                    .append( 'div.profile-container id="gina"'.find(
  //                             '.bio-pixell-array') );
  //
  dest_bio.find( globals.pixellate_target_class_ref )
          .append( src_profile.find(globals.pixellate_pixels_container_class_ref ) );

  setTimeout(function() {
    if (action == 'implode') {
      // implode/rebuild halftone image.
      src_profile.pixellate( 'in', dest_bio );
    }

    callback();
    return;
  }, action_delay);
};

// Take the updated contents of the specified bio (active) and put it back
// in its profile container.
// params: bio_idx: integer,
//         action: 'explode' or ''
//         action_delay: ms to delay after performing action.
//         callback: code to resume when done
function swap_out_bio ( bio_idx, action, action_delay, effect, /*Code to resume when done*/ callback ) {
  var src_bio =  jQuery( jQuery(globals.bio_container_class_ref).toArray()[ bio_idx ] ),
      dest_profile_idx = parseInt( jQuery( globals.bio_containers_class_ref ).attr('active_profile_idx') ),
      dest_profile = jQuery( jQuery(globals.pixellate_class_ref).toArray()[ dest_profile_idx ] );
  exp_statusLog( "  ..*17: swap_out_bio('" + action +"') for bio_idx " + bio_idx +
                 ". Take Bio-" + bio_idx + "-" + src_bio.attr('active_id') +
                 " and put back in: " + dest_profile.attr('id') + ".*" );

  if ( src_bio.find( '.bio-pixell-array' ).length == 0 ) {
    exp_statusLog( "  ..*17a: swap_out_bio: src_bio.pixellArray is empty. Ignore swap_out. *");
    callback();
    return;
  } else {
    if (action == 'explode') {
      // explode halftone image in the bio page. NOTE: this is the normal state of
      // the pixel array for an inactive profile.
      dest_profile.pixellate( 'out', src_bio );
    }
    setTimeout(function() {
      // Put the updated pixel array of the specified bio (active) and put it back
      // in its profile container.
      // globals.pixellate_pixels_container_class_ref
      src_bio.find( '.bio-pixell-array' ).insertAfter( dest_profile.find('.bio-photo') );
      jQuery( globals.bio_containers_class_ref ).attr('active_profile_idx', '');

      callback();
      return;
    }, action_delay);
  }
};
