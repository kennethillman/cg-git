const gulp = require('gulp');
const argv = require('yargs').argv;
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const gulpif = require('gulp-if');
const header = require('gulp-header');
const using = require('gulp-using');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const criticalCss = require('gulp-penthouse');

const config = require('../config');
const fabconfig = require('../fabconfig');


/**
 * STYLES PRINT
 */

gulp.task('styles:print', () =>
    gulp.src(config.styles.print)
        .pipe(sourcemaps.init())
        .pipe(gulpif(!config.lint, using()))
        .pipe(sass({ outputStyle: 'compact' }))
        .pipe(gulpif(config.prod, cssnano()))
        .pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        .pipe(gulpif(config.prod, sourcemaps.write('.'), sourcemaps.write()))
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.styles.dev, 'assets/css')), gulp.dest(path.join(config.styles.dist, 'assets/css'))))
);


/**
 * STYLES
 */

const styleOutput = function() {
    let stylesrc = config.styles.src;
    
    return gulp.src(stylesrc)
        // .pipe(header("@import './src/assets/styles/ui-gulp-stream-include.scss';"))
        // .pipe(sourcemaps.init())
        // .pipe(gulpif(!config.lint, using()))
        // .pipe(sass({ outputStyle: 'compact' }))
        // .pipe(concat('ui-styles.css'))
        // .pipe(gulpif(config.prod, cssnano()))
        // .pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        // .pipe(gulpif(config.prod, sourcemaps.write('.'), sourcemaps.write()))
        // .pipe(gulp.dest(path.join(fabconfig.dest, 'assets/styles')))
        // .pipe(gulpif(!config.prod, gulp.dest(path.join(config.styles.dev, 'assets/styles')), gulp.dest(path.join(config.styles.dist, 'assets/styles'))));
        .pipe(header("@import './src/assets/styles/ui-gulp-stream-include.scss';"))
        .pipe(sourcemaps.init())
        .pipe(gulpif(!config.lint, using()))
        .pipe(sass({ outputStyle: 'compact' }))
        .pipe(concat('ui-styles.css'))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'), sourcemaps.write())
        .pipe(gulp.dest(path.join(fabconfig.dest, 'assets/styles')))
        .pipe(gulp.dest(path.join(config.styles.dist, 'assets/styles')));
};  

gulp.task('ui-styles', () => styleOutput());


const styleCrtitcalOutput = function() {
    const stylecritical = config.styles.critical;

    return gulp.src(stylecritical)
        .pipe(header("@import './src/assets/styles/ui-gulp-stream-include.scss';"))
        .pipe(gulpif(!config.lint, using()))
        .pipe(sass({ outputStyle: 'compact' }))
        .pipe(cssnano())
        .pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.styles.dev, 'assets/styles')), gulp.dest(path.join(config.styles.dist, 'assets/styles'))));
};


gulp.task('ui-styles-critical', () => styleCrtitcalOutput());


/*

const styleCrtitcalOutput = function(env) {
    const themecritical = `assets/styles/branding/${env}/seagal-critical.scss`;

    return gulp.src(themecritical)
        .pipe(gulpif(!config.lint, using()))
        .pipe(sass({ outputStyle: 'compact' }))
        .pipe(cssnano())
        .pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.styles.dev, env, 'css')), gulp.dest(path.join(config.styles.dist, env, 'css'))));
};
*/


const styleCriticalPenthouse = function() {

    let cssSrc = `assets/styles/ui-styles.css`;   
    let pageUrl = `http://localhost:3000/6-pages/startpage.html`;
    let pageCssOut = `cg-critical-generated.css`;   

    console.log('yoyo');

    
    return gulp.src(cssSrc) 
        .pipe(using())
        .pipe(criticalCss({
            out: pageCssOut,
            url: pageUrl,
            width: 1920,
            height: 1280,               // Needed If parralax add is in top
            timeout: 100, 
            strict: false,          
            renderWaitTime: 100,        // ms; render wait timeout before CSS processing starts (default: 100)
            blockJSRequests: false      // set to false to load (external) JS (default: true)
        }))
        .pipe(using())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/styles'));
};


gulp.task(`styles-critical:startpage-penthouse`, () => styleCriticalPenthouse());

const styleCriticalTasks = Object.keys(gulp.tasks).filter(task => task.startsWith('styles-critical:'));

// $ gulp styles-critical:all
gulp.task('styles-critical:all', [
    ...styleCriticalTasks
])

/*
// FOR STYLEGUIDE
const styleOutputStyleguide = function(env) {
    const themesrc = 'assets/styles/seagal-styleguide.scss';

    return gulp.src(themesrc)
        .pipe(sourcemaps.init())
        .pipe(gulpif(!config.lint, using()))
        .pipe(sass({ outputStyle: 'compact' }))
        .pipe(gulpif(config.prod, cssnano()))
        .pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        .pipe(gulpif(config.prod, sourcemaps.write('.'), sourcemaps.write()))
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.styles.dev, env, 'css')), gulp.dest(path.join(config.styles.dist, env, 'css'))));
};

gulp.task('styles:styleguide', () => styleOutputStyleguide('styleguide'));
*/
// Define tasks for all brands
/*
config.brands.forEach(brand => {
    
    // Task collection A
    gulp.task(`styles:${brand}`, () => styleOutput(brand));
    gulp.task(`styles:${brand}-critical`, () => styleCrtitcalOutput(brand));

    // Task collection B
    gulp.task(`styles-critical:${brand}-penthouse-editorial`, () => styleCriticalPenthouse(brand));
    gulp.task(`styles-critical:${brand}-penthouse-editorial-round-2`, () => styleCriticalPenthouse(brand)); // ??
    gulp.task(`styles-critical:${brand}-penthouse-blogg`, () => styleCriticalPenthouse(brand, 'blogg')); 
    gulp.task(`styles-critical:${brand}-penthouse-blogg-round-2`, () => styleCriticalPenthouse(brand, 'blogg')); // ??


    // -> Task  A
    gulp.task(`styles-brand:${brand}`, [`styles:${brand}`,`styles:print`]);

    // -> Task  B ($ gulp styles-critical:amelia)
    gulp.task(`styles-critical:${brand}`, [
        `styles-critical:${brand}-penthouse-editorial`,
        `styles-critical:${brand}-penthouse-blogg`
    ], () => {
        runSequence(
            `styles-critical:${brand}-penthouse-editorial-round-2`, 
            `styles-critical:${brand}-penthouse-blogg-round-2`
        );
    });


});


// Get all our style tasks
const styleTasks = Object.keys(gulp.tasks).filter(task => task.startsWith('styles:'));
const styleCriticalTasks = Object.keys(gulp.tasks).filter(task => task.startsWith('styles-critical:'));

// $ gulp styles-critical:all
gulp.task('styles-critical:all', [
    ...styleCriticalTasks
]);

// $ gulp styles-brand:all
gulp.task('styles-brand:all', [
    ...styleTasks,
], () => {
    if (config.lint) {
        runSequence(
            'lint:styles'
        );
    } else if (config.critical){
        runSequence(
            ...styleCriticalTasks
        );
    } 
});
*/






