using {com.dispatches as dispatches} from '../db/schema';

service CatalogService {

    entity CargoOrders            as projection on dispatches.CargoOrders;
    annotate CargoOrders with @odata.draft.enabled;

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

    //Status Order
    entity StatusOrder            as projection on dispatches.StatusOrder;
    //Help Value Deparment
    entity Department             as projection on dispatches.Department;
    annotate Department with @odata.draft.enabled;
    //Help Value City
    entity City                   as projection on dispatches.City;
    annotate City with @odata.draft.enabled;

    //Cargo order management
    entity OrdersManagement       as projection on dispatches.CargoOrders actions {
        action orderRejectAction(  @(title : '{i18n>Note}')  @(UI.MultiLineText)  input : String);
        action orderApproveAction();
    };

    annotate OrdersManagement with @odata.draft.enabled;

    //Vehicule Security Review
    entity VehiculeSecurityReview as projection on dispatches.CargoOrders actions {
        action reviewInRejectAction(   @(title : '{i18n>Note}')  @(UI.MultiLineText)  input : String);
        action reviewInApproveAction();
        action reviewOutRejectAction(  @(title : '{i18n>Note}')  @(UI.MultiLineText)  input : String);
        action reviewOutApproveAction();
    };

    annotate VehiculeSecurityReview with @odata.draft.enabled;
    
    //Dispatches Forms
    entity DispatchesForms        as projection on dispatches.CargoOrders;
    annotate DispatchesForms with @odata.draft.enabled;

    //Management Apps
    entity ManagementApps         as projection on dispatches.ManagementApps;
    annotate ManagementApps with @odata.draft.enabled;

// entity VehicleEntrySecurityCheck as projection on dispatches.CargoOrders;
// annotate VehicleEntrySecurityCheck with @odata.draft.enabled;
// entity VehicleExitSecurityCheck  as projection on dispatches.CargoOrders;
// annotate VehicleExitSecurityCheck with @odata.draft.enabled;
// action orderRejectAction(@(title : '{i18n>Note}') @(UI.MultiLineText)input : String);
// action orderApproveAction();
}
