"use strict";var classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}}(),inherits=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},possibleConstructorReturn=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},BaseLocation=function(){function e(t){classCallCheck(this,e),this.opts=t}return createClass(e,[{key:"type",get:function(){return this.opts.type}},{key:"options",get:function(){return this.opts},set:function(t){this.opts=t}}]),e}(),scope="scope.userLocation",WXMiniAppLocation=function(t){function e(){return classCallCheck(this,e),possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return inherits(e,BaseLocation),createClass(e,[{key:"ready",value:function(n,o){var r=this;wx.getSetting({success:function(t){var e=t.authSetting[scope];e?(r.isready=!0,n&&n()):!1===e?o&&o(e):wx.authorize({scope:scope,success:function(){r.isready=!0,n&&n()},fail:function(t){r.isready=!1;var e=Error(t.errMsg);e.code=401,o&&o(e)}})}})}},{key:"getLocation",value:function(){var t=this;return new Promise(function(e,n){wx.getLocation({type:t.type,success:function(t){e(t)},fail:function(t){var e=Error(t.errMsg);e.code=500,n(e)}})})}},{key:"start",value:function(){var n=this;return this.isready?this.getLocation():new Promise(function(t,e){n.ready(function(){n.getLocation().then(t).catch(e)},e)})}}]),e}(),options={altitude:!1,type:"wgs84"},instance=new WXMiniAppLocation(options);module.exports=instance;
