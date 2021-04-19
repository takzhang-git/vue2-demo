<template>
    <div id="prop-comp-deco">
        <div><el-input v-model="age" /></div>
        <div><el-input v-model="name"/></div>
        <div><el-input v-model="getIsOrMarry"/></div>
    </div>
</template>
<script>
    import {Vue, Component, Prop } from 'vue-property-decorator';
    @Component
    export default class propOfCompoDeco extends Vue{
        @Prop(Number) age
        @Prop({default: '张升', type: String}) name
        @Prop(Boolean) isOrMarry
        get getIsOrMarry(){
            return this.isOrMarry? '是' : '否';
        }
    }
</script>
<style lang="less">
#prop-comp-deco{
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
}
</style>