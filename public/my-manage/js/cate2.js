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
});


// 表单校验
$('form').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        //校验用户名，对应name表单的name属性
        dropdown: {
            validators: {
                notEmpty: {
                    message: '请选择一级分类'
                }
            }
        },
        addcate:{
            validators:{
                notEmpty:{
                    message:'请输入二级分类'
                }
            }
        },
        upload:{
            validators:{
                notEmpty:{
                    message:'请上传图片'
                }
            }
        }
    }
});



