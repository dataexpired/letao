
$('#form').bootstrapValidator({
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验字段
    fields: {
        username: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '用户名不能为空'
                },
                //长度校验
                stringLength: {
                    min: 2,
                    max: 6,
                    message: '用户名长度必须是2~6位'
                },
                //正则校验
                // regexp: {
                //     regexp: /^[a-zA-Z0-9_\.]+$/,
                //     message: '用户名由数字字母下划线和.组成'
                // }
                // 
                callback: {
                    message: '用户名错误'
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: '密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: '密码长度必须是6~12位'
                },
                callback: {
                    message: '密码错误'
                }
            }
        }
    }
});

var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例

$('#reset').on('click', function () {
    //重置表单，并且会隐藏所有的错误提示和图标
    validator.resetForm();
    //默认参数为false；若参数为true，则表示同时清除表单项中的内容；由于reset类型的按钮有清除表单项内容的功能，故此处可不传参
});

//当表单校验成功时，会触发success.form.bv事件，此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
$('#form').on('success.form.bv', function (e) {
    e.preventDefault();//阻止浏览器点击提交按钮时就上传表单的默认行为
    $.ajax({
        url: '/employee/employeeLogin',
        type: 'post',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function (r) {
            if (r.error === 1000) {
                validator.updateStatus('username', 'INVALID', 'callback');
                return false;
            }
            if (r.error === 1001) {
                validator.updateStatus('password', 'INVALID', 'callback');
                return false;
            }
        },
        error: function () {
        }
    });

});
