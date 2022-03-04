<template>
    <div id="slot2">
        <a-table
            :columns="columnsData"
            :data-source="tableData"
            bordered
        >
             <template
                v-for="col in columnsData"
                :slot="col.dataIndex"
                slot-scope="text, record"
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
                        <a-select
                            style="width: 84px"
                            v-model="record.statusObj[col.key]"
                            :disabled="col.disabled"
                            @change="handleChange"
                        >
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
// 模拟接口获得表头活动的数据:
const tableHeadListXhr = [
    {
        businessName: "test1029-12",
        businessType: 10,
        id: "031677c8-3ce1-4711-919d-814dec0e8eb4",
        percentCompleteStr: "1/2",
        required: 1
    },
    {
        businessName: "我的作业001",
        businessType: 5,
        id: "832fdf61-c00a-4e86-92a6-5cb748ba7daa",
        percentCompleteStr: "1/2",
        required: 1
    },{
        businessName: "大叔大婶",
        businessType: 0,
        id: "c244ea00-740c-4fc8-94fe-56b1d1ce23c9",
        percentCompleteStr: "1/2",
        required: 1
    }
]
// 模拟接口获得表格人员以及完成情况的数据:
const tableDataXhr = [
    {
        member: {
            fullName: "sr2",
            id: "a20a7b61-c944-4c31-8bd2-a13d57c80359",
            name: "sr2"
        },
        classStudentActivityProgresses: [
            {
                activityName: 'test1029-12',
                businessType: 10,
                classActivityId: "031677c8-3ce1-4711-919d-814dec0e8eb4",
                finishStatus: 0,
                memberId: "a20a7b61-c944-4c31-8bd2-a13d57c80359"
            },
            {
                activityName: '我的作业001',
                businessType: 5,
                classActivityId: "832fdf61-c00a-4e86-92a6-5cb748ba7daa",
                finishStatus: 1,
                memberId: "a20a7b61-c944-4c31-8bd2-a13d57c80359"
            },
            {
                activityName: '大叔大婶',
                businessType: 0,
                classActivityId: "c244ea00-740c-4fc8-94fe-56b1d1ce23c9",
                finishStatus: 0,
                memberId: "a20a7b61-c944-4c31-8bd2-a13d57c80359"
            },
        ],
        id: "0a1cf4ac-2f51-4211-ab09-88b2db887a29"
    },
    {
        member: {
            fullName: "y03",
            id: "5671dfd8-5f23-489a-b1e0-633837a0a0d4",
            name: "y03"
        },
        classStudentActivityProgresses: [
            {
                activityName: 'test1029-12',
                businessType: 10,
                classActivityId: "031677c8-3ce1-4711-919d-814dec0e8eb4",
                finishStatus: 1,
                memberId: "5671dfd8-5f23-489a-b1e0-633837a0a0d4"
            },
            {
                activityName: '我的作业001',
                businessType: 5,
                classActivityId: "832fdf61-c00a-4e86-92a6-5cb748ba7daa",
                finishStatus: 0,
                memberId: "5671dfd8-5f23-489a-b1e0-633837a0a0d4"
            },
            {
                activityName: '大叔大婶',
                businessType: 0,
                classActivityId: "c244ea00-740c-4fc8-94fe-56b1d1ce23c9",
                finishStatus: 1,
                memberId: "5671dfd8-5f23-489a-b1e0-633837a0a0d4"
            },
        ],
        id: "192da82e-329f-45b5-8813-26050d633e4b"
    }
]
const MapactivityType = new Map([[0, '面授'], [10, '直播'], [5, '作业']]);
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
                    key: 0,
                    label: '未完成'
                }
            ],
            tableData: [],
            columnsData: [],
        }
    },
    methods: {
        getColumns(){
            const initList = [
                {
                    // title: (
                    //     <div class="headerCell">
                    //         <div class="after">活动</div>
                    //         <div class="before">学员</div>
                    //     </div>
                    // ),
                    title: '学员/活动',
                    dataIndex: 'name',
                    key: 'name',
                },
            ]
            const tableHeadList = tableHeadListXhr.map((item) => {
                const obj={};
                const typename = MapactivityType.get(item.businessType);
                obj.title = `【${typename}】${item.businessName}`;
                obj.dataIndex = item.id;
                obj.key = item.id;
                obj.slots = {
                    title: 'customTitle'
                };
                obj.scopedSlots = {customRender: item.id};
                obj.children = [
                    {
                        title: item.percentCompleteStr,
                        dataIndex: item.id,
                        key: item.id,
                        slots: {title: 'customTitle'},
                        scopedSlots: {customRender: item.id}
                    }
                ];
                if (item.businessType !== 0 && item.businessType !== 11) {
                    this.$set(obj, 'disabled', true)
                } else {
                    this.$set(obj, 'disabled', false)
                }
                return obj;
            });
            const columns = initList.concat(tableHeadList);
            console.log(columns, '1111111')
            this.columnsData = columns;
        },
        getData(){
            const data = tableDataXhr.map((item) => {
                const obj={};
                obj.name = `${item.member.fullName}(${item.member.name})`;
                obj.key = item.id;
                //遍历 classStudentActivityProgresses 给学员对应的活动添加完成状态，绑定到活动id
                obj.statusObj = {};
                const classStudentActivityProgresses = item.classStudentActivityProgresses;
                // 如果都未完成，classStudentActivityProgresses 为 null
                // 学员的某个活动没有进度时（也是未完成），classStudentActivityProgresses 里面不含这个活动对象
                // 因此先将所有的活动的完成情况都设置为未完成
                tableHeadListXhr.forEach(eve => { //此时不能从classStudentActivityProgresses中逐个拿到每个活动的id,可以从表头列表拿
                    obj.statusObj[eve.id] = 0;
                })
                // 如果 classStudentActivityProgresses 不为 null说明产生了进度，将有进度的完成状态设置为对应的状态
                // 则 有进度的做了对应修改，可能为1也可能为0；而没有进度的因为不在列表中，仍然为0
                if (classStudentActivityProgresses !== null) {
                    classStudentActivityProgresses.forEach((every) => {
                        obj.statusObj[every.classActivityId] = every.finishStatus;
                    });
                }
                return obj;
            });
            console.log(data, '22222222')
            this.tableData = data;
        },
        handleChange(val){
            console.log(val)
        }
    },
    created() {
        this.getColumns();
        this.getData();
    },
}
</script>
<style lang="less">
     
  .headerCell {
    // 画三角形
    border-top: 43px rgb(250 250 250) solid;
    /*上边框宽度等于表格第一行行高*/
    width: 0px;
    /*让容器宽度为0*/
    height: 0px;
    /*让容器高度为0*/
    border-left: 237px #f8fbff solid;
    /*左边框宽度等于表格第一行第一格宽度*/
    position: relative;
    .afer {
      position: absolute;
      top: -36px;
      left: -70px;
      width: 60px;
      color: #666666;
    }
    .before {
      position: absolute;
      top: -24px;
      left: -226px;
      width: 60px;
      color: #666666;
    }
    // 伪元素画分割线
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 237px;
      top: -140px;
      left: -120px;
      background-color: rgb(239 239 239);
      display: block;
      transform: rotate(-80deg);
    }
  }
</style>