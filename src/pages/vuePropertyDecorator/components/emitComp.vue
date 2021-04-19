<template>
    <div id="emit-comp">
        <div class="emit-group">
            <span>emit测试</span>
            <el-input v-model="num2"/>
            <el-button @click="add" type="warning">+</el-button>
            <el-button @click="min" type="warning">-</el-button>
        </div>
    </div>
</template>
<script>
    import {Vue, Component, Emit} from 'vue-property-decorator';
    @Component
    export default class emitComp extends Vue{
        num2 = 10
        @Emit('change')
        add(){
            this.num2 += 10;
        }
        min(){
            this.num2 -= 10;
        }
    }
</script>
<style lang="less">
    #emit-comp{
        .emit-group{
            display: flex;
            justify-content: space-around;
        }
    }
</style>