<template>
  <v-container>
    <v-row>
      <v-col>
        <h2><v-icon>mdi-format-list-bulleted-square</v-icon> Lista de Estados</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field v-model="nome" label="Pesquise por nome do estado"></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn @click="searchTitle" color="primary">
          Pesquisa por nome
        </v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-data-table :headers="headers" :items="estados" disable-pagination :hide-default-footer="true"
                        no-data-text="Nenhum estado encontrado!">
            <template v-slot:[`item.createdAt`]="{ item }">
              {{item| formatData}}
            </template>
            <template v-slot:[`item.updatedAt`]="{ item }">
              {{item| formatData}}
            </template>


            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editEstado(item.id)">mdi-pencil</v-icon>
              <v-icon small @click="deleteEstado(item._id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-btn v-if="estados.length > 0" small color="error" @click="removeAllEstados">
          Excluir todos os registros
        </v-btn>
      </v-col>
      <estado-add @atualiza-lista="refreshList"/>

    </v-row>


    <!--    <v-row v-else  align="center" justify="center">-->
    <!--      <div class="text-center">-->
    <!--        <h1 class="display-2 font-weight-bold mb-3">-->
    <!--          Cadastre um novo estado.-->
    <!--        </h1>-->

    <!--        <p class="subheading font-weight-regular">-->
    <!--          Clique no botão abaixo para cadastrar um novo estado.-->
    <!--        </p>-->
    <!--        <estado-add @atualiza-lista="refreshList"/>-->
    <!--        <v-btn elevation="2">Cadastrar novo estado</v-btn>-->

    <!--      </div>-->
    <!--    </v-row>-->

  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import EstadoService from "../services/EstadoService";
import EstadoAdd from "./EstadoAdd";
import moment from 'moment'

export default {
  name: "estados-list",
  components: {EstadoAdd},
  data() {
    return {
      estados: [],
      nome: "",
      headers: [
        {text: "Nome do estado", align: "start", sortable: true, value: "nome"},
        {text: "Abreviação", align: "start", sortable: true, value: "abreviacao"},
        {text: "Data de Criação", sortable: true, value: "createdAt"},
        {text: "Data de Alteração", value: "updatedAt", sortable: true},
        {text: "Ação", value: "actions", sortable: false},
      ],
    };
  },
  methods: {
    retrieveEstados() {
      EstadoService.getAll().then((response) => {
        this.estados = response.data.map(this.getDisplayEstado);
        console.log(response.data);
      }).catch((e) => {
        console.log(e);
      });
    },

    refreshList() {
      this.retrieveEstados();
    },

    removeAllEstados() {
      EstadoService.deleteAll().then((response) => {
        console.log(response.data);
        this.refreshList();
      }).catch((e) => {
        console.log(e);
      });
    },

    searchTitle() {
      EstadoService.findByTitle(this.nome)
          .then((response) => {
            this.estados = response.data.map(this.getDisplayEstado);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    editEstado(id) {
      this.$router.push({name: "estado-details", params: {id: id}});
    },

    deleteEstado(id) {
      Swal.fire({
        title: 'Excluir o estado?',
        text: 'Deseja realmente excluir o estado selecionado?',
        showDenyButton: true,
        confirmButtonText: `Sim`,
        denyButtonText: `Não`,
      }).then((result) => {
        if (result.isConfirmed) {
          EstadoService.delete(id).then(() => {
            Swal.fire('Estado excluído com sucesso!', '', 'success')
            this.refreshList();
          }).catch((e) => {
            console.log(e);
          });
        } else if (result.isDenied) {
          Swal.fire('Operação cancelada', '', 'info')
        }
      })


    },

    getDisplayEstado(estado) {
      return {
        _id: estado._id,
        nome: estado.nome.length > 30 ? estado.nome.substr(0, 30) + "..." : estado.nome,
        abreviacao: estado.abreviacao.length > 30 ? estado.abreviacao.substr(0, 30) + "..." : estado.abreviacao,
        createdAt: estado.createdAt,
        updatedAt: estado.updatedAt,
      };
    },
  },
  filters: {
    // Filter definitions
    formatData(value) {
      if (value) {
        return moment(value).format('DD/MM/YYYY');
      }
    }
  },
  mounted() {
    this.retrieveEstados();
  },
};
</script>

<style scoped>

</style>