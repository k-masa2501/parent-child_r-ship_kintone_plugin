(function($, PLUGIN_ID) {
    "use strict";

    // スタイルロード
    require('../css/vueTable.css');
    const presenter = require('./presenter.js');
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);

    kintone.events.on('app.record.detail.show', function(event) {
        const element = document.getElementById(`user-js-${config.spaceId}`);
        if (element && event.record.parentId){
            element.innerHTML = "<comp-test-vue-table :eventdata=\"eventData\"></comp-test-vue-table>";
            new presenter(event);
        }
    });

})(jQuery, kintone.$PLUGIN_ID);
