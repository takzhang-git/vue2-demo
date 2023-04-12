<template>
    <div id="slot-noname">
        <div class="button-list">
            {{ '子组件的内容' }}
            <el-button type="warning">提交</el-button>
            <el-button type="danger">保存</el-button>
        </div>
        <!-- 当父组件希望在子组件中间放入标签或其他组件时，子组件必须使用slot插槽来接收，否则无法生效 -->
        <slot />
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="less">

</style>