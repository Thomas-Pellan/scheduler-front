<template>
  <v-col class="text-center">
    <v-row>
      <v-text-field
        class="input-cron"
        :rules="rules"
        v-model="expression"
        :loading="isLoading"
      >
      </v-text-field>
      <v-btn
        class="button-check"
        @click="validate"
        :loading="isLoading"
      >
        Validate
      </v-btn>
      <v-chip
        :color="chipColor"
        class="label-result"
        v-if="resultValidation"
      >
          {{ resultValidation }}
      </v-chip>
    </v-row>
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
      chipColor: 'red',
      isLoading: false,
      rules: [
        value => !!value || 'Required.',
        value => (value || '').replaceAll(' ', '').length >= 6 || 'Should be at least 6 characters'
      ]
    }
  },
  methods: {
    async validate () {
      this.isLoading = true
      this.chipColor = 'red'
      this.resultValidation = ''
      const result = await this.$api.cronExpression.validateCronExpression(this.expression)
      this.isLoading = false

      if (result === BACKEND_STATUS.ERROR || result === BACKEND_STATUS.UNREACHABLE) {
        this.resultValidation = 'Server did not respond.'
        return
      }

      if (result === false) {
        this.resultValidation = 'The given input is not a valid spring cron expression'
        return
      }

      this.resultValidation = 'Valid entry !'
      this.chipColor = 'green'
    }
  }
}
</script>

<style>
  .input-cron {
    max-width: 50%;
    margin-left: 2rem;
  }

  .button-check {
    margin: 1rem;
  }

  .label-result {
    margin-top: 1.2rem;
  }
</style>
