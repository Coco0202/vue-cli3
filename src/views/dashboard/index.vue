<template lang="html">
  <section class="box">
    <svg-icon icon-class="icon-import" class-name="svg-grey" />
    <svg-icon icon-class="icon-senior-screen" class-name="svg-grey" />
    <svg-icon icon-class="form" class-name="svg-green" />
    <svg-icon icon-class="eye" class-name="svg-blue" />
    <svg-icon icon-class="eye-open" class-name="svg-grey" />
    <svg-icon icon-class="icon-add" class-name="svg-green" />
    <br><br>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br><br>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </section>
</template>
<script>
export default {
  name: 'dashboard'
}
</script>
<style scoped lang="less">
.box {
  padding-top: 200px;
  height: 1200px;
}
</style>
