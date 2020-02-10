<template>
  <div class="container">
      article
  </div>
</template>

<script type="text/javascript">
export default {
    name: 'app-article',
    created () {
      this.$http.get('articles').then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
        
      })
    }
}
</script>

<style scoped lang="less" >
</style>
