<template>
    <v-sheet
      class="sheet-status"
      elevation="7"
      color="gray"
      width="100%"
    >
      <h2>Current API status :</h2>
      <v-row class="v-row-offset">
        <HealthStatus />
        <HealthStatusTrigger />
      </v-row>
      <h2>Status history :</h2>
      <v-row>
        <HealthStatusHistory />
      </v-row>
      <h2>Play with the API :</h2>
      <v-row class="v-row-offset">
        <iframe
          class="iframe-swagger"
          :src="baseUrl + swaggerUri"
        />
      </v-row>
    </v-sheet>
</template>

<script>

import HealthStatusTrigger from '@/components/health/HealthStatusTrigger'
import HealthStatus from '@/components/health/HealthStatus'
import HealthStatusHistory from '@/components/health/HealthStatusHistory'

export default {
  name: 'HealthPage',
  components: {
    HealthStatus,
    HealthStatusTrigger,
    HealthStatusHistory
  },
  data () {
    return {
      swaggerUri: '/swagger-ui/index.html#/',
      baseUrl: this.$axios.defaults.baseURL
    }
  }
}
</script>

<style>
  .sheet-status {
    margin-top: 2rem;
  }
  v-row-offset {
    margin: 2rem;
  }
  h2 {
    margin-left: 2rem;
  }
  .iframe-swagger {
    margin: 2rem;
    width: 95%;
    height: 40rem;
  }
</style>
