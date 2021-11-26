<template>
    <div id="render-map">
        <ul class="for-items" v-if="list.length > 0">
            <li v-for="item in list" :key="item.index">
                {{item.name}}
            </li>
        </ul>
        <p v-else>{{'No items found'}}</p>
        <item-list :data="list"></item-list>
    </div>
</template>
<script>
import { Vue } from 'vue-property-decorator';
//在render函数中可以使用if/else和map来实现template中的v-if和v-for。
Vue.component('item-list', {
    props: ['data'],
    render(h,params) {
        if (this.data.length > 0) {
            return h('ul', {
                class: 'for-items',
            },this.data.map( (item) => h('li',{
                // domProps: {
                //     innerHTML: item.name,
                // }
                style: {
                    margin: '20px',
                    fontSize: '18px',
                    color: 'pink',
                    background: 'green',
                    height: '20px',
                    lineHeight: '20px',
                    width: '200px'
                }
            }, [
                h('span', {
                    domProps: {
                        innerHTML: item.name + ':',
                    }
                }),
                h('span', {
                    domProps: {
                        innerHTML: item.age,
                    }
                })
            ])))
        } else {
            return h('p', {
                domProps: {
                    innerHTML: 'No items found'
                }
            })
        }
    },
})
export default {
    data(){
        return {
            list: [
                {name: '张三', age: 20},
                {name: '张三是的', age: 33},
                {name: '张三房贷', age: 77},
                {name: '张三大幅度', age: 332},
            ],
        }
    },
}
</script>
<style lang="less">
    
</style>