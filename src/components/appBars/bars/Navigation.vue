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
                router :to="item.route"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="menu-items-text">{{ item.title }}</v-list-item-title>
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
      { title: 'Properties', icon: 'mdi-home-city', route: '/properties' },
      { title: 'Finance', icon: 'mdi-account', route: '/finance' }
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
