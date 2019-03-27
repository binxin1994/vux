<template>
  <div class="about">
    <div class="box"></div>
    <h1>This is an about page</h1>

    <group>
      <x-switch title="123" v-model="show"></x-switch>
      <x-header :left-options="{backText: ''}">
        龙哥
        <a slot="right">Feedback</a>
      </x-header>
    </group>
    <group>
      <cell title="123" value="$t('Protected')" @click.native="onClick"></cell>
      <cell title="213" is-link>
        <img
          slot="icon"
          width="40px"
          height="40"
          style="display:block;margin-right:5px;"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
        >
      </cell>
      <cell title="$t('Show Me')" @click.native="showModule" is-link></cell>
    </group>
    <group>
      <!-- <calendar :readonly="readonly" v-model="demo1" title="$t('Basic Usage')" disable-past placeholder="placeholder" @on-show="log('show')" @on-hide="log('hide')"></calendar> -->
    </group>
  </div>
</template>
<script>
import { AlertModule, Group, XSwitch, XHeader, Cell } from "vux";
export default {
  data() {
    return {
      show: false,
      readonly: false,
      demo1: ""
    };
  },
  components: {
    Group,
    XSwitch,
    XHeader,
    Cell
  },
  methods: {
    showModule() {
      AlertModule.show({
        title: "VUX is Cool",
        content: "23",
        onShow() {
          console.log("Module: I'm showing");
        },
        onHide() {
          console.log("Module: I'm hiding now");
        }
      });
    },
    log(str) {
      console.log(str);
    },
    onChange(val) {
      console.log("on change", val);
    }
  },
  created() {
    // this.$vux.alert.show({
    //   title: "VUX is Cool",
    //   content: "Do you agree?",
    //   onShow() {
    //     console.log("Module: I'm showing");
    //   },
    //   onHide() {
    //     console.log("Module: I'm hiding now");
    //   }
    // });
    // 显示文字
    this.$vux.toast.text("登陆成功", "center");
  }
};
</script>
<style lang="less">
.box {
  height: 50px;
  background: red;
}
.weui-cell {
  height: 30px;
}
</style>


