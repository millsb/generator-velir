var path    = require('path'),
    helpers = require('yeoman-generator').test,
    assert  = require('yeoman-generator').assert;


var expectedFiles = [
    "bower.json",
    "package.json",
    "styles/scss/project.scss",
    "index.html"
];

var sitecoreExpectedFiles = function() {
  return expectedFiles.map(function(file) {
    if (file == "index.html") {
      return "web/Website/html_templates/" + file;
    } else {
      return "web/Website/" + file;
    }
  });
}

var genDir = path.join(__dirname, "../app");
var appDir = path.join(__dirname, "./tmp");

function generator() {
  return helpers.run(genDir).inDir(appDir);
}

describe('Velir App Generator:', function() {

  describe('when generating a plain application', function() {
    beforeEach(function() {
      this.gen = generator();
    });

    it('should created expected files', function(done) {
      this.gen.on('end', function() {
        assert.file(expectedFiles);
        done();
      });
    });
  });

  describe('when generating a sitecore application', function() {
    beforeEach(function() {
      this.gen = generator().withPrompts({
        sitecore: true
      });
    });

    it ('should create expected files in web/Website', function(done) {
      this.gen.on('end', function() {
        assert.file(sitecoreExpectedFiles());
        done();
      });
    });

  });
});
