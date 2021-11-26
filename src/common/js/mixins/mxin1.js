export const mixin1 = {
    data() {
        return {
            studentList: [
                {
                    name: 'mark',
                    age: 20,
                },
                {
                    name: 'judy',
                    age: 21,
                },
                {
                    name: 'hellen',
                    age: 22,
                },
            ],
            needAddList: [
                {
                    name: 'add1',
                    age: 23,
                },
                {
                    name: 'add2',
                    age: 24,
                },
            ],
        }
    },
    methods: {
        addStudent(){
            const nameList1 = this.studentList.map(item => item.name);
            const nameList2 = this.needAddList.map(item => item.name);
            for (let i = 0; i < nameList1.length; i++) {
                const elei = nameList1[i];
                const lookItem = nameList2.find(item => item == elei);
                if (lookItem) {
                    this.$message.error('有重复元素');
                    return false;
                }
            }
            this.studentList = this.studentList.concat(this.needAddList);
        },
        reset(){
            this.studentList = this.studentList.filter(item => item.name !== 'add1' && item.name !== 'add2');
        },
    },
};