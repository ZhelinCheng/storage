"use strict";

/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-03-10 14:33:11
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-05-27 23:38:14
 * @FilePath     : /iiw.ink/public/_static/js/index.js
 * @Description  : 未添加文件描述
 */
function toast(text) {
  $.toast({
    icon: 'info',
    text: text,
    position: 'top-left'
  });
}

$(function () {
  var $btn = $('#J-btn');
  var $input = $('#J-input');
  var fn = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {
      $btn.click(function () {
        var $expired = $('input[name="expired"]:checked');
        var url = $input.val();
        var re = /^https?:\/\/.*/img;
        var token = grecaptcha.getResponse();

        if (url.indexOf('iiw.ink') >= 0) {
          return toast('不允许转换本地链接！');
        }

        if (re.test(url)) {
          if (!token) {
            toast('请完成验证码！');
          } else {
            $.ajax({
              url: '/api/v1/links',
              method: 'post',
              data: {
                link: url,
                expired_at: $expired.val()
              },
              headers: {
                'x-req-captcha': token
              },
              success: function success(_ref) {
                var base_id = _ref.data.base_id;
                toast('短链接已生成！');
                $input.val("http://iiw.ink/".concat(base_id));
              },
              error: function error(err) {
                console.log(err);
              },
              complete: function complete() {
                grecaptcha.reset();
              }
            });
          }
        } else {
          toast('请输入正确的URL地址！');
        }
      });
    }
  };
  fn.init();
});