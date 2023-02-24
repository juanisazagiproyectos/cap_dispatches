using {com.dispatches as dispatches} from '../db/schema';

service CatalogService {
    // entity CargoOrders @(restrict : [
    //     {
    //         grant : ['READ'],
    //         to    : ['dispatchesViewer']
    //     },
    //     {
    //         grant : [
    //             'READ',
    //             'CREATE'
    //         ],
    //         to    : ['dispatchesCreate']
    //     },
    //     {
    //         grant : [
    //             'READ',
    //             'UPDATE'
    //         ],
    //         to    : ['dispatchesUpdate']
    //     },
    //     {
    //         grant : [
    //             'READ',
    //             'DELETE'
    //         ],
    //         to    : ['dispatchesDelete']
    //     },
    //     {
    //         grant : ['*'],
    //         to    : ['dispatchesManager']
    //     }
    // ]) as projection on dispatches.CargoOrders;

    entity CargoOrders             as projection on dispatches.CargoOrders;
    annotate CargoOrders with @odata.draft.enabled;
    entity Department              as projection on dispatches.Department;
    annotate Department with @odata.draft.enabled;
    entity City                    as projection on dispatches.City;
    annotate City with @odata.draft.enabled;
    entity ManagementApps          as projection on dispatches.ManagementApps;
    annotate ManagementApps with @odata.draft.enabled;
    entity OrdersManagement        as projection on dispatches.CargoOrders;
    annotate OrdersManagement with @odata.draft.enabled;
    entity VehiculeSecurityReview as projection on dispatches.CargoOrders;
    annotate VehiculeSecurityReview with @odata.draft.enabled;
}
