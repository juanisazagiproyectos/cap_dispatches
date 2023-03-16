const cds = require("@sap/cds"),
	SequenceHelper = require("./lib/SequenceHelper"),
	TextBundle = require('@sap/textbundle').TextBundle;

module.exports = cds.service.impl(async (service) => {
	const db = await cds.connect.to("db"),
		{ CargoOrders, StatusOrder } = service.entities,
		locale = "(['en-US', 'en', 'es-ES', 'es']) || 'en'",
		bundle = new TextBundle('../_i18n/i18n', locale);

	service.before("CREATE", CargoOrders, async (context) => {
		const statusPending = 2,
			orderid = new SequenceHelper({
				db: db,
				sequence: "ORDERID",
				table: "COM_DISPATCHES_CARGOORDERS",
				field: "order_id"
			});
		context.data.order_id = await orderid.getNextNumber();
		context.data.status_order_ID = statusPending;
	});

	service.on("orderApproveAction", async req => {

		const db = service.transaction(req),
			statusPending = 1,
			statusApprove = 2,
			statusReject = 3,
			firstSAPorder = bundle.getText('firstSAPorder'),
			resultsRead = await db
				.read(CargoOrders, ["order_id", "status_order_ID", "sap_order"])
				.where({ ID: req.params[0].ID });

		if (resultsRead[0].sap_order !== null) {
			if (resultsRead[0].status_order_ID == statusPending) {
				await UPDATE(CargoOrders, req.params[0].ID).with({ status_order_ID: statusApprove });

				// const [{ ID, IsActiveEntity }] = req.params;
				// return service.read(CargoOrders, { ID, IsActiveEntity });
				// return req.notify(`The order ${resultsRead[0].order_id} was approved`);
			}
			else {
				if (resultsRead[0].status_order_ID == statusApprove) {
					return req.notify(`The order ${resultsRead[0].order_id} was NOT approved because it was already approved`);
				}

				if (resultsRead[0].status_order_ID == statusReject) {
					return req.notify(`The order ${resultsRead[0].order_id} was NOT approved because it was already reject`);
				}
			}
		}
		else {
			// return req.notify(`You must first fill out the SAP order number`);
			return req.notify(firstSAPorder, resultsRead[0].order_id);
		}
	});

	service.on("orderRejectAction", async req => {
		// return req.info(`NOTE: ${req.data.input}`);
		const db = service.transaction(req),
			statusReject = 1,
			statusPending = 2,
			statusApprove = 3,
			remarksOrder = req.data.input,
			resultsRead = await db
				.read(CargoOrders, ["order_id", "status_order_ID", "sap_order"])
				.where({ ID: req.params[0].ID });

		if (resultsRead[0].sap_order !== "undefined") {
			if (resultsRead[0].status_order_ID == statusPending) {
				await UPDATE(CargoOrders, req.params[0].ID).with({ status_order_ID: statusReject, remarksOrdersManagement: remarksOrder });
				return req.notify(`The order ${resultsRead[0].order_id} was reject`);
			}
			else {
				if (resultsRead[0].status_order_ID == statusReject) {
					return req.notify(`The order ${resultsRead[0].order_id} was NOT reject because it was already reject`);
				}
				if (resultsRead[0].status_order_ID == statusApprove) {
					return req.notify(`The order ${resultsRead[0].order_id} was NOT reject because it was already approved`);
				}
			}
		}
		else {
			return req.notify(`You must first fill out the SAP order number`);
		}
	});

	// service.after('PATCH', 'CargoOrders', (_, req) => {
	// 	if ('status_order_ID' in req.data) {
	// 		return this._refreshPage(req.data.ID)
	// 	}
	// });

	// this._refreshPage = function (travel) {
	// 	return UPDATE(CargoOrders.drafts, travel).with({
	// 		Total: CXL`coalesce (BookingFee, 0) + ${SELECT`coalesce (sum (FlightPrice + ${SELECT`coalesce (sum (Price),0)`.from(BookingSupplement.drafts).where`to_Booking_BookingUUID = BookingUUID`
	// 				}),0)`.from(Booking.drafts).where`to_Travel_TravelUUID = TravelUUID`
	// 			}`
	// 	})
	// };

});



