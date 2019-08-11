<template lang="html">
<section class="menu-content">
  <Menu ref="menu" width="auto" theme="dark" accordion :class="menuitemClasses" :active-name="activeName" :open-names="openNames">
    <template v-for="menuItem in permission_routes">
      <template v-if="menuItem.meta.show">

        <template v-if="menuItem.children">
         <Submenu v-if="menuItem.meta.show" :name="menuItem.path" :key="menuItem.path">
            <template slot="title">
              <span class="i-layout-menu-side-title-icon">
                <Icon :size="20" :type="menuItem.meta.icon" />
              </span>
              <span class="i-layout-menu-side-title-text">
                {{menuItem.meta.title}}
              </span>
            </template>
            <MenuItem v-for="itemChild in menuItem.children" :name="`${menuItem.path}/${itemChild.path}`" :key="`${menuItem.path}/${itemChild.path}`" :to="`${menuItem.path}/${itemChild.path}`">
              {{itemChild.meta.title}}
            </MenuItem>
          </Submenu>
        </template>

        <template v-else>
          <MenuItem :name="menuItem.path" :key="menuItem.path" :to="menuItem.path">
            <span class="i-layout-menu-side-title-icon">
              <Icon :size="20" :type="menuItem.meta.icon" />
            </span>
            <span class="i-layout-menu-side-title-text">
              {{menuItem.meta.title}}
            </span>
          </MenuItem>
        </template>

      </template>
    </template>
  </Menu>
</section>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'SlideMenu',
  props: {
    isCollapsed: Boolean
  },
  data () {
    return {
      activeName: '',
      openNames: []
    }
  },
  computed: {
    ...mapGetters('permission', ['permission_routes']),
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  created () {
    // 高亮与展开
    this.activeName = this.$route.path
    this.openNames[0] = this.$route.matched[1].path
    this.$nextTick(() => {
      // 手动触发高亮与展开
      this.$refs.menu.updateOpened()
      this.$refs.menu.updateActiveName()
    })
  }
}
</script>
<style scoped lang="less">
.menu-content {
  padding-top: 65px;
}
.menu-icon{
  transition: all .3s;
}
.i-layout-menu-side-title-icon {
    display: inline-block;
    width: 24px;
    height: 26px;
    line-height: 21px;
    vertical-align: middle;
    text-align: center;
    margin-right: 8px;
    i {
      margin-right: 0!important;
    }
}
.ivu-menu-vertical {
  .ivu-menu-item, .ivu-menu-submenu {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: all .2s ease-in-out;
  }
  .ivu-menu-item {
    height: 52px;
    line-height: 52px;
    padding: 0 15px;
  }
  /deep/.ivu-menu-submenu-title {
    height: 52px;
    line-height: 52px;
    padding: 0px 15px!important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /deep/.ivu-menu-submenu-title-icon {
    right: 10px;
  }
}
</style>
