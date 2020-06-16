<template>
    <nav>
       <ToolBar/>
       <Navigation @changePageTitle="setPageTitle" />
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
    drawerState: null,
    pageName: ''
  }),
  methods: {
    setPageTitle (title) {
      this.pageName = title
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
