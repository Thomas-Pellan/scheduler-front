<template>
    <v-sheet
      class="sheet-status"
      elevation="7"
      color="gray"
      width="100%"
    >
      <v-row>
        <HealthStatus />
        <HealthStatusTrigger />
      </v-row>
      <v-row>
        <HealthStatusHistory />
      </v-row>
    </v-sheet>
</template>

<script>

import HealthStatusTrigger from '~/components/health/HealthStatusTrigger'
import HealthStatus from '~/components/health/HealthStatus'
import HealthStatusHistory from '~/components/health/HealthStatusHistory'

export default {
  name: 'HealthPage',
  components: {
    HealthStatus,
    HealthStatusTrigger,
    HealthStatusHistory
  }
}
</script>

<style>
  .sheet-status{
    margin-top: 2rem;
  }
</style>
