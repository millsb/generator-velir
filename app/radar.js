var _ = require('lodash');

var radar = {};

radar.getVersion = function(key) {
  var all = [].concat(radar.frameworks, radar.libs);
  var version = _.result(_.find(all, { value: key }), 'version');
  return version;
};

radar.choices = function(key) {
  return _.map(radar[key], function(collection) {
    return _.pick(collection, 'name', 'value', 'checked');
  });
};


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
    name: 'Bourbon (SCSS)',
    value: 'bourbon',
    version: "*",
    checked: true,
    bowerIgnore: true
  },
  {
    name: 'bxSlider',
    value: 'bxslider',
    version: "*",
    checked: false
  },
  {
    name: 'jQuery',
    value: 'jquery',
    version: "*",
    checked: true
  },
  {
    name: 'LoDash',
    value: 'lodash',
    checked: true
  },
  {
    name: "Modernizr",
    value: 'components/modernizr',
    checked: true,
    bowerIgnore: true
  },
  {
    name: 'Neat (SCSS)',
    value: 'neat',
    version: '*',
    checked: true,
    bowerIgnore: true
  }
];



module.exports = radar;
