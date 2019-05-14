(function () {
    "use strict";

    function sleep(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    describe('test htmlTable.spec', function () {

        this.timeout(15000);

        const htmlTable =  require('../components/htmlTable.vue');
        
        before(async function () {
            kintone.app.setId = 6;
            kintone.app.record.setId = 410;
         });

        beforeEach(function () { });

        it('kintone.debugSetPluginId.', function () {
            const wrapper = shallowMount(htmlTable);
            //wrapper.find('.gaia-ui-listtable-pagercomponent-plugin-prev').trigger('click')
            //expect(wrapper.find('div').text()).toMatch('1')
        });

        afterEach(function () { 
            document.body.innerHTML = "";
        });

        after(async function () { 
            await kintone.postDataTrash();
        });

    });

})();
