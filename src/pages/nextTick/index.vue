<template>
    <section>
        <div ref="hello">
            <h1>{{ value }}</h1>
        </div>
        <el-button type="danger" @click="get">点击</el-button>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                value: 'beautiful girl'
            };
        },
        methods: {
            get() {
                this.value = '漂亮女孩';
                console.log(555);
                console.log(this.$refs['hello']);
            }
        },
        mounted() {
            console.log(333);
            console.log(this.$refs['hello']);
            this.$nextTick(() => {
                console.log(444);
                console.log(this.$refs['hello']);
            });
        },
        created() {
            console.log(111);
            console.log(this.$refs['hello']);
            this.$nextTick(() => {
                console.log(222);
                console.log(this.$refs['hello']);
            });
        }
    }
</script>