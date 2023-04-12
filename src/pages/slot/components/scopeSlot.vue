<template>
    <div id="scope-slot">
        <div class="el-table">
            <el-table :data="user">
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="sex" label="性别" />
                <el-table-column prop="age" label="年龄">
                    <template slot-scope="{row, column, $index}">
                        {{ row.age > 18 ? '成年' : '未成年' }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <slot :people="user" :animal="animals" />
        <slot name="teachersHeros" :teachers="teachers" :heros="heros" />
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
                animals: [
                    {zhonglei: '大象', wheight: 200},
                    {zhonglei: '狮子', wheight: 100},
                    {zhonglei: '猴子', wheight: 60},
                ],
                heros: [
                    {name: '李白', job: '打野'},
                    {name: '鲁班七号', job: '射手'},
                    {name: '王昭君', job: '法师'},
                ],
                teachers: [
                    {name: '李英', age: 56},
                    {name: '胡云', age: 38},
                    {name: '张志豪', age: 43},
                ],
            }
        },
    }
</script>
<style lang="less">

</style>