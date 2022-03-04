<template>
    <div id="slot2">
        <a-table :columns="columns" :data-source="data" bordered>
            <template
                v-for="col in columns"
                :slot="col.dataIndex"
                slot-scope="text, record, index"
            >
                <a-form-model
                    :key="col.key"
                    :model="record"
                    ref="record"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item prop='doneStatus'>
                        <a-select style="width: 84px" v-model="record.statusObj[col.key]">
                            <a-select-option v-for="item in selectOps" :key="item.key" :value="item.key">
                                {{item.label}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-form-model>
            </template>
        </a-table>
    </div>
</template>
<script>

export default {
    data() {
        return {
            rules: {
                doneStatus:[
                    {required: false, message: '此项必填', trigger: 'blur'}
                ],
            },
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            selectOps: [
                {
                    key: 1,
                    label: '已完成'
                },
                {
                    key: 2,
                    label: '未完成'
                }
            ],
            columns: [
                {
                    key: '031677c8-3ce1-4711-919d-814dec0e8eb4',
                    dataIndex: '031677c8-3ce1-4711-919d-814dec0e8eb4',
                    title: '活动1面授',
                    slots: {title: 'customTitle'},
                    scopedSlots: {customRender: '031677c8-3ce1-4711-919d-814dec0e8eb4'},
                    children: [
                        {
                            key: '031677c8-3ce1-4711-919d-814dec0e8eb4',
                            dataIndex: '031677c8-3ce1-4711-919d-814dec0e8eb4',
                            title: '分组1',
                            slots: {title: 'customTitle'},
                            scopedSlots: {customRender: '031677c8-3ce1-4711-919d-814dec0e8eb4'},
                        }
                    ]
                },
                {
                    key: '832fdf61-c00a-4e86-92a6-5cb748ba7daa',
                    dataIndex: '832fdf61-c00a-4e86-92a6-5cb748ba7daa',
                    title: '活动2课程',
                    slots: {title: 'customTitle'},
                    scopedSlots: {customRender: '832fdf61-c00a-4e86-92a6-5cb748ba7daa'}
                },
            ],
            data: [
                {
                    key: '001',
                    statusObj: {
                        '031677c8-3ce1-4711-919d-814dec0e8eb4': 1,
                        '832fdf61-c00a-4e86-92a6-5cb748ba7daa': 2,
                    }
                },
                {
                    key: '002',
                    statusObj: {
                        '031677c8-3ce1-4711-919d-814dec0e8eb4': 2,
                        '832fdf61-c00a-4e86-92a6-5cb748ba7daa': 2,
                    }
                }
            ],
        }
    },
    methods: {
        
    },
}
</script>
<style lang="less">
</style>