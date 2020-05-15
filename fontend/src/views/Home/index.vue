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
      <div class="porator">
        <button>更新数据</button>
        <button>退出</button>
      </div>
      <div class="e-charts"></div>
    </section>
  </article>
</template>
<style lang="scss" scoped>
article {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  header {
    margin-top: 100px;
    letter-spacing: 3px;
    h1 {
      font-size: 2rem;
      font-weight: 400;
    }
    ul {
      display: flex;
      justify-content: center;
      margin-top: 30px;
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
      &:hover {
        background-color: #53c48a;
        width: 140px;
      }
    }
  }
}
</style>
