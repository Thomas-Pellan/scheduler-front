<template>
  <v-row>
    <v-col class="text-center">
      Health Page Check : {{ healthStatus }}
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'HealthPage',
  data () {
    return {
      healthStatus: 'UNKOWN'
    }
  },
  methods: {
    async checkHealth () {
      this.healthStatus = await this.$axios.get('http://localhost:8080/actuator/health')
    }
  }
}
</script>
