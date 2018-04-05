// Config

const gutil = require('gulp-util');
module.exports = {
  dev: gutil.env.dev,
//  copy: {
//    dev: './dev/',
//    dist: './dist/',
//  },
  styles: {
    assets:   './fabricator/src/assets/',
    browsers: 'last 1 version',
    fabricator: {
      src:    './fabricator/src/assets/fabricator/styles/fabricator.scss',
      dest:   './fabricator/dist/assets/fabricator/styles',
      watch:  './fabricator/src/assets/fabricator/styles/**/*.scss',
    },
    at: {
      src:    './fabricator/src/assets/at/at.scss',
      dest:   './fabricator/dist/assets/at/styles',
      watch:  './fabricator/src/assets/at/**/*.scss',
    },
  },
  scripts: {
    fabricator: {
      src:    './fabricator/src/assets/fabricator/scripts/fabricator.js',
      dest:   './fabricator/dist/assets/fabricator/scripts',
      watch:  './fabricator/src/assets/fabricator/scripts/**/*',
    },
  },
  images: {
      src:   ['./fabricator/src/assets/images/**/*', './fabricator/src/favicon.ico'],
      dest:   './fabricator/dist/assets/images',
      watch:  './fabricator/src/assets/images/**/*',
  },
  svg: {
      src:    './fabricator/src/assets/svg/**/*',
      dest:   './fabricator/dist/assets/svg',  
  },
  templates: {
      watch: [
              'fabricator/src/**/*.{html,md,json,yml}',
              'src/ui/**/*.html',
              'src/assets/scripts/inline/*.js' // Inlined js files  -> 'src/assets/scripts/inline/beautyfied/*.js'
              ]
  },
  dest:       './fabricator/dist',
  views:      [ 
              'fabricator/src/views/**/*', 
              '!fabricator/src/views/+(layouts)/**'
              ],
  materials: [
              'src/ui/**/*.html',
              'src/assets/scripts/inline/*.js', // Inlined js files -> 'src/assets/scripts/inline/beautyfied/*.js'
              'src/assets/styles/inline/*.css',
              '!src/ui/**/+(__*)/**'
              ],
};

