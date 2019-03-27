$(function () {
    // 渲染数据
    function render() {
        $.ajax({
            url: '/cart/queryCart',
            type: 'get',

            success: function (res) {
                console.log(res);
                var obj = { res: res };
                var html = template('tmp1', obj);
                $('.mui-scroll ul').html(html);
            }
        });
    }
    render();

    // 删除功能
    $('.mui-scroll ul').on('click', '.delete', function () {
        var id = $(this).data('id');
        mui.confirm('确认删除此条记录吗？', 'confirm', ['确认', '取消'], function (e) {

            if (e.index === 0) {
                $.ajax({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: {
                        id: [id]
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.success) {
                            render();
                        }
                    }
                });
            }
        })
    })
})
