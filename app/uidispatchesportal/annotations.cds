using CatalogService as service from '../../srv/catalog-service';

annotate service.CargoOrders with {
    order_id            @title : '{i18n>Order}'              @readonly;
    status_order        @title : '{i18n>Status}'             @readonly;
    cargo_date          @title : '{i18n>Cargo_date}';
    department_route    @title : '{i18n>Department_route}';
    city_route          @title : '{i18n>City_route}';
    vehicle_plate       @title : '{i18n>Vehicle_plate}';
    trailer             @title : '{i18n>Trailer}';
    capacity            @title : '{i18n>Capacity}';
    id_card             @title : '{i18n>ID Card} ';
    driver_name         @title : '{i18n>Driver_name}';
    driver_last_name    @title : '{i18n>Driver_last_name}';
    cell_phone_number   @title : '{i18n>Cell_phone_number}'  @Communication.IsPhoneNumber;
    driving_license     @title : '{i18n>Driving_license}';
    pdf_id_card         @title : '{i18n>PDF_ID_Card}';
    driver_photo        @title : '{i18n>Driver_photo}';
    pdf_license         @title : '{i18n>PDF_license}';
    pdf_social_security @title : '{i18n>PDF_social_security}';
    remarks             @UI.MultiLineText                    @title : '{i18n>Remarks}';

}

annotate service.CargoOrders with @(UI : {

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
        {Value : status_order.name},
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
        }
    ],
}, ) {};

//Help Value Department
annotate service.CargoOrders with {
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


annotate service.Department with {
    code        @(
        UI     : {Hidden : true},
        Common : {Text : {
            $value                 : description,
            ![@UI.TextArrangement] : #TextOnly,
        }}
    );
    description @(UI : {HiddenFilter : true});
}

//Help Value City
annotate service.CargoOrders with {
    city_route @(Common : {
        Text            : city_route.description,
        TextArrangement : #TextOnly,
        ValueList       : {
            $Type          : 'Common.ValueListType',
            Label          : '{i18n>City_route}',
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


// city_route @(Common : {
//     Text                     : city_route.description,
//     TextArrangement          : #TextFirst,
//     ValueListWithFixedValues : true,
//     ValueList                : {
//         Label          : '{i18n>City_route}',
//         CollectionPath : 'City',
//         Parameters     : [
//             {
//                 $Type             : 'Common.ValueListParameterInOut',
//                 ValueListProperty : 'code',
//                 LocalDataProperty : city_route_code
//             },
//             {
//                 $Type             : 'Common.ValueListParameterOut',
//                 ValueListProperty : 'description',
//                 LocalDataProperty : city_route.description,
//             },
//             //To only show the connected values
//             {
//                 $Type             : 'Common.ValueListParameterFilterOnly',
//                 ValueListProperty : 'department_code',
//             },
//             {
//                 $Type             : 'Common.ValueListParameterIn', //Input parameter used for filtering
//                 LocalDataProperty : department_route_code,
//                 ValueListProperty : 'department_code',
//             },

//         ]
//     }
// });


annotate service.City with {
    code        @(
        UI     : {Hidden : true},
        Common : {Text : {
            $value                 : description,
            ![@UI.TextArrangement] : #TextOnly,
        }}
    );
    description @(UI : {HiddenFilter : true});
};
