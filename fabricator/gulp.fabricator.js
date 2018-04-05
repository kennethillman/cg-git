const assembler = require('fabricator-assemble');
const browserSync = require('browser-sync');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const reload = browserSync.reload;
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');

const config = require('../gulp/config');
const fabconfig = require('../gulp/fabconfig');

const fs = require('fs');
const path = require('path');
const rootPath = path.resolve('.');





///////////////////////////
// FAB CLEAN
///////////////////////////

// DIST
gulp.task('fab-clean', del.bind(null, [fabconfig.dest]));


///////////////////////////
// COPY
///////////////////////////

// FONTS
gulp.task('fab-copy:fonts', () => {
    return gulp.src('./src/assets/fonts/*.*')
               .pipe(gulp.dest('./fabricator/dist/assets/fonts'));
});

// IMAGES
gulp.task('fab-copy:images', () => {
    return gulp.src('./src/assets/images/**/*.*')
               .pipe(gulp.dest('./fabricator/dist/assets/images'));
});

// SVG
gulp.task('fab-copy:svg', () => {
    return gulp.src('./src/assets/video/*.*')
               .pipe(gulp.dest('./fabricator/dist/assets/video'));
});

// VIDEO
gulp.task('fab-copy:video', () => {
    return gulp.src('./src/assets/generated/svg/*.svg')
               .pipe(gulp.dest('./fabricator/dist/assets/svg'));
});

// ASSETS
gulp.task('fab-copy:assets', ['fab-copy:fonts','fab-copy:video','fab-copy:images','fab-copy:svg']);



///////////////////////////
// FAB STYLES
///////////////////////////

gulp.task('fab-styles:fabricator', () => {
  gulp.src(fabconfig.styles.fabricator.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix('last 1 version'))
  .pipe(gulpif(!fabconfig.dev, csso()))
  .pipe(rename('f.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(fabconfig.styles.fabricator.dest))
  .pipe(gulpif(fabconfig.dev, reload({ stream: true })));
});

gulp.task('fab-styles', ['fab-styles:fabricator']);


///////////////////////////
// AT STYLES
///////////////////////////

gulp.task('at-styles:activetalents', () => {
  gulp.src(fabconfig.styles.at.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix('last 1 version'))
  .pipe(gulpif(!fabconfig.dev, csso()))
  .pipe(rename('at.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(fabconfig.styles.at.dest))
  .pipe(gulpif(fabconfig.dev, reload({ stream: true })));
});

gulp.task('at-styles', ['at-styles:activetalents']);


///////////////////////////
// FAB SCRIPTS
///////////////////////////

const webpackConfig = require('./webpack.config')(fabconfig);

gulp.task('fab-scripts', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red(err()));
    }
    const result = stats.toJson();
    if (result.errors.length) {
      result.errors.forEach((error) => {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});


///////////////////////////
// FAB IMAGES
///////////////////////////

gulp.task('fab-images', ['fab-favicon', 'fab-svg'], () => {
  return gulp.src(fabconfig.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(fabconfig.images.dest));
});

gulp.task('fab-svg', () => {
  return gulp.src(fabconfig.svg.src)
    .pipe(gulp.dest(fabconfig.svg.dest));
});

gulp.task('fab-favicon', () => {
  return gulp.src('src/favicon.ico')
  .pipe(gulp.dest(fabconfig.dest));
});


///////////////////////////
// FAB ASSEMBLER
///////////////////////////

gulp.task('fab-assembler', (done) => {

    // Add Handlebars helpers to Fabricator's assemble engine.
    const customHelperPath  = `${rootPath}/fabricator/src/assets/hbs-helpers/`;
    const customHelperFiles = fs.readdirSync(customHelperPath);
    const hbsHelperReqs     = {};

    customHelperFiles.forEach((fileName) => {
      if (fileName.indexOf('.js') === -1) {
          return;
      }
      const fileNameWoExt          = fileName.replace('.js', '');
      hbsHelperReqs[fileNameWoExt] = require(customHelperPath + fileNameWoExt);
    });


    // Handel views and materials types from config.taxonomy
    let assemblerViews = fabconfig.views;
    let assemblerMaterials = fabconfig.materials;

    config.taxonomy.forEach(taxo => {

        let newPathsToInclued;
        let newPathsToExlude;
        const name  = taxo[0].toLowerCase();                                          // All in lower case "1-taxo"
        const type  = taxo[1].toLowerCase();                                          // All in lower case "material"
        const nameClean  = name.substring(2);                                         // Removes number prefix "1-"
        const nameHeader = nameClean.charAt(0).toUpperCase() + nameClean.slice(1);    // Makes first letter uppercase "Taxo"
        
        if (type === 'view') {

            // Paths
            newPathsToInclued = 'src/ui/'+name+'/**/*';
            newPathsToExlude = '!src/ui/'+name+'/**/*'; 
            // Exlude taxonomy views from materials
            assemblerMaterials.push(newPathsToExlude);
            // Include taxonomy in views 
            assemblerViews.push(newPathsToInclued);

        }

    });

    assembler({
      helpers: hbsHelperReqs,
      logErrors: fabconfig.dev,
      layouts: 'fabricator/src/views/layouts/*',
      layoutIncludes: 'fabricator/src/views/layouts/includes/*',
      views: assemblerViews,
      materials: assemblerMaterials,
      data: 'fabricator/src/data/**/*.{json,yml}',
      docs: 'fabricator/src/docs/**/*.md',
      dest: 'fabricator/dist'
    });
    done();
});


///////////////////////////
// FAB SERVER
///////////////////////////

gulp.task('fab-serve', () => {

  browserSync({
    server: {
      baseDir: fabconfig.dest,
      index: "start.html"
    },
    notify: false,
    logPrefix: 'FABRICATOR',
  });

  // Fabricator Watchers
  gulp.task('fab-assembler:watch', ['fab-assembler'], browserSync.reload);
  gulp.watch(fabconfig.templates.watch, ['fab-assembler:watch']);

  gulp.task('fab-styles:watch', ['fab-styles']);
  gulp.watch(fabconfig.styles.fabricator.watch, ['fab-styles:watch']);

  gulp.task('fab-scripts:watch', ['fab-scripts'], browserSync.reload);
  gulp.watch(fabconfig.scripts.fabricator.watch, ['fab-scripts:watch']);

  gulp.task('fab-images:watch', ['fab-images'], browserSync.reload);
  gulp.watch(fabconfig.images.watch, ['fab-images:watch']);

  // UI Watchers
  gulp.task('ui-styles:watch', ['ui-styles'], browserSync.reload);
  gulp.watch(config.watch.styles, ['ui-styles:watch']);

  gulp.task('ui-scripts:watch', ['ui-scripts'], browserSync.reload);
  gulp.watch(config.watch.scripts, ['ui-scripts:watch']);
 

});



