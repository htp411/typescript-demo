<template>
  <article>
    <header>
      <h1>数据操作</h1>
      <ul>
        <li>查看</li>
        <li>抓取</li>
        <li>分析</li>
      </ul>
    </header>
    <section>
      <div class="oprator">
        <button
          :class="['cursor-point', disableUpdate ? 'disable' : '']"
          @click="handleUpdate"
        >
          更新数据
        </button>
        <button class="cursor-point" @click="handleLogout">退出</button>
      </div>
      <div class="echarts">
        <dl class="filter" @click="handleFilter">
          <dt>显示条数</dt>
          <dd :class="[filter === '24' ? 'active' : '']">24</dd>
          <dd :class="[filter === '60' ? 'active' : '']">60</dd>
          <dd :class="[filter === '全部' ? 'active' : '']">全部</dd>
        </dl>
        <echarts :options="echartOptions" v-if="isShow" />
      </div>
    </section>
  </article>
</template>
<script>
import Echarts from '@/components/echarts/echarts.vue'
import { getData, updateData } from '@/api/getData'
import { echartOptions } from '@/utils/config'
import { parseTime } from '@/utils/time'
import { removeToken } from '@/utils/auth'
export default {
  components: {
    Echarts
  },
  data() {
    return {
      disableUpdate: false,
      echartOptions,
      isShow: false,
      filter: '24'
    }
  },
  mounted() {
    getData(24)
      .then(({ data }) => {
        this.setEchartsOption(data)
      })
      .catch(({ code, errMsg }) => {
        if (code === 401) {
          this.$notify({
            content: '用户身份过期，即将跳转登录页~',
            btn: 'x',
            type: 'info',
            autoClose: 1500
          })
          const timer = setTimeout(() => {
            this.handleLogout()
          }, 1500)
        } else {
          this.$notify({
            content: errMsg || '服务器错误',
            btn: 'x',
            type: 'danger',
            autoClose: 500
          })
        }
      })
  },
  methods: {
    setEchartsOption(data) {
      const { date, series } = this.parseData(data)
      this.echartOptions.series = series
      this.echartOptions.xAxis.data = date
      this.isShow = true
    },
    handleFilter(event) {
      if (event.target.tagName !== 'DD') return
      const count = event.target.innerText
      this.isShow = false
      this.filter = count
      getData(parseInt(count))
        .then(({ data }) => {
          this.setEchartsOption(data)
          this.$notify({
            content: '切换显示条数OK~',
            btn: 'x',
            type: 'info'
          })
        })
        .catch(err => {
          this.$notify({
            content: err.errMsg || '操作失败!',
            btn: 'x',
            type: 'danger'
          })
        })
    },
    handleUpdate(event) {
      if (this.disableUpdate) return
      this.disableUpdate = true
      this.isShow = false
      event.target.innerText = `等待10秒`
      this.filter = '24'
      updateData()
        .then(() => {
          return getData(24)
        })
        .then(({ data }) => {
          this.setEchartsOption(data)
          this.$notify({
            content: '更新成功~',
            btn: 'x',
            type: 'success'
          })
        })
        .catch(err => {
          this.$notify({
            content: err.errMsg || '操作失败!',
            btn: 'x',
            type: 'danger'
          })
        })
      let restTime = 9
      let interval = setInterval(() => {
        if (restTime < 1) {
          this.disableUpdate = false
          event.target.innerText = `更新数据`
          clearInterval(interval)
          interval = null
        } else {
          event.target.innerText = `等待${restTime}秒`
        }
        restTime--
      }, 1000)
    },
    parseData(data) {
      const colors = ['#19CAAD', '#F4606C', '#A0EEE1', '#ECAD9E', '#BEEDC7']
      const series = []
      const date = []
      data[0].data.forEach((item, index) => {
        !series[index] ? (series[index] = {}) : ''
        series[index].name = item.title
        series[index].type = 'line'
        series[index].smooth = true
        series[index].data = []
        series[index].lineStyle = {
          width: 3
        }
        series[index].itemStyle = {
          borderWidth: 6,
          color: colors[index]
        }
      })
      data.forEach(({ data, time }) => {
        date.push(parseTime(new Date(+time)))
        data.forEach((d, i) => {
          series[i].data.push(d.count)
        })
      })
      return { date, series }
    },
    handleLogout() {
      removeToken()
      this.$store.commit('setToken', '')
      this.$notify({
        content: 'bye bye ~',
        btn: 'x',
        type: 'danger',
        autoClose: 300
      })
      const timer = setTimeout(() => {
        this.$router.push('/login')
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
article {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  header {
    margin-top: 20px;
    letter-spacing: 3px;
    h1 {
      font-size: 2rem;
      font-weight: 400;
    }
    ul {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      li {
        list-style: none;
        font-size: 1.25rem;
        padding-right: 20px;
        color: #666;
        &::after {
          display: inline-block;
          content: '/';
          margin-left: 20px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
  }
  section {
    .echarts {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-top: 10px;
      div {
        width: 1200px;
        height: 600px;
      }
      .filter {
        width: 1200px;
        height: 24px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        dt {
          font-size: 1.5rem;
          color: Salmon;
          padding-bottom: 4px;
          width: 100px;
          text-align: left;
        }
        dd {
          display: flex;
          align-items: center;
          margin-right: 20px;
          margin-left: 10px;
          cursor: pointer;
          &.active {
            &::before {
              background-color: rgb(255, 109, 121);
            }
          }
          &::after {
            content: '条';
          }
          &:last-child {
            &::after {
              content: '';
            }
          }
          &::before {
            display: inline-block;
            content: '';
            height: 10px;
            width: 10px;
            border-radius: 50%;
            margin-right: 5px;
            border: 4px solid #beedc7;
            background-color: rgba(244, 96, 108, 0.1);
          }
        }
      }
    }
    button {
      border: none;
      width: 120px;
      height: 40px;
      background-color: #56cb8f;
      margin: 20px;
      color: #fff;
      border-radius: 3px;
      font-size: 1.25rem;
      transition: width 0.3s;
      outline: none;
      &.disable {
        background-color: #4c9c84;
        cursor: not-allowed;
        &:hover {
          background-color: #4c9c84;
          width: 120px;
        }
      }
      &:hover {
        background-color: #56cb8f;
        width: 140px;
      }
    }
  }
}
</style>
