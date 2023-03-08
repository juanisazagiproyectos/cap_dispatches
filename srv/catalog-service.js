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

//////////////////////////////

const cds = require("@sap/cds");
const SequenceHelper = require("./lib/SequenceHelper");


module.exports = cds.service.impl(async (service) => {
	const db = await cds.connect.to("db");
	const { CargoOrders } = service.entities;
	service.before("CREATE", CargoOrders, async (context) => {
		const orderid = new SequenceHelper({
			db: db,
			sequence: "ORDERID",
			table: "COM_DISPATCHES_CARGOORDERS",
			field: "order_id"
		});

		context.data.order_id = await orderid.getNextNumber();
	});
});

module.exports = async (srv) => {
	const { CargoOrders } = srv.entities;
	srv.on("approveAction", async req => {
		return req.notify(`The order is approved`);
    });

	srv.on("rejectAction", async req => {
		return req.info(`NOTE: ${req.data.input}`);
    });
}


