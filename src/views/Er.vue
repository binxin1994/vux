<!-- 分享图片生成 -->
<template>
  <div class="container">
    <div class="share-img">
      <img :src="imgUrl" alt="分享图" width="100%">
    </div>
    <div class="creat-img" ref="box">
      <img src="../assets/2.jpg" alt="分享背景图">
      <div id="qrcode" class="qrcode"></div>
      <div class="text">邀请码 111004</div>
    </div>
  </div>
</template>
 
<script>
import { qrcanvas } from "qrcanvas";
import html2canvas from "html2canvas";
import Canvas2Image from "../utils/canvas2image.js";

export default {
  data() {
    return {
      imgUrl: ""
    };
  },
  watch: {
    imgUrl(val, oldval) {
      console.log(val, oldval);
      //监听到imgUrl有变化以后 说明新图片已经生成 隐藏DOM
      this.$refs.box.style.display = "none";
    }
  },
  created() {
    let that = this;
    that.$nextTick(function() {
      //生成二维码
      var canvas1 = qrcanvas({
        data: decodeURIComponent("http://192.168.2.228:8081"),
        size: 128
      });
      canvas1.id = "cas";
      console.log(Canvas2Image, 23);
      document.getElementById("qrcode").innerHTML = "";

      let temp = Canvas2Image.convertToImage(canvas1);
      document.getElementById("qrcode").appendChild(temp);

      //合成分享图
      //   that.$indicator.open({
      //     text: "正在生成图片...",
      //     spinnerType: "fading-circle"
      //   });
    });
  },
  mounted() {
    var that = this;
    console.log(that.$refs.box);
    setTimeout(() => {
      html2canvas(that.$refs.box).then(function(canvas) {
        that.imgUrl = URL.createObjectURL(
          that.base64ToBlob(canvas.toDataURL())
        );
        that.imgUrl = canvas.toDataURL();
      });
    });
  },

  methods: {
    //base64转blob
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  }
};
</script>
<style lang='less' scoped>
.creat-img {
  img {
    z-index: 3;
  }
  .qrcode {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -64px;
    z-index: 5;
  }
  .text {
    position: absolute;
    top: 70%;
    left: 50%;
    margin-left: -64px;
    z-index: 5;
    font-size: 30px;
    color: red;
  }
}
</style>