'use strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash');

module.exports = generators.Base.extend({
    writing: function() {
        var dest = this.options.dest;

        this.fs.copy(this.templatePath('**/*'), this.destinationPath(dest));
        this.fs.copyTpl(this.templatePath('source/_meta/_00-head.twig'), this.destinationPath(dest + '/source/_meta/_00-head.twig'),
                        { name: this.options.name });
    }
});
