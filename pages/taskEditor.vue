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
            <div v-if="item === 'Task Search'">
              <TaskSearch />
              <TaskSearchResults />
            </div>
            <div v-else-if="item === 'Task Edition'">
              <TaskForm />
            </div>
            <div v-else-if="item === 'Input Search'">
              <InputSearch />
            </div>
            <div v-else>
              <InputForm />
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
import InputSearch from '@/components/editor/InputSearch'
import InputForm from '@/components/editor/InputForm'
import TaskSearchResults from '@/components/editor/TaskSearchResults'

export default {
  name: 'TaskEditor',
  components: {
    TaskSearchResults,
    InputSearch,
    InputForm,
    TaskForm,
    TaskSearch
  },
  data () {
    return {
      tab: null,
      items: [
        'Task Search', 'Task Edition', 'Input Search', 'Input Edition'
      ]
    }
  }
}
</script>

<style>
  .sheet-task-editor{
    margin-top: 2rem;
  }
</style>
