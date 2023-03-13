using CatalogService as service from '../../srv/catalog-service';

annotate service.VehiculeSecurityReview with {
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
    vehicle_cabin_in         @title : '{i18n>cabin}'                @mandatory;
    vehicle_engine_in        @title : '{i18n>engine}'               @mandatory;
    vehicle_body_in          @title : '{i18n>body}'                 @mandatory;
    scale_ticket_in          @title : '{i18n>ticket}'               @mandatory;
    remark_sticket_in        @UI.MultiLineText                      @title : '{i18n>Remarks}';
    vehicle_cabin_out        @title : '{i18n>cabin}'                @mandatory;
    vehicle_engine_out       @title : '{i18n>engine}'               @mandatory;
    vehicle_body_out         @title : '{i18n>body}'                 @mandatory;
    scale_ticket_out         @title : '{i18n>ticket}'               @mandatory;
    remark_sticket_out       @UI.MultiLineText                      @title : '{i18n>Remarks}';

}

annotate service.VehiculeSecurityReview with @(UI : {

    HeaderInfo                : {
        TypeName       : '{i18n>Order}',
        TypeNamePlural : '{i18n>Orders}',
        Title          : {
            $Type : 'UI.DataField',
            Value : order_id
        },
        Description    : {
            $Type : 'UI.DataField',
            Value : internal_status.name
        },
        ImageUrl       : internal_status.icon
    },

    SelectionFields           : [internal_status.name],

    LineItem                  : [
        {Value : internal_status.icon},
        {
            Label : '{i18n>Status}',
            Value : internal_status.name
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
        {Value : remark_sticket_in},
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'CatalogService.reviewInApproveAction',
            Label             : '{i18n>Approve}',
            ![@UI.Emphasized] : true,
        },
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'CatalogService.reviewInRejectAction',
            Label             : '{i18n>Reject}',
            ![@UI.Emphasized] : true,
        }

    ]},

    FieldGroup #Output_review : {Data : [
        {Value : vehicle_cabin_out},
        {Value : vehicle_engine_out},
        {Value : vehicle_body_out},
        {Value : scale_ticket_out},
        {Value : remark_sticket_out},
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'CatalogService.reviewOutApproveAction',
            Label             : '{i18n>Approve}',
            ![@UI.Emphasized] : true,
        },
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'CatalogService.reviewOutRejectAction',
            Label             : '{i18n>Reject}',
            ![@UI.Emphasized] : true,
        }


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
annotate service.VehiculeSecurityReview with {
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
annotate service.VehiculeSecurityReview with {
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

annotate service.VehiculeSecurityReview with @(Capabilities : {
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
