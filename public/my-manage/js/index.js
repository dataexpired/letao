// 滑动显示二级菜单
$('.cate').on('click',function(){
    $('.second').stop().slideToggle();
});

// 滑动折叠左侧栏
$('.fold').on('click',function(){
    $('.nav,.main,.top').toggleClass('change');
});

// 退出功能
$('.logout').on('click',function(){
    // 显示模态框的两种方法：元素标签中设置相应属性；js中调用模态框插件的方法
    $('.logoutModal').modal('show');
})
$('.confirm').on('click',function(){

    $.ajax({
        url: "/employee/employeeLogout",
        type: "GET",
        dataType: "json",
        success: function( info ) {
 
          if ( info.success ) {
            location.href = "login.html"
          }
        }
      })
});

// 柱状图
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector('.contain .left'));
// 指定图表的配置项和数据
var option = {
    title: {
        text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
        data:['人数']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [1000,1500, 1800, 1200, 1000, 500]
    }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 饼图
var myChart = echarts.init(document.querySelector('.contain .right'));
option = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
        {
            name: '品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿迪王'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart.setOption(option);
