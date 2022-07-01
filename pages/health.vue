<template>
  <v-row>
    <v-col class="text-center">
      Health Page Check : {{ healthStatus }}
    </v-col>
    <v-btn @click="checkHealth">
      Check Health
    </v-btn>
  </v-row>
</template>

<script>

import { BACKEND_STATUS } from '@/utils/enums'

export default {
  name: 'HealthPage',
  data () {
    return {
      healthStatus: BACKEND_STATUS.UNKOWN
    }
  },
  methods: {
    async checkHealth () {
      this.healthStatus = await this.$api.actuator.getHealth()
    }
  }
}
</script>
