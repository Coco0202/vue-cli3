<template lang="html">
  <div class="v-layout">
    <Layout>
      <!-- 左侧菜单 start -->
      <Sider class="slide-menu" width="150" collapsible :collapsed-width="50" v-model="isCollapsed">
        <SlideMenu v-show="!isCollapsed" :isCollapsed="isCollapsed" :collapsed-width="50" />
        <SlideMenuShrink v-show="isCollapsed" :isCollapsed="isCollapsed" :collapsed-width="50"></SlideMenuShrink>
      </Sider>
      <!-- 左侧菜单 end -->
      <Layout>
        <!-- main start -->
        <Content class="v-layout-main" :class="{'v-layout-collapsed': isCollapsed}">
          <!-- header start -->
          <Header class="v-layout-header"></Header>
          <!-- header end -->
          <div class="v-layout-content">
            <div class="v-layout-main-content">
              <transition name="page-transition">
                <router-view />
              </transition>
            </div>
          </div>
        </Content>
        <!-- main start -->
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SlideMenu from '@/components/Menu/SlideMenu'
import SlideMenuShrink from '@/components/Menu/SlideMenuShrink.vue'
export default {
  name: 'BasicLayout',
  components: {
    SlideMenu,
    SlideMenuShrink
  },
  data () {
    return {
      isCollapsed: false
    }
  }
}
</script>
<style scope lang="less">
.slide-menu.ivu-layout-sider {
  position: fixed;
  z-index: 4;
  height: 100%;
}
.v-layout-header {
  width: 100%;
  height: 50px;
  position: fixed;
  background: #fff;
  box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
}
.v-layout-main {
  background-color: #f3f5f7;
  padding-left: 150px;
  transition: all 0.2s ease-in-out;
  .v-layout-content {
    box-sizing: border-box;
    padding: 85px 20px 20px;
    min-height: ~"calc(100vh - 0px)";
  }
}
.v-layout-collapsed {
  padding-left: 50px;
}
.v-layout-main-content {
  background-color: #FFF;
}
</style>
