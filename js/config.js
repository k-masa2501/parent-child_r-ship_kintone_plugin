
(function($, PLUGIN_ID) {
    "use strict";

    require("../css/config.css");
    require("./extUtil.js");

    const app = new Vue({
        el: '#settingForm',
        data: {
          fieldName: null,
          spaceId: null,
          parentId: null,
          formItems: [],
          columElement: [],
          error:{
            fieldName:{flg:false,msg:"フィールド名の入力は必須です。"},
            spaceId:{flg:false,msg:"スペースフィールド名の入力は必須です。"},
            parentId:{flg:false,msg:"親レコード番号フィールド名の入力は必須です。"},
            columElement:{flg:false,msg:"一覧表示形式の設定は必須です。"}
          }
        },
        computed:{
          _errorMsg:function(){
            return {
              fieldName: this.error.fieldName.flg ? this.error.fieldName.msg : "",
              spaceId: this.error.spaceId.flg ? this.error.spaceId.msg : "",
              parentId: this.error.parentId.flg ? this.error.parentId.msg : "",
              columElement: this.error.columElement.flg ? this.error.columElement.msg : "",
            }
          }
        },
        mounted: function(){
          kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', {"app": kintone.app.getId()}, (resp) => {
            // success
            resp.properties.forIn((key, value, index) => {
              this.formItems.push(value);
            });

            // 要素描画後
            this.$nextTick( () => {
              $("#div-colum-drop-block").height($("#div-colum-list-block").height());
              this.setParam();
            });
          }, (error) => {
            // error
            console.log(error);
          });
        },
        methods:{
          dataTransfer: function(){
            return {
              set: (obj) => {
                this.transferData = obj;
              },
              get: () => {
                return this.transferData;                
              }
            }
          },
          f_column_dragStart: function(event, item){
            this.dataTransfer().set({target: event.currentTarget, item});
          },
          f_column_drop: function(event){
            const obj = this.dataTransfer().get();
            if ("object" === typeof obj){
              this.setColumElement(obj);
            }
          },
          f_menu_mouseenter: function(event){
            const element = $(event.currentTarget).next("div");
            $(element).css({"display": "block"});
          },
          f_menu_mouseleave: function(event){
            $('.fm-control-menu-plugin-list-gaia').css({"display": "none"});
            $('.remove-image-plugin-gaia').removeClass("remove-image-plugin-gaia_hover");
          },
          f_rmBtn_mouseenter: function(event){
            $(event.currentTarget).css({"display": "block"});
            $('.remove-image-plugin-gaia').addClass("remove-image-plugin-gaia_hover");
          },
          f_rmBtn_click: function(event, index){
            const leftTarget = this.columElement[index].leftItem;
            $(leftTarget).attr("draggable", true);
            $(leftTarget).removeClass("plugin-toolitem-gaia_disabled");
            this.columElement.splice(index, 1);
          },
          f_column_swapStart: function(event, index){
            this.dataTransfer().set(index);
          },
          f_column_swapEnd: function(event, index){
            const swapIndex = this.dataTransfer().get();
            if ("number" === typeof swapIndex){
              const tmp1 = this.columElement[swapIndex];
              const tmp2 = this.columElement[index];
              this.columElement[index] = tmp1;
              this.columElement[swapIndex] = tmp2;
              this.$forceUpdate();
            }
          },
          f_button_dialog_ok: function(event){
            const config = {fieldName:"", spaceId:"", parentId: "", columElement:{}};
            const form = document.getElementById('settingForm');
            const columElement = [];

            if (!form.checkValidity() || 0 >= this.columElement.length) {
              this.error.fieldName.flg = "" != $(form[0]).val() ? false : true;
              this.error.spaceId.flg = "" != $(form[1]).val() ? false : true;
              this.error.parentId.flg = "" != $(form[2]).val() ? false : true;
              this.error.columElement.flg =  0 < this.columElement.length ? false : true;
              return;
            };

            config.fieldName = this.fieldName;
            config.spaceId = this.spaceId;
            config.parentId = this.parentId;
            
            for (var i=0, len=this.columElement.length;i<len;i++){
              columElement.push({code: this.columElement[i].item.code, label: this.columElement[i].item.label});
            }

            config.columElement = JSON.stringify(columElement);
            kintone.plugin.app.setConfig(config);

            history.back();
          },
          f_button_dialog_cancel: function(event){
            history.back();
          },
          calElementSize: function(){
            const element = document.getElementsByClassName("div-colum-drop-block")[0];
            if (element && 0 < element.children.length){
              const padding = 12;
              for (var i=0, len=element.children.length;i<len;i++){
                element.children[i].style.left = `${(i*element.children[0].offsetWidth)+padding}px`;
              }
              const elmsWidth = element.children[0].offsetWidth * element.children.length;
              if (element.offsetWidth <= elmsWidth){
                element.style.width = `${elmsWidth + (padding*2) + 50}px`;
              }
            }
          },
          setColumElement: function(obj){
            this.columElement.push({item: obj.item, leftItem: obj.target});

            $(obj.target).attr("draggable", false);
            $(obj.target).addClass("plugin-toolitem-gaia_disabled");

            // 要素サイズの計算
            this.$nextTick( () => {
              this.calElementSize();
            });
          },
          setParam: function(){
            const config = kintone.plugin.app.getConfig(PLUGIN_ID);
            if (config){
              if (null != config.fieldName) this.fieldName = config.fieldName;
              if (null != config.spaceId) this.spaceId = config.spaceId;
              if (null != config.parentId) this.parentId = config.parentId;
              if (null != config.columElement) {
                const columElement = JSON.parse(config.columElement);
                if ("object" === typeof columElement && "object" === typeof this.formItems) {
                  const elements = $("#kintoneplugin-ul-colum-list").children();
                  for (var i=0,len=columElement.length;i<len;i++){
                      const findIndex = this.formItems.findIndex((elm)=>{
                        return columElement[i].code === elm.code
                      });
                      if (0 <= findIndex){
                      this.setColumElement({item: this.formItems[findIndex], target: elements[findIndex]});
                    }                    
                  }
                }
              }
            }
          }
        }
      });

})(jQuery, kintone.$PLUGIN_ID);


