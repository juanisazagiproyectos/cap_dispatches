using CatalogService as service from '../../srv/catalog-service';

annotate service.OrdersManagement with {
    order_id                 @title : '{i18n>Order}'                @readonly;
    status_order_code        @title : '{i18n>Status}'               @readonly;
    cargo_date               @title : '{i18n>Cargo_date}'           @readonly;
    department_route         @title : '{i18n>Department_route}'     @readonly;
    city_route               @title : '{i18n>City_route}'           @readonly;
    vehicle_plate            @title : '{i18n>Vehicle_plate}'        @readonly;
    trailer                  @title : '{i18n>Trailer}'              @readonly;
    capacity                 @title : '{i18n>Capacity}'             @readonly;
    id_card                  @title : '{i18n>ID Card} '             @readonly;
    driver_name              @title : '{i18n>Driver_name}'          @readonly;
    driver_last_name         @title : '{i18n>Driver_last_name}'     @readonly;
    cell_phone_number        @title : '{i18n>Cell_phone_number}'    @readonly                  @Communication.IsPhoneNumber;
    driving_license          @title : '{i18n>Driving_license}'      @readonly;
    pdf_id_card              @title : '{i18n>PDF_ID_Card}'          @readonly;
    driver_photo             @title : '{i18n>Driver_photo}'         @readonly;
    pdf_license              @title : '{i18n>PDF_license}'          @readonly;
    pdf_social_security      @title : '{i18n>PDF_social_security}'  @readonly;
    remarks                  @UI.MultiLineText                      @title : '{i18n>Remarks}'  @readonly;
    sap_order                @title : '{i18n>sap_order}'            @mandatory;
    remarksOrdersManagement  @UI.MultiLineText                      @title : '{i18n>Remarks}';

}

annotate service.OrdersManagement with @(UI : {

    HeaderInfo           : {
        TypeName       : '{i18n>Order}',
        TypeNamePlural : '{i18n>Orders}',
        Title          : {
            $Type : 'UI.DataField',
            Value : order_id
        },
        Description    : {
            $Type : 'UI.DataField',
            Value : status_order.name
        },
        ImageUrl       : status_order.icon
    },

    SelectionFields      : [status_order.name],

    LineItem             : [
        {Value : status_order.icon},
        {
            Label : '{i18n>Status}',
            Value : status_order.name
        },
        {Value : cargo_date},
        {Value : vehicle_plate},
        {Value : trailer},
        {Value : capacity},
        {Value : id_card}
    ],

    FieldGroup #Dispatch : {Data : [
        {Value : cargo_date},
        {Value : department_route_code},
        {Value : city_route_code}
    ]},

    FieldGroup #Car      : {Data : [
        {Value : vehicle_plate},
        {Value : trailer},
        {Value : capacity}
    ]},

    FieldGroup #Driver   : {Data : [
        {Value : id_card},
        {Value : driver_name},
        {Value : driver_last_name},
        {Value : driving_license},
        {Value : cell_phone_number}
    ]},

    FieldGroup #Document : {Data : [
        {Value : driver_photo},
        {Value : pdf_id_card},
        {Value : pdf_license},
        {Value : pdf_social_security}
    ]},

    FieldGroup #Remarks  : {Data : [{Value : remarks}]},

    FieldGroup #Approval : {Data : [
        {Value : sap_order},
        {Value : remarksOrdersManagement},
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'CatalogService.orderApproveAction',
            Label             : '{i18n>Approve}',
            ![@UI.Emphasized] : true,
        },
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'CatalogService.orderRejectAction',
            Label             : '{i18n>Reject}',
            ![@UI.Emphasized] : true,
        }
    ]},

    Facets               : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Dispatch}',
            Target : '@UI.FieldGroup#Dispatch'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Vehicle}',
            Target : '@UI.FieldGroup#Car'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Driver}',
            Target : '@UI.FieldGroup#Driver'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Documents}',
            Target : '@UI.FieldGroup#Document'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Remarks}',
            Target : '@UI.FieldGroup#Remarks'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Approval}',
            Target : '@UI.FieldGroup#Approval'
        }
    ],
}, ) {};

//Help Value Department
annotate service.OrdersManagement with {
    department_route @(Common : {
        Text            : department_route.description,
        TextArrangement : #TextOnly,
        ValueList       : {
            $Type          : 'Common.ValueListType',
            Label          : '{i18n>Department_route}',
            CollectionPath : 'Department',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : department_route_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'description'
                }
            ]
        }
    });
};


//Help Value City
annotate service.OrdersManagement with {
    city_route @(Common : {
        Text            : city_route.description,
        TextArrangement : #TextOnly,
        ValueList       : {
            $Type          : 'Common.ValueListType',
            Label          : '{i18n>city_route}',
            CollectionPath : 'City',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : city_route_code,
                    ValueListProperty : 'code'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'description'
                }
            ]
        }
    });
};

annotate service.OrdersManagement with @(Capabilities : {
    DeleteRestrictions : {
        $Type     : 'Capabilities.DeleteRestrictionsType',
        Deletable : false
    },
    UpdateRestrictions : {
        $Type     : 'Capabilities.UpdateRestrictionsType',
        Updatable : true
    },
    InsertRestrictions : {
        $Type      : 'Capabilities.InsertRestrictionsType',
        Insertable : false
    }
});
