(function($, PLUGIN_ID) {
    "use strict";

    const comp = require('../components/htmlTable.vue');
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);

    const presenter = function(event){
        const selecter = `user-js-${config.spaceId}`;
        const element = document.getElementById(selecter);
        if (element){
            this.vueInst = new Vue({
                el: `#${selecter}`,
                components: {
                    "comp-test-vue-table": comp.default
                },
                data: {
                    eventData: event
                }
            });
        }
    }

    module.exports =  presenter;

})(jQuery, kintone.$PLUGIN_ID);
