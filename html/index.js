var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash');

module.exports = generators.Base.extend({

    initializing: function() {
        this.name = this.options.name;
        this.libs = this.options.libs;
        this.frameworks = this.options.frameworks;
        this.destPath = this.destinationPath(this.options.destPath);
    },

    writing: {
        html: function() {
            this.fs.copyTpl(this.templatePath('index.html'),
                            path.join(this.destPath, '/index.html'),
                            {name: this.name, libs: this.libs, frameworks: this.frameworks });
        }
    }
});
