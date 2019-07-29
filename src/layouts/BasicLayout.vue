<template lang="html">
  <div class="layout">
    <Layout>
      <!-- 左侧菜单 start -->
      <Sider class="slide-menu" collapsible :collapsed-width="78" v-model="isCollapsed">
        <SlideMenu :isCollapsed="isCollapsed" />
      </Sider>
      <!-- 左侧菜单 end -->
      <!-- header start -->
      <Header class="header"></Header>
      <!-- header end -->
      <Layout>
        <!-- main start -->
        <Content class="main">
          <div class="content">
            <transition name="page-transition">
              <router-view />
            </transition>
          </div>
        </Content>
        <!-- main start -->
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SlideMenu from '@/components/Menu/SlideMenu'
export default {
  name: 'BasicLayout',
  components: {
    SlideMenu
  },
  data () {
    return {
      isCollapsed: false
    }
  }
}
</script>
<style scope lang="less">
.layout-con{
  height: 100%;
  width: 100%;
}
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  background: #fff;
  box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
}
.main {
  padding: 60px 10px 10px;
  .content {
    height: calc(100% - 60px);
  }
}
.slide-menu.ivu-layout-sider {
  position: fixed;
  z-index: 2;
  height: 100%;
}
.menu-item {
  span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
}
.collapsed-menu {
  span {
    width: 0px;
    transition: width .2s ease;
  }
  i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
}
</style>
