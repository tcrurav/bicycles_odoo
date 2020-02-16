
odoo.define('bicycles.main', function (require) {
"use strict";

var chrome = require('bicycles.chrome');
var core = require('web.core');

core.action_registry.add('bikes.ui', chrome.Chrome);

});
