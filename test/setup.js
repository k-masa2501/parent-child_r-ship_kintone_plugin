global.chai = require('chai');
const  { shallowMount } = require('@vue/test-utils');
global.shallowMount = shallowMount;
const kintone = require("kinstub");
global.kintone = kintone({
    "domain": process.env.KINTONE_DOMAIN,
    "username": process.env.KINTONE_USERNAME,
    "password": process.env.KINTONE_PASSWORD,
    "guest_space_id": "1",
    "userinfo": {
        "default": {
            "id": "1",
            "code": "sample",
            "name": "sample",
            "email": "sample@sample.com",
            "url": "http://sample.com",
            "employeeNumber": "",
            "phone": "0426-12-3456",
            "mobilePhone": "09012345678",
            "extensionNumber": "",
            "timezone": "Asia/Tokyo",
            "isGuest": "false",
            "language": "ja"
        }
    }
});
require('jsdom-global')();
window.Date = Date;
