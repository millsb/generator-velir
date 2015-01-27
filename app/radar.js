var _ = require('lodash');

var radar = {};

radar.getVersion = function(key) {
  var all = [].concat(radar.build, radar.modules, radar.frameworks, radar.libs);
  var version = _.result(_.find(all, { value: key }), 'version');
  console.log(version);
  return version;
}

radar.build = [
  {
    name: "Grunt",
    value: "grunt"
  },
  {
    name: "Gulp",
    value: 'gulp'
  }
];

radar.modules = [
  {
    name: 'Globals (no module system)',
    value: 'globals'
  },
  {
    name: 'AMD (RequireJS)',
    value: 'requirejs',
    version: "*"
  },
  {
    name: 'CommonJS (Browserify)',
    value: 'browserify',
    version: "*"
  }
];

radar.frameworks = [
  {
    name: 'AngularJS',
    value: 'angular',
    version: "*",
    checked: false
  },
  {
    name: 'Backbone',
    value: 'backbone',
    version: "*",
    checked: false
  }
];

radar.libs = [
  {
    name: 'jQuery',
    value: 'jquery',
    version: "*",
    checked: true
  },
  {
    name: 'LoDash',
    value: 'lodash',
    version: "*",
    checked: true
  },
  {
    name: 'bxSlider',
    value: 'bxslider',
    version: "*",
    checked: false
  }
];

module.exports = radar;
