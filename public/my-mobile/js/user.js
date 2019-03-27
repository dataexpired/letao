$(function(){
// 渲染当前用户信息
$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(res){
        var html=template('tmp',res);
        $('.name').html(html);
    }
});

// 退出功能
$('#logout').on('click',function(){
    mui.confirm('确定退出当前用户？','confirm',['确认','取消'],function(e){
        if(e.index==0){
            $.ajax({
                url:'/user/logout',
                type:'get',
                
                success:function(res){
                    if(res.success){
                        location.href='login.html';
                    }
                }
            });
        }
    });
});
})
