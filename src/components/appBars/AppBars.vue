<template>
    <nav>
       <ToolBar></ToolBar>
       <Navigation></Navigation>
    </nav>
</template>

<script>
import ToolBar from '@/components/appBars/bars/ToolBar'
import Navigation from '@/components/appBars/bars/Navigation'

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

<style lang="scss" scoped>

</style>
