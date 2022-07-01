import Actuator from '@/api/actuator'
import CronExpression from '@/api/cronExpression'

export default (context, inject) => {
  const factories = {
    actuator: Actuator(context.$axios),
    cronExpression: CronExpression(context.$axios)
  }

  inject('api', factories)
}
