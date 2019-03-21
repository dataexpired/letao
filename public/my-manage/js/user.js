// 渲染数据
var page = 1;
var pageSize = 5;
render(page, pageSize);
function render() {
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (res) {
            var html = template('tmp1', res);
            console.log(res);
            $('tbody').html(html);
            //渲染分页插件
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage: page,
                totalPages: Math.ceil(res.total / pageSize),
                onPageClicked: function (event, originalEvent, type, clickedPage) {
                    //为按钮绑定点击事件 clickedPage:当前点击的按钮值
                    page = clickedPage;
                    render(page, pageSize);
                }
            });
        }
    });
}
// 启/禁用：
// 点击按钮显示模态框
// 若选择确定，获取并给后台发送用户id和启停标识
// 后台响应成功后：关闭模态框，且重新渲染数据
var id;
var isDelete;
$('tbody').on('click', '.btn', function () {
    $('.excuteModal').modal('show');
    id = $(this).data('id');
    isDelete = $(this).hasClass('btn-success') ? 1 : 0;

});
$('.excute').on('click', function () {

    $.ajax({
        url:'/user/updateUser',
        type:'post',
        data:{
            id:id,
            isDelete:isDelete
        },
        dataType:'json',
        success:function(res){
            if(res.success){
                $('.excuteModal').modal('hide');
                render(page);
            }
        }
    });
});