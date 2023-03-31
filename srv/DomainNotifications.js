// const { NotificationService } = require("./util/NotificationAPI");

// const NOTIF_TYPE_KEY = "SupplyWarning";
// const NOTIF_TYPE_VERSION = "1.0";

// function createNotificationType() {
//     return {
//         NotificationTypeKey: NOTIF_TYPE_KEY,
//         NotificationTypeVersion: NOTIF_TYPE_VERSION,
//         Templates: [
//             {
//                 Language: "en",
//                 TemplateSensitive: "Order has been created {{order_id}}",
//                 TemplatePublic: "New order detected",
//                 TemplateGrouped: "With upload date {{cargo_date}}",
//                 TemplateLanguage: "Mustache",
//                 Subtitle: "The order {{order_id}} needs to be reviewed"
//             }
//         ]
//     }
// }

// function createNotification({ order_id, cargo_date, createdBy }) {

//     return {
//         OriginId: "supply-warn-backend",
//         NotificationTypeKey: NOTIF_TYPE_KEY,
//         NotificationTypeVersion: NOTIF_TYPE_VERSION,
//         NavigationTargetAction: "display",
//         NavigationTargetObject: "masterDetail",
//         Priority: "High",
//         ProviderId: "",
//         ActorId: "",
//         ActorType: "",
//         ActorDisplayText: "",
//         ActorImageURL: "",
//         Properties: [
//             {
//                 Key: "order_id",
//                 Language: "en",
//                 Value: order_id,
//                 Type: "String",
//                 IsSensitive: false
//             },
//             {
//                 Key: "cargo_date",
//                 Language: "en",
//                 Value: cargo_date,
//                 Type: "String",
//                 IsSensitive: false
//             },
//             {
//                 Key: "createdBy",
//                 Language: "en",
//                 Value: createdBy,
//                 Type: "String",
//                 IsSensitive: false
//             }
//         ],
//         // Recipients: recipients.map(recipient => ({ RecipientId: recipient })),
//     }
// }

// async function publishSupplyWarningNotification(notification) {
//     const notifTypes = await NotificationService.getNotificationTypes();
//     const notifType = notifTypes.find(nType => nType.NotificationTypeKey === NOTIF_TYPE_KEY && nType.NotificationTypeVersion === NOTIF_TYPE_VERSION);
//     if (!notifType) {
//         console.log(`Notification Type of key ${NOTIF_TYPE_KEY} and version ${NOTIF_TYPE_VERSION} was not found. Creating it...`);
//         await NotificationService.postNotificationType(createNotificationType());
//     }
//     return await NotificationService.postNotification(createNotification(notification));
// }

// module.exports = { publishSupplyWarningNotification };