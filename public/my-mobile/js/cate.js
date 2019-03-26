// 获取并渲染一级分类
var renderTop = function () {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (res) {
            var html = template('tmp1', res);
            $('.left ul').html(html);

            // 每次刷新都渲染第一个一级分类对应的二级分类们
            renderSecond(res.rows[0].id);

        }
    });
}

// 封装渲染二级分类的功能
var renderSecond = function (id) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: {
            id: id
        },
        dataType: 'json',
        success: function (res) {
            var html = template('tmp2', res);
            $('.right ul').html(html);
            
        }
    });
}

// 渲染一级分类
renderTop();

// 每次刷新渲染第一个一级分类对应的二级分类们
// var id=1 //第一个元素id不一定就是1
// renderSecond(id);

// 给每个一级分类的li注册点击事件：1、添加样式；2、在右侧内容栏渲染相应二级分类的名称和logo
$('.left ul').on('click', 'li', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    
    id=$(this).data('id');
    renderSecond(id);
});