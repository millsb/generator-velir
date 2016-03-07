var path    = require('path'),
    helpers = require('yeoman-generator').test,
    assert  = require('yeoman-generator').assert,
    fs      = require('fs');


var expectedFiles = [
    ".gitignore",
    "web/Website/styles/testproj.scss",
    "web/Website/html_templates/index.html",
    "web/Website/js/.jshintrc"
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
