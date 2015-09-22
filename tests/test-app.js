var path    = require('path'),
    helpers = require('yeoman-generator').test,
    assert  = require('yeoman-generator').assert,
    fs      = require('fs');


var expectedFiles = [
    ".gitignore",
    "web/Website/styles/testproj.scss",
    "web/Website/html_templates/index.html",
    "web/Website/js/.jshintrc",
    "tools/gulp/gulpfile.js",
    "tools/gulp/gulp-config.js",
    "tools/gulp/gulp-util.js",
    "tools/gulp/package.json",
    "tools/gulp/tasks/task-css.js",
    "tools/gulp/tasks/task-browserify.js",
    "tools/gulp/tasks/task-patternlab.js"
];

describe('Velir App Generator:', function() {

    describe('when generating a plain application', function() {
        beforeEach(function(done) {
            helpers.run(path.join(__dirname, '../app'))
                .withPrompts({
                    name: 'testproj',
					jsLibs: ['jquery']
				})
                .on('end', function() {
                    done();
                });
        });

        it('should create expected files', function() {
            assert.file(expectedFiles);
        });


        it('adds index with a doctype', function() {
            assert.fileContent('index.html', /\<\!DOCTYPE html\>/);
        });
    });

});
