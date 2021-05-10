<template>
    <div id="pictures">
        <input type="file" accept="image/*" @change="chooseImg" />
        <div class="my-img">
            <img :src="imgSrc" alt="" srcset="" id="myimg"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pictures',
    data() {
        return {
            imgSrc: '',
        };
    },
    methods: {
        chooseImg(val){
            /**
             * 1.首先通过input标签的change事件拿到选择的文件对象
             */
            const fileList = val.target.files;
            const file = fileList[0];//这里假设只选择一个文件
            /**
             * 2.读取文件转成img标签元素,先new出来一个img和fileReader的实例，通过fileReader的 readAsDataURL这个api，
             * 来读取图片文件，其返回值是一个编码后的base64的字符串，然后将这个字符串赋值给img的src属性上，这样就完
             * 成了图片文件到 HTMLImageElement的转化。
             */
            const img = new Image()
            const reader = new FileReader()// 读取文件资源
            const _this = this;
            reader.readAsDataURL(file);
            reader.onload = function(e){
                console.log(e, 'e');
                img.src = e.target.result
                console.log(img, '000');
                _this.imgSrc = e.target.result
                const { width: originWidth, height: originHeight } = img
                const myImg = document.querySelector("#myimg");
                console.log(window.getComputedStyle(img).height, 'getComputedStyle');
                console.log(window.getComputedStyle(myImg).height, 'getComputedStylemyimg');
                console.log(originHeight, 'originHeight');
                console.log(originWidth, 'originWidth');
            }
        }
    },
};
</script>