var page = 1;
var pageSize = 5;
// 数据渲染
render(page, pageSize);
function render() {
    $.ajax({
        url: '/product/queryProductDetailList',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        dataTypr: 'json',
        success: function (res) {
            var html = template('tmp', res);
            $('tbody').html(html);
            // 分页
            pageset(res, render);
        }
    });
}

