"use strict";

/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-03-10 14:33:11
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-03-10 16:16:55
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
  var $input = $('#J-input'); // ClipboardJS.isSupported()

  var fn = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {
      $btn.click(function () {
        var url = $input.val();
        var re = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
        var token = grecaptcha.getResponse();

        if (url.indexOf('iiw.ink') >= 0) {
          return;
        }

        if (re.test(url)) {
          if (!token) {
            toast('请完成验证码！');
          } else {
            $.ajax({
              url: '/api/v1/links',
              method: 'post',
              data: {
                link: url
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