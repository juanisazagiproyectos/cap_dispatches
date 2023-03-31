using {com.dispatches as dispatches} from '../db/schema';

service CatalogService {

    entity CargoOrders                                               as projection on dispatches.CargoOrders;
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
    entity StatusOrder                                               as projection on dispatches.StatusOrder;
    //Internal Status
    entity InternalStatus                                            as projection on dispatches.InternalStatus;
    //Rejection Reasons
    entity RejectionReasons                                          as projection on dispatches.RejectionReasons;
    //Help Value Deparment
    entity Department                                                as projection on dispatches.Department;
    //Help Value City
    entity City                                                      as projection on dispatches.City;

    //Cargo order management
    entity OrdersManagement        @(cds.redirection.target : false) as projection on dispatches.CargoOrders actions {
                                 // @(
        //     cds.odata.bindingparameter.name : '_it',
        //     Common.SideEffects              : {TargetProperties : ['_it/status_order_ID']}
        // )
        @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects              : {TargetProperties : [
                '_it/reason_in_ID',
                '_it/remarksOrdersManagement'
            ]}
        )
        // action orderRejectAction(  @(title : '{i18n>Note}')  @(UI.MultiLineText)  input : String);
        action orderRejectAction(
                                 @(
                                     title                    : '{i18n>reason}',
                                     UI.ParameterDefaultValue : _it.reason_in_ID,
                                     Common                   : {
                                         ValueListWithFixedValues : true,
                                         ValueList                : {
                                             Label          : '{i18n>reason}',
                                             CollectionPath : 'RejectionReasons',
                                             Parameters     : [
                                                 {
                                                     $Type             : 'Common.ValueListParameterInOut',
                                                     ValueListProperty : 'ID',
                                                     LocalDataProperty : newReason
                                                 },
                                                 {
                                                     $Type             : 'Common.ValueListParameterDisplayOnly',
                                                     ValueListProperty : 'description'
                                                 },
                                             ]
                                         }
                                     }
                                 )
               newReason : Integer @mandatory,
                                   @(title : '{i18n>Note}')  @(UI.MultiLineText)  note : String);
                                 @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects              : {TargetProperties : ['_it/status_order_ID']}
        )
        action orderApproveAction();
    };

    //Vehicule Security Review
    entity VehiculeSecurityReview  @(cds.redirection.target : false) as projection on dispatches.CargoOrders actions {
                                     // action reviewInRejectAction(   @(title : '{i18n>Note}')  @(UI.MultiLineText)  input : String);
        @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects              : {TargetProperties : [
                '_it/internal_status_ID',
                '_it/check_in'
            ]}
        )
        action reviewInApproveAction();
                                     @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects              : {TargetProperties : [
                '_it/reason_in_ID',
                '_it/internal_status_ID',
                '_it/check_in'
            ]}
        )
        action reviewInRejectAction(
                                     @(
                                        title                    : '{i18n>reason}',
                                        UI.ParameterDefaultValue : _it.reason_in_ID,
                                        Common                   : {
                                            ValueListWithFixedValues : true,
                                            ValueList                : {
                                                Label          : '{i18n>reason}',
                                                CollectionPath : 'RejectionReasons',
                                                Parameters     : [
                                                    {
                                                        $Type             : 'Common.ValueListParameterInOut',
                                                        ValueListProperty : 'ID',
                                                        LocalDataProperty : newReason
                                                    },
                                                    {
                                                        $Type             : 'Common.ValueListParameterDisplayOnly',
                                                        ValueListProperty : 'description'
                                                    },
                                                ]
                                            }
                                        }
                                    )
               newReason : Integer @mandatory,
                                   @(title : '{i18n>Note}')  @(UI.MultiLineText)  note : String);
                                     @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects              : {TargetProperties : [
                '_it/internal_status_ID',
                '_it/check_in'
            ]}
        )
        action reviewOutApproveAction();
                                     @(
            cds.odata.bindingparameter.name : '_it',
            Common.SideEffects              : {TargetProperties : [
                '_it/reason_in_ID',
                '_it/internal_status_ID',
                '_it/check_in'
            ]}
        )
        action reviewOutRejectAction(
                                     @(
                                         title                    : '{i18n>reason}',
                                         UI.ParameterDefaultValue : _it.reason_in_ID,
                                         Common                   : {
                                             ValueListWithFixedValues : true,
                                             ValueList                : {
                                                 Label          : '{i18n>reason}',
                                                 CollectionPath : 'RejectionReasons',
                                                 Parameters     : [
                                                     {
                                                         $Type             : 'Common.ValueListParameterInOut',
                                                         ValueListProperty : 'ID',
                                                         LocalDataProperty : newReason
                                                     },
                                                     {
                                                         $Type             : 'Common.ValueListParameterDisplayOnly',
                                                         ValueListProperty : 'description'
                                                     },
                                                 ]
                                             }
                                         }
                                     )
               newReason : Integer @mandatory,
                                   @(title : '{i18n>Note}')  @(UI.MultiLineText)  note : String);

    };

    //Dispatches Forms
    entity DispatchesForms @(cds.redirection.target : false)         as projection on dispatches.CargoOrders actions {
        action formsAction();
    };

    //Management Apps
    entity ManagementApps                                            as projection on dispatches.ManagementApps;
    //Loose Bag National Cargo
    entity LooseBagNationalCargo                                     as projection on dispatches.LooseBagNationalCargo;
    //BigBag National Cargo
    entity BigBagNationalCargo                                       as projection on dispatches.BigBagNationalCargo;
    // entity VehicleEntrySecurityCheck as projection on dispatches.CargoOrders;
    // annotate VehicleEntrySecurityCheck with @odata.draft.enabled;
    // entity VehicleExitSecurityCheck  as projection on dispatches.CargoOrders;
    // annotate VehicleExitSecurityCheck with @odata.draft.enabled;
    annotate CargoOrders with @odata.draft.enabled;
    annotate Department with @odata.draft.enabled;
    annotate City with @odata.draft.enabled;
    annotate OrdersManagement with @odata.draft.enabled;
    annotate VehiculeSecurityReview with @odata.draft.enabled;
    annotate DispatchesForms with @odata.draft.enabled;
    annotate ManagementApps with @odata.draft.enabled;
    annotate LooseBagNationalCargo with @odata.draft.enabled;
    annotate BigBagNationalCargo with @odata.draft.enabled;

};
