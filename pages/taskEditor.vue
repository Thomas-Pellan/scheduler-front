<template>
  <v-sheet
    class="sheet-task-editor"
    elevation="7"
    color="gray"
    width="100%"
  >
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          <v-card
            color="basil"
            flat
          >
            <div v-if="item === 'Task'">
              <TaskSearch />
              <TaskForm />
            </div>
            <div v-else>
              <OutputSearch />
              <OutputForm />
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-sheet>
</template>

<script>

import TaskSearch from '@/components/editor/TaskSearch'
import TaskForm from '@/components/editor/TaskForm'
import OutputSearch from '@/components/editor/OutputSearch'
import OutputForm from '@/components/editor/OutputForm'

export default {
  name: 'TaskEditor',
  components: {
    OutputForm,
    OutputSearch,
    TaskForm,
    TaskSearch
  },
  data () {
    return {
      tab: null,
      items: [
        'Task', 'Input'
      ]
    }
  },
  methods: {
    changeTab () {
      this.taskSelected = !this.taskSelected
    }
  }
}
</script>

<style>
  .sheet-task-editor{
    margin-top: 2rem;
  }
</style>
