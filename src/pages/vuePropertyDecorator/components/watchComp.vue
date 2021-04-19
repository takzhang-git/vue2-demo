<template>
    <div id="watch-comp">
        <div class="watch-number"><span>watch子组件</span><input v-model="num1" /></div>
        <div class="watch-number"><span>watch子组件</span><input v-model="num2" /></div>
    </div>
</template>
<script>
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
    @Component
    export default class WatchComp extends Vue{
        @Prop(Number) num1
        num2 = null
        @Watch('num1')
        changeNum1(newVal, oldVal){
            this.num2 = Math.pow(newVal, 2)
        }
    }
</script>