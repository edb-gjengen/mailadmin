'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass({
            includePaths: ['.'],
            sourceComments: 'map'
        }).on('error', $.sass.logError))

        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(gulp.dest('dist/scripts'))
});
gulp.task('vendorscripts', function() {
    var vendorScripts = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/underscore/underscore-min.js',
        'node_modules/nunjucks/browser/nunjucks-slim.min.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/moment/locale/nb.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
        'node_modules/pnotify/dist/pnotify.js',
        'node_modules/query-string/query-string.js'
    ];
    return gulp.src(vendorScripts)
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
    return gulp.src(['node_modules/bootstrap-sass/assets/fonts/**/*'])
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
});
gulp.task('templates', function () {
    return gulp.src('app/templates/*.html')
        .pipe($.nunjucks())
        .pipe($.concat('templates.js'))
        .pipe(gulp.dest('dist/scripts'))
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html', '!app/templates/*.html',  '!app/styles/*.scss'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', ['styles', 'scripts', 'vendorscripts', 'templates', 'images', 'fonts', 'extras'],
    function() {
        return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
    }
);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['styles', 'scripts'], function () {
    require('opn')('http://localhost:3000');
});


gulp.task('watch', ['serve'], function () {
    browserSync.init({
        proxy: 'localhost:8000'
    });

    // watch for changes
    gulp.watch([
        '../../templates/**/*.html',
        'app/templates/*.html',
        'dist/scripts/**/*.js',
        'dist/images/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/templates/**/*.html', ['templates']);
});
