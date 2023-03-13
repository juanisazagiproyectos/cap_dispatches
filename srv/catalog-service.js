// const cds = require("@sap/cds");
// const SequenceHelper = require("./lib/SequenceHelper");


// module.exports = cds.service.impl(async (service) => {
// 	const db = await cds.connect.to("db");
// 	const { CargoOrders } = service.entities;
// 	service.before("CREATE", CargoOrders, async (context) => {
// 		const orderid = new SequenceHelper({
// 			db: db,
// 			sequence: "ORDERID",
// 			table: "COM_DISPATCHES_CARGOORDERS",
// 			field: "order_id"
// 		});

// 		context.data.order_id = await orderid.getNextNumber();
// 	});

// 	service.on("orderApproveAction", async req => {

// 		const db = service.transaction(req);
// 		const statusApprove = "Aprobado",
// 			statusPending = "Pendiente",
// 			statusReject = "Rechazado",
// 			statusIcon = "sap-icon://status-completed";
// 		const resultsRead = await db
// 			.read(CargoOrders, ["ID", "order_id", "status_order"])
// 			.where({ ID: req.params[0].ID });

// 		// if (resultsRead[0].sap_order == "undefined") {
// 			if (resultsRead[0].status_order == statusPending) {

// 				return UPDATE(CargoOrders, req.params[0].ID).with({ status_order: statusApprove, status_indicator: statusIcon });
// 			} else {
// 				if (resultsRead[0].status_order == statusApprove) {
// 					return req.notify(`The order ${resultsRead[0].order_id} was NOT approved because it was already approved`);
// 				}

// 				if (resultsRead[0].status_order == statusReject) {
// 					return req.notify(`The order ${resultsRead[0].order_id} was NOT approved because it was already reject`);
// 				}
// 			}

// 		// } 
// 		// else {
// 		// 	return req.notify(`You must first fill out the SAP order number`);
// 		// }
// 	});

// 	service.on("orderRejectAction", async req => {
// 		// return req.info(`NOTE: ${req.data.input}`);

// 		const db = service.transaction(req);
// 		const statusApprove = "Aprobado",
// 			statusPending = "Pendiente",
// 			statusReject = "Rechazado",
// 			remarksOrder = req.data.input,
// 			statusIcon = "sap-icon://status-negative";
// 		const resultsRead = await db
// 			.read(CargoOrders, ["ID", "order_id", "status_order"])
// 			.where({ ID: req.params[0].ID });

// 		// if (resultsRead[0].sap_order !== " ") {
// 			if (resultsRead[0].status_order == statusPending) {

// 				return UPDATE(CargoOrders, req.params[0].ID).with({ status_order: statusReject, status_indicator: statusIcon, remarksOrdersManagement: remarksOrder });
// 			} else {
// 				if (resultsRead[0].status_order == statusReject) {
// 					return req.notify(`The order ${resultsRead[0].order_id} was NOT reject because it was already reject`);
// 				}

// 				if (resultsRead[0].status_order == statusApprove) {
// 					return req.notify(`The order ${resultsRead[0].order_id} was NOT approved because it was already reject`);
// 				}
// 			}
// 		// } else {

// 		// 	return req.notify(`You must first fill out the SAP order number`);
// 		// }
// 	});

// });



