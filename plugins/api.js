import Actuator from '@/api/actuator'
import CronExpression from '@/api/cronExpression'
import Task from '@/api/task'

export default (context, inject) => {
  const factories = {
    actuator: Actuator(context.$axios),
    cronExpression: CronExpression(context.$axios),
    task: Task(context.$axios)
  }

  inject('api', factories)
}
