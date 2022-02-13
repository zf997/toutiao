<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        name="mobile"
        maxlength="11"
        type="number"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        :rules="userFormRules.code"
        name="code"
        maxlength="6"
        type="number"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            slot="button"
            round
            size="small"
            type="default"
            native-type="button"
            @click="send"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSm } from '../../Api/login'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 13911111111
        code: '246810' // 246810
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 登录发送请求
    async onSubmit () {
      // 获取登录信息
      const user = this.user
      // 登录提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })

      try {
        const res = await login(user)
        this.$toast.success('登陆成功')
        console.log('登陆成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登陆失败')
          console.log('登录失败', err)
        }
      }
    },

    // 发送验证码
    async send () {
      try {
        await this.$refs.loginFrom.validate('mobile')
        console.log('手机验证码发送成功')
      } catch (err) {
        return console.log('发送验证失败', err)
      }
      // 通过验证显示倒计时
      this.isCountDownShow = true

      // 获取验证码信息
      try {
        const res = await sendSm(this.user.mobile)
        this.$toast('获取验证码成功')
        console.log('获取验证码成功', res)
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送信息太频繁')
          console.log('发送失败', err)
        } else {
          this.$toast('发送信息太频繁')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
