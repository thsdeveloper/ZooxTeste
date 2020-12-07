<template>
  <v-container>
    <v-row>
     <v-col>
       <h2><v-icon>mdi-city-variant</v-icon> Lista de Cidades</h2>
     </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field v-model="nome" label="Pesquise por nome da cidade"></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn @click="searchTitle" color="primary">
          Pesquisa por nome
        </v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-data-table :headers="headers" :items="cidades" disable-pagination :hide-default-footer="true"
                        no-data-text="Nenhum cidade encontrado!">
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ item| formatData }}
            </template>
            <template v-slot:[`item.updatedAt`]="{ item }">
              {{ item| formatData }}
            </template>


            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editCidade(item.id)">mdi-pencil</v-icon>
              <v-icon small @click="deleteCidade(item._id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-btn v-if="cidades.length > 0" small color="error" @click="removeAllCidades">
          Excluir todos os registros
        </v-btn>
      </v-col>
      <cidade-add @atualiza-lista="refreshList"/>

    </v-row>


    <!--    <v-row v-else  align="center" justify="center">-->
    <!--      <div class="text-center">-->
    <!--        <h1 class="display-2 font-weight-bold mb-3">-->
    <!--          Cadastre um novo cidade.-->
    <!--        </h1>-->

    <!--        <p class="subheading font-weight-regular">-->
    <!--          Clique no botão abaixo para cadastrar um novo cidade.-->
    <!--        </p>-->
    <!--        <cidade-add @atualiza-lista="refreshList"/>-->
    <!--        <v-btn elevation="2">Cadastrar novo cidade</v-btn>-->

    <!--      </div>-->
    <!--    </v-row>-->

  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import CidadeService from "../services/CidadeService";
import CidadeAdd from "./CidadeAdd";
import moment from 'moment'

export default {
  name: "cidades-list",
  components: {CidadeAdd},
  data() {
    return {
      cidades: [],
      nome: "",
      headers: [
        {text: "Nome do cidade", align: "start", sortable: true, value: "nome"},
        {text: "Abreviação", align: "start", sortable: true, value: "abreviacao"},
        {text: "Data de Criação", sortable: true, value: "createdAt"},
        {text: "Data de Alteração", value: "updatedAt", sortable: true},
        {text: "Ação", value: "actions", sortable: false},
      ],
    };
  },
  methods: {
    retrieveCidades() {
      CidadeService.getAll().then((response) => {
        this.cidades = response.data.map(this.getDisplayCidade);
        console.log(response.data);
      }).catch((e) => {
        console.log(e);
      });
    },

    refreshList() {
      this.retrieveCidades();
    },

    removeAllCidades() {
      CidadeService.deleteAll().then((response) => {
        console.log(response.data);
        this.refreshList();
      }).catch((e) => {
        console.log(e);
      });
    },

    searchTitle() {
      CidadeService.findByTitle(this.nome)
          .then((response) => {
            this.cidades = response.data.map(this.getDisplayCidade);
            console.log(response.data);
          }).catch((e) => {
        console.log(e);
      });
    },

    editCidade(id) {
      this.$router.push({name: "cidade-details", params: {id: id}});
    },

    deleteCidade(id) {
      Swal.fire({
        title: 'Excluir o cidade?',
        text: 'Deseja realmente excluir o cidade selecionado?',
        showDenyButton: true,
        confirmButtonText: `Sim`,
        denyButtonText: `Não`,
      }).then((result) => {
        if (result.isConfirmed) {
          CidadeService.delete(id).then(() => {
            Swal.fire('Cidade excluído com sucesso!', '', 'success')
            this.refreshList();
          }).catch((e) => {
            console.log(e);
          });
        } else if (result.isDenied) {
          Swal.fire('Operação cancelada', '', 'info')
        }
      })


    },

    getDisplayCidade(cidade) {
      return {
        _id: cidade._id,
        nome: cidade.nome.length > 30 ? cidade.nome.substr(0, 30) + "..." : cidade.nome,
        abreviacao: cidade.abreviacao.length > 30 ? cidade.abreviacao.substr(0, 30) + "..." : cidade.abreviacao,
        createdAt: cidade.createdAt,
        updatedAt: cidade.updatedAt,
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
    this.retrieveCidades();
  },
};
</script>

<style scoped>

</style>