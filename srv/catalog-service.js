// const cds = require('@sap/cds')

// module.exports = cds.service.impl(async function () {
//     this.after('READ', 'CargoOrders', CargoOrdersData => {
//         const CargoOrders = Array.isArray(CargoOrdersData) ? CargoOrdersData : [CargoOrdersData];
//         CargoOrders.forEach(CargoOrders => {
//             CargoOrders.status_indicator = 'sap-icon://future';
//             // if (CargoOrders.order == undefined) {
//             //     // CargoOrders.order = '20220004';
//             //     const { maxID } = await SELECT.one `max(order) as maxID` .from (CargoOrders)
//             //     req.data.CargoOrders.order = maxID + 1
//             // }
//         });
//     });
//     // const { CargoOrders } = this.entities
//     // this.before ('CREATE', 'CargoOrders', async req => {
//     //     const { maxID } = await SELECT.one `max(order) as maxID` .from (CargoOrders)
//     //     req.data.CargoOrders.order = maxID + 1
//     //   })
// }
// );
