<template>
    <div id="vmodel-render">
        <zl-input :nameSelf="name" @inputSelf="val => name = val"></zl-input>
    </div>
</template>
<script>
import {Vue} from 'vue-property-decorator';
/**父组件给子组件传了一个name,子组件用nameSelf接收
 * 父组件监听一个名为inputSelf的事件，当原生input触发input事件时，子组件发射（触发）inputSelf事件，
 * 并将input的值value携带。父组件监听到inputSelf事件后，执行相应代码块，将携带过来的value赋值给name,
 * 从而改变了父组件的name的值，此时父组件把name又传给了子组件，于是子组件的nameSelf也被改变
 * 于是：组件<zl-input></zl-input>的值永远保持和输入的值一致，实现了类似于v-model的效果
 */
Vue.component('zl-input', {
    render(h, params) {
        var _this = this
        return h('input', {
            domProps: {
                value: _this.nameSelf
            },
            on: {
                input: function (e) {
                    _this.$emit('inputSelf', e.target.value)
                }
            }
        })
    },
    props: {
        nameSelf: String
    }
})
export default {
    data() {
        return {
            name: '张三'
        }
    },
}
</script>
<style lang="less">
    
</style>