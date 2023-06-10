'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const { products, userName, email } = ctx.request.body;

        try {
            // recupera a informação do backend
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi.services['api::item.item'].findOne({ id: product.id });

                    return {
                        price_data: {
                            currency: 'brl',
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: product.count,
                    };
                })
            );

            // cria uma seção stripe
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                customer_email: email,
                mode: 'payment',
                success_url: 'http://localhost:3000/checkout/success',
                cancel_url: 'http://localhost:3000',
                line_items: lineItems,
            });

            // cria o item
            await strapi.services["api::order.order"].create({
                userName,
                products,
                stripeSessionId: session.id,
            });

            // Retorna o id da seção
            return { id: session.id };
        } catch (error) {
            ctx.response.status = 500;
            console.log('error order', error);
            return { error: { message: 'There was a problem creating the charge.' } };
        }
    },
}));
