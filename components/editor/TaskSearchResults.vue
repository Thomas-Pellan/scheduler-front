<template>
  <v-data-table
    dark
    :items-per-page="5"
    :items="tasksFound"
    :headers="headers"
    :loading="isLoading"
    loading-text="Fetching the tasks, please wait"
  >
    <template v-slot:[`item.active`]="{ item }">
      <v-chip
        :color="getStatusColor(item.active)"
        dark
      >
        {{ item.active ? 'Yes' : 'No' }}
      </v-chip>
    </template>
    <template v-slot:[`item.lastResult`]="{ item }">
      <v-chip
        :color="getResultColor(item.lastResult)"
        dark
      >
        {{ item.lastResult }}
      </v-chip>
    </template>
    <template v-slot:[`item.lastExecution`]="{ item }">
        {{ getExecutionStr(item.lastExecution) }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip
        left
        color="grey"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            class="mr-2"
            v-bind="attrs"
            v-on="on"
            @click="editTask(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>Edit this task</span>
      </v-tooltip>
      <v-tooltip
        left
        color="grey"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            class="mr-2"
            v-bind="attrs"
            v-on="on"
            @click="refreshStatus(item)"
          >
            mdi-reload
          </v-icon>
        </template>
        <span>Reload task execution date and status</span>
      </v-tooltip>
      <v-tooltip
        left
        color="grey"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            v-bind="attrs"
            v-on="on"
            @click="copyTask(item)"
          >
            mdi-content-copy
          </v-icon>
        </template>
        <span>Duplicate this task</span>
      </v-tooltip>
      <v-tooltip
        left
        color="grey"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            v-bind="attrs"
            v-on="on"
            @click="deleteTask(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Delete this task</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '@/utils/vars'

export default {
  name: 'TaskSearchResults',
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Active', value: 'active' },
        { text: 'Url', value: 'url' },
        { text: 'Cron Expression', value: 'cronExpression' },
        { text: 'Last Http Response', value: 'lastResult' },
        { text: 'Last Execution date', value: 'lastExecution' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      taskSearchMsg: 'searchTask/SEARCH_MSG',
      tasksFound: 'searchTask/TASKS_FOUND',
      isLoading: 'searchTask/IS_LOADING'
    })
  },
  methods: {
    getStatusColor (status) {
      if (status) {
        return 'green'
      }
      return 'red'
    },
    getResultColor (result) {
      let color = 'green'
      if (result >= 400) {
        color = 'orange'
      }
      if (result >= 500) {
        color = 'red'
      }
      return color
    },
    getExecutionStr (executionDate) {
      return moment(executionDate).format(DATE_TIME_FORMAT)
    },
    editTask (task) {

    },
    deleteTask (task) {

    },
    refreshStatus (task) {

    },
    copyTask (task) {

    }
  }
}

</script>
