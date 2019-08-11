<template>
<section class="menu-content">
  <template v-for="menuItem in permission_routes">
    <template v-if="menuItem.meta.show">
      <div style="text-align: center;" :key="menuItem.path">
        <Dropdown v-if="menuItem.children" transfer placement="right-start" :key="menuItem.path" @on-click="changeMenu" transfer-class-name="menu-dropdown">
          <Button type="text">
            <Icon :size="20" :color="iconColor" :type="menuItem.meta.icon"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <template v-for="itemChild in menuItem.children">
              <DropdownItem :name="itemChild.path" :key="itemChild.path" :selected="$route.name === itemChild.name">
                <span style="padding-left:10px;">
                  <router-link :to="{name: itemChild.name}">{{ itemChild.meta.title }}</router-link>
                </span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown v-else transfer placement="right-start" :key="menuItem.name" @on-click="changeMenu" transfer-class-name="menu-dropdown">
          <Button @click="changeMenu(menuItem.name)" type="text">
            <Icon :size="20" :color="iconColor" :type="menuItem.meta.icon"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem :name="menuItem.path" :key="menuItem.path" :select="$route.name === menuItem.name">
              <span style="padding-left:10px;">
                <router-link :to="{name: menuItem.name}">{{ menuItem.meta.title }}</router-link>
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </template>
</section>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'SlideMenuShrink',
  props: {
    menuList: {
      type: Array
    },
    iconColor: {
      type: String,
      default: 'white'
    },
    menuTheme: {
      type: String,
      default: 'darck'
    }
  },
  data () {
    return {
      activeName: ''
    }
  },
  computed: {
    ...mapGetters('permission', ['permission_routes'])
  },
  methods: {
    changeMenu (active) {
      this.$emit('on-change', active)
    }
  }
}
</script>
<style scoped lang="less">
.menu-content {
  padding-top: 65px;
}
.ivu-dropdown {
  width: 100%;
  height: 52px;
  line-height: 52px;
  overflow: hidden;
  .ivu-btn-text {
    width: 100%;
    height: 52px;
    border-radius: 0;
    &:hover, &.active {
      background-color: #0a2241;
    }
  }
}
.menu-dropdown {
  background-color: #0a2241;
  margin: 0;
}
.i-layout-menu-side.ivu-menu-dark {
  .ivu-menu-item-active {
    color: #FFF;
  }
}
.ivu-select-dropdown{
  background-color: #515a6e;
}
.ivu-dropdown-item-selected, .ivu-dropdown-item.ivu-dropdown-item-selected:hover {
  background-color: #0a2241;
  a {
    color: #FFF;
  }
}
</style>
