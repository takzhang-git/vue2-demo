<template>
    <div id="test-vuex">
        <el-table
            :data="autoData"
        >
            <el-table-column
                prop="name"
                label="姓名"
                width="180" />
            <el-table-column
                prop="age"
                label="年龄"
                width="180" />
            <el-table-column
                prop="job"
                label="职业"
                width="180" />
        </el-table>
        <el-input v-model="getCount" />
        <el-button @click="addCount">改变count的值</el-button>
    </div>
</template>
<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    export default {
        data() {
            return {
            }
        },
        methods: {
            ...mapActions({
                getStudentsAction: 'FETCH_OF_STUDENTS'
            }),
            async getStudents(){
                await this.getStudentsAction();
            },
            ...mapMutations({
                setCount: 'SET_COUNT'
            }),
            addCount(){
                this.setCount({addNum: 10});
            }
        },
        computed: {
            ...mapGetters({
                studentsData: 'getStudents',
                heros: 'getHeros',
                getCount: 'getCount',
            }),
            autoData(){
                return this.heros.length ? this.heros : this.studentsData;
            },
        },
        created() {
            this.getStudents();
        },
    }
</script>
<style lang="less">
</style>