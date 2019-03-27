// 发送请求获取数据，渲染页面内容
var id = location.search.split('=')[1];
$.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
        id: id
    },
    dataType: 'json',
    success: function (res) {

        // 处理size，将如'30-40'的字符串转换成[30,31,...,40]
        var size = res.size.split('-');
        var sizeArr = [];
        for (var i = +size[0]; i <= +size[1]; i++) {
            sizeArr.push(i);
        }
        res.sizeArr = sizeArr;

        var html = template('tmp1', res);
        $('.main .mui-scroll').html(html);

        // 轮播图和数字输入框组件都是是动态渲染的，故需要再渲染完模板后重新进行初始化
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        mui('.mui-numbox').numbox();

        // 若在这里给'.proSize span'注册事件，则不需委托，因此时页面渲染完成了

    }
});
// 在这里写需要进行事件委托，因ajax是异步的，此时页面不一定渲染完了
$('.main').on('click','.proSize span',function(){
    $(this).addClass('select').siblings().removeClass('select');
});

// 加入购物车的功能
$('.addCart').on('click',function(){
    var num=$('.mui-numbox-input').val();
    var size=$('.select').data('size');
    if(!size){
        mui.toast('请选择尺码');
        return;
    }
    $.ajax({
        url:'/cart/addCart',
        type:'post',
        data:{
            productId:id,
            size:size,
            num:num
        },
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.success){
                
                mui.confirm('添加成功','success',['去购物车','继续浏览'],function(e){
                    if(e.index==0){
                        // 跳转购物车页面
                        location.href='cart.html';
                    }
                });
            }
            if(res.error==400){
                // console.log('login.html?from='+location.href);
                location.href='login.html?from='+location.href;
            }
        }
    });
});
