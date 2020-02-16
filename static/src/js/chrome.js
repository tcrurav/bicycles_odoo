odoo.define('bicycles.chrome', function (require) {
    "use strict";

    var BikesBaseWidget = require('bicycles.BaseWidget');
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var ajax = require('web.ajax');
    var models = require('bicycles.models');


    var _t = core._t;
    var _lt = core._lt;
    var QWeb = core.qweb;

    var Chrome = BikesBaseWidget.extend(AbstractAction.prototype, {
        template: 'Chrome',
        init: function () {
            var self = this;
            this._super(arguments[0], {});
            console.log("Hello BikesBaseWidget, I'm inside of init.");

            this.started = new $.Deferred(); // resolves when DOM is online
            this.ready = new $.Deferred(); // resolves when the whole GUI has been loaded

            this.bikes = new models.BikesModel(this.getSession(), { chrome: this });
            //this.gui = new gui.Gui({ pos: this.pos, chrome: this });
            this.chrome = this; // So that chrome's childs have chrome set automatically

            this.widget = {};   // contains references to subwidgets instances

            this.cleanup_dom();

            //this.bikes.ready.done(function(){
                //self.build_chrome();
                //self.build_widgets();
                //self.disable_rubberbanding();
                //self.disable_backpace_back();
                //self.ready.resolve();
                //self.loading_hide();
                //self.replace_crashmanager();
                //self.pos.push_order();
            //}).fail(function(err){   // error when loading models data from the backend
                //self.loading_error(err);
            //});
        },
        start: function () {
            console.log("Your BikesBaseWidget loaded");
        },
        cleanup_dom: function () {
            // remove default webclient handlers that induce click delay
            $(document).off();
            $(window).off();
            $('html').off();
            $('body').off();
        },

    });

    return {
        Chrome: Chrome
    };
});
