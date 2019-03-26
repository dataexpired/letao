
$(function () {

    // 封装获取历史记录的方法
    var getHistory = function () {
        var result = JSON.parse(localStorage.getItem('search_history'));
        // 若无记录则获取空数组
        return result || [];
    };

    // 封装渲染记录的方法
    var render = function () {
        // 操作dom的语句必须等到dom加载完才能执行生效，故放在入口函数
        var html = template('tmp', { rows: getHistory() });
        $('.showbox').html(html);
    };
    render();

    // 清空记录
    $('.showbox').on('click', '.clear', function () {
        mui.confirm('确认清空所有记录吗？', '提示', ['确认', '取消'], function (e) {
            //该回调函数的事件参数对象中记录了点击的是确认还是取消
            if (e.index === 0) { 
                localStorage.removeItem('search_history');
                render();
            }
        });

    });

    //删除单条历史记录
    // 思路：获取历史记录，删除数组中的指定元素，再转换并保存到localStorage，再重新渲染
    var history;
    $('.showbox').on('click', '.delete', function () {
        history = getHistory();
        var index = $(this).data('index');
        history.splice(index, 1);
        localStorage.setItem('search_history', JSON.stringify(history));
        render();
    });

    // 点击搜索后：1、将搜索内容添加到记录列表的第一个；2、跳转到搜索结果页面
    // 【注意】去重：若搜索相同的内容，则删除数组中的原记录项，作为新元素再添加进去
    //        拼接：跳转时需拼接搜索内容
    $('.searchBtn').on('click', function () {
        history = getHistory();
        var val = $('[type=search]').val();
        if (history.indexOf(val) !== -1) { //若搜索的内容与记录项相同，则需删除原记录
            var i = history.indexOf(val);
            history.splice(i, 1);
        }
        history.unshift(val);
        localStorage.setItem('search_history', JSON.stringify(history));
        render();
        $('[type=search]').val('');

        // 跳转时需拼接上搜索内容
        location.href = 'searchList.html?key=' + val;

    });



})





