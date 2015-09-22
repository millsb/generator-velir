'use strict';

var gulp            = require('gulp'),
    sourcemaps      = require('gulp-sourcemaps'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    pxrem           = require('gulp-pixrem'),
    mainBowerFiles  = require('main-bower-files'),
    concat          = require('gulp-concat'),
    filter          = require('gulp-filter'),
    paths           = require('../gulp-config').paths;

gulp.task('css', function() {
    return gulp.src(paths.scss + 'index.scss')
        .pipe(drano())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 9']
        }))
        .pipe(pxrem("16px"))
        .pipe(sourcemaps.write(paths.dist))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('css-vendor', function() {

    // https://github.com/ck86/main-bower-files
    // mainBowerFiles returns array of "main" files from bower.json
    var bowerfiles = mainBowerFiles({
        checkExistence: false,
        paths: paths.root,
        debugging: false
    });

    if (bowerfiles.length === 0){
        return;
    }

    gulp.src(bowerfiles)
        .pipe(drano())
        .pipe(filterByExtension("css"))
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest(paths.dist));

});

var filterByExtension = function(extension){
    return filter(function(file){
        return file.path.match(new RegExp("." + extension + "$"));
    });
};
