import Actuator from '@/api/actuator'
import CronExpression from '@/api/cronExpression'
import Task from '@/api/task'
import TaskOutput from '@/api/taskOutput'
import Pool from '@/api/pool'

export default (context, inject) => {
  const factories = {
    actuator: Actuator(context.$axios),
    cronExpression: CronExpression(context.$axios),
    task: Task(context.$axios),
    taskOutput: TaskOutput(context.$axios),
    pool: Pool(context.$axios)
  }

  inject('api', factories)
}
