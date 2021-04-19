<template>
    <div id="render">
        <custom-element></custom-element>
    =========================================================================================================
        <renderMap></renderMap>
    =========================================================================================================
        <v-model-render></v-model-render>
    </div>
</template>
<script>
import { Vue } from 'vue-property-decorator';
import renderMap from './components/renderMap';
import vModelRender from './components/vModelRender';
Vue.component('custom-element', {
    render(h, params){
        return h('div', {
            style: {
                border: '2px solid pink',
                background: '#888',
            }
        }, [
            h('span', {
                style: {
                    width: '200px',
                    height: '200px',
                    background: 'pink',
                },
                domProps: {
                    innerHTML: '测试render',
                }
            }),
            h('el-date-picker', {
                props: {
                    type: 'date',
                    placeholder: '选择日期吧啊哈哈'
                }
            }),
            h('el-button', {
                props: {
                    type: 'primary',
                    round: 'round',
                },
                domProps: {
                    innerHTML: '按钮哈哈'
                }
            }),
        ])
    }
})
export default {
    components: {
        renderMap,
        vModelRender,
    }
}
</script>
<style lang="less">
    
</style>