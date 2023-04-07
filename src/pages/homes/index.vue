<template>
    <div id="home-wrap">
        <homeHeader />
        <el-table
            :data="getHeros"
        >
            <el-table-column
                prop="name"
                label="姓名"
                width="180" />
            <el-table-column
                prop="age"
                label="年龄"
                width="180" />
            <el-table-column
                prop="job"
                label="职业"
                width="180" />
            <el-table-column
                prop="skill"
                label="技能"
                width="180" />
        </el-table>
        <el-button
            @click="gotoVuex"
        >
            点击去vuex组件
        </el-button>
    </div>
</template>
<script>
    import homeHeader from './components/header';
    import { mapGetters } from 'vuex';
    export default {
        components: {
            homeHeader,
        },
        created() {
            this.getHero();
        },
        methods: {
            async getHero(){
                await this.$store.dispatch('FETCH_OF_HEROS').then((res) => {
                    console.log(res, 'res');
                    if (res.status === 200) {
                        //element-ui的提示
                        // this.$notify({
                        //     title: '提示你麻痹',
                        //     message: '你猜我是啥提示',
                        //     duration: 5000,
                        // });
                        this.$Message.info({
                            title: '提示你麻痹',
                            content: '接口调用成功，已拿到王者荣耀英雄数据',
                            btnTextLeft: '了解',
                            btnTextRight: '知道了，去vuex页面',
                            ok: () => {
                                this.$router.push({
                                    name: 'vuextest',
                                });
                            }
                        })
                    }
                })
            },
            gotoVuex(){
                this.$router.push({
                    name: 'vuextest',
                });
            },
        },
        computed: {
            ...mapGetters([
                'getHeros'
            ]),
        },
    }
</script>

<style lang="less">

</style>