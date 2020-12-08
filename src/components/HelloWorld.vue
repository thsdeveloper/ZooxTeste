<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-avatar size="200">
          <v-img :src="require('../assets/avatarThiago.jpeg')" class="my-3" contain/>
        </v-avatar>
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Olá, bem vindo ao Teste ZooxSmartData
        </h1>

        <p class="subheading font-weight-regular">
          Meu nome é <strong>Thiago Pereira</strong>. Seja bem vindo ao teste de nivelamento da empresa ZooxSmartData.
          Meu maior obejtivo é ter fornecido neste projeto soluções para que eu possa integrar a equipe de desenvolvedores
          da ZooxSmartData.
          <a href="https://github.com/thsdeveloper?tab=repositories" target="_blank">Meu Repositório no GitHub</a>
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          O que utilizamos?
        </h2>

        <v-row justify="center">
          <a v-for="(next, i) in whatsNext" :key="i" :href="next.href" class="subheading mx-3" target="_blank">
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col  no-gutters>
        <h2 class="headline font-weight-bold mb-3">
          Como subir o ambiente?
        </h2>

        <v-row justify="center">
          <p>Execute no seu terminal os comando abaixo para subir o ambiente de desenvolvimento NodeJs.</p>
        </v-row>
        <v-row justify="center">
           <code>node server.js</code>
        </v-row>
         <v-row justify="center">
           <code>npm run serve</code>
        </v-row>
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Vuetfy',
        href: 'https://vuetifyjs.com/en/',
      },
      {
        text: 'VueRouter',
        href: 'https://router.vuejs.org/',
      },
      {
        text: 'Vue Axios',
        href: 'https://br.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html',
      },
      {
        text: 'vue-sweetalert2',
        href: 'https://github.com/avil13/vue-sweetalert2',
      },
      {
        text: 'MongooseJs',
        href: 'https://mongoosejs.com/',
      },
      {
        text: 'Body-parser',
        href: 'https://www.npmjs.com/package/body-parser',
      },
       {
        text: 'Node ExpressJs',
        href: 'https://expressjs.com/pt-br/',
      },
      {
        text: 'Momentjs',
        href: 'https://momentjs.com/',
      },
    ],
  }),
}
</script>
