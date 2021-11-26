<template>
    <div id="filter">
        <el-table
            :data="students"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="成绩">
                  <template slot-scope="scope">
                     <span>{{consoleLog(scope)}}</span>
                     <span>{{scope.row.status | mapStatus}}</span>
                 </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            students: [
                {
                    name: '李梅',
                    status: '不及格',
                },
                {
                    name: '张飒',
                    status: 'good',
                },
                {
                    name: '陈红',
                    status: 'common',
                },
                {
                    name: '陈红',
                    status: '未及格',
                },
            ]
        }
    },
    methods: {
        consoleLog(scope){
            console.log('scope', scope);
        }
    },
}
</script>