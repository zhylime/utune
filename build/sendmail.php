<?php
    date_default_timezone_set("PRC");
    header("content-type:text/html;charset=utf-8");
    ini_set("magic_quotes_runtime",0);
    require './assets/vendor/class.phpmailer.php';

    $nameErr = $emailErr = $messageErr = $subjectErr = "";
    $name = $email = $subject = $message = "";
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";  //验证邮箱
    //表单验证
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty($_POST["your-name"])) {
            $nameErr = "Name is requried.";
            echo "$nameErr";
            return;
        } else {
            $name = test_input($_POST["your-name"]);
        }

        if (empty($_POST["your-email"])) {
            $emailErr = "Email is requried.";
            echo "$emailErr";
            return;
        }
        else if(!preg_match($pattern, $_POST["your-email"])){
            $emailErr = "Your Email Address is incorrectly formatted. ";
            echo "$emailErr";
            return;
        }else {
            $email = test_input($_POST["your-email"]);
        }

        if (empty($_POST["your-subject"])) {
            $subject = "";
        } else {
            $subject = test_input($_POST["your-subject"]);
        }

        if (empty($_POST["your-message"])) {
            $message = "";
        } else {
            $message = test_input($_POST["your-message"]);
        }

    }

    //邮件发送部分
    try {
        $mail = new PHPMailer(true);
        $mail->IsSMTP();
        $mail->CharSet='UTF-8'; //设置邮件的字符编码，这很重要，不然中文乱码
        $mail->SMTPAuth   = true;                  //开启认证
        //第三方邮箱
        $mail->Port       = 25;  //非ssl端口
        $mail->Host       = "smtp.126.com";   //smtp服务器
        $mail->Username   = "qirain@126.com"; //账号
        $mail->Password   = "Qaz2017";//第三方邮箱授权码
        $mail->From       = "qirain@126.com";   //显示的邮箱名称
        $mail->FromName   = "qirain";  //显示的名称

        $to = "176872637@qq.com"; //接收方，可任意修改
        $mail->AddAddress($to);
        $mail->Subject  = "联系我们";
        $mail->Body = "<p>姓名： ".$name."<br>邮箱： ".$email."<br>主题： ".$subject."<br>内容： ".$message."</p>"; //邮件格式
        $mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; //当邮件不支持html时备用显示，可以省略
        $mail->WordWrap   = 80; // 设置每行字符串的长度
        //$mail->AddAttachment("f:/test.png");  //可以添加附件
        $mail->IsHTML(true);
        $mail->Send();
        echo '邮件已发送';
    } catch (phpmailerException $e) {
        echo "邮件发送失败：".$e->errorMessage();
    }

    function test_input($data)
    {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }
?>