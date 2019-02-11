import { injectable } from 'inversify'
import ObservableInterface from '~/events/core/ObservableInterface'
import bindListenersConfig from '~/configs/events/bindListeners'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import ListenerInterface from '~/events/listeners/ListenerInterface'

@injectable()
export default class Observable implements ObservableInterface {
  public async emit<Event> (eventName: string, param: Event | any) {
    const thisEventlisteners = bindListenersConfig.listeners[eventName]

    for (const listener of thisEventlisteners) {
      // без шаблонной строки `${listener}` быдет предупреждение
      const classListener = require(`~/events/listeners/${listener}`).default
      let instance: ListenerInterface<any>

      if (!serviceContainer.isBound(classListener.name)) {
        serviceContainer.bind(classListener.name).to(classListener)
      }

      instance = serviceContainer.get<ListenerInterface<any>>(classListener.name)

      return instance.handle(param)
    }
  }
}