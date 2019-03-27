
var check;
$('.loginBtn').on('click', function () {
    mui(".main input").each(function () {
        //若当前input为空，则alert提醒 
        if (!this.value || this.value.trim() == "") {
            var label = this.previousElementSibling;
            mui.alert(label.innerText + "不允许为空");
            check = false;
            return false;
        }
        check=true;
    });
    // 若验证通过
    if(check){
        var username=$('.username').val();
        var password=$('.password').val();
        
       $.ajax({
           url:'/user/login',
           type:'post',
           data:{
                username:username,
                password:password
           },
           dataType:'json',
           success:function(res){
               console.log(res);
               if(res.error===403){
                   mui.alert('用户名或密码错误！');
               }
               if(res.success){
                   var url=location.href.split('from=')[1];
                //    console.log(url);
                    location.href=url || 'user.html';
               }
           }
       });
        
    }

    
    
})
