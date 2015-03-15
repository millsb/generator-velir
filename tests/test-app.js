var path    = require('path'),
    helpers = require('yeoman-generator').test,
    assert  = require('yeoman-generator').assert,
    fs      = require('fs');


var expectedFiles = [
    ".gitignore",
    "bower.json",
    "styles/scss/project.scss",
    "index.html",
    ".bowerrc",
    "js/.jshintrc",
    "tools/gulp/gulpfile.js",
    "tools/gulp/gulp-config.js",
    "tools/gulp/gulp-util.js",
    "tools/gulp/package.json",
    "tools/gulp/tasks/task-css.js",
    "tools/gulp/tasks/task-browserify.js",
    "tools/gulp/tasks/task-patternlab.js"
];

var sitecoreExpectedFiles = function() {
    return expectedFiles.map(function(file) {
        if (file == "index.html") {
            return "web/Website/html_templates/" + file;
        } else {
            return "web/Website/" + file;
        }
    });
};


describe('Velir App Generator:', function() {

    var runGen;
    var genDir = path.join(__dirname, "../app");
    var appDir = path.join(__dirname, "./tmp");

    describe('when generating a plain application', function() {
        before(function(done) {
            runGen = helpers.run(genDir).inDir(appDir).withPrompts({
                sitecore: false,
                jsLibs: ['jquery']
            }).on('end', done);
        });

        it('should create expected files', function() {
            assert.file(expectedFiles);
        });

        it('adds dependencies to bower.json', function() {
            assert.fileContent('bower.json', /jquery/);
        });

        it('adds index with a doctype', function() {
            assert.fileContent('index.html', /\<\!DOCTYPE html\>/);
        });
    });

    describe('when generator a sitecore application', function() {
        before(function() {
        });

        it ('should create files in web/Website', function() {
            before(function(done) {
                runGen = helpers.run(genDir).inDir(appDir).withPrompts({
                    sitecore: true,
                    jsLibs: ['jquery']
                }).on('end', done);
            });

        });
    });
});
