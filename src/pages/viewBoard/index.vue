<template>
    <div id="view-board">
        <header>
            <h1>可视化展板</h1>
            <div class="showTime"></div>
        </header>
        <section class="mainbox">
            <div class="column">
                <div class="panel bar">
                <h2>
                    柱状图-就业行业 <a href="javascript:;">2019</a>
                    <a href="javacript:;"> 2020</a>
                </h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
                </div>
                <div class="panel line">
                <h2>折线图-人员变化</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
                </div>
                <div class="panel pie">
                <h2>饼形图-年龄分布</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
                </div>
            </div>
            <div class="column">
                <div class="no">
                <div class="no-hd">
                    <ul>
                    <li>125811</li>
                    <li>104563</li>
                    </ul>
                </div>
                <div class="no-bd">
                    <ul>
                    <li>前端需求人数</li>
                    <li>市场供应人数</li>
                    </ul>
                </div>
                </div>
                <div class="map">
                <div class="chart"></div>
                <div class="map1"></div>
                <div class="map2"></div>
                <div class="map3"></div>
                </div>
            </div>
            <div class="column">
                <div class="panel bar1">
                <h2>柱状图-学习进度</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
                </div>
                <div class="panel line1">
                <h2>折线图-播放量</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
                </div>
                <div class="panel pie1">
                <h2>饼形图-地区分布</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import echarts from 'echarts';
import $ from 'jquery';
import flexible from './js/flexible';
import myMap from './js/myMap';
import { china, factory } from './js/china';
import { jiuyeHangye, renyuanBianhua, nianlingFenbu, xueXijindu, boFangliang, diquFenbu} from './js/index.js';
export default {
    data() {
        return {
            t: null,//定时器
        }
    },
    mounted() {
        flexible(window, document);
        this.time();
        // 柱状图 就业行业
        jiuyeHangye();
        // 折线图 人员变化
        renyuanBianhua();
        // 饼状图 年龄分布
        nianlingFenbu();
        // 柱状图 学习进度
        xueXijindu();
        //折线图 播放量
        boFangliang();
        // 饼状图 地区分布
        diquFenbu();
        china(window, factory);
        myMap();
    },
    methods: {
        time(){
            this.$nextTick(() => {
                clearTimeout(this.t); //清除定时器
                const dt = new Date();
                var y = dt.getFullYear();
                var mt = dt.getMonth() + 1;
                var day = dt.getDate();
                var h = dt.getHours(); //获取时
                var m = dt.getMinutes(); //获取分
                var s = dt.getSeconds(); //获取秒
                document.querySelector(".showTime").innerHTML =
                    "当前时间：" +
                    y +
                    "年" +
                    mt +
                    "月" +
                    day +
                    "-" +
                    h +
                    "时" +
                    m +
                    "分" +
                    s +
                    "秒";
                this.t = setTimeout(this.time, 1000); //设定定时器，循环运行
            });
        },
    },
}
</script>
<style lang="less">
@import './css/index.css';
</style>