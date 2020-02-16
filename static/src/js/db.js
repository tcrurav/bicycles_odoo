odoo.define('bicycles.DB', function (require) {
"use strict";

var core = require('web.core');
/* The PosDB holds reference to data that is either
 * - static: does not change between pos reloads
 * - persistent : must stay between reloads ( orders )
 */

 console.log("entro en el db");

var BikesDB = core.Class.extend({
    name: 'openerp_bicycles_db', //the prefix of the localstorage data
    limit: 100,  // the maximum number of results returned by a search
    init: function(options){
        console.log("principio de BikesDB");
        options = options || {};
        this.name = options.name || this.name;
        this.limit = options.limit || this.limit;
        
        if (options.uuid) {
            this.name = this.name + '_' + options.uuid;
        }

        //cache the data in memory to avoid roundtrips to the localstorage
        this.cache = {};

        console.log("final de BikesDB");
    },

    
    /* loads a record store from the database. returns default if nothing is found */
    load: function(store,deft){
        if(this.cache[store] !== undefined){
            return this.cache[store];
        }
        var data = localStorage[this.name + '_' + store];
        if(data !== undefined && data !== ""){
            data = JSON.parse(data);
            this.cache[store] = data;
            return data;
        }else{
            return deft;
        }
    },
    /* saves a record store to the database */
    save: function(store,data){
        localStorage[this.name + '_' + store] = JSON.stringify(data);
        this.cache[store] = data;
    },
    
    /* removes all the data from the database. TODO : being able to selectively remove data */
    clear: function(){
        for(var i = 0, len = arguments.length; i < len; i++){
            localStorage.removeItem(this.name + '_' + arguments[i]);
        }
    },
    set_prueba: function(prueba) {
        this.save('prueba', prueba || null);
    },
    get_prueba: function() {
        return this.load('prueba');
    }
    
});

return BikesDB;

});

