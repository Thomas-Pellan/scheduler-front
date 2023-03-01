<template>
  <v-card
    color="basil"
    flat
  >
    <v-form
      ref="form"
      v-model="valid"
      class="task-form"
      lazy-validation
    >
      <p v-if="task && task.id">
        Identifiant : {{ task.id }}
      </p>

      <v-text-field
        v-model="task.name"
        :rules="rulesName"
        label="Name"
        required
      />
      <v-text-field
        v-model="task.url"
        :rules="rulesUrl"
        label="url"
        required
      />
      <v-text-field
        v-model="task.cronExpression"
        :rules="rulesCron"
        label="Cron expression"
        required
      />
      <v-checkbox
        v-model="task.active"
        label="Active"
      />
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import validateStrSize from '@/helpers/formValidation'

export default {
  name: 'TaskForm',
  data () {
    return {
      isLoading: false,
      valid: true,
      rulesUrl: [
        value => validateStrSize(value, 10)
      ],
      rulesName: [
        value => validateStrSize(value, 5)
      ],
      rulesCron: [
        value => validateStrSize(value, 6)
      ]
    }
  },
  computed: {
    ...mapGetters({
      task: 'taskEdition/TASK'
    })
  }
}
</script>

<style>
  .task-form {
    margin: 2rem;
  }
</style>
