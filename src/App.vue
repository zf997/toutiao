<template>
  <div id="app">
    <router-view />
    <h1>尅吗</h1>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
