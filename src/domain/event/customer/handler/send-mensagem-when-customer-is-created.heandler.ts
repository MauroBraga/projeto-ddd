import Customer from "../../../entity/customer";
import EventHandlerIntegerface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from  "../customer-created.event";

export default class SendMensagemWhenCustomerIsCreatedHandler implements EventHandlerIntegerface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}