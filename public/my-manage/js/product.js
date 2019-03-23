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

// 点击添加商品的按钮时，渲染下拉框中二级分类数据
$('.addBtn').on('click', function () {
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 1000
        },
        dataType: 'json',
        success: function (res) {
            var html = template('tmp2', res);
            $('.dropdown-menu').html(html);
        }
    });
});
// 下拉框的选择功能:实质是选择后，修改按钮中的文本内容
$('.dropdown-menu').on('click', 'li', function () {
    $('.select').text($(this).children().text());

    // 将当前选择的二级分类的id设置给隐藏域的value，用于上传数据
    $('[name="brandId"]').val($(this).data('id'));

    // 手动修改下拉框的验证状态
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
});

//需求：需要且只能上传三张图片 

// 使用fileupload插件异步上传图片
var picArr = [];//存储上传的图片数据
$('#picFile').fileupload({
    dataType: 'json',
    done: function (e, data) {//若上传多个图片，则该回调函数自动执行多次
        //此处不能想着将修改原预览图片的地址，而是要往imgbox中追加图片
        // 实现最多只能显示最新上传的3张：最新添加的图片添加到最前面；删除第4张图片
        $('#imgbox').prepend(' <img src=' + data.result.picAddr + ' alt="" width="100px"> ');
        $('#imgbox img').eq(3).remove();

        // 准备要传给后台的图片数据,data.result中存的就是所需的每张图片的数据
        picArr.unshift(data.result); //存数据
        if (picArr.length > 3) { //保证数组只存对应的三条数据
            picArr.pop();
        }
        // 每次上传后判断当前已有几张图片，若有3张则校验通过
        if (picArr.length === 3) {
            $('form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
        }
    }
});

// 表单校验
$('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        picStatus: {
            validators: {
                notEmpty: {
                    message: '需上传3张图片'
                }
            }
        },
        brandId: {
            validators: {
                notEmpty: {
                    message: '选择二级分类'
                }
            }
        },
        proName: {
            validators: {
                notEmpty: {
                    message: '输入商品名称'
                }
            }
        },
        proDesc: {
            validators: {
                notEmpty: {
                    message: '输入商品描述'
                }
            }
        },
        num: {
            validators: {
                notEmpty: {
                    message: '输入商品库存'
                },
                regexp: {
                    regexp: /^[1-9]\d{0,3}$/,
                    message: '库存数应为1-9999'
                }
            }
        },
        size: {
            validators: {
                notEmpty: {
                    message: '输入商品尺码'
                },
                regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '输入格式应为xx-xx'
                }
            }
        },
        oldPrice: {
            validators: {
                notEmpty: {
                    message: '输入商品原价'
                }
            }
        },
        price: {
            validators: {
                notEmpty: {
                    message: '输入商品现价'
                }
            }
        }

    }
});

//JSON.stringify后的数组字符串
var picStr = JSON.stringify(picArr);
// 监听到校验通过时，拦截浏览器默认提交表单行为，发送ajax请求
$('form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/product/addProduct',
        type: 'post',
        data: $('form').serialize() + '&picArr=' + picStr,
        dataType: 'json',
        success: function (res) {
            if (res.success) {
                // 清空并隐藏模态框
                $('form').data('bootstrapValidator').resetForm(true);
                $('.select').text('选择二级分类');
                $('#imgbox img').remove();
                $('.addModal').modal('hide');
                // 渲染第一页
                page = 1;
                render(page, pageSize);
            }
        }
    });
});



