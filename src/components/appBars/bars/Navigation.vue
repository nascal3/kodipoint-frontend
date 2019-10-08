<template>
    <v-navigation-drawer
            app
            v-model="drawer"
            width="185"
            :src="bg"
            clipped-left
            permanent
            dark
    >
        <v-list-item class="menu-logo-section" >
            <v-img class="menu-logo" :src="require('@/assets/images/kodiPoint_logo.png')"></v-img>
        </v-list-item>

        <v-list shaped dense>
            <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' }
    ],
    bg: 'src/assets/images/menu_bg.jpg'
  }),
  computed: {

  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/navigation';
</style>
