<template>
  <v-col class="text-center">
    <p>
      You can check here if an api is available at http://localhost:8080/actuator/health
    </p>
    <p>
      Current status :
      <v-chip
        :color="getStatusColor(healthStatus)"
        dark
      >
        {{ healthStatus }}
      </v-chip>
    </p>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import { BACKEND_STATUS } from '~/utils/enums'

export default {
  name: 'HealthStatus',
  data () {
    return {
      backendUp: BACKEND_STATUS.UP
    }
  },
  computed: {
    ...mapGetters({
      healthStatus: 'health/HEALTH_STATUS'
    })
  },
  methods: {
    getStatusColor (status) {
      if (status === BACKEND_STATUS.UP) {
        return 'green'
      }
      if (status === BACKEND_STATUS.UNKOWN) {
        return 'orange'
      }
      return 'red'
    }
  }
}
</script>

<style>
  .alert {
    color: darkred;
  }

  .success {
    color: darkgreen;
  }
</style>
