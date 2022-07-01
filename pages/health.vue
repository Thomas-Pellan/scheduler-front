<template>
    <v-sheet
      class="sheet-status"
      elevation="7"
      color="gray"
      width="100%"
    >
      <v-row>
        <HealthStatus/>
        <HealthStatusTrigger/>
      </v-row>
    </v-sheet>
</template>

<script>

import HealthStatusTrigger from '@/components/HealthStatusTrigger'
import HealthStatus from '@/components/HealthStatus'

export default {
  name: 'HealthPage',
  components: {
    HealthStatus,
    HealthStatusTrigger
  }
}
</script>

<style>
  .sheet-status{
    margin-top: 2rem;
  }
</style>
