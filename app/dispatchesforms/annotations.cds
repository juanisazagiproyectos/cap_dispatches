using CatalogService as service from '../../srv/catalog-service';

annotate service.DispatchesForms with {
    order_id                 @title : '{i18n>Order}'                @readonly;
    internal_status          @title : '{i18n>Status}'               @readonly;
    cargo_date               @title : '{i18n>Cargo_date}'           @readonly;
    department_route         @title : '{i18n>Department_route}'     @readonly;
    city_route               @title : '{i18n>City_route}'           @readonly;
    vehicle_plate            @title : '{i18n>Vehicle_plate}'        @readonly;
    trailer                  @title : '{i18n>Trailer}'              @readonly;
    capacity                 @title : '{i18n>Capacity}'             @readonly;
    id_card                  @title : '{i18n>ID Card} '             @readonly;
    driver_name              @title : '{i18n>Driver_name}'          @readonly;
    driver_last_name         @title : '{i18n>Driver_last_name}'     @readonly;
    cell_phone_number        @title : '{i18n>Cell_phone_number}'    @readonly;
    driving_license          @title : '{i18n>Driving_license}'      @readonly;
    pdf_id_card              @title : '{i18n>PDF_ID_Card}'          @readonly;
    driver_photo             @title : '{i18n>Driver_photo}'         @readonly;
    pdf_license              @title : '{i18n>PDF_license}'          @readonly;
    pdf_social_security      @title : '{i18n>PDF_social_security}'  @readonly;
    remarks                  @UI.MultiLineText                      @title : '{i18n>Remarks}'  @readonly;
    sap_order                @title : '{i18n>sap_order}'            @readonly;
    remarksOrdersManagement  @UI.MultiLineText                      @title : '{i18n>Remarks}'  @readonly;
    vehicle_cabin_in         @title : '{i18n>cabin}'                @readonly;
    vehicle_engine_in        @title : '{i18n>engine}'               @readonly;
    vehicle_body_in          @title : '{i18n>body}'                 @readonly;
    scale_ticket_in          @title : '{i18n>ticket}'               @readonly;
    remark_sticket_in        @UI.MultiLineText                      @title : '{i18n>Remarks}';
    vehicle_cabin_out        @title : '{i18n>cabin}'                @readonly;
    vehicle_engine_out       @title : '{i18n>engine}'               @readonly;
    vehicle_body_out         @title : '{i18n>body}'                 @readonly;
    scale_ticket_out         @title : '{i18n>ticket}'               @readonly;
    remark_sticket_out       @UI.MultiLineText                      @title : '{i18n>Remarks}';

};

annotate service.DispatchesForms with @(UI.PresentationVariant : {
    SortOrder      : [{
        Property   : order_id,
        Descending : true,
    }, ],
    Visualizations : ['@UI.LineItem', ],
}, );


annotate service.DispatchesForms with @(UI.Identification : [{
    $Type                     : 'UI.DataFieldForAction',
    Action                    : 'CatalogService.formsAction',
    Label                     : 'Selection Forms',
    Criticality               : 1,
    CriticalityRepresentation : #WithIcon,
}, ], );

annotate service.DispatchesForms with @(UI : {

    HeaderInfo                : {
        TypeName       : '{i18n>Order}',
        TypeNamePlural : '{i18n>Orders}',
        Title          : {
            $Type : 'UI.DataField',
            Value : order_id
        },
        Description    : {
            $Type : 'UI.DataField',
            Value : internal_status.description
        },
        ImageUrl       : internal_status.icon,

    },

    SelectionFields           : [internal_status_ID],

    LineItem                  : [
        {Value : internal_status.icon},
        {
            Label : '{i18n>Status}',
            Value : internal_status.description
        },
        {Value : cargo_date},
        {Value : vehicle_plate},
        {Value : trailer},
        {Value : capacity},
        {Value : id_card}
    ],
    FieldGroup #Dispatch      : {Data : [
        {Value : cargo_date},
        {Value : department_route_code},
        {Value : city_route_code}
    ]},

    FieldGroup #Car           : {Data : [
        {Value : vehicle_plate},
        {Value : trailer},
        {Value : capacity}
    ]},

    FieldGroup #Driver        : {Data : [
        {Value : id_card},
        {Value : driver_name},
        {Value : driver_last_name},
        {Value : driving_license},
        {Value : cell_phone_number}
    ]},

    FieldGroup #Document      : {Data : [
        {Value : driver_photo},
        {Value : pdf_id_card},
        {Value : pdf_license},
        {Value : pdf_social_security}
    ]},

    FieldGroup #Remarks       : {Data : [{Value : remarks}]},

    FieldGroup #Approval      : {Data : [
        {Value : sap_order},
        {Value : remarksOrdersManagement}
    ]},

    FieldGroup #Input_review  : {Data : [
        {Value : vehicle_cabin_in},
        {Value : vehicle_engine_in},
        {Value : vehicle_body_in},
        {Value : scale_ticket_in},
        {Value : remark_sticket_in}

    ]},

    FieldGroup #Output_review : {Data : [
        {Value : vehicle_cabin_out},
        {Value : vehicle_engine_out},
        {Value : vehicle_body_out},
        {Value : scale_ticket_out},
        {Value : remark_sticket_out}

    ]},
    Facets                    : [
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
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>input_review}',
            Target : '@UI.FieldGroup#Input_review'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>output_review}',
            Target : '@UI.FieldGroup#Output_review'
        }
    ],
}, ) {};

//Help Value Department
annotate service.DispatchesForms with {
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
annotate service.DispatchesForms with {
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

//Help value Status
annotate service.DispatchesForms with {
    internal_status @(Common : {
        Text      : {
            $value                 : internal_status.description,
            ![@UI.TextArrangement] : #TextOnly,
        },
        ValueList : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'InternalStatus',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : internal_status_ID,
                    ValueListProperty : 'ID'
                },
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : internal_status_ID,
                    ValueListProperty : 'description'
                }
            ]
        },
    });
};

//Control CRUD
annotate service.DispatchesForms with @(Capabilities : {
    DeleteRestrictions : {
        $Type     : 'Capabilities.DeleteRestrictionsType',
        Deletable : false
    },
    UpdateRestrictions : {
        $Type     : 'Capabilities.UpdateRestrictionsType',
        Updatable : false
    },
    InsertRestrictions : {
        $Type      : 'Capabilities.InsertRestrictionsType',
        Insertable : false
    }
});

annotate service.DispatchesForms with @(UI.UpdateHidden : true, );
