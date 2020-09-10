/*
 * @Author       : Zhelin Cheng
 * @Date         : 2020-09-10 10:27:25
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2020-09-10 10:28:17
 * @FilePath     : /battle.aiiuii.com/public/js/cookie.js
 * @Description  : Cookie操作
 */

(function(w){var cookie=function(name,value,days){if(value===undefined){var cookiestring="; "+w.document.cookie;var cookies=cookiestring.split("; "+name+"=");if(cookies.length===2){return cookies.pop().split(";").shift()}return null}else{if(value===false){days=-1}var expires="";if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toGMTString()}w.document.cookie=name+"="+value+expires+"; path=/"}};if(typeof module!=="undefined"){module.exports=cookie}else{w.cookie=cookie}}(typeof global!=="undefined"?global:this));