import EventHandlerIntegerface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from  "../../../customer/event/customer-created.event";

export default class SendMensagemWhenCustomerIsCreatedHandler implements EventHandlerIntegerface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}