<template>
    <div id="v-slot">
        <slot :people="user"></slot>
        <slot name="sports" :sports="sports"></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: [
                {name: 'Jack', sex: 'boy', age: 17},
                {name: 'Jone', sex: 'girl', age: 20},
                {name: 'Tom', sex: 'boy', age: 21}
            ],
            sports: [
                {sub: '篮球', level: 4},
                {sub: '乒乓球', level: 2},
                {sub: '羽毛球', level: 10}
            ],
        }
    },
}
</script>
<style lang="less">
    
</style>