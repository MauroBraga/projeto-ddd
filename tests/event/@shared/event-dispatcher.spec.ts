import EventDispatcher from '../../../src/domain/event/@shared/event-dispatcher';
import SendEmailWhenProductIsCreatedHandler from '../../../src/domain/event/product/handler/send-email-when-product-is-created.heandler';
import ProductCreatedEvent from '../../../src/domain/event/product/product-created.event';
import SendMensagemWhenCustomerIsUpdatedHandler from '../../../src/domain/event/customer/handler/send-mensagem-when-customer-is-updated.heandler ';
import CustomerCreatedEvent from '../../../src/domain/event/customer/customer-created.event';
import SendMensagemWhenCustomerIsCreatedHandler from '../../../src/domain/event/customer/handler/send-mensagem-when-customer-is-created.heandler';

describe('Domain Event Dispatcher Tests', () => {
    

    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
    });

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
    });

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        
        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toMatchObject([eventHandler]);

        const productCreatedEvent = new ProductCreatedEvent({       
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100
        });     
        //Quando o notify for chamado, o eventHandler.handle deve ser chamado o SendEmailWhenProductIsCreatedHandler
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it('should notify a Customer Created handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMensagemWhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('CustomerCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toMatchObject([eventHandler]);

        const customerCreatedEvent = new CustomerCreatedEvent({       
            name: 'Customer 1',
            description: 'Customer 1 description',
            price: 100
        });     
        
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });

    it('shoud notify a Customer Updated handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMensagemWhenCustomerIsUpdatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('CustomerCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toMatchObject([eventHandler]);

        const customerCreatedEvent = new CustomerCreatedEvent({       
            name: 'Customer 1',
            description: 'Customer 1 description',
            price: 100
        });     
        
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
}); 