// Config

const gutil = require('gulp-util');
module.exports = {
    dev: gutil.env.dev,
    prod: gutil.env.prod,
    lint: gutil.env.lint,
    critical: gutil.env.critical,
    theme: gutil.env.theme,
    brand: gutil.env.brand,
    taxonomy:       [
                        ['1-bond','material'],         // Common / Global
                        ['2-atoms','material'],        // Components
                        ['3-molecules','material'],    // Modules
                        ['4-organizms','material'],    // Sections
                        ['5-templates','view'],        // Layouts (Gray box)
                        ['6-pages','view'],            // Layouts (With proper design and content)
                    ],
    brands:         [
                        'activetalents',
                        'commonground',
                    ],
    brandsMore:     [
                        ['activetalents','at'],
                        ['commonground','cg']
                    ],
    styles: {
        src:        ['./src/assets/styles/includes/*.scss', './src/ui/**/*.scss', '!src/**/+(__*)/**'], // [`assets/styles/branding/${env}/ui-styles.scss`,`assets/styles/branding/${env}/ui-styles-fallback.scss`], // src "env" is modifed in function "styleOutput"
        print:      './src/assets/styles/style-print.scss',
        critical:   './src/assets/styles/ui-critical.scss',
        dev:        './dev/',
        dist:       './dist/',
    },
    scripts: {
        src:        ['./src/assets/scripts/**/+(UI*)*.js','./src/ui/**/*.js', '!src/**/+(__*)/**', '!src/assets/scripts/inline/+(UI*)*.js'], // src modifed in function "scriptOutput"
        polyfills:  './src/assets/scripts/polyfills/**/*.js',
        dev:        './dev/',
        dist:       './dist/',
        inline:     'src/assets/scripts/inline/*.js',
        inlinedist: 'src/assets/scripts/inline/beautified/', 
    },
    linting: {
        styles:     './template-*/**/*.scss', // ['assets/styles/common/**/*.scss','template*/**/*.scss','components/**/*.scss','!components/__*/*.scss','!assets/**/normalize.scss','!assets/styles/utils/*.scss','!inc/**/*.scss'],
        scripts:    './template-*/**/*.js', //['template*/**/*.js', 'components/**/*.js', './assets/scripts/SEAGAL.*.js' ,'!./assets/scripts/SEAGAL.libs.js','!./assets/scripts/SEAGAL.old.js','!./assets/scripts/SEAGAL.js'],
    },
    watch: {        // This one needs som extra love
        scripts:    ['./src/ui/**/*.js','./src/assets/scripts/**/*.js'], // ['./partials/**/*.js','./blog/**/*.js','./template*/**/*.js','./__patterns/*.js','./components/**/*.js','./assets/scripts/SEAGAL*.js','!assets/dev/*.js','!assets/dist/*.js'],
        styles:     ['./src/ui/**/*.scss','./src/assets/styles/**/*.scss'],
    },
    clean: {
        devPart:    ['./dev/**/css/','./dev/js'],
    },
    dev:            './dev/',
    dist:           './dist/',
};

