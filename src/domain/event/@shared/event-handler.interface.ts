import EventInterface from "./event.interface";

export default interface EventHandlerIntegerface<T extends EventInterface=EventInterface> {
    handle(event: T): void;
}    