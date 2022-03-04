<template>
    <div id="home-header">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>头部</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="modalTip">提示</el-button>
            </div>
            <div v-for=" item in list" :key="item.id" class="text item">
                {{item.value}}
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    id: '001',
                    value: '李白',
                },
                {
                    id: '002',
                    value: '单图',
                },
                {
                    id: '003',
                    value: '娜可露露',
                }
            ],
        }
    },
    methods: {
        modalTip(){
            this.$Message.info({
                title: '提示',
                content: '提示1111111111111是',
                btnTextLeft: '取消',
                btnTextRight: '你麻痹',
            });
        },
    },
}
</script>