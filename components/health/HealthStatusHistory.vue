<template>
  <v-data-table
    v-if="statusHistory"
    dark
    class="table-history"
    :items-per-page="5"
    :items="statusHistory"
    :headers="headers"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HealthStatus',
  data () {
    return {
      headers: [
        { text: 'Date of the request sent', value: 'date', sortable: true },
        { text: 'Result', value: 'status' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      statusHistory: 'health/STATUS_HISTORY'
    })
  }
}
</script>

<style>
  .table-history {
    margin: 1rem;
    width: 100%;
  }
</style>
