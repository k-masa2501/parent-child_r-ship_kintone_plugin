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
            //410;

            // posts test data
            var result = null;
            const testData = {
                ドロップダウン_0: { value: "kintone" },
                ユーザー数: { value: "500" },
                ラジオボタン: { value: "C" },
                単価: { value: "750000" },
                数値_1: { value: "1500" },
                文字列__1行_: { value: "株式会社KK情報システム" },
                文字列__1行__0: { value: "業務改革室" },
                文字列__1行__1: { value: "田桐 大地" },
                文字列__1行__3: { value: "03-6835-xxxx" },
                文字列__1行__4: { value: "03-6835-xxxx" },
                文字列__1行__5: { value: "d-odagiri@sample.com" },
                日付_0: { value: "2018-11-01" }
            };

            result = await kintone.api(kintone.api.url("/k/v1/record", true), "POST", { app: 6, record: testData });
            testData.parentId = { value: result.id };
            result = await kintone.api(kintone.api.url("/k/v1/record", true), "POST", { app: 6, record: testData });
            kintone.app.record.setId(result.id);
            kintone.plugin.app.setConfig({
                columElement: "[{'code':'ステータス','label':'ステータス'},{'code':'文字列__1行_','label':'会社名'},{'code':'文字列__1行__1','label':'先方担当者'}]",
                fieldName: "親レコード一覧",
                parentId: "parentId",
                spaceId: "parentList"
            }, function () { });
         });

        beforeEach(function () { });

        it('kintone.debugSetPluginId.',async function () { //comp.default
            const result = await kintone.api(kintone.api.url("/k/v1/record", true), "GET", { app: 6, id: kintone.app.record.getId() });
            const wrapper = shallowMount(htmlTable.default, {
                propsData: {
                    eventdata: { record: result.record }
                }
            });
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
