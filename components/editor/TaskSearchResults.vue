<template>
  <v-data-table
    dark
    :items-per-page="5"
    :items="tasksFound"
    :headers="headers"
    :loading="isLoading"
    loading-text="Fetching the tasks, please wait"
  >
    <template #[`item.active`]="{ item }">
      <v-chip
        :color="getStatusColor(item.active)"
        dark
      >
        {{ item.active ? 'Yes' : 'No' }}
      </v-chip>
    </template>
    <template #[`item.lastResult`]="{ item }">
      <v-chip
        :color="getResultColor(item.lastResult)"
        dark
      >
        {{ item.lastResult }}
      </v-chip>
    </template>
    <template #[`item.lastExecution`]="{ item }">
      {{ getExecutionStr(item.lastExecution) }}
    </template>
    <template #[`item.actions`]="{ item }">
      <v-tooltip
        top
        color="grey"
      >
        <template #activator="{ on, attrs }">
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
        top
        color="grey"
      >
        <template #activator="{ on, attrs }">
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
        top
        color="grey"
      >
        <template #activator="{ on, attrs }">
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
        top
        color="grey"
      >
        <template #activator="{ on, attrs }">
          <v-icon
            small
            v-bind="attrs"
            v-on="on"
            @click="openDeleteModal(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Delete this task</span>
      </v-tooltip>
      <v-dialog v-model="modalDelete" max-width="550px">
        <v-card>
          <v-card-title class="text-h5">Do you want to delete or inactivate this item ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="closeModal">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="orange" text @click="inactivateTask">Inactivate</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="deleteTask">Delete</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="snackbarError"
        :timeout="timeout"
        color="error"
      >
        {{ errorMsg }}

        <template #action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbarError = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '@/utils/vars'
import { BACKEND_STATUS } from '@/utils/enums'

export default {
  name: 'TaskSearchResults',
  data () {
    return {
      snackbarError: false,
      errorMsg: null,
      timeout: 2000,
      taskToDelete: null,
      modalDelete: false,
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
    ...mapMutations({
      setQuery: 'searchTask/SET_QUERY',
      deleteTaskFromResults: 'searchTask/DELETE_TASK',
      updateTaskInResults: 'searchTask/UPDATE_TASK',
      setLoading: 'searchTask/SET_IS_LOADING'
    }),
    ...mapActions({
      updateTaskStatus: 'searchTask/UPDATE_TASK_EXECUTION'
    }),
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
    async inactivateTask () {
      this.setLoading(true)
      this.taskToDelete.active = false
      const result = await this.$api.task.update(this.taskToDelete)
      if (result !== BACKEND_STATUS.ERROR && result !== BACKEND_STATUS.UNREACHABLE) {
        this.updateTaskInResults(result)
      } else {
        this.snackbarError = true
        this.errorMsg = 'Something happened during the modification, please try again later'
      }
      this.modalDelete = false
      this.taskToDelete = null
      this.setLoading(false)
    },
    async deleteTask () {
      this.setLoading(true)
      const result = await this.$api.task.delete(this.taskToDelete.id)
      if (result === true) {
        this.deleteTaskFromResults(this.taskToDelete)
      } else {
        this.snackbarError = true
        this.errorMsg = 'Something happened during the deletion, please try again later'
      }
      this.modalDelete = false
      this.taskToDelete = null
      this.setLoading(false)
    },
    refreshStatus (task) {
      const query = { id: task.id }
      this.setQuery(query)
      this.updateTaskStatus()
    },
    copyTask (task) {

    },
    openDeleteModal (task) {
      this.modalDelete = true
      this.taskToDelete = { ...task }
    },
    closeModal () {
      this.modalDelete = false
      this.taskToDelete = null
    }
  }
}

</script>
