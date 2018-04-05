
//console.time("Loading plugins");

const gulp 			= require('gulp');
const cached 	    = require('gulp-cached'); // remove?
const changed       = require('gulp-changed'); // remove?
const gutil 		= require('gulp-util');
const argv          = require('yargs').argv;
const path 			= require('path');
const runSequence   = require('run-sequence');

// REQUIER DIRECTORY (Import all tasks)
const requireDir = require('require-dir');
requireDir('./gulp/tasks');

// FABRICATOR - STYLEGUIDE
const styleguide = require('./fabricator/gulp.fabricator'); // Tasks
const fabconfig = require('./gulp/fabconfig');

// CONFIG
const config = require('./gulp/config');


// $ gulp                    (All - dev mode)  
// $ gulp styleguide         (All - Launch the Style guide)
// $ gulp --brand activetalents    (Any brand in collection)

// $ gulp --prod             (All - produktion mode, minified and optimized)  
// $ gulp --lint             (Activates linting for Styles and Scripts)  

// $ gulp clean              (Delete dev & dist folders)
// $ gulp clean:dev          (Keeps graphics and images in dev folder)
// $ gulp graphics           (Image and svg tasks)


// $ gulp graphics:all



///////////////////////////
// COMMANDS
///////////////////////////

// $ gulp           (DEV files)

// $ gulp --dev     (DEV files + Starts the styleguide and sets up development essentials)
// $ gulp --prod    (DIST files, for production)
// $ gulp --lint    (Adds linting to the DEV workflow)

// $ gulp critical  (Generate the critical path css with Penthouse)
// $ gulp svg       (Gulp svg sprites and materials)


// default build task
gulp.task('default', ['fab-clean'], () => {

  if (!config.prod) {

      process.env.brand = 'all';

      if (argv.brand) {
          process.env.brand = argv.brand;
      }

      // Define build tasks
      const tasks = [
        'clean:dev',
        'ui-styles',
        'ui-scripts',
        'at-styles',
        //'at-scripts',
      ];

      const tasksFabricator = [
        'ui-scripts:polyfills',
        'fab-dist:clean',
        'fab-material-taxonomys:generate',
        'fab-js-scope-taxonomys:generate',
        'fab-copy:assets',
        'fab-styles',
        'fab-scripts',
        'fab-images',
      ];

      const tasksFabricatorAssemble = [
        'fab-assembler',
      ];

      // Run
      runSequence(tasks,tasksFabricator, () => {
          runSequence(tasksFabricatorAssemble, () => {
            if (fabconfig.dev) {
              gulp.start('fab-serve');
            }
          });
      });

      if (config.lint) {
          runSequence(
              'lint:all'
          );
      }


  } else {

      runSequence(
          'clean:dist',
          //'graphics:all',
          [
            //'styles-brand:all',
            //'scripts',
          ]
      );

  }

});



///////////////////////////
// $ gulp
///////////////////////////
/*
gulp.task('default', () => {
    if (!config.prod) {
        
        process.env.brand = 'all';

        if (argv.brand) {
            process.env.brand = argv.brand;
        }

        runSequence(
            'clean:dev-part',
            'graphics:all',
            `styles-brand:${process.env.brand}`, // Brand flag
            [
                'scripts'
            ],
            'watch:all' // Brand flag
        );

        if (config.lint) {
            runSequence(
                'lint:all'
            );
        }

    } else {
        runSequence(
            'clean:dist',
            'graphics:all',
            [
                'styles-brand:all',
                'scripts',
            ]
        );
    }
}); */

