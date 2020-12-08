<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar cidade</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="submit-form">
                <div v-if="!submitted">
                  <v-text-field v-model="cidade.nome" :rules="nomeCidadeRules" :counter="100" label="Nome da cidade"
                                required></v-text-field>
                  <v-select v-model="cidade.estadoId" :items="estados" :rules="estadoRules" label="Escolha o estado" item-value="_id" item-text="nome"
                            no-data-text="Nenhuma cidade encontrada"></v-select>
                </div>

                <div v-else>
                  <v-alert type="success">Cidade cadastrado com sucesso!</v-alert>
                </div>
              </div>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="novoCidade">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" :disabled="cidade._id != null" text @click="salvarCidade()">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-btn dark fab fixed bottom right large color="success" @click="criarCidade">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-row>
</template>

<script>
import CidadeService from "../services/CidadeService";
import EstadoService from "../services/EstadoService";

export default {
  name: "cidade-add",
  data() {
    return {
      disabledSalve: false,
      valid: true,
      dialog: false,
      estados: [],
      nomeCidadeRules: [
        v => !!v || 'Campo obrigatório!',
        v => v.length <= 100 || 'Este campo só pode conter 100 caracteres',
      ],
      estadoRules: [
       v => !!v || 'Campo obrigatório!',
      ],
      cidade: {
        _id: null,
        nome: "",
        estadoId: null,
      },
      submitted: false
    };
  },
  methods: {
    criarCidade() {
      this.dialog = true;
    },
    salvarCidade() {
      if (this.$refs.form.validate()) {
        var data = {
          nome: this.cidade.nome,
          estadoId: this.cidade.estadoId
        };
        CidadeService.create(data).then(response => {
          this.submitted = true;
          this.cidade = response.data;

          this.$emit('atualiza-lista', true);

        }).catch(e => {
          console.log(e);
        });
      }
    },
    novoCidade() {
      this.dialog = false;
      this.submitted = false;
      this.cidade = {};
    },
    retrieveEstados() {
      EstadoService.getAll().then((response) => {
        this.estados = response.data;
      }).catch((e) => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.retrieveEstados();
  },
};
</script>
<style slot="scope">
.inputAbreviacao input {
  text-transform: uppercase
}
</style>