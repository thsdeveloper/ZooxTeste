<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar estado</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="submit-form">
                <div v-if="!submitted">
                  <v-text-field v-model="estado.nome" :rules="nomeEstadoRules" :counter="100" label="Nome do estado"
                                required></v-text-field>
                  <v-text-field v-model="estado.abreviacao" :rules="abreviacaoRules" :counter="2" label="Sigla"
                                required class="inputAbreviacao"></v-text-field>
                </div>

                <div v-else>
                  <v-alert type="success">Estado cadastrado com sucesso!</v-alert>
                </div>
              </div>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="novoEstado">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" :disabled="estado._id != null" text @click="salvarEstado()">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-btn dark fab fixed bottom right large color="success" @click="criarEstado">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-row>
</template>

<script>
import EstadoService from "../services/EstadoService";

export default {
  name: "estado-add",
  data() {
    return {
      disabledSalve: false,
      valid: true,
      dialog: false,
      nomeEstadoRules: [
        v => !!v || 'Campo obrigatório!',
        v => v.length <= 100 || 'Este campo só pode conter 100 caracteres',
      ],
      abreviacaoRules:[
        v => v.length <= 2 || 'Este campo só pode conter 2 caracteres',
      ],
      estado: {
        _id: null,
        nome: "",
        abreviacao: "",
      },
      submitted: false
    };
  },
  methods: {
    criarEstado() {
      this.dialog = true;
    },
    salvarEstado() {
      if (this.$refs.form.validate()) {
        var data = {
          nome: this.estado.nome,
          abreviacao: this.estado.abreviacao
        };
        EstadoService.create(data).then(response => {
          this.submitted = true;
          this.estado = response.data;

          this.$emit('atualiza-lista', true);

        }).catch(e => {
          console.log(e);
        });
      }
    },
    novoEstado() {
      this.dialog = false;
      this.submitted = false;
      this.estado = {};
    }
  }
};
</script>
<style slot="scope">
.inputAbreviacao input{
  text-transform: uppercase
}
</style>