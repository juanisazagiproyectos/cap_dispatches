namespace com.dispatches;

using {managed} from '@sap/cds/common';

entity CargoOrders : managed {
    key ID                          : UUID         @(Core.Computed : true);
        order_id                    : Integer;
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


        // @Core.MediaType   : mediaTypeDriver_photo
        // driver_photo                : LargeBinary;
        // @Core.IsMediaType : true
        // mediaTypeDriver_photo       : String;
        // fileNameDriver_photo        : String;
        // applicationNameDriver_photo : String;
        // driver_photo        : LargeBinary @Core.MediaType : 'image/jpg';
        // driver_photo        : LargeBinary  @Core.MediaType : 'file/jpg'  @Core.ContentDisposition.Filename : 'fileName.jpg';

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
    key id_card             : String(10);
        driver_name         : String(50);
        driver_last_name    : String(50);
        cell_phone_number   : Integer;
        driving_license     : String(10);
        driver_photo        : String(200);
        pdf_id_card         : String(200);
        pdf_license         : String(200);
        pdf_social_security : String(200);
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

entity MediaFile {
    key id        : Integer;
        @Core.MediaType   : mediaType
        content   : LargeBinary;
        @Core.IsMediaType : true
        mediaType : String;
        fileName  : String;
        url       : String;
};
