<template>
  <div id="mixins">
    <ul class="student-list">
      <li v-for="item in realList" :key="item.name">
        <span>{{item.name}}:</span>
        <span>{{item.age}}</span>
      </li>
    </ul>
    <el-button type='primary' @click="addStudent">+新增学生</el-button>
    <el-button type='cancel' @click="reset">重置</el-button>
  </div>
</template>
<script>
import { mixin1 } from '../../common/js/mixins/mxin1';
export default {
  name: "mixins",
  mixins: [mixin1],
  data() {
    return {
      
    };
  },
  computed: {
    realList(){
      return this.studentList;
    },
  },
};
</script>