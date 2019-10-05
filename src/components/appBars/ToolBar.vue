<template>
    <v-app-bar flat app>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text>Link 1</v-btn>
            <v-btn text>Link 2</v-btn>
            <v-btn text>Link 3</v-btn>
        </v-toolbar-items>

        <template v-if="$vuetify.breakpoint.smAndUp">
            <v-btn icon>
                <v-icon>mdi-export-variant</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script>
export default {
  name: 'ToolBar',
  data: () => ({
  })
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/toolBar';
</style>
