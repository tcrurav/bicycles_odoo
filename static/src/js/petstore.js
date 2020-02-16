
odoo.define('bicycles.petstore', function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');

    var Class = require('web.Class');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var utils = require('web.utils');
    var _t = core._t;
    var _lt = core._lt;

    var homePage = Widget.extend(AbstractAction.prototype, {
        template: "Yahora",
        init: function (parent) {
            this._super(parent);
            console.log("Hello JS, I'm inside of init.");
        },
        start: function () {
            console.log("Your pet store home page loaded");
        },
    });
    core.action_registry.add('bicycles.ui.ya', homePage);

    return homePage;
});
