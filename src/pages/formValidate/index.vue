<template>
    <div id="formValidate">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item
                label="数字限制"
                prop="numberBetween"
                :rules="filterRules({
                    type: 'numberBetween', minNum: 10, maxNum: 20, required: true, message: '此项必填'
                })"
            >
                <el-input v-model="ruleForm.numberBetween"></el-input>
            </el-form-item>
            <el-form-item
                label="长度限制"
                prop="lengthLimit"
                :rules="filterRules({
                    max: 20, maxMess: '不超过20个字', required: true, message: '此项必须填写'
                })"
            >
                <el-input v-model="ruleForm.lengthLimit"></el-input>
            </el-form-item>
            <el-form-item
                label="邮箱"
                prop="email"
                :rules="filterRules({
                    required: true, message: '邮箱必填',
                    type: 'email',
                })"
            >
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                numberBetween: '',
                lengthLimit: '',
                email: '',
            },
            rules: {
                name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
            },
        }
    },
}
</script>