// Inputs: parms - lib.swap_in/out parms.
function trr_swap_in_update_animation_area_before_action_for_pixellate_effect( parms, callback ) {
  trr_statusLog( "  ..*6.2c.1: trr_swap_in_update_animation_area_before_action_for_pixellate_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );
  callback();
};

// Inputs: parms - lib.swap_in/out parms.
function trr_animation_for_pixellate_effect( parms, callback ) {
  trr_statusLog( "  ..*6.2d: trr_animation_for_pixellate_effect(): photo_idx " + parms.photo_idx + ". Action: " + parms.action + ".*" );

  (parms.$swap_in_photo || parms.$swap_out_photo).trr_pixellate( parms,
  /*1-Resume here when done*/ function( return_info ) {
  callback( return_info );
  return;
  /*1-*/});
};

// Inputs: parms - lib.swap_in/out parms.
function PixellatePlugin(el, parms ) {
  // Note: jQuery(el) = '<img class="trr-photo-effect />'
  this.$el = jQuery(el),
  this._name = trr_globals.pixellate_effect.pluginName;
  var $el = this.$el;

  trr_statusLog( "  ..*6.2d.3-creating PixellatePlugin: photo with id: '" +
                 $el.attr('id') + "' class(s): '" + $el.attr('class') +
                 "' action: '" + parms.action + "' *" );

  this.create( $el, parms,
  /*1-Resume here when done*/ function( self, return_info ) {
  // NOTE: after callback this points to window elem, not our instance. So all
  // references going forward refer to 'self', not 'this'
  $el = self.$el;
  trr_statusLog( "  ..*6.2d.4-after creating PixellatePlugin: create done for id: '" + $el.attr('id') + "' *" );
  return self;
  /*1-*/});
};

PixellatePlugin.prototype = {
  // dispatch by action.
  action: function( parms, callback ) {
    var $el = this.$el;
    trr_statusLog( "  ..*6.2d.8-PixellatePlugin: Perform action '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");
    if ( parms.action == 'init' ) {
      this.init( parms,
      /*1a-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1a-*/});
    } else if ( parms.action == 'appear' ) {
      this.appear( parms,
      /*1b-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1b-*/});
    } else if ( parms.action == 'disappear' ) {
      this.disappear( parms,
      /*1c-Resume here when done*/ function( self, return_info ) {
      callback( return_info );
      /*1c-*/});
    } else {
      trr_statusLog( "  ..*6.2d.9-PixellatePlugin: **ERR: unknown action '" + parms.action +
                     "' for el.id: '" + this.$el.attr('id') + "' *");
      callback( null );
    }
    return;
  },

  // NOTE: action methods are listed alphabetically.
  appear: function( parms, callback ) {
    var $el = this.$el;
    trr_statusLog( "  ..*6.2d.10-pixellatePlugin appear '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");


    callback( this, null );
    return;
  },

  create: function( $el, parms, callback ) {
    // Note: this.$el = <img class="trr-photo-effect title="photo_url halftone_url"/>
    trr_statusLog( "  ..*6.2d.5-pixellatePlugin create for el.id: '" + $el.attr('id') +
                   "' action: '" + parms.action + "' *");
    callback( this, null );
    return;
  },

  disappear: function( parms, callback ) {
    var $el = this.$el;
    trr_statusLog( "  ..*6.2d.11-PixellatePlugin disappear '" + parms.action +
                   "' for el.id: '" + this.$el.attr('id') + "' *");

    callback( this, null );
    return;
  },

  init: function( parms, callback ) {
    // Note: this.$el = <img class="trr-photo-effect title="photo_url halftone_url"/>
    var $el = this.$el;
    trr_statusLog( "  ..*6.2d.6-PixellatePlugin init for el.id: '" + $el.attr('id') + "' action: '" + parms.action + "' *");

    $el.data('$el', $el );
    this.hlpr_add_animation_container( $el, parms,
    /*1-Callback when done*/ function( self, $animation_container, animation_container_dom_id ) {
    // NOTE: after callback this points to window elem, not our instance. So all
    // references going forward refer to 'self', not 'this'
    $el.data('$animation_container', $animation_container );
    $el.data('animation_container_dom_id', animation_container_dom_id );

    callback( self, null );
    return;
    /*1-*/});
  },

  // NOTE: action helper methods, listed alphabetically.
  hlpr_add_animation_container: function( $el, parms, callback ) {
    var self = this;
    if ( typeof trr_globals.pixellate_effect.$animation_container == 'undefined' ) {
      trr_globals.pixellate_effect.animation_container_dom_id = 'trr-pe-animation-container-for-' + 'all',
      trr_globals.pixellate_effect.$animation_container =
        //jQuery('body').append(
        jQuery(
              '<canvas id="' + trr_globals.pixellate_effect.animation_container_dom_id + '" ' +
                     'class="' + trr_globals.pixellate_effect.animation_container_dom_id +
                                ' trr-pe-pixell-array " ' +
                     'style="' +
                            'display: block; ' +
                            //'width: ' + trr_globals.pixellate_effect.defaults.background_image_width + 'px; ' +
                            //'height: ' + trr_globals.pixellate_effect.defaults.background_image_height + 'px; ' +
                            //'position: relative; ' +
                            //'top: 0; ' +
                            //'left: 500px; ' +

                            'width: 100%; ' +
                            'height: 100%; ' +
                            'padding: 0; ' +
                            'margin: 0; ' +
                            'overflow: hidden; ' +
                            'position: fixed; ' +
                            'z-index: -1; ' +
                            'top: 0; ' + // 15%;
                            'left: 0; ' + // 54%; ' +

                            //'border: 2px solid red;' +
                            '" ' +
                '></canvas>')
                //;
                .insertBefore( jQuery( '.entry-header' ) );
                //jQuery('<div class="trr-pe-pixell-array" ' +
                //       'style="display: block; position: relative; top 0px; left: 500px; ' +
                //              'width: ' + globals.defaults.background_image_width + 'px; ' +
                //              'height: ' + globals.defaults.background_image_height + 'px; ' +
                //              '' +
                //              '"></div>')
                //.insertAfter( $el );

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
      }
    callback( self, trr_globals.pixellate_effect.$animation_container, trr_globals.pixellate_effect.animation_container_dom_id );
    return;
  },

};

/*
var trr_dots_effect_sceneData = {
  geometry: { },
  material: {
    size: dots_size,
    color: dots_color,
    sizeAttenuation: false
  },
  imagedata: {
    photo_name: trr_dots_effect_image_name,
    uri_length: imagedata.length
    height: imagedata.height,
    iwidth: imagedata.width
  },
  pixel_selection: {
    transparency_less_than: trr_globals.dots_effect.defaults.select_pixels_with_transparency_value_less_than_this_value
  },
  canvas_location: {
    x_adjustment: x_adjustment
  },
  vertices: {
    constants: {
      items: geometry.vertices.length,
      z: vertex_z,
      speed: vertex_speed
    },
    array: geometry.vertices
  },
};
*/
