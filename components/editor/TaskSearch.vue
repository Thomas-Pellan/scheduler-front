<template>
  <v-card
    class="search-bar"
    color="basil"
    flat
  >
    <v-row>
      <v-text-field
        v-model="queryName"
        class="input-cron"
        :rules="rules"
        :loading="isLoading"
        label="Name"
      />
      <v-text-field
        v-model="queryUrl"
        class="input-cron"
        :rules="rules"
        :loading="isLoading"
        label="Url"
      />
      <v-btn
        class="button-check"
        :loading="isLoading"
        @click="searchTasks"
      >
        Search
      </v-btn>
      <v-btn
        class="button-check"
        :loading="isLoading"
        @click="searchAllTasks"
      >
        Get All Tasks
      </v-btn>
      <v-chip
        v-if="taskSearchMsg"
        color="red"
        class="label-result"
      >
        {{ taskSearchMsg }}
      </v-chip>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TaskSearch',
  data () {
    return {
      queryName: null,
      queryUrl: null,
      rules: [
        value => (value || '').replaceAll(' ', '').length >= 3 || 'Should be at least 3 characters'
      ]
    }
  },
  computed: {
    ...mapGetters({
      taskSearchMsg: 'searchTask/SEARCH_MSG',
      isLoading: 'searchTask/IS_LOADING'
    })
  },
  methods: {
    ...mapActions({
      fetchTasks: 'searchTask/FETCH_TASKS',
      fetchAllTasks: 'searchTask/FETCH_ALL_TASKS'
    }),
    ...mapMutations({
      setTaskQuery: 'searchTask/SET_QUERY'
    }),
    async searchTasks () {
      this.setTaskQuery({ name: this.queryName, url: this.queryUrl })
      await this.fetchTasks()
    },
    async searchAllTasks () {
      await this.fetchAllTasks()
    }
  }
}

</script>

<style>
  .search-bar {
    margin: 2rem 1rem;
  }
</style>
