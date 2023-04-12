<template>
    <div id="slot-vue">
        <p>无名插槽</p>
        <slotNoName>
            <div>{{ msg }}</div>
        </slotNoName>
        -----------------------------------------------------------------------------------------------------------
        <p>有名插槽</p>
        <slotName>
            <template slot="header">
                <div class="slot-header">
                    <div class="block">
                        <span class="demonstration">有默认值</span>
                        <el-color-picker v-model="color1" />
                    </div>
                    <el-carousel height="150px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small">{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </template>
            <template slot="footer">
                <div class="footer-slot">
                    <el-timeline>
                        <el-timeline-item
                            v-for="(activity, index) in activities"
                            :key="index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :timestamp="activity.timestamp">
                            {{ activity.content }}
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </template>
        </slotName>
        <p>作用域插槽 slot-scope</p>
        <scopeSlot>
            <!-- 这里的prop不是关键字也不重要，可以随意取名字，它是一个对象，包含所有绑定在slot上的属性 -->
            <!-- 因为slot-scope对应的是prop这个对象，因此当知道prop里面有哪些字段时，就可以采用解构的方式
            直接拿到对应的字段 -->
            <!-- 无名的slot的对应用法 -->
            <template slot-scope="prop">
                <div v-for="(item, index) in prop.people" :key="item.name">
                    {{ item.name }}
                </div>
                <div v-for="(item, index) in prop.animal" :key="index">
                    {{ `${item.zhonglei}-${item.wheight}` }}
                </div>
            </template>
            <!-- 有名的slot的对应用法 -->
            <!-- <template slot="teachersHeros" slot-scope="prop">
                <div v-for="item in prop.teachers" :key="item.name">{{ `${item.name}==${item.age}` }}</div>
            </template> -->
            <template slot="teachersHeros" slot-scope="{heros}">
                <div v-for="item in heros" :key="item.name">{{ `王者荣耀-${item.name}` }}</div>
            </template>
        </scopeSlot>
        --------------------------------------------------------------------------------------------------------------
        <p>v-slot的使用</p>
        <p>v-slot是将原来的  slot="slot名称"和slot-scope="接收参数名"  的写法合到了一起的写法</p>
        <vSlot>
            <!-- 一个不带 name 的 <slot> 出口会带有隐含的名字“default”，使用时可以简化为v-slot="prop“。 -->
            <!-- v-slot: slot名称 = "接收参数名" -->
            <!-- v-slot是将原来的  slot="slot名称"和slot-scope="接收参数名"  的写法合到了一起的写法 -->
            <!-- v-slot: 可以简写为#但是无名的slot需要保留default -->
            <template v-slot:default="prop">
                <div v-for="(item, index) in prop.people" :key="item.name">
                    {{ item.name + '哈哈' }}
                </div>
            </template>
            <!-- <template v-slot:sports="{sports}">
                <el-popover
                    placement="top"
                    title="标题"
                    width="200"
                    trigger="hover"
                    :content="sports.map(item => `${item.sub}--${item.level}`).join('\n')">
                    <el-button slot="reference">hover激活</el-button>
                </el-popover>
            </template> -->
            <template #sports="{sports}">
                <el-popover
                    placement="top"
                    title="标题"
                    width="200"
                    trigger="hover"
                    :content="sports.map(item => `${item.sub}--${item.level}`).join('\n')">
                    <el-button slot="reference">hover激活</el-button>
                </el-popover>
            </template>
        </vSlot>
    </div>
</template>
<script>
    import slotNoName from './components/slotOfNoname';
    import slotName from './components/slotOfName';
    import scopeSlot from './components/scopeSlot';
    import vSlot from './components/vSlot';
    export default {
        components: {
            slotNoName,
            slotName,
            scopeSlot,
            vSlot,
        },
        data() {
            return {
                msg: '父组件插入的值',
                color1: '',
                activities: [{
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                }, {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large'
                }, {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
                }]
            }
        },
    }
</script>
<style lang="less">
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>