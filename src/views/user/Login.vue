<template lang="html">
  <Form class="login-form" ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="80">
    <FormItem label="用户名" prop="username">
      <Input v-model="formData.username" type="text" placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input v-model="formData.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations('permission', {
      setRole: 'SET_ROLE'
    }),
    ...mapActions('permission', {
      generateRoutes: 'generateRoutes'
    }),
    async handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitLogin()
        } else {}
      })
    },
    async submitLogin () {
      try {
        const {
          data
        } = await this.$api.login.login(this.formData)
        this.$Message.success('登录成功')
        localStorage.setItem('local_token', data.data.access_token)
        localStorage.setItem('local_role', data.data.role)
        // 存角色
        this.setRole(data.data.role)
        // 生成路由
        this.generateRoutes(data.data.role)
        // 动态添加路由
        this.$router.addRoutes(this.addRoutes)
        setTimeout(() => {
          this.$router.push({
            path: '/'
          })
        }, 500)
      } catch (err) {
        console.log(err)
      }
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  computed: {
    ...mapGetters('permission', {
      addRoutes: 'addRoutes',
      permission_routes: 'permission_routes'
    })
  }
}
</script>
<style scoped lang="less">
.login-form {
  width: 300px;
  margin: 0 auto;
  padding-top: 200px;
}
</style>
