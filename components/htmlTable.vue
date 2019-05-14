<template>
<div>
    <div>
        <font size="4">
            <b><span style="color: rgb(61, 133, 198);">{{tableTitle}}</span></b>
        </font>    
    </div>
    <div class="gaia-argoui-app-index-plugin-pager">
        <div class="gaia-argoui-app-index-pager-plugin-content">
            <div class="component-app-listtable-plugin-countitem">
                <span class="component-app-listtable-countitem-plugin-page">{{apiVar.firstCount}} - {{apiVar.lastCount}}</span>
                <span class="component-app-listtable-countitem-plugin-count"> （{{apiVar.totalCount}}件中）</span>
            </div>
            <div class="gaia-ui-listtable-plugin-pagercomponent">
                <span class="gaia-ui-listtable-pagercomponent-plugin-prev" @click="prevRecords()" style="visibility: hidden"></span>
                <span class="gaia-ui-listtable-pagercomponent-plugin-next" @click="nextRecords()" style="visibility: hidden"></span>
            </div>
        </div>
    </div>
    <table id="customizeVueTable">
        <thead>
            <th v-bind:id="'expandTh' + index" class="recordlist-header-cell-plugin-gaia" v-for="(item, index) in headerLabel()" :key="index">
                <div style="position: relative;">
                    <div class="recordlist-header-cell-inner-plugin-gaia">
                        <span class="recordlist-header-label-plugin-gaia">{{item}}</span>
                    </div>
                    <div><span class="recordlist-resizer-plugin-gaia" v-bind:data-id="'expandTh' + index" @mousedown="f_mousedown"></span></div>
                </div>
            </th>
        </thead>
        <tbody>
            <tr v-for="(item1, index1) in _body" :key="index1">
                <td class="recordlist-cell-plugin-gaia" v-for="(item2, key) in item1" :key="key">
                    <div>
                        <span v-if="'SINGLE_LINE_TEXT' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'MULTI_LINE_TEXT' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'RECORD-LINK' === item2.type" v-html="item2.value"></span>
                        <span v-else-if="'NUMBER' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'CALC' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'RICH_TEXT' === item2.type" v-html="item2.value"></span>
                        <span v-else-if="'CHECK_BOX' === item2.type">{{ item2.value.split(',') }}</span>
                        <span v-else-if="'RADIO_BUTTON' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'DROP_DOWN' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'MULTI_SELECT' === item2.type">{{ item2.value.split(',') }}</span>
                        <span v-else-if="'FILE' === item2.type">
                            <template v-for="item in item2.value">
                                {{ item.name }}
                            </template>                            
                        </span>
                        <span v-else-if="'LINK' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'DATE' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'DATETIME' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'USER_SELECT' === item2.type">
                            <template v-for='item in item2.value'>
                                {{ item.name }}
                            </template>
                        </span>
                        <span v-else-if="'CATEGORY' === item2.type">{{ item2.value.split(',') }}</span>
                        <span v-else-if="'STATUS' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'STATUS_ASSIGNEE' === item2.type">
                            <template v-for='item in item2.value'>
                                {{ item.name }}
                            </template>
                        </span>
                        <span v-else-if="'SUBTABLE' === item2.type && 0 < item2.value.length">
                            <table class='table-mini'>
                                <thead>
                                    <tr>
                                        <th class='' v-for='(item5, key5) in item2.value[0].value' :key="key5">{{key5}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for='(item3, index3) in item2.value' :key="index3">
                                        <td class='' v-for='(item4, key4) in item3.value' :key="key4">{{item4.value}}</td>
                                    </tr>
                            </tbody>
                            </table>
                        </span>
                        <span v-else-if="'ORGANIZATION_SELECT' === item2.type">
                            <template v-for='item in item2.value'>
                                {{ item.name }}
                            </template>
                        </span>
                        <span v-else-if="'GROUP_SELECT' === item2.type">
                            <template v-for='item in item2.value'>
                                {{ item.name }}
                            </template>
                        </span>
                        <span v-else-if="'RECORD_NUMBER' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'__ID__' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'__REVISION__' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'CREATED_TIME' === item2.type">{{ item2.value }}</span>
                        <span v-else-if="'CREATOR' === item2.type">{{ item2.value.name }}</span>
                        <span v-else-if="'MODIFIER' === item2.type">{{ item2.value.name }}</span>
                        <span v-else-if="'UPDATED_TIME' === item2.type">{{ item2.value }}</span>
                        <span v-else></span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>

    const $ = jQuery;
    const config = kintone.plugin.app.getConfig(kintone.$PLUGIN_ID);
    require("../js/extUtil.js");

    export default  {
        props: ['eventdata'],
        data: function () {
            return {
                myRecords: [],
                tableTitle: config.fieldName,
                apiVar:{
                    limit: 10,
                    nextOffset: 10,
                    preOffset: -10,
                    firstCount: 0,
                    lastCount: 0,
                    totalCount: 0,
                    proc: true,
                    index: {}
                },
                cell: {
                    className: null
                }

            }
        },
        computed:{
            _body: function(){
                const result1 = [];
                const header = this.headerCode();
                for (var i1=0,len1=this.myRecords.length;i1<len1;i1++){
                    const result2 = [];
                    for (var i2=0,len2=header.length;i2<len2;i2++){
                        if (this.myRecords[i1].hasOwnProperty(header[i2])){
                            if ("$id" === header[i2]){
                                const parentId = this.eventdata.record[config.parentId].value;
                                const thisRcd = this.myRecords[i1].$id.value;
                                const alink = function(name,style=""){return `<a href='${location.href.split("#")[0]}#record=${thisRcd}' class='${style}'>${name}(${thisRcd})</a>`};
                                if (Number(parentId) === Number(thisRcd)){
                                    result2.push({type:'RECORD-LINK', value:alink("親","parent-num-style")});
                                }else{
                                    result2.push({type:'RECORD-LINK', value:alink("子")});
                                }
                            }else{
                                result2.push(this.myRecords[i1][header[i2]]);
                            }
                        }else{
                            result2.push({type:null, value:null});
                        }
                    }
                    result1.push(result2);
                }
                return result1.sort((a, b)=>{
                    if (a[0].value.match(/.*\>親\(.*/)) return -1;
                    if (b[0].value.match(/.*\>子\(.*/)) return +1;
                    return 0;
                });
            }
        },
        // インスタンス生成後に実行
        created: function () {},
        mounted: function () {

            const header = this.headerCode();
            const params = {
                app: kintone.app.getId(),
                fields: header,
                query: this.apiGetQuery(),
                totalCount: true
            };

            kintone.api(kintone.api.url("/k/v1/records", true), "GET", params).then(
                (resp) => {
                    this.myRecords = resp.records;
                    resp.totalCount = Number(resp.totalCount);
                    if (0 < resp.totalCount){
                        this.apiVar.firstCount = 1;
                        this.apiVar.lastCount = resp.records.length;
                        this.apiVar.totalCount = resp.totalCount;
                        this.apiVar.index[this.apiVar.preOffset] =
                            [this.apiVar.preOffset+this.apiVar.limit,
                             new Array(this.apiVar.limit)
                                .fill(null)
                                .map((_, i) => i + (this.apiVar.firstCount-1)),
                            this.apiVar.nextOffset+this.apiVar.limit];
                    }

                    if (this.apiVar.limit < this.apiVar.totalCount){
                        $(".gaia-ui-listtable-pagercomponent-plugin-next").css({"visibility": "visible"});
                    } 

                    // ビュー全体がレンダリングされた後にのみ実行されるコード
                    this.$nextTick(() => {
                        const th = $(".recordlist-header-cell-plugin-gaia");
                        var width = "";
                        for(var i=0,len=th.length;i<len;i++){
                            width = Number($(th[i]).width()) + 10;
                            $(th[i]).css({'width':`${300 < width ? 300 : width}px`});
                        }
                        $("#customizeVueTable").css({'table-layout':'fixed', 'width':'0px'});

                        const tableHeigt = $("#customizeVueTable").outerHeight();
                        $(".recordlist-resizer-plugin-gaia").css({'height':`${tableHeigt}px`});
                    });
                },
                (error) => {}
            );
        },
        methods: {
            nextRecords: function(){
                if (this.apiVar.proc){

                    this.apiVar.proc = false;

                    const header = this.headerCode();
                    const params = {
                        app: kintone.app.getId(),
                        fields: header,
                        query: this.apiGetQuery(this.apiVar.nextOffset),
                        totalCount: true
                    };

                    kintone.api(kintone.api.url("/k/v1/records", true), "GET", params).then(
                        (resp) => {

                            this.myRecords = resp.records;
                            resp.totalCount = Number(resp.totalCount);

                            if (resp.totalCount < this.apiVar.totalCount && 
                                this.apiVar.lastCount > (resp.totalCount-1)){
                                this.pagingRecount();
                            }else{
                                this.apiVar.firstCount += this.apiVar.limit;
                                this.apiVar.lastCount += resp.records.length;
                                this.apiVar.preOffset += this.apiVar.limit;
                                this.apiVar.nextOffset += this.apiVar.limit;
                                this.apiVar.totalCount = resp.totalCount;
                                this.apiVar.index[this.apiVar.preOffset] = 
                                    [this.apiVar.preOffset+this.apiVar.limit,
                                     new Array(this.apiVar.limit)
                                        .fill(null)
                                        .map((_, i) => i + (this.apiVar.firstCount-1)),
                                    this.apiVar.nextOffset+this.apiVar.limit]
                            }

                            if (0 <= this.apiVar.preOffset) {
                                $(".gaia-ui-listtable-pagercomponent-plugin-prev").css({"visibility": "visible"});
                            }else{
                                $(".gaia-ui-listtable-pagercomponent-plugin-prev").css({"visibility": "hidden"});
                            }

                            if (this.apiVar.nextOffset <= (resp.totalCount-1)) {
                                $(".gaia-ui-listtable-pagercomponent-plugin-next").css({"visibility": "visible"});
                            }else{
                                $(".gaia-ui-listtable-pagercomponent-plugin-next").css({"visibility": "hidden"});
                            }

                            this.apiVar.proc = true;

                        },
                        (error) => {
                            this.apiVar.proc = true;
                        }
                    );
                }
            },
            prevRecords: function(){
                if (this.apiVar.proc){

                    this.apiVar.proc = false;

                    const header = this.headerCode();
                    const params = {
                        app: kintone.app.getId(),
                        fields: header,
                        query: this.apiGetQuery(this.apiVar.preOffset),
                        totalCount: true
                    };

                    kintone.api(kintone.api.url("/k/v1/records", true), "GET", params).then(
                        (resp) => {

                            this.myRecords = resp.records;
                            resp.totalCount = Number(resp.totalCount);
                            if (resp.totalCount < this.apiVar.totalCount && 
                                this.apiVar.firstCount > (resp.totalCount-1)){
                                this.pagingRecount();
                            }else{
                                this.apiVar.lastCount = this.apiVar.firstCount-1;
                                this.apiVar.firstCount -= this.apiVar.limit;
                                this.apiVar.preOffset -= this.apiVar.limit;
                                this.apiVar.nextOffset -= this.apiVar.limit;
                                this.apiVar.totalCount = resp.totalCount;
                            }

                            if (0 <= this.apiVar.preOffset) {
                                $(".gaia-ui-listtable-pagercomponent-plugin-prev").css({"visibility": "visible"});
                            }else{
                                $(".gaia-ui-listtable-pagercomponent-plugin-prev").css({"visibility": "hidden"});
                            }

                            if (this.apiVar.nextOffset <= (resp.totalCount-1)) {
                                $(".gaia-ui-listtable-pagercomponent-plugin-next").css({"visibility": "visible"});
                            }else{
                                $(".gaia-ui-listtable-pagercomponent-plugin-next").css({"visibility": "hidden"});
                            }

                            this.apiVar.proc = true;

                        },
                        (error) => {
                            this.apiVar.proc = true;
                        }
                    );
                }
            },
            pagingRecount:function(){
                for (var key in this.apiVar.index) {
                    if (0 <= this.apiVar.index[key][1].findIndex((elm)=>{return elm === (resp.totalCount-1)})){
                        this.apiVar.firstCount = this.apiVar.index[key][1][this.apiVar.index[key][1].length-1]+2;
                        this.apiVar.lastCount = this.apiVar.index[key][1][this.apiVar.index[key][1].length-1]+2;
                        this.apiVar.preOffset = this.apiVar.index[key][0];
                        this.apiVar.nextOffset = this.apiVar.index[key][2];
                        this.apiVar.totalCount = resp.totalCount;
                        break;
                    }
                }
            },
            apiGetQuery: function(offset = 0){
                var query = `${config.parentId} = ${kintone.app.record.getId()} order by $id asc limit ${this.apiVar.limit} offset ${offset}`;
                const parentId = this.eventdata.record[config.parentId].value;
                if (parentId){
                    query = `$id = ${parentId} or ${query}`; 
                }
                return query;
            },
            f_mousedown: function(ev){
                ev.preventDefault();

                this.cell.className = $(ev.currentTarget).attr("data-id");
                
                window.addEventListener("mousemove", this.f_mousemove, false);
                window.addEventListener("mouseup", this.f_mouseup, false);

            },
            f_mousemove: function(ev){
                if (0 < ev.pageX){
                    ev.preventDefault();
                    const element = document.getElementById(this.cell.className);
                    if (element){
                        const  width = ev.pageX - element.getBoundingClientRect().left;
                        if (width > 30) {
                            $('#'+this.cell.className).css({'width': `${width}px`});
                        };
                    }
                }
            },
            f_mouseup: function(ev){
                ev.preventDefault();
                window.removeEventListener("mousemove", this.f_mousemove, false);
                window.removeEventListener("mouseup", this.f_mouseup, false);
            },
            headerCode: function(){
                const result = ["$id"];
                if (config && null != config.columElement) {
                    const columElement = JSON.parse(config.columElement);
                    if ("object" === typeof columElement) {
                        for (var i=0,len=columElement.length;i<len;i++){                    
                            result.push(columElement[i].code);
                        }
                    }
                }
                return result;
            },
            headerLabel: function(){
                const header = ["親/子"];
                if (config && null != config.columElement) {
                    const columElement = JSON.parse(config.columElement);
                    if ("object" === typeof columElement) {
                        for (var i=0,len=columElement.length;i<len;i++){                    
                            header.push(columElement[i].label);
                        }
                    }
                }
                return header;
            }
        }
    }

</script>