$(function () {
    // 1、从地址栏中获取带过来的搜索内容，用于：1、显示在当前页面的搜索框中；2、发送ajax请求获取搜索结果并渲染在页面中
    var key = location.search.split('=')[1];
    // 【注意】若查询条件是中文，则url会自动进行转码，若要用原值，则需解码
    key = decodeURI(key);
    $('[type="search"]').val(key);

    function render() {
        // 每次render开始就将加载动画显示出来，等加载完成，内容盒子就盖在加载动画上面
        $('.product ul').html('<div class="loading"></div>');

        var obj = { //参数对象，便于追加
            proName: key,
            page: 1,
            pageSize: 5
        }

        // 排序是通过请求中传参来实现的
        // 何时需要传参？传什么参
        var activeItem = $('.main .sort ul li a.active')
        if (activeItem.length > 0) {
            // 点击了排序中的一个按钮就需排序
            // 获取存在当前active类上的自定义属性，就知道了传什么参
            var type = activeItem.data('type');
            // 还应排除不能排序的两个按钮：在注册点击事件时完成
            // 参数的值由箭头方向确定
            var value = activeItem.children('span').hasClass('fa-angle-up') ? 1 : 2;
            obj[type] = value;
            console.log(type, value);
        }

        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: obj,
            dataType: 'json',
            success: function (res) {
                // 为了体现加载效果而延迟
                setTimeout(function () {
                    console.log(res);
                    var html = template('tmp1', res);
                    $('.product ul').html(html);
                }, 1000);
            }

        });
    }
    render();

    // 2、当前页面的搜索功能
    $('.searchBtn').on('click', function () {
        // key=$('[type="search"]').val();
        // 改变url,即每次搜索都是页面的跳转
        location.href = 'searchList.html?key=' + $('[type="search"]').val();
        render();
    })

    // 3、排序功能
    $('.main .sort ul li a[data-type]').on('click', function () {
        var $this = $(this);
        // 若当前a有active类，则点击后箭头方向改变
        if ($this.hasClass('active')) {
            $this.children('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        } else {
            // 若当前a没有active类，则点击后加上该类且移除其他li的a的active类，并使所有箭头方向朝下
            $this.addClass('active').parent().siblings('li').children('a').removeClass('active');
            $('.main .sort ul li a span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        // 在render中实现排序
        render();

    });

    // 4、加载中的动画效果：在render中实现

    // 5、点击立即购买，跳转到商品详情页，并将商品id传递过去
    $('.product ul').on('click','a',function(){
        var productId=$(this).data('id');
        location.href='detail.html?productId='+productId;
    });

})