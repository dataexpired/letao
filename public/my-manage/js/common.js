$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    NProgress.done();
});

// 滑动显示二级菜单
$('.cate').on('click', function () {
    $('.second').stop().slideToggle();
});

// 滑动折叠左侧栏
$('.fold').on('click', function () {
    $('.nav,.main,.top').toggleClass('change');
});

// 退出功能
$('.logout').on('click', function () {
    // 显示模态框的两种方法：元素标签中设置相应属性；js中调用模态框插件的方法
    $('.logoutModal').modal('show');
})
$('.confirm').on('click', function () {

    $.ajax({
        url: "/employee/employeeLogout",
        type: "GET",
        dataType: "json",
        success: function (info) {

            if (info.success) {
                location.href = "login.html"
            }
        }
    })
});

/**
 * 封装分页功能
 * @param {*} res 后台返回的用于分页的数据
 * @param {*} render 点击分页页码后的回调函数
 */
function pageset(res, render) {
    $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: page,
        totalPages: Math.ceil(res.total / pageSize),
        itemTexts: function (type, page, current) {
            switch (type) {
                case 'first':
                    return '首页'
                case 'prev':
                    return '上一页'
                case 'next':
                    return '下一页'
                case 'last':
                    return '尾页'
                default:
                    return page

            }
        },
        onPageClicked: function (a, b, c, clickedPage) {
            page = clickedPage;
            render(page, pageSize);
        }
    });
}
