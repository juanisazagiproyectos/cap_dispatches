const cds = require("@sap/cds"),
	SequenceHelper = require("./lib/SequenceHelper"),
	TextBundle = require('@sap/textbundle').TextBundle,
	{ publishSupplyWarningNotification } = require("./DomainNotifications");
// require('@sap/xsenv').loadEnv();

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

		// try {
		// 	// const res = await axios("https://services.odata.org/V2/Northwind/Northwind.svc/Products?$format=json");
		// 	// const criticalSupplyOfCategory6 = res.data.d.results.filter(a => a.UnitsInStock <= a.ReorderLevel && a.CategoryID === 6);	
		// 	// await Promise.all(criticalSupplyOfCategory6.map(product => publishSupplyWarningNotification({
		// 	await  publishSupplyWarningNotification({
		// 		order_id: ["1000000020"],
		// 		cargo_date: ["3/25/2023"],
		// 		createdBy: ["juan.isaza@giproyectos.com"],
		// 	});
		// 	// product: product.ProductName,
		// 	// category: categories[product.CategoryID],
		// 	// stock: `${product.UnitsInStock}`,
		// 	// recipients: ["juan.isaza@giproyectos.com"]
		// 	// })));
		// 	console.log("Success");
		// } catch (e) {
		// 	if (e.response) {
		// 		console.error(`${e.response.statusText} (${e.response.status}): ${JSON.stringify(e.response.data.error.message)}.`)
		// 	} else {
		// 		console.error(e)
		// 	}
		// }
	});

	service.on("orderApproveAction", async req => {

		const db = service.transaction(req),
			statusReject = 1,
			statusPending = 2,
			statusApprove = 3,
			OnHold = 1,
			resultsRead = await db
				.read(CargoOrders, ["order_id", "status_order_ID", "sap_order"])
				.where({ ID: req.params[0].ID });
		const firstSAPorder = bundle.getText('firstSAPorder'),
			approvedAlreadyApproved = bundle.getText('approvedAlreadyApproved', [resultsRead[0].order_id]),
			approvedAlreadyReject = bundle.getText('approvedAlreadyReject', [resultsRead[0].order_id]),
			orderWasApproved = bundle.getText('orderWasApproved', [resultsRead[0].order_id])

		if (resultsRead[0].sap_order !== null) {
			if (resultsRead[0].status_order_ID == statusPending) {
				await UPDATE(CargoOrders, req.params[0].ID).with({ status_order_ID: statusApprove, internal_status_ID: OnHold });
				return req.notify(orderWasApproved);
			}
			else {
				if (resultsRead[0].status_order_ID == statusApprove) {
					return req.notify(approvedAlreadyApproved);
				}

				if (resultsRead[0].status_order_ID == statusReject) {
					return req.notify(approvedAlreadyReject);
				}
			}
		}
		else {
			return req.notify(firstSAPorder);
		}
	});

	service.on("orderRejectAction", async req => {
		// return req.info(`NOTE: ${req.data.input}`);
		const db = service.transaction(req),
			statusReject = 1,
			statusPending = 2,
			statusApprove = 3,
			reasonOrdersManagement = req.data.newReason,
			remarksOrder = req.data.note,
			resultsRead = await db
				.read(CargoOrders, ["order_id", "status_order_ID", "sap_order"])
				.where({ ID: req.params[0].ID });
		const firstSAPorder = bundle.getText('firstSAPorder'),
			rejectAlreadyReject = bundle.getText('rejectAlreadyReject', [resultsRead[0].order_id]),
			rejectAlreadyApproved = bundle.getText('rejectAlreadyApproved', [resultsRead[0].order_id]),
			orderWasReject = bundle.getText('orderWasReject', [resultsRead[0].order_id])
		if (resultsRead[0].sap_order !== null) {
			if (resultsRead[0].status_order_ID == statusPending) {
				await UPDATE(CargoOrders, req.params[0].ID).with({ status_order_ID: statusReject, reasonOrdersManagement: reasonOrdersManagement, remarksOrdersManagement: remarksOrder });
				return req.notify(orderWasReject, resultsRead[0].order_id);
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
			return req.notify(firstSAPorder);
		}
	});

	service.on("reviewInApproveAction", async req => {
		const db = service.transaction(req),
			OnHold = 1,
			authorizedEntry = 2,
			unauthorizedEntry = 3,
			statusApprove = 3,
			resultsRead = await db
				.read(CargoOrders,
					["order_id", "status_order_ID", "internal_status_ID", "vehicle_cabin_in", "vehicle_engine_in", "vehicle_body_in", "fileNameScale_ticket_in"])
				.where({ ID: req.params[0].ID });
		const requiredFields = bundle.getText('requiredFields'),
			authorizedAlreadyAuthorized = bundle.getText('authorizedAlreadyAuthorized', [resultsRead[0].order_id]),
			authorizedAlreadyUnauthorized = bundle.getText('authorizedAlreadyUnauthorized', [resultsRead[0].order_id]),
			orderWasAuthorized = bundle.getText('orderWasAuthorized', [resultsRead[0].order_id]),
			notYetAuthorized = bundle.getText('notYetAuthorized', [resultsRead[0].order_id])
		if (resultsRead[0].vehicle_cabin_in == true || resultsRead[0].vehicle_engine_in == true || resultsRead[0].vehicle_body_in == true
			|| resultsRead[0].fileNameScale_ticket_in !== null) {
			if (resultsRead[0].status_order_ID == statusApprove) {
				await UPDATE(CargoOrders, req.params[0].ID).with(
					{ internal_status_ID: authorizedEntry, check_in: true });
				return req.notify(orderWasAuthorized, resultsRead[0].order_id);
			}
			else {
				if (resultsRead[0].internal_status_ID !== OnHold) {
					return req.notify(notYetAuthorized, resultsRead[0].order_id);
				}
				if (resultsRead[0].internal_status_ID == authorizedEntry) {
					return req.notify(authorizedAlreadyAuthorized, resultsRead[0].order_id);
				}

				if (resultsRead[0].internal_status_ID == unauthorizedEntry) {
					return req.notify(authorizedAlreadyUnauthorized, resultsRead[0].order_id);
				}
			}
		}
		else {
			return req.notify(requiredFields);
		}
	});

	service.on("reviewInRejectAction", async req => {
		const db = service.transaction(req),
			OnHold = 1,
			authorizedEntry = 2,
			unauthorizedEntry = 3,
			statusApprove = 3,
			reasonIn = req.data.newReason,
			remarkSticketIn = req.data.note,
			resultsRead = await db
				.read(CargoOrders,
					["order_id", "status_order_ID", "internal_status_ID", "vehicle_cabin_in", "vehicle_engine_in", "vehicle_body_in", "fileNameScale_ticket_in"])
				.where({ ID: req.params[0].ID });
		const requiredFields = bundle.getText('requiredFields'),
			unauthorizedAlreadyUnauthorized = bundle.getText('unauthorizedAlreadyUnauthorized', [resultsRead[0].order_id]),
			unauthorizedAlreadyAuthorized = bundle.getText('unauthorizedAlreadyAuthorized', [resultsRead[0].order_id]),
			orderWasunauthorized = bundle.getText('orderWasunauthorized', [resultsRead[0].order_id]),
			notYetAuthorized = bundle.getText('notYetAuthorized', [resultsRead[0].order_id]);
		if (resultsRead[0].vehicle_cabin_in == true || resultsRead[0].vehicle_engine_in == true || resultsRead[0].vehicle_body_in == true
			|| resultsRead[0].fileNameScale_ticket_in !== null) {
			if (resultsRead[0].status_order_ID == statusApprove) {
				await UPDATE(CargoOrders, req.params[0].ID).with(
					{ internal_status_ID: unauthorizedEntry, check_in: true, reason_in_ID: reasonIn, remark_sticket_in: remarkSticketIn });
				return req.notify(orderWasunauthorized);
			}
			else {
				if (resultsRead[0].internal_status_ID !== OnHold) {
					return req.notify(notYetAuthorized);
				}
				if (resultsRead[0].internal_status_ID == unauthorizedEntry) {
					return req.notify(unauthorizedAlreadyUnauthorized);
				}

				if (resultsRead[0].internal_status_ID == authorizedEntry) {
					return req.notify(unauthorizedAlreadyAuthorized);
				}
			}
		}
		else {
			return req.notify(requiredFields);
		}
	});

	service.on("reviewOutApproveAction", async req => {
		const db = service.transaction(req),
			uploadFinished = 6,
			authorizedExit = 7,
			unauthorizedExit = 8

		resultsRead = await db
			.read(CargoOrders,
				["order_id", "status_order_ID", "internal_status_ID", "vehicle_cabin_in", "vehicle_engine_in", "vehicle_body_in", "fileNameScale_ticket_in"])
			.where({ ID: req.params[0].ID });
		const requiredFields = bundle.getText('requiredFields'),
			authorizedAlreadyAuthorized = bundle.getText('authorizedAlreadyAuthorized', [resultsRead[0].order_id]),
			authorizedAlreadyUnauthorized = bundle.getText('authorizedAlreadyUnauthorized', [resultsRead[0].order_id]),
			orderWasAuthorized = bundle.getText('orderWasAuthorized', [resultsRead[0].order_id]),
			notYetAuthorized = bundle.getText('notYetAuthorized', [resultsRead[0].order_id])

		if (resultsRead[0].vehicle_cabin_in == true || resultsRead[0].vehicle_engine_in == true || resultsRead[0].vehicle_body_in == true
			|| resultsRead[0].fileNameScale_ticket_in !== null) {
			if (resultsRead[0].internal_status_ID == uploadFinished) {
				await UPDATE(CargoOrders, req.params[0].ID).with(
					{ internal_status_ID: authorizedExit, check_in: true });
				return req.notify(orderWasAuthorized, resultsRead[0].order_id);
			}
			else {
				if (resultsRead[0].internal_status_ID !== uploadFinished) {
					return req.notify(notYetAuthorized, resultsRead[0].order_id);
				}
				if (resultsRead[0].internal_status_ID == authorizedExit) {
					return req.notify(authorizedAlreadyAuthorized, resultsRead[0].order_id);
				}

				if (resultsRead[0].internal_status_ID == unauthorizedExit) {
					return req.notify(authorizedAlreadyUnauthorized, resultsRead[0].order_id);
				}
			}
		}
		else {
			return req.notify(requiredFields);
		}
	});

	service.on("reviewOutRejectAction", async req => {
		const db = service.transaction(req),
			uploadFinished = 6,
			authorizedExit = 7,
			unauthorizedExit = 8,
			reasonIn = req.data.newReason,
			remarkSticketIn = req.data.note,
			resultsRead = await db
				.read(CargoOrders,
					["order_id", "status_order_ID", "internal_status_ID", "vehicle_cabin_in", "vehicle_engine_in", "vehicle_body_in", "fileNameScale_ticket_in"])
				.where({ ID: req.params[0].ID });
		const requiredFields = bundle.getText('requiredFields'),
			unauthorizedAlreadyUnauthorized = bundle.getText('unauthorizedAlreadyUnauthorized', [resultsRead[0].order_id]),
			unauthorizedAlreadyAuthorized = bundle.getText('unauthorizedAlreadyAuthorized', [resultsRead[0].order_id]),
			orderWasunauthorized = bundle.getText('orderWasunauthorized', [resultsRead[0].order_id]),
			notYetAuthorized = bundle.getText('notYetAuthorized', [resultsRead[0].order_id]);
		if (resultsRead[0].vehicle_cabin_in == true || resultsRead[0].vehicle_engine_in == true || resultsRead[0].vehicle_body_in == true
			|| resultsRead[0].fileNameScale_ticket_in !== null) {
			if (resultsRead[0].internal_status_ID == uploadFinished) {
				await UPDATE(CargoOrders, req.params[0].ID).with(
					{ internal_status_ID: unauthorizedExit, check_in: true, reason_in_ID: reasonIn, remark_sticket_in: remarkSticketIn });
				return req.notify(orderWasunauthorized, resultsRead[0].order_id);
			}
			else {
				if (resultsRead[0].internal_status_ID !== uploadFinished) {
					return req.notify(notYetAuthorized);
				}
				if (resultsRead[0].internal_status_ID == unauthorizedExit) {
					return req.notify(unauthorizedAlreadyUnauthorized);
				}

				if (resultsRead[0].internal_status_ID == authorizedExit) {
					return req.notify(unauthorizedAlreadyAuthorized);
				}
			}
		}
		else {
			return req.notify(requiredFields);
		}
	});

});



