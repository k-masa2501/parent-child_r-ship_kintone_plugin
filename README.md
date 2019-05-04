# parent-child_r-ship_kintone_plugin
![image1](https://github.com/k-masa2501/parent-child_r-ship_kintone_plugin/blob/demo/media/logo.png)  
レコードに親子関係を関連付けするKINTONEプラグイン。親子関係はレコード詳細画面にレコード一覧として出力する。

![image2](https://github.com/k-masa2501/parent-child_r-ship_kintone_plugin/blob/demo/media/bandicam-2019-05-01-00-44-09-558.gif)

## 使い方
### プラグインのインストール
「kintoneシステム管理」⇒ 「プラグイン」に移動し、plugin.zipを読み込む。次にアプリ設定のプラグインに移動し、親子関係付けプラグインを追加する。
### プラグインの設定
![image3](https://github.com/k-masa2501/parent-child_r-ship_kintone_plugin/blob/demo/media/plugin-setting.png)
- フィールド名  
レコード詳細画面に表示する、親子関係レコード一覧名を設定する。
- スペースフィールド名  
親子関係レコード一覧を挿入するスペースフィールドのフィールドコードを指定する。
- 親レコード番号フィールド名  
親番号を入力するフィールドのフィールドコードを指定する。親番号入力フィールドは文字列（1行）(SINGLE_LINE_TEXT)形式とする。
- 親レコード一覧表示形式  
親子関係レコード一覧に表示する列をドラッグアンドドロップで指定する。  
  
上記設定後、保存ボタンを押下し、アプリを更新する。
### 親子関係の紐づけ方
![image4](https://github.com/k-masa2501/parent-child_r-ship_kintone_plugin/blob/demo/media/parentChildList.png)  
親レコード番号入力フィールドに、対象レコードの親となるレコード番号を入力し、保存する。  
詳細画面に遷移後、親子関係レコード一覧に親レコードと子レコード(他のレコードで対象レコードを親と設定したレコード)の情報が一覧形式で表示される。
