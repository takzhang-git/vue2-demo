<template>
    <div class="message" v-if="visible">
        <div class="toast">
            <h2>{{title}}</h2>
            <div class="toast-main">
                <p class="main-text">{{content}}</p>
            </div>
            <div class="btn">
                <span class="btn1" @click="clickLeft">{{btnTextLeft}}</span>
                <span class="btn2" @click="clickRight">{{btnTextRight}}</span>
            </div>
        </div>
        <div class="bg-cover"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
        }
    },
}
</script>
<style lang="less" scoped>
    .message{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        .toast{
            position: absolute;
            width: 270px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 102;
            background: #fff;
            border-radius: 2px;
            & > h2{
                padding: 20px 0 10px 0;
                font-size: 14px;
                line-height: 20px;
                color: #000;
                text-align: center;
                font-weight: normal;
            }
            .toast-main{
                padding: 0 15px 20px;
                word-break: break-all;
                .main-text{
                    font-size: 14px;
                    color: #000;
                    line-height: 20px;
                    text-align: justify;
                }
            }
            .btn{
                text-align: center;
                font-size: 14px;
                line-height: 40px;
                display: flex;
                .btn1{
                    flex: 1;
                    color: #606060;
                    cursor: pointer;
                }
                .btn2{
                    flex: 1;
                    color: rgb(24, 209, 107);
                    cursor: pointer;
                }
            }
        }
        .bg-cover{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #979797;
            box-sizing: border-box;
            z-index: 101;
        }
    }
</style>