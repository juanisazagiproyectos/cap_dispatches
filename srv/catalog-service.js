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
			approvedAlreadyApproved = bundle.getText('approvedAlreadyApproved'),
			approvedAlreadyReject = bundle.getText('approvedAlreadyReject'),
			resultsRead = await db
				.read(CargoOrders, ["order_id", "status_order_ID", "sap_order"])
				.where({ ID: req.params[0].ID });

		if (resultsRead[0].sap_order !== null) {
			if (resultsRead[0].status_order_ID == statusPending) {
				await UPDATE(CargoOrders, req.params[0].ID).with({ status_order_ID: statusApprove });
			}
			else {
				if (resultsRead[0].status_order_ID == statusApprove) {
					return req.notify(approvedAlreadyApproved, resultsRead[0].order_id);
				}

				if (resultsRead[0].status_order_ID == statusReject) {
					return req.notify(approvedAlreadyReject, resultsRead[0].order_id);
				}
			}
		}
		else {
			return req.notify(firstSAPorder, resultsRead[0].order_id);
		}
	});

	service.on("orderRejectAction", async req => {
		// return req.info(`NOTE: ${req.data.input}`);
		const db = service.transaction(req),
			statusReject = 1,
			statusPending = 2,
			statusApprove = 3,
			firstSAPorder = bundle.getText('firstSAPorder'),
			rejectAlreadyReject = bundle.getText('rejectAlreadyReject'),
			rejectAlreadyApproved = bundle.getText('rejectAlreadyApproved'),
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
					return req.notify(rejectAlreadyReject, resultsRead[0].order_id);
				}
				if (resultsRead[0].status_order_ID == statusApprove) {
					return req.notify(rejectAlreadyApproved, resultsRead[0].order_id);
				}
			}
		}
		else {
			return req.notify(firstSAPorder, resultsRead[0].order_id);
		}
	});

});



