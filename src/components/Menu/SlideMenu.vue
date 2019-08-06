<template lang="html">
<section class="menu-content">
  <Menu ref="menu" width="auto" theme="dark" accordion :class="menuitemClasses" :active-name="activeName" :open-names="openNames">
    <template v-for="menuItem in permission_routes">
      <template v-if="menuItem.meta.show">

        <template v-if="menuItem.children">
         <Submenu v-if="menuItem.meta.show" :name="menuItem.path" :key="menuItem.path">
            <template slot="title">
               <Icon :type="menuItem.meta.icon" />
              {{menuItem.meta.title}}
            </template>
            <MenuItem v-for="itemChild in menuItem.children" :name="`${menuItem.path}/${itemChild.path}`" :key="`${menuItem.path}/${itemChild.path}`" :to="`${menuItem.path}/${itemChild.path}`">
              {{itemChild.meta.title}}
            </MenuItem>
          </Submenu>
        </template>

        <template v-else>
          <MenuItem :name="menuItem.path" :key="menuItem.path" :to="menuItem.path">
            <Icon :type="menuItem.meta.icon" />
            {{menuItem.meta.title}}
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
.rotate-icon{
  transform: rotate(-90deg);
}
.menu-item {
  span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
    i {
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
    }
  }
}
.collapsed-menu {
  span {
    width: 0px;
    transition: width .2s ease;
    i {
      transform: translateX(5px);
      transition: font-size .2s ease .2s, transform .2s ease .2s;
      vertical-align: middle;
      font-size: 22px;
    }
  }
}
</style>
