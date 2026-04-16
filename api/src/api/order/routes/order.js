'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::order.order', {
  routes: [
    {
      method: 'POST',
      path: '/orders/checkout',
      handler: 'order.checkout',
      config: {
        auth: false,
      },
    },
  ],
});
