<template lang="html">
  <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
    <MenuItem name="1-1">
      <Icon type="ios-navigate"></Icon>
      <span>Option 1</span>
    </MenuItem>
    <MenuItem name="1-2">
      <Icon type="search"></Icon>
      <span>Option 2</span>
    </MenuItem>
    <MenuItem name="1-3">
      <Icon type="settings"></Icon>
      <span>Option 3</span>
    </MenuItem>
  </Menu>
  <!-- <section style="color: white">
    {{permission_routes}}
  </section> -->
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  props: {
    isCollapsed: Boolean
  },
  name: 'SlideMenu',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('permission', ['permission_routes']),
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  }
}
</script>
