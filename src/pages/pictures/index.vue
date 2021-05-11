<template>
  <div id="pictures">
    <input type="file" accept="image/*" @change="chooseImg" />
    <div class="my-img">
      <img :src="imgSrc" :width="imgWidth" :height="imgHeight"/>
    </div>
  </div>
</template>
<script>
//https://www.jb51.net/article/182078.htm JavaScript前端实现压缩图片功能
export default {
  name: "pictures",
  data() {
    return {
      imgSrc: "",
      imgWidth: '',
      imgHeight: '',
    };
  },
  methods: {
    chooseImg(val) {
      /**
       * 1.首先通过input标签的change事件拿到选择的文件对象
       */
      const fileList = val.target.files;
      const file = fileList[0]; //这里假设只选择一个文件
      console.log(file, 'fileSource');
      /**
       * 2.读取文件转成img标签元素,先new出来一个img和fileReader的实例，通过fileReader的 readAsDataURL这个api，
       * 来读取图片文件，其返回值是一个编码后的base64的字符串，然后将这个字符串赋值给img的src属性上，这样就完
       * 成了图片文件到 HTMLImageElement的转化。
       */
      const img = new Image();
      const reader = new FileReader(); // 读取文件资源
      const _this = this;
      reader.readAsDataURL(file);
      //等待图片加载完成后（在onload的回调内部）
      reader.onload = function (e) {
        img.src = e.target.result;//将文件对象的base64字符串赋值给刚刚创建的img的src
        _this.imgSrc = e.target.result;
        //由于异步问题，等待渲染一次以后再拿宽高
        _this.$nextTick(() => {
          //拿到转化后的img元素后，先取出该元素的宽高度，这个宽高度就是实际图片文件的宽高度
          const { width: originWidth, height: originHeight } = img;
          //然后定义一个最大限度的宽高度，如果超过这个限制宽高度，则进行等比例的缩放
          // 最大尺寸限制
          const maxWidth = 500, maxHeight = 500;
          // 需要压缩的目标尺寸
          let targetWidth = originWidth, targetHeight = originHeight;
          // 等比例计算超过最大限制时缩放后的图片尺寸
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > 1) {
              // 宽图片
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              // 高图片
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
          _this.imgWidth = targetWidth;
          _this.imgHeight = targetHeight;
          /**
           * 3. canvas压缩，核心步骤
           */
          //计算好将要压缩的尺寸后，创建canvas实例，设置canvas的宽高度为压缩计算后的尺寸，并将img绘制到上面
          // 创建画布
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          // 设置宽高度为等同于要压缩图片的尺寸
          canvas.width = targetWidth
          canvas.height = targetHeight
          context.clearRect(0, 0, targetWidth, targetHeight)
          //将img绘制到画布上
          context.drawImage(img, 0, 0, targetWidth, targetHeight)
        });
        // console.log(window.getComputedStyle(img).height, 'getComputedStyle');
      };
    },
  },
};
</script>