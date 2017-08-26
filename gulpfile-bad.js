// gulp refs:
//   1) 10 things to know about Gulp: https://engineroom.teamwork.com/10-things-to-know-about-gulp/
//   2) Gulp for Beginners: https://css-tricks.com/gulp-for-beginners/
// note: to add more plugins:
// $ sudo npm install gulp-debug --save-dev


// including plugins
var gulp =        require( 'gulp' ),
    util =        require( 'gulp-util' ),
    concat =      require( 'gulp-concat' ),
    uglify =      require( 'gulp-uglify' ),
    minify =      require( 'gulp-minify' ),
    minifyHtml =  require( 'gulp-minify-html' ),
    debug =       require( 'gulp-debug' );
//var uglify =      require( 'gulp-uglify' );
//var minify =      require( 'gulp-minify' );
//var minifyHtml =  require( 'gulp-minify-html' );
//var $ = require('gulp-load-plugins')();

gulp.task( 'default', function() {
  gulp.src([
      // "dev/src/*.js",
      //'./js/load_the_script_loader.js',

      // 3rd party libs.
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/ThreeJs/three.min.js',

      // Plugin core libs.
      './js/main.js',
      './js/globals.js',
      './js/lib.js',
      './js/init.js',
      './js/scroll-event.js',
      './js/page-fixups.js',

      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/main.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/globals.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/lib.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/init.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/scroll-event.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/page-fixups.js',

      // for the canvas-dots effect extensions.
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/globals-canvas-dots.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/management-page-fixes-canvas-dots.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/init-canvas-dots.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/lib-canvas-dots.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/js/scroll-event-canvas-dots.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/canvas-dots/images/image-data-canvas-dots.js',

      // for the pixellate effect extensions.
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/globals-pixellate.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/management-page-fixes-pixellate.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/init-pixellate.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/lib-pixellate.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/js/scroll-event-pixellate.js',
      //'https://7975c016.ngrok.io/Sites/wordpress-5-exploding-profiles/wp-content/plugins/trr-photo-effects/js/pixellate/images/image-data-pixellate.js',

    ])
    .pipe(util.log("./dist/0.0.2/trr_photo_effects.min.js"))
    //.pipe(debug({title: 'Before concat'}))
    .pipe(concat( 'trr_photo_effects.min.js' ))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/0.0.2'))
});
