odoo.define('bicycles.models', function (require) {
    "use strict";

    var ajax = require('web.ajax');
    var BikesDB = require('bicycles.DB');
    var concurrency = require('web.concurrency');
    var config = require('web.config');
    var core = require('web.core');
    var field_utils = require('web.field_utils');
    var rpc = require('web.rpc');
    var session = require('web.session');
    var time = require('web.time');
    var utils = require('web.utils');

    var QWeb = core.qweb;
    var _t = core._t;
    var Mutex = concurrency.Mutex;

    var exports = {};

    // The PosModel contains the Point Of Sale's representation of the backend.
    // Since the PoS must work in standalone ( Without connection to the server ) 
    // it must contains a representation of the server's PoS backend. 
    // (taxes, product list, configuration options, etc.)  this representation
    // is fetched and stored by the PosModel at the initialisation. 
    // this is done asynchronously, a ready deferred alows the GUI to wait interactively 
    // for the loading to be completed 
    // There is a single instance of the PosModel for each Front-End instance, it is usually called
    // 'pos' and is available to all widgets extending PosWidget.

    exports.BikesModel = Backbone.Model.extend({
        initialize: function (session, attributes) {
            Backbone.Model.prototype.initialize.call(this, attributes);
            var self = this;
            this.flush_mutex = new Mutex();                   // used to make sure the orders are sent to the server once at time
            this.chrome = attributes.chrome;

            this.db = new BikesDB();                       // a local database used to search trough products and categories & store pending orders

            // these dynamic attributes can be watched for change by other models or widgets
            this.set({
                'synch': { state: 'connected', pending: 0 },
                'prueba': null,
            });

            this.set_prueba("un valor cualquiera");
        },




        // returns the user who is currently the cashier for this point of sale
        get_prueba: function () {
            // reset the cashier to the current user if session is new
            if (this.db.load('pos_session_id') !== this.pos_session.id) {
                this.set_prueba(this.prueba);
            }
            return this.db.get_prueba() || this.get('prueba') || this.user;
        },
        // changes the current prueba
        set_prueba: function (prueba) {
            this.set('prueba', prueba);
            this.db.set_prueba(this.get('prueba'));
        },

    });



    // exports = {
    //     PosModel: PosModel,
    //     NumpadState: NumpadState,
    //     load_fields: load_fields,
    //     load_models: load_models,
    //     Orderline: Orderline,
    //     Order: Order,
    // };
    return exports;

});
