class Validate extends MLP.apps.MLPModule {
  init() {
    super.init();
    this.el = {
      successMsg: this.el.target.find('.c-contact-msg'),
      _form : this.el.target.find('#contact-form'),
      _close : this.el.target.find('.js-msg_close'),
      _alert : this.el.target.find('.c-err-msg'),
      _submit : this.el.target.find('button'),
    };
    this.event();
  }

  event(){
    var  _this = this;
    var _isPass = true;
    //关掉发送成功提示信息
    $(_this.el._close).on("click", function(){
      $(_this.el.successMsg).hide();
      $(_this.el._alert).text("");
      $(_this.el._form).show();
      $(_this.el._submit).attr("disabled",false);
      $(_this.el._form)[0].reset();
    });
    //ajax 发送数据
    $(_this.el._submit).on("click", function(){
      if(_this.validate()){
        $.ajax({
          //服务器上使用，本地测试需要删除 /phpbin/
          url: "./phpbin/sendmail.php",
          type: "POST",
          data: $("#contact-form").serialize(),
          error: function(){
            $(_this.el._alert).text("Could not connect to server");
            $(_this.el._submit).attr("disabled",false);
          },
          beforeSend:function(){
            $(_this.el._alert).text("Sending...");
            $(_this.el._submit).attr("disabled",true);
          },
          success: function (html) {
            var cc = html.length;
            switch(html) {
              case "success":
                $(_this.el.successMsg).show();
                $(_this.el._form).hide();
                break;
              default:
                if(cc>200) {
                  $(_this.el._alert).html("Could not connect to server");
                  $(_this.el._submit).attr("disabled", false);
                }
                else
                  $(_this.el._alert).html(html);
                break;
            }
          }
        });
        return false;
      }
      return false;
    });

    Validate.prototype.validate = function(){
      var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      _isPass = true;
      $(_this.el._form).find(":input[required]").each(function(index,item) {
        var _name = $(item).attr("name").split("-")[1];
        if($(item).val()===""){
          $(_this.el._alert).text(_name +" is required");
          $(item).focus();
          _isPass = false;
          return false;
        }else if($(item).attr("type")==="email"){
          if (!pattern.test($(this).val())) {
            $(_this.el._alert).text("Email Address is incorrectly formatted.");
            _isPass = false;
            $(item).focus();
            return false;
          }
        }
      });
      return _isPass;
    };
  }
}
$.mlpPlugin(Validate, 'Validate', false);