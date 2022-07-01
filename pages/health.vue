<template>
  <v-row>
    <HealthStatus/>
    <HealthStatusTrigger/>
  </v-row>
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
