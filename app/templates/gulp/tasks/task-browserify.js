'use strict';

var gulp            = require('gulp'),
    path            = require('path'),
    transform       = require('vinyl-transform'),
    source          = require('vinyl-source-stream'),
    browserify      = require('browserify'),
    sourcemaps      = require('gulp-sourcemaps'),
    bowerResolve    = require('bower-resolve'),
    paths           = require('../gulp-config').paths,
    bundleExclude   = require('../gulp-config').bundleExclude,
    drano           = require('../gulp-util').drano,
    _               = require('lodash');


// Create a bundles for our JS. There will be two bundles
// One for our app code (index.js) and one for our
// vendor code (which is read from bower_components).

// Note: Vendor libraries will be made available in Browserify
// but will not be available globally.  // If you wish to include a library globally, include it with its own <script> tag, // and add the file path to bundleExclude in gulp-config.js

// You may also shim globals or other files in shim.js.

// Also see: https://github.com/sogko/gulp-recipes/tree/master/browserify-separating-app-and-vendor-bundles
// for the basis of this recipe


// whether or not to include bower_components libraries using
// browserify.external() instead of browserify.require()
var includeAsExternal;

gulp.task('browserify', function() {
    // helper method to transform file stream to browserify output

    includeAsExternal = true;
    return gulp.src(paths.js + "/index.js")
        .pipe(drano())
        .pipe(transform(browserified))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write(paths.dist))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('browserify-vendor', function() {

    includeAsExternal = false;
    return browserified()
        .pipe(drano())
        .pipe(source('vendors.js'))
        .pipe(gulp.dest(paths.dist));
});


var browserified = function(filename) {
    var b = browserify(filename);

    // get all bower components ids and use 'bower-resolve' to resolve
    // the ids to their full path, which we need for require()

    // When compiling vendors.js, we want to use b.require()
    // When compiling index.js, we want to add vendor libraries using b.external()
    getBowerPackageIds().forEach(function (id) {

        // check if library is excluded in config
        if (bundleExclude.indexOf(id) !== -1) {
            return;
        }

        var resolvedPath = bowerResolve.fastReadSync(id, { basedir: paths.root });
        if (includeAsExternal) {
            b.external(id)
        } else {
            b.require(resolvedPath, {
                // exposes the package id, so that we can require() from our code.
                // for eg:
                // require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular');
                // for more information: https://github.com/substack/node-browserify#brequirefile-opts
                expose: id

            });
        }
    });

    return b.bundle();
};

function getBowerPackageIds() {
    // read bower.json and get dependencies' package ids
    var bowerManifest = {};
    try {
        bowerManifest = require(paths.root + "bower.json");
    } catch (e) {
        // does not have a bower.json manifest
    }
    return _.keys(bowerManifest.dependencies) || [];

}