<!-- 分享 -->
<template>
  <div class="container share">
    <!-- 换一张按钮 -->
    <div @click="shareChange" class="share_change" v-show="changeShow">换一张</div>
    <!-- 背景列表 -->
    <div class="mark" :class="markShow?'':'mark_position_left'">
      <p>--请选择生成图片--</p>
      <div class="mark_item" v-for="(item,index) in imgUrls" :key="index" @click="getBgImg(item)">
        <img :src="item.imgurl" alt>
      </div>
    </div>
    <!-- 生成图片的DOM -->
    <div class="share_box" ref="box">
      <div class="img-box">
        <!-- 背景图 -->
        <img class="shareBg" @load="bgImgload" :src="bgImg" alt>
        <!-- 二维码 -->
        <div class="shareQr" :class="imgUrls[(pid > 0 ? pid : 1) - 1].isClass">
          <img @load="qrcodeLoad" :src="qrCodeUrl" alt>
        </div>
      </div>
    </div>
    <!-- 存放合成的图片 -->
    <div class="share-img" id="shareImg"></div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import Canvas2Image from "../utils/canvas2image.js";
import { qrcanvas } from "qrcanvas";

export default {
  data() {
    return {
      changeShow: false,
      markShow: true,
      qrCode: false,
      pid: 0,
      imgUrls: [
        { pid: 1, imgurl: require("@/assets/2.jpg"), isClass: "shar1" },
        { pid: 1, imgurl: require("@/assets/logo.png"), isClass: "shar1" }
      ],
      bgImg: "",
      qrCodeUrl: "",
      invitationCode: "",
      timer: null
    };
  },
  created() {
    //邀请码
    this.invitationCode = this.$route.query.invitationCode;
    //获取二维码
    this.getQrCodeBase64();
  },
  mounted() {},

  methods: {
    //换一张
    shareChange() {
      this.changeShow = !this.changeShow;
      document.getElementById("shareImg").innerHTML = "";
      this.markShow = true;
    },
    //获取二维码
    getQrCodeBase64() {
      let that = this;
      // that.$http.get('user/getInviteQrCode',{
      //     parmas:{
      //         code:that.invitationCode
      //     }
      // }).then(res => {
      //     if(res && res.data.code == 0){
      //         that.qrCodeUrl = res.data.data;
      //     }
      // })
      var canvas1 = qrcanvas({
        data: decodeURIComponent("www.baidu.com"),
        size: 128
      });
      let temp = Canvas2Image.convertToImage(canvas1)
      that.qrCodeUrl = temp.src;
    },
    //获取背景图
    getBgImg(e) {
      let that = this;
      that.changeShow = true;
      that.markShow = false;
      if (e.pid == that.pid) {
        //前一张加载过
        that.bgImgload();
      } else {
        //未加载过
        that.pid = e.pid;
        that.bgImg = e.imgurl;
      }
    },
    //二维码是否渲染完毕
    qrcodeLoad() {
      this.qrCode = true;
    },
    //背景图加载完回调
    bgImgload() {
      // this.$indicator.open({
      //     text: '正在生成图片...',
      //     spinnerType: 'fading-circle'
      // });
      this.creatImg();
    },
    //生成图片
    creatImg() {
      let that = this;
      if (that.qrCode) {
        // 已经生成二维码
        clearInterval(this.timer);
        let element = that.$refs.box;
        html2canvas(element, { allowTaint: true, taintTest: false }).then(
          function(canvas) {
            let temp = Canvas2Image.convertToImage(canvas);

            document.getElementById("shareImg").appendChild(temp);
            // that.$indicator.close();
            // that.$toast({
            //     message: '图片已生成，长按保存分享给你的好友吧',
            //     position: 'middle',
            //     duration: 2000
            // });
          }
        );
      } else {
        that.timer = setInterval(() => {
          that.creatImg();
        }, 300);
      }
    }
  },
  destroyed() {
    // this.$indicator.close();
    clearInterval(this.timer);
  }
};
</script>

<style lang="less">
.share {
  width: 100%;
  height: calc(100% - 0.6rem);
  background: #fff;
  .share_change {
    font-size: 14px;
    padding: 0.04rem 0.1rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 100px;
    position: fixed;
    top: 1.5rem;
    right: 0.1rem;
  }
  .mark {
    width: 96%;
    height: 100%;
    margin: 0 auto;
    overflow-y: scroll;
    p {
      font-size: 14px;
      text-align: center;
      margin: 0.1rem 0;
      color: #888888;
    }
    .mark_item {
      width: 40%;
      margin: 0 5%;
      margin-bottom: 0.2rem;
      box-shadow: 1px 1px 1px 2px #ccc;
      float: left;
    }
  }
  .mark_position_left {
    position: fixed;
    top: 0;
    left: -100%;
  }
  .share_box {
    width: 100%;
    position: fixed;
    top: 0;
    left: -100%;
  }
  .img-box {
    position: relative;
    .shareBg {
      z-index: 3;
    }
    .shareQr {
      position: absolute;
      z-index: 5;
    }
    .shar1 {
      width: 0.49rem;
      height: 0.49rem;
      top: 6rem;
      left: 0.86rem;
    }
    .shar2 {
      width: 0.49rem;
      height: 0.49rem;
      top: 5.7rem;
      right: 0.24rem;
    }
    .shar3 {
      width: 0.75rem;
      height: 0.75rem;
      top: 4.88rem;
      right: 0.21rem;
    }
    .shar4 {
      width: 0.66rem;
      height: 0.66rem;
      top: 4.98rem;
      left: 0.17rem;
    }
    .shar5 {
      width: 0.6rem;
      height: 0.6rem;
      top: 5.05rem;
      left: 0.09rem;
    }
    .shar6 {
      width: 0.6rem;
      height: 0.6rem;
      top: 5.1rem;
      left: 1.56rem;
    }
    .shar7 {
      width: 0.64rem;
      height: 0.64rem;
      top: 4.69rem;
      left: 1.12rem;
    }
    .shar8 {
      width: 0.75rem;
      height: 0.75rem;
      top: 2.73rem;
      left: 1.5rem;
    }
    .shar9 {
      width: 0.65rem;
      height: 0.65rem;
      top: 2.72rem;
      left: 1.54rem;
    }
  }
}
</style>

