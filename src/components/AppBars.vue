<template>
    <nav>
       <ToolBar></ToolBar>
       <Navigation></Navigation>
    </nav>
</template>

<script>
import ToolBar from '@/components/appBars/ToolBar'
import Navigation from '@/components/appBars/Navigation'

export default {
  name: 'AppBars',
  components: {
    ToolBar,
    Navigation
  },
  data: () => ({
    drawerState: null
  }),
  methods: {

  }
}
</script>

<style scoped>

</style>
