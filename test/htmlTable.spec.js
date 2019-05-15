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
        
        before(function () {
            kintone.app.setId = 6;
            kintone.app.record.setId = 410;
         });

        beforeEach(function () { });

        it('kintone.debugSetPluginId.',async function () { //comp.default

            // posts test data
            testData = {
                ドロップダウン_0: { value: "kintone"},
                ユーザー数: { value: "500" },
                ラジオボタン: { value: "C" },
                単価: { value: "750000" },
                数値_1: { value: "1500" },
                文字列__1行_ : { value: "株式会社KK情報システム" },
                文字列__1行__0: { value: "業務改革室" },
                文字列__1行__1: { value: "田桐 大地" },
                文字列__1行__3: { value: "03-6835-xxxx" },
                文字列__1行__4: { value: "03-6835-xxxx" },
                文字列__1行__5: { value: "d-odagiri@sample.com" },
                日付_0: { value: "018-11-01" },
            };

            const records = await kintone.api(kintone.api.url("/k/v1/record", true), "GET", {app:6, });
            console.log(records);
            /*const wrapper = shallowMount(htmlTable.default, {
                propsData: {
                    eventdata: 'some value'
                }
            });*/
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
