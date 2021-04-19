<template>
    <div id="form-com">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="form-compo-input">
            <el-input v-model="computedNum"></el-input>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    @Component({
        props: {
            propMessage: {
                type: String,
                default: '',
            },
            propNum: {
                type: Number,
                default: undefined,
            },
        }
    })
    export default class formCom extends Vue {
        formInline = {
            user: '',
            region: ''
        };
        onSubmit() {
            this.$alert('确认提交吗', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
                this.$message({
                type: 'info',
                message: this.propMessage,
                });
            }
            });
        }
        get computedNum(){
            return -this.propNum;
        }
    }
</script>