<template>
    <div id="function-test">
        this is a function test page
    </div>
</template>
<script>
import {editFun} from './utils/edit';
export default {
    data() {
        return {
            people: [
                {
                    "name": "张升",
                    "age": 26,
                    "job": "前端"
                },
                {
                    "name": "汪洋",
                    "age": 25,
                    "job": "UI设计"
                },
            ],
            newPeople: [],
        }
    },
    methods: {
        setPeople(data, edit){
            return edit(data);
        }
    },
    mounted() {
        this.newPeople = this.setPeople(this.people, editFun);
        console.log(this.people, 'people');
        console.log(this.newPeople, 'newPeople');
    },
}
</script>