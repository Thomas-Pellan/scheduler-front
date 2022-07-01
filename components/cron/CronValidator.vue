<template>
  <v-col class="text-center">
    <v-row>
      <v-text-field
        class="input-cron"
        :rules="rules"
        v-model="expression"
      >
      </v-text-field>
      <v-btn
        @click="validate"
      >
        Valider
      </v-btn>
    </v-row>
    <p v-if="resultValidation">
      {{ resultValidation }}
    </p>
  </v-col>
</template>

<script>
import { BACKEND_STATUS } from '@/utils/enums'

export default {
  name: 'CronValidator',
  data () {
    return {
      expression: null,
      resultValidation: null,
      rules: [
        value => !!value || 'Required.',
        value => (value || '').trim().length >= 5 || 'Should be at least 5 characters'
      ]
    }
  },
  methods: {
    getResultColor (status) {
      if (status === BACKEND_STATUS.UP) {
        return 'green'
      }
      if (status === BACKEND_STATUS.UNKOWN) {
        return 'orange'
      }
      return 'red'
    },
    async validate () {
      const result = await this.$api.cronExpression.validateCronExpression(this.expression)

      if (result === BACKEND_STATUS.ERROR || result === BACKEND_STATUS.UNREACHABLE) {
        this.resultValidation = 'Aucune réponse du serveur'
        return
      }

      if (result === false) {
        this.resultValidation = 'L\'expression n\'est pas considée comme valide'
        return
      }

      this.resultValidation = 'Expression valide !'
    }
  }
}
</script>

<style>
  .input-cron {
    max-width: 60%;
    margin-left: 2rem;
  }
</style>
