<template>
    <div id="vue-class-component">
        <el-row>
            <el-col :span="8">
                <el-input
                    v-model="num1"
                ></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" style="min-width:100px" @click="addNum1">+</el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" style="min-width:100px" @click="plus">^2</el-button>
            </el-col>
        </el-row>
        <formComp
         class="form-comp"
         :propMessage="msg"
         :propNum="num1"
         />
         <mixinComp />
    </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import formComp from './components/formCompo';
import mixinComp from './components/mixinCompo';

@Component({
    components: {
        formComp,
        mixinComp,
    }
})
export default class MyComp extends Vue {
    num1 = 0
    addNum1(){
        this.num1 ++;
    }
    plus() {
        this.num1 = Math.pow(this.num1,2);
    }
    msg = '提交成功'
    created() {
     this.$nextTick(() => {
         this.num1 ++;
     }); 
    }
    // mounted() {
    //  this.num1 ++;   
    // }
}
</script>
<style lang="less" scoped>
    #vue-class-component{
        .form-comp{
            padding: 20px;
        }
    }
</style>