var path = require('path');
var root = path.join(__dirname, "../../web/Website/");


module.exports = {
    // exclude names should be the package name in bower
    bundleExclude: [
        'modernizr'
    ],
    hostname: "wff.millsb.velir.com",
    paths: {
        root: root,
        html: root + "html_templates/",
        js: root + "js/",
        scss: root + "styles/",
        dist: root + 'dist/'
    }
};
