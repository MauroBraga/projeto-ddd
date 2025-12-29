import EventHandlerIntegerface from "../../../@shared/event/event-handler.interface";

import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerIntegerface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email for product: ${event.eventData.name}`);
    }
}