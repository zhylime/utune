class Validate extends MLP.apps.MLPModule {
  init() {
    super.init();
    this.el = {
      successMsg: this.el.target.find('.c-contact-msg'),
      _form : this.el.target.find('form'),
      _close : this.el.target.find('.js-msg_close'),
      _alert : this.el.target.find('.c-err-msg'),
      _submit : this.el.target.find('button')

    };
    this.event();
  }

  event(){
    var  _this = this;
    //关掉发送成功提示信息
    $(_this.el._close).on("click", function(){
      $(_this.el.successMsg).hide();
      $(_this.el._form).show();
      $(_this.el._form)[0].reset();
    });
    //ajax 发送数据
    $(_this.el._submit).on("click", function(){
      $.ajax({
        url: "sendmail.php",
        type: "POST",
        data: $("#contact-form").serialize(),
        error: function(){
          $(_this.el._alert).text("Could not connect to server");
        },
        beforeSend:function(XHR){
          $(_this.el._alert).text("Sending...");
        },
        success: function (html) {
          switch(html) {
            case "success":
              $(_this.el.successMsg).show();
              $(_this.el._form).hide();
              break;
            default:
              $(_this.el._alert).html(html);
              break;
          }
        }
      });
    });
  }
}
$.mlpPlugin(Validate, 'Validate', false);