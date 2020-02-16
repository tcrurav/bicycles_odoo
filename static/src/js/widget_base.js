odoo.define('bicycles.BaseWidget', function (require) {
    "use strict";

    var Widget = require('web.Widget');

    var BikesBaseWidget = Widget.extend({
        init: function (parent, options) {
            console.log("empezó init de BikesBaseWidget")
            this._super(parent);
            options = options || {};
            this.bikes = options.bikes || (parent ? parent.bikes : undefined);
            this.chrome = options.chrome || (parent ? parent.chrome : undefined);
            this.gui = options.gui || (parent ? parent.gui : undefined);

            // the widget class does not support anymore using $el/el before the
            // 'start' lifecycle method, but point of sale actually needs it.
            this.setElement(this._makeDescriptive());
            console.log("acabó init de BikesBaseWidget")
        },
    });

    return BikesBaseWidget;

});
