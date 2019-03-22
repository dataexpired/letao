var page = 1;
var pageSize = 5;
// 数据渲染
render(page, pageSize);
function render(page, pageSize) {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (res) {
            var html = template('tmp2', res);
            $('tbody').html(html);
            // 渲染分页插件
           pageset(res,render);
        }
    });
}

// 添加分类
// 表单校验
// 若校验失败则自动拦截
$('.addModal form').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        //校验用户名，对应表单的name属性
        addcate: {
            validators: {
                notEmpty: {
                    message: '分类名称不能为空'
                }
            }
        }
    }
});
// 监听校验成功事件，若发生则阻止浏览器默认提交行为，发送ajax请求并重新渲染
$('.addModal form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
        url:'/category/addTopCategory',
        type:'post',
        data:{
            categoryName:$('#add').val()
        },
        dataType:'json',
        success:function(res){
            console.log(res);
            // 重置输入和样式，隐藏模态框
            var validator=$('.addModal form').data('bootstrapValidator');
            validator.resetForm(true);//重置表单，清空输入并隐藏所有的错误提示和图标
            $('.addModal').modal('hide');

            // 重新渲染数据
            render(page,pageSize);
        }
    });
});


