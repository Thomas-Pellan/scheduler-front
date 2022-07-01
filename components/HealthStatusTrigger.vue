<template>
  <v-col>
    <v-btn
      :loading="isLoading"
      @click="checkHealth">
      Check Health !
    </v-btn>
  </v-col>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { BACKEND_STATUS } from '@/utils/enums'

export default {
  name: 'HealthStatusTrigger',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      getHealth: 'health/FETCH_HEALTH_STATUS'
    }),
    ...mapMutations({
      setHealth: 'health/SET_HEALTH_STATUS'
    }),
    async checkHealth () {
      this.isLoading = true
      this.setHealth(BACKEND_STATUS.UNKOWN)
      await this.getHealth()
      this.isLoading = false
    }
  }
}
</script>
