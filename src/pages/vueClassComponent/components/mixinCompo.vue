<template>
    <div id="mixin-compo">
        <el-input v-model="time" class="mixin-input"/>
    </div>
</template>
<script>
    import Component, { mixins } from 'vue-class-component';
    import MyMixin from './mixin';
    @Component
    export default class mixinCompo extends mixins(MyMixin){
        time = ''
        mounted() {
         this.time = this.mixinValue;   
        }
    }
</script>
<style lang="less">
    #mixin-compo{
        .mixin-input{
            .el-input__inner{
                background: lightcoral;
                width: 50%;
            }
        }
    }
</style>