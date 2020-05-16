<template>
  <section>
    <form rol="form">
      <div class="form-row">
        <input
          name="password"
          id="password"
          type="password"
          autocomplete="off"
          placeholder="输入密码"
          v-model="password"
        />
      </div>
      <div class="form-row remenber">
        <div class="check-box cursor-point" @click="handleRemenber">
          <i class="check-icon" v-show="isRemenber" />
        </div>
        <span>记住我</span>
        <span class="foget-pass cursor-point" @click="handleforgetPass"
          >忘记密码</span
        >
      </div>
      <div class="form-row submit">
        <button type="submit" class="cursor-point" @click.prevent="handleLogin">
          登录
        </button>
      </div>
      <p class="cursor-point">没有账号？立即注册</p>
    </form>
  </section>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'login',
  data() {
    return {
      password: '',
      isRemenber: false
    }
  },
  methods: {
    handleLogin() {
      console.log(this.password, this.isRemenber)
      login(this.password, this.isRemenber).then(res => console.log(res))
    },
    handleRemenber() {
      this.isRemenber = !this.isRemenber
    },
    handleforgetPass(event) {
      event.target.innerText = '密码：123456'
      const timer = setTimeout(() => {
        event.target.innerText = '忘记密码'
        if (timer) clearTimeout(timer)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  width: 320px;
  padding: 100px 80px;
  header {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    font-size: 1.5rem;
    border-bottom: 1px solid #cfcfcf;
  }
  form {
    margin-top: 20px;
    .form-row {
      height: 40px;
      margin: 10px 0;
      &.submit {
        margin-top: 40px;
      }
      &.remenber {
        display: flex;
        align-items: center;
        .check-box {
          height: 24px;
          width: 24px;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
        .check-icon {
          display: inline-block;
          width: 14px;
          height: 8px;
          border-bottom: 3px solid #666;
          border-left: 3px solid #666;
          margin-left: 4px;
          transform: rotate(-45deg);
        }
        span {
          margin-left: 10px;
          font-size: 1.25rem;
          &.foget-pass {
            flex: 1;
            text-align: right;
            color: #a0a0a0;
            &:hover {
              color: #666;
            }
          }
        }
      }
      & > input {
        height: 40px;
        width: 100%;
        border-radius: 3px;
        padding: 0 10px;
        border: 0.5px solid #a0a0a0;
        font-size: 1.25rem;
        color: #a0a0a0;
        outline: none;
        &:hover {
          border: 1px solid #909090;
        }
      }
      button {
        background-color: #56cb8f;
        color: #fff;
        font-size: 1.25rem;
        border: none;
        border-radius: 5px;
        width: 100%;
        height: 40px;
        outline: none;
        &:hover {
          background-color: #53c48a;
        }
      }
    }
    p {
      color: #a0a0a0;
      text-align: center;
      &:hover {
        color: #666;
      }
    }
  }
}
</style>
