var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash');

module.exports = generators.Base.extend({

    initializing: function() {
        this.destPath = this.destinationPath(this.options.destPath);
    },

    writing: {
        js: function() {
            this.copy(this.templatePath('jshintrc'), path.join(this.destPath, '/.jshintrc'));
            this.fs.copyTpl(this.templatePath('main.js'),
                            path.join(this.destPath, 'main.js'), {});
        }
    }
});
