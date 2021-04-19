<template>
  <div id="echarts">
    <div ref="zhuxingtu" class="zhuxingtu"></div>
    <div ref="zhexiantu" class="zhexiantu"></div>
  </div>
</template>
<script>
export default {
  created() {
    this.$nextTick(() => {
      const dom1 = this.$refs.zhuxingtu;
      const Echart1 = this.$echarts.init(dom1);
      Echart1.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
      const dom2 = this.$refs.zhexiantu;
      const Echart2 = this.$echarts.init(dom2);
      const option = {
        // color设置我们线条的颜色 注意后面是个数组
        color: ["black", "red", "green", "skyblue"],
        // 设置图表的标题
        title: {
          text: "折线图堆叠",
        },
        // 图表的提示框组件
        tooltip: {
          // 触发方式
          trigger: "axis",
        },
        // 图例组件
        legend: {
          // series里面有了 name值则 legend里面的data可以删掉
        },
        // 网格配置  grid可以控制线形图 柱状图 图表大小
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          // 是否显示刻度标签 如果是true 就显示 否则反之
          containLabel: true,
        },
        // 工具箱组件  可以另存为图片等功能
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        // 设置x轴的相关配置
        xAxis: {
          type: "category",
          // 是否让我们的线条和坐标轴有缝隙
          boundaryGap: false,
          data: ["星期一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        // 设置y轴的相关配置
        yAxis: {
          type: "value",
        },
        // 系列图表配置 它决定着显示那种类型的图表
        series: [
          {
            name: "邮件营销",
            type: "line",

            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",

            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",

            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",

            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      };
      Echart2.setOption(option);
    });
  },
};
</script>
<style lang="less">
.zhuxingtu {
  width: 500px;
  height: 500px;
  background: pink !important;
}
.zhexiantu {
  width: 550px;
  height: 550px;
  background: greenyellow !important;
}
</style>