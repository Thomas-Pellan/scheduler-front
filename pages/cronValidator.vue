<template>
  <v-sheet
    class="sheet-validator"
    elevation="7"
    color="gray"
    width="100%"
  >
    <v-row>
      <CronValidator />
    </v-row>
  </v-sheet>
</template>

<script>

import CronValidator from '@/components/cron/CronValidator'

export default {
  name: 'CronValidatorPage',
  components: {
    CronValidator
  }
}
</script>

<style>
  .sheet-validator{
    margin-top: 2rem;
  }
</style>
