import EventHandlerIntegerface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
    register(eventName: string, eventHandler: EventHandlerIntegerface): void;
    unregister(eventName: string, eventHandler: EventHandlerIntegerface): void;
    unregisterAll(): void;
    notify(event: EventInterface): void;
}