<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer app v-model="drawer" dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
        <div class="pa-4">
          <img alt="Logo Zoox Smart Data" src="../src/assets/logo-zoox-branca.svg" width="85%">
        </div>
        <v-list>
          <v-list-item v-for="([icon, text, url], i) in items" :key="i" link :to="url">
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Teste Zoox Smart Data</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view/>
      </v-main>
    </v-app>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/estados">Estados</router-link> |
      <router-link to="/cidades">Cidades</router-link>
    </div>

  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      ['mdi-home', 'Home', '/'],
      ['mdi-format-list-bulleted-square', 'Estados', 'estados'],
      ['mdi-city-variant', 'Cidades', 'cidades'],
    ],
  }),
}
</script>
