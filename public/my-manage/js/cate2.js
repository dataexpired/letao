var page = 1;
var pageSize = 5;
render(page, pageSize);
function render() {
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (res) {
            var html = template('tmp3', res);
            $('tbody').html(html);
            // 分页插件
            // $('#paginator').bootstrapPaginator({
            //     bootstrapMajorVersion: 3,
            //     currentPage: page,
            //     totalPages: Math.ceil(res.total / pageSize),

            //     onPageClicked: function (a, b, c, clickedPage) {
            //         page = clickedPage;
            //         render(page, pageSize);
            //     }
            // });
            pageset(res, render);
        }

    });
}

//渲染下拉菜单中的一级分类列表

$('.addBtn').on('click', function () {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 1000
        },
        dataType: 'json',
        success: function (res) {
            var html = template('tmp4', res);
            $('.dropdown-menu').html(html);

        }
    });
});

// 选中功能
$('.dropdown-menu').on('click', 'li', function () {
    var catename = $(this).data('catename');
    $('.select').text(catename);
    // 手动改变校验状态，使校验通过
    $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    // 将选中的一级分类的id赋给隐藏域的value属性
    var cateId = $(this).data('cateid');
    $('.cateId').val(cateId);

});


// 表单校验
$('form').bootstrapValidator({
    excluded: [],//使原指定不校验的类型进行校验
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        //校验用户名，对应name表单的name属性
        categoryId: {
            validators: {
                notEmpty: {
                    message: '请选择一级分类'
                }
            }
        },
        brandName: {
            validators: {
                notEmpty: {
                    message: '请输入二级分类'
                }
            }
        },
        brandLogo: {
            validators: {
                notEmpty: {
                    message: '请上传图片'
                }
            }
        }
    }
});

// 利用fileupload.js插件实现图片预览
$('#upload').fileupload({
    done: function (e, data) {
        var res = data.result.picAddr;
        $('.logoPic').attr('src', res);
        $("[name='brandLogo']").val(res);
        // 手动更改校验状态
        $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
});

// 拦截浏览器默认行为——表单提交，发送ajax请求
$('form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/category/addSecondCategory',
        type: 'post',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if(res.success){
                $('form').data('bootstrapValidator').resetForm(true);
                // 需手动恢复下拉按钮的文本和图片初始预览地址
                $('.select').text('选择一级分类');
                $('.logoPic').attr('src', "./images/none.png");
                // 隐藏模态框
                $('.addModal').modal('hide');
                // 渲染第一页
                page=1;
                render(page,pageSize);
            }
        }
    });
});






