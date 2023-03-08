namespace com.dispatches;

using {managed} from '@sap/cds/common';

entity CargoOrders                                 @(cds.autoexpose) : managed {
    key ID                          : UUID         @(Core.Computed : true);
        order_id                    : Integer      @assert.range   : [
            0000000001,
            9999999999
        ];
        status_order                : String(10);
        status_indicator            : String(50);
        cargo_date                  : Date;
        department_route            : Association to Department;
        city_route                  : Association to City;
        vehicle_plate               : String(6);
        trailer                     : String(10);
        capacity                    : Integer;
        id_card                     : String(10);
        driver_name                 : String(50);
        driver_last_name            : String(50);
        cell_phone_number           : String(12);
        driving_license             : String(10);
        driver_photo                : LargeBinary  @Core.MediaType : 'file/jpg'  @Core.ContentDisposition.Filename : fileNameDriver_photo         @Core.ContentDisposition.Type : 'inline';
        fileNameDriver_photo        : String;
        pdf_id_card                 : LargeBinary  @Core.MediaType : 'file/pdf'  @Core.ContentDisposition.Filename : fileNamePdf_id_card          @Core.ContentDisposition.Type : 'inline';
        fileNamePdf_id_card         : String;
        pdf_license                 : LargeBinary  @Core.MediaType : 'file/pdf'  @Core.ContentDisposition.Filename : fileNamePdf_license          @Core.ContentDisposition.Type : 'inline';
        fileNamePdf_license         : String;
        pdf_social_security         : LargeBinary  @Core.MediaType : 'file/pdf'  @Core.ContentDisposition.Filename : fileNamePdf_social_security  @Core.ContentDisposition.Type : 'inline';
        fileNamePdf_social_security : String;
        sap_order                   : String(10);
        remarks                     : LargeString;
        remarksOrdersManagement     : LargeString;
        vehicle_cabin_in            : Boolean;
        vehicle_engine_in           : Boolean;
        vehicle_body_in             : Boolean;
        scale_ticket_in             : LargeBinary  @Core.MediaType : 'file/jpg'  @Core.ContentDisposition.Filename : fileNameScale_ticket_in      @Core.ContentDisposition.Type : 'inline';
        fileNameScale_ticket_in     : String;
        vehicle_cabin_out           : Boolean;
        vehicle_engine_out          : Boolean;
        vehicle_body_out            : Boolean;
        scale_ticket_out            : LargeBinary  @Core.MediaType : 'file/jpg'  @Core.ContentDisposition.Filename : fileNameScale_ticket_out     @Core.ContentDisposition.Type : 'inline';
        fileNameScale_ticket_out    : String;
};

entity Department : managed {
    key code        : Integer;
        description : String;
};

entity City : managed {
    key code        : Integer;
        department  : Association to Department;
        description : String;
};

entity Driver : managed {
    key id_card              : String(10);
        driver_name          : String(50);
        driver_last_name     : String(50);
        cell_phone_number    : Integer;
        driving_license      : String(10);
        driver_photo         : LargeBinary  @Core.MediaType : 'file/jpg'  @Core.ContentDisposition.Filename : fileNameDriver_photo  @Core.ContentDisposition.Type : 'inline';
        fileNameDriver_photo : String;
        pdf_id_card          : LargeBinary  @Core.MediaType : 'file/pdf'  @Core.ContentDisposition.Filename : fileNamePdf_id_card   @Core.ContentDisposition.Type : 'inline';
        fileNamePdf_id_card  : String;
        pdf_license          : LargeBinary  @Core.MediaType : 'file/pdf'  @Core.ContentDisposition.Filename : fileNamePdf_license   @Core.ContentDisposition.Type : 'inline';
        fileNamePdf_license  : String;
};

entity Vehicle : managed {
    key plate_id : String(6);
        capacity : Integer;
        trailer  : String(10);
};

entity ManagementApps : managed {
    key ID          : UUID @(Core.Computed : true);
    key description : String;
        Text01      : String;
        Text02      : String;
};


// entity VehicleEntrySecurityCheck : managed {
//     key order_id             : Integer;
//         status_order         : String(10);
//         status_indicator     : String(50);
//         vehicle_cabin        : Boolean;
//         vehicle_engine       : Boolean;
//         vehicle_body         : Boolean;
//         scale_ticket         : LargeBinary  @Core.MediaType : 'file/jpg'  @Core.ContentDisposition.Filename : fileNameScale_ticket  @Core.ContentDisposition.Type : 'inline';
//         fileNameScale_ticket : String;
// }

// entity VehicleExitSecurityCheck : managed {
//     key order_id             : Integer;
//         status_order         : String(10);
//         status_indicator     : String(50);
//         vehicle_cabin        : Boolean;
//         vehicle_engine       : Boolean;
//         vehicle_body         : Boolean;
//         scale_ticket         : LargeBinary  @Core.MediaType : 'file/jpg'  @Core.ContentDisposition.Filename : fileNameScale_ticket  @Core.ContentDisposition.Type : 'inline';
//         fileNameScale_ticket : String;
// }

entity MediaFile {
    key id        : Integer;
        @Core.MediaType   : mediaType
        content   : LargeBinary;
        @Core.IsMediaType : true
        mediaType : String;
        fileName  : String;
        url       : String;
};

entity Shift : managed {
    key ID          : UUID @(Core.Computed : true);
        description : String;
}

entity BigBagNationalCargo : managed {
    key ID                        : UUID @(Core.Computed : true);
    key order                     : Association to CargoOrders;
        status                    : String(10);
        status_indicator          : String(50);
        shift                     : Association to Shift;
        image01                   : String(1);
        image02                   : String(1);
        image03                   : String(1);
        image04                   : String(1);
        image05                   : String(1);
        image06                   : String(1);
        answer01                  : String(1);
        answer02                  : String(1);
        answer03                  : String(1);
        answer04                  : String(1);
        answer05                  : String(1);
        answer06                  : String(1);
        answer07                  : String(1);
        answer08                  : String(1);
        answer09                  : String(1);
        answer10                  : String(1);
        driver_signature          : String(50);
        driver_signature_date     : DateTime;
        auxiliary_signature       : String(50);
        auxiliary_signature_date  : DateTime;
        supervisor_signature      : String(50);
        supervisor_signature_date : DateTime;
        remarks                   : LargeString;
};

entity LooseBagNationalCargo : managed {
    key ID                        : UUID @(Core.Computed : true);
    key order                     : Association to CargoOrders;
        status                    : String(10);
        status_indicator          : String(50);
        shift                     : Association to Shift;
        image01                   : String(1);
        image02                   : String(1);
        image03                   : String(1);
        image04                   : String(1);
        image05                   : String(1);
        image06                   : String(1);
        answer01                  : String(1);
        answer02                  : String(1);
        answer03                  : String(1);
        answer04                  : String(1);
        answer05                  : String(1);
        answer06                  : String(1);
        answer07                  : String(1);
        answer08                  : String(1);
        answer09                  : String(1);
        answer10                  : String(1);
        driver_signature          : String(50);
        driver_signature_date     : DateTime;
        auxiliary_signature       : String(50);
        auxiliary_signature_date  : DateTime;
        supervisor_signature      : String(50);
        supervisor_signature_date : DateTime;
        remarks                   : LargeString;
};

entity Deliver_documents : managed {
    key ID                        : UUID @(Core.Computed : true);
    key order                     : Association to CargoOrders;
        status                    : String(10);
        status_indicator          : String(50);
        shift                     : Association to Shift;
        remission                 : String(50);
        quality_certificate       : String(1);
        invoice                   : String(1);
        import_declaration        : String(1);
        driver_signature          : String(50);
        driver_signature_date     : DateTime;
        auxiliary_signature       : String(50);
        auxiliary_signature_date  : DateTime;
        supervisor_signature      : String(50);
        supervisor_signature_date : DateTime;
        remarks                   : LargeString;
};

entity Authorization_Leave : managed {
    key ID                        : UUID @(Core.Computed : true);
    key order                     : Association to CargoOrders;
        status                    : String(10);
        status_indicator          : String(50);
        shift                     : Association to Shift;
        driver_signature          : String(50);
        driver_signature_date     : DateTime;
        auxiliary_signature       : String(50);
        auxiliary_signature_date  : DateTime;
        supervisor_signature      : String(50);
        supervisor_signature_date : DateTime;
        remarks                   : LargeString;
};

entity SAP_Transport_Order : managed {
    key ID                        : UUID @(Core.Computed : true);
    key order                     : Association to CargoOrders;
        status                    : String(10);
        status_indicator          : String(50);
        shift                     : Association to Shift;
        driver_signature          : String(50);
        driver_signature_date     : DateTime;
        auxiliary_signature       : String(50);
        auxiliary_signature_date  : DateTime;
        supervisor_signature      : String(50);
        supervisor_signature_date : DateTime;
        remarks                   : LargeString;
};

entity NationalCargo : managed {
    key ID                        : UUID @(Core.Computed : true);
    key order                     : Association to CargoOrders;
        status                    : String(10);
        status_indicator          : String(50);
        shift                     : Association to Shift;
        product                   : String(10);
        item                      : String(4);
        batch                     : String(10);
        kg                        : String(10);
        numero                    : String(10);
        answer01                  : String(1);
        answer02                  : String(1);
        answer03                  : String(1);
        answer04                  : String(1);
        answer05                  : String(1);
        answer06                  : String(1);
        answer07                  : String(1);
        answer08                  : String(1);
        answer09                  : String(1);
        answer10                  : String(1);
        answer11                  : String(1);
        answer12                  : String(1);
        answer13                  : String(1);
        answer14                  : String(1);
        answer15                  : String(1);
        forklift_signature        : String(50);
        forklift_signature_date   : DateTime;
        auxiliary_signature       : String(50);
        auxiliary_signature_date  : DateTime;
        supervisor_signature      : String(50);
        supervisor_signature_date : DateTime;
        remarks                   : LargeString;
};

entity ConsecutiveId : managed {
    key ID      : Integer;
        num_min : Integer;
        num_max : Integer;
};
