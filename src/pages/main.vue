<template>
  <s-index id="app">
    <router-view></router-view>
  </s-index>
</template>

<script type="text/babel">
  import Grail from '@/components/Grail'
  export default {
    name: 'home',
    components: {
      's-index': Grail
    }
  }
</script>
