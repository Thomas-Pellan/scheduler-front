<template>
  <v-col>
    <v-row>
      <v-btn
        class="button-check"
        :loading="isLoading"
        @click="checkHealth">
        Check Health !
      </v-btn>
      <v-checkbox
        v-model="continuous"
        :label="`Check every ${interval} milliseconds`"
      />
    </v-row>
    <v-row>
      <p v-if="lastCheckDate">
        Last check date : {{ lastCheckDate }}
      </p>
    </v-row>
  </v-col>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import moment from 'moment'

import { BACKEND_STATUS } from '@/utils/enums'

export default {
  name: 'HealthStatusTrigger',
  data () {
    return {
      isLoading: false,
      continuous: true,
      checkInterval: null,
      interval: 5000,
      lastCheckDate: null
    }
  },
  created () {
    this.checkInterval = setInterval(() => {
      if (this.continuous) {
        this.checkHealth()
      }
    }, this.interval)
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
      this.lastCheckDate = moment(new Date()).format('MM/DD/YYYY hh:mm:ss')
    }
  },
  beforeDestroy () {
    clearInterval(this.checkInterval)
  }
}
</script>

<style>
  .button-check {
    margin: 1rem;
  }
</style>
