<template>
    <div id="slot-name">
        <div class="a-box">
            <slot name="header"/>
            <el-form class="middle-content">
                <el-input v-model="input1"></el-input>
                <el-date-picker v-model="date"></el-date-picker>
            </el-form>
            <slot name="footer" />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input1: 120,
            date: '',
        }
    },
}
</script>
<style lang="less">
    .a-box{
        width: 90%;
        border: deeppink dashed;
    }
    .middle-content{
        border: 3px solid red;
        padding: 10px;
    }
</style>