import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerIntegerface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerIntegerface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerIntegerface[] } {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerIntegerface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }
    unregister(eventName: string, eventHandler: EventHandlerIntegerface): void {
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
                handler => handler !== eventHandler
            );
        }    
    }
    unregisterAll(): void {
        this.eventHandlers = {};
    }
    notify(event: EventInterface): void {
        if (this.eventHandlers[event.constructor.name]) {
            this.eventHandlers[event.constructor.name].forEach(handler => {
                handler.handle(event);
            });
        }   
        
    }
}