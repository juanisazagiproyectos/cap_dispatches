var files = [];
var idObjectPhoto = "X",
    idObjectIdCard = "X",
    idObjectLicense = "X",
    idObjectSS = "X",
    cont = 0,
    fileNameDMS = undefined,
    folderDriver = undefined,
    fileExtension = undefined;

var filePhoto = [],
    fileIdCard = [],
    fileLicense = [],
    fileSS = [];

sap.ui.define([
    // 'sap/ui/core/mvc/Controller',
    "./BaseController",
    'sap/m/MessageToast',
    'sap/m/MessageBox',
    "sap/ui/core/Fragment",
    "sap/ui/core/syncStyleClass"
],
    // /**
    //  * @param {typeof sap.ui.core.mvc.Controller} Controller
    //  */
    function (BaseController, MessageToast, MessageBox, Fragment, syncStyleClass) {
        "use strict";

        return BaseController.extend("com.orders.orders.controller.DetailEdit", {
            
            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            /**
             * Called when the worklist controller is instantiated.
             * @public
             */
            onInit: function () {
                this.getRouter().getRoute("DetailEdit").attachPatternMatched(this._onMasterMatched, this);
                this.onDepartment();
                // this._createReadOnlyTemplates();
            },

            onNavBack: function () {
                MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmCancelEditOrder"), {
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            this.getRouter().navTo("View1", {});
                        }
                    }.bind(this)
                });
            },

            _onMasterMatched: function (oEvent) {

                var orderId = oEvent.getParameter("arguments").invoicePathEdit;
                var oData;
                var that = this;

                jQuery.ajax({

                    url: "/catalog/CargoOrders?$filter=ID eq " + orderId,
                    type: 'GET',
                    dataType: "json",
                    success: function (data) {
                        console.log(data.value);
                        console.log(data);
                        oData = data.value;

                        that.fnAjax('City', oData[0].city_route_code, 'code', "_IDGenComboBox2");
                        that.fnAjax('Department', oData[0].department_route_code, 'code', "_IDGenComboBox1");
                        that.getView().byId("idCargoDate").setValue(oData[0].cargo_date);
                        that.getView().byId("_IDGenComboBox1").setValue(oData[0].department_route_code);
                        that.getView().byId("_IDGenComboBox2").setValue(oData[0].city_route_code);
                        that.getView().byId("idVehiclePlate").setValue(oData[0].vehicle_plate);
                        that.getView().byId("idTrailer").setValue(oData[0].trailer);
                        that.getView().byId("idCapacity").setValue(oData[0].capacity);
                        that.getView().byId("idCard").setValue(oData[0].id_card);
                        that.getView().byId("idDriverName").setValue(oData[0].driver_name);
                        that.getView().byId("idDriverLastName").setValue(oData[0].driver_last_name);
                        that.getView().byId("idCellPhoneNumber").setValue(oData[0].cell_phone_number);
                        that.getView().byId("idDrivingLicense").setValue(oData[0].driving_license);
                        that.getView().byId("idTextAreaRemarks").setValue(oData[0].remarks);
                        that.getView().byId("_IDGenText12").setText(oData[0].ID);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // TODO improve error handling
                        sap.ui.commons.MessageBox.alert("Failed to retrieve data: " + textStatus + "\n" + errorThrown);
                    }
                });
            },

            fnAjax: async function (path, codigo, Camfiltro, id) {
                var that = this;
                var urlGet = "/catalog/" + path + "?$filter=" + Camfiltro + " eq " + codigo;
                jQuery.ajax({
                    url: urlGet, type: 'GET', dataType: "json", success: function (data) {
                        console.log(data);
                        that.getView().byId(id).setValue(data.value[0].description);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // TODO improve error handling
                        MessageBox.alert("Failed to retrieve data: " + textStatus + "\n" + errorThrown);
                    }
                });
            },

            getRouter: function () {
                return this.getOwnerComponent().getRouter();
            },

            pressDelete: function (oEvent) {

                var idButton = oEvent.getParameter("id").split("--");

                switch (idButton[2]) {
                    case "photoDelete": {
                        idObjectPhoto = "";
                        this.getView().byId("photoFileUploaderId").setVisible(true);
                        break;
                    }
                    case "pdfIDCardDelete": {
                        idObjectIdCard = "";
                        this.getView().byId("idCardFileUploaderId").setVisible(true);
                        break;
                    }
                    case "pdfLicenseDelete": {
                        idObjectLicense = "";
                        this.getView().byId("licenseFileUploaderId").setVisible(true);
                        break;
                    }
                    case "pdfSsDelete": {
                        idObjectSS = "";
                        this.getView().byId("ssFileUploaderId").setVisible(true);
                        break;
                    }
                    default: { }
                };

                if (idButton !== "") {
                    this.getView().byId(idButton[2]).setVisible(false);
                }

                //     var oModel = this.byId("table1").getModel();
                //     // console.log(oModel);
                //     var filePath = oEvent.getSource().getBindingContext().getPath();

                //     var objId = oModel.getProperty(filePath).succinctProperties['cmis:objectId'];
                //     console.log(objId);
                //     var myHeaders = new Headers();
                //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                //     var urlencoded = new URLSearchParams();
                //     urlencoded.append("cmisaction", "delete");
                //     urlencoded.append("objectId", objId);
                //     urlencoded.append("allVersions", "true");

                //     var requestOptions = {
                //         method: 'POST',
                //         headers: myHeaders,
                //         body: urlencoded,
                //         redirect: 'follow'
                //     };

                //     fetch("/sdi/browser/4c0973e8-a785-4789-a048-067d42f97873/root", requestOptions)
                //         .then(response => response.text())
                //         .then(result => {
                //             MessageBox.information("Object ".concat(result.trim()).concat(" deleted"));
                //             console.log(typeof (result));

                //         })
                //         .catch(error => console.log('error', error));

            },

            rebindTable: function (oTemplate, sKeyboardMode) {
                var oTable = sap.ui.getCore().DataModel.byId("table");
                oTable.bindItems({
                    path: "/CargoOrders",
                    template: oTemplate,
                    templateShareable: true
                }).setKeyboardMode(sKeyboardMode);
            },
            onInputChange: function () {
                this.refreshModel("");

            },
            refreshModel: function (sModelName, sGroup) {
                return new Promise((resolve, reject) => {
                    this.makeChangesAndSubmit.call(this, resolve, reject,
                        sModelName, sGroup);
                });

            },
            makeChangesAndSubmit: function (resolve, reject, sModelName, sGroup) {
                const that = this;
                sModelName = "";
                sGroup = "$auto";

                if (that.getView().getModel().hasPendingChanges(sGroup)) {
                    that.getView().getModel().submitBatch(sGroup).then(oSuccess => {
                        that.makeChangesAndSubmit(resolve, reject, sModelName, sGroup);
                        MessageToast.show("Record updated Successfully");
                    }, reject)
                        .catch(function errorHandler(err) {
                            MessageToast.show("Something Went Wrong ", err.message); // 'Oops!'
                        });
                } else {
                    that.getView().getModel(sModelName).refresh(sGroup);
                    resolve();
                }
            },

            onUpload: function (e) {

                var idButton = e.getParameter("id").split("--");

                switch (idButton[2]) {
                    case "photoFileUploaderId": {
                        filePhoto = e.getParameter("files")[0];
                        cont += 1;
                        this.getView().byId("photoDelete").setVisible(true);
                        this.getView().byId("photoFileUploaderId").setVisible(false);
                        break;
                    }
                    case "idCardFileUploaderId": {
                        fileIdCard = e.getParameter("files")[0];
                        cont += 1;
                        this.getView().byId("pdfIDCardDelete").setVisible(true);
                        this.getView().byId("idCardFileUploaderId").setVisible(false);
                        break;
                    }
                    case "licenseFileUploaderId": {
                        fileLicense = e.getParameter("files")[0];
                        cont += 1;
                        this.getView().byId("pdfLicenseDelete").setVisible(true);
                        this.getView().byId("licenseFileUploaderId").setVisible(false);
                        break;
                    }
                    case "ssFileUploaderId": {
                        fileSS = e.getParameter("files")[0];
                        cont += 1;
                        this.getView().byId("pdfSsDelete").setVisible(true);
                        this.getView().byId("ssFileUploaderId").setVisible(false);
                        break;
                    }
                    default: { }
                };

            },

            fnexecuteUpload: function (idOrder, json) {

                var idOrder = idOrder;
                var json = json;

                if (filePhoto.size > 0) {
                    folderDriver = "Fotos";
                    fileExtension = ".jpg";
                    this.fnPostAJax().then((data) => this.fnpostDoc(data, filePhoto, "Fotos", ".jpg", idOrder, json));
                }

                if (fileIdCard.size > 0) {
                    folderDriver = "Documento identidad";
                    fileExtension = ".pdf";
                    this.fnPostAJax().then((data) => this.fnpostDoc(data, fileIdCard, "Documento identidad", ".pdf", idOrder));
                }

                if (fileLicense.size > 0) {
                    folderDriver = "Licencia conduccion";
                    fileExtension = ".pdf";
                    this.fnPostAJax().then((data) => this.fnpostDoc(data, fileLicense, "Licencia conduccion", ".pdf", idOrder));
                }

                if (fileSS.size > 0) {
                    folderDriver = "Seguridad social";
                    fileExtension = ".pdf";
                    this.fnPostAJax().then((data) => this.fnpostDoc(data, fileSS, "Seguridad social", ".pdf", idOrder));
                }

            },

            fnPostAJax: async function () {
                let result;
                try {
                    result = await $.ajax({
                        url: "https://dev-paperless.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials",
                        type: "POST",
                        headers: {
                            "Authorization": "Basic c2ItNmIzYjEyYmItNDE1NS00MTBkLTljMTktNDE4NGU4NWExMWIxIWI5ODA3NHxzZG0tZGktRG9jdW1lbnRNYW5hZ2VtZW50LXNkbV9pbnRlZ3JhdGlvbiFiNjMzMjoyVGpyTTZoaVVxMnZ3K0pTUm0yaHlCa1FJTmM9"
                        }
                    });
                    return result;
                } catch (error) {
                    console.log(error);
                }

            },

            fnGetAJax: async function (idOrder) {
                let resultAjx;
                var idOrder = idOrder;
                var urlGet = "/catalog/CargoOrders?$filter=ID eq " + idOrder;

                try {
                    resultAjx = await $.ajax({
                        url: urlGet,
                        type: "GET",
                    });
                    return resultAjx;
                } catch (error) {
                    console.log(error);
                }
            },

            fnpostDoc: async function (data, file, driver, ext, idOrder, json) {
                console.log(data);
                var idOrder = idOrder;
                var json = json;
                var token_type = data.token_type;
                var access_token = data.access_token;
                var token = token_type + " " + access_token;
                let result;
                var driver = driver;
                var extension = ext;

                var formdata = new FormData();
                formdata.append("cmisaction", "createDocument");
                formdata.append("filename", file.name);
                formdata.append("_charset", "UTF-8");
                formdata.append("propertyId[0]", "cmis:name");
                formdata.append("propertyValue[0]", fileNameDMS + extension);
                formdata.append("propertyId[1]", "cmis:objectTypeId");
                formdata.append("propertyValue[1]", "cmis:document");
                formdata.append("succinct", "true");
                formdata.append("includeAllowableActions", "true");
                formdata.append("media", file, file.name);

                var requestOptions = {
                    method: 'POST',
                    headers: {
                        "Authorization": token
                    },
                    body: formdata,
                    redirect: 'follow'
                };

                try {
                    result = await fetch("https://api-sdm-di.cfapps.us10.hana.ondemand.com/browser/50ede09e-1659-4900-bf1d-fdb8b8adb8d3/root/Documentos Orden de Cargue/Conductores/" + driver, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            var data = result.split(":");
                            var idObjet = data[2];
                            var getValue = data[3].split(",");
                            var value = getValue[0].replace(/['"]+/g, '');
                            console.log(value);
                            switch (driver) {
                                case "Fotos": {
                                    this.onOpenDialog();
                                    idObjectPhoto = value;
                                    this.fnGetAJax(idOrder).then((dataRS) => this.onPut(dataRS, idOrder, "Fotos", value));
                                    break;
                                }
                                case "Documento identidad": {

                                    idObjectIdCard = value;
                                    this.fnGetAJax(idOrder).then((dataRS) => this.onPut(dataRS, idOrder, "Documento identidad", value));
                                    break;
                                }
                                case "Licencia conduccion": {
                                    idObjectLicense = value;
                                    this.fnGetAJax(idOrder).then((dataRS) => this.onPut(dataRS, idOrder, "Licencia conduccion", value));
                                    break;
                                }
                                case "Seguridad social": {
                                    idObjectSS = value;
                                    this.fnGetAJax(idOrder).then((dataRS) => this.onPut(dataRS, idOrder, "Seguridad social", value));
                                    break;
                                }
                                default: { }
                            };
                            driver = "";
                        });
                } catch (error) {
                    console.log(error);
                }

            },

            onPut: function (dataRS, idOrder, field, idObject) {
                var urlPut = "/catalog/CargoOrders(" + idOrder + ")";
                var json = json;
                var field = field;
                var dataRS = dataRS;
                var that = this;
                if (dataRS.value.length != 0) {

                    json = dataRS.value[0];

                    if (field == "Fotos") {
                        json.driver_photo = idObject;
                        idObjectPhoto = idObject;

                    }
                    if (field == "Documento identidad") {
                        json.pdf_id_card = idObject;
                        idObjectIdCard = idObject;
                    }
                    if (field == "Licencia conduccion") {
                        json.pdf_license = idObject;
                        idObjectLicense = idObject;
                    }
                    if (field == "Seguridad social") {
                        json.pdf_social_security = idObject;
                        idObjectSS = idObject;
                    }

                    json.driver_photo = idObjectPhoto;
                    json.pdf_id_card = idObjectIdCard;
                    json.pdf_license = idObjectLicense;
                    json.pdf_social_security = idObjectSS;

                    $.ajax({
                        type: 'PUT',
                        url: urlPut,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: JSON.stringify(json),
                        success: function (dataR, textStatus, jqXHR) {
                            console.log(dataR);

                        }, error: function (jqXHR, textStatus, errorThrown) {
                            var arr = [];
                            console.log(JSON.stringify(jqXHR));
                        }
                    });
                } else {

                }

            },

            onOpenDialog: function () {
                // load BusyDialog fragment asynchronously
                if (!this._pBusyDialog) {
                    this._pBusyDialog = Fragment.load({
                        name: "com.project.project1.fragment.popup",
                        BaseController: this
                    }).then(function (oBusyDialog) {
                        this.getView().addDependent(oBusyDialog);
                        syncStyleClass("sapUiSizeCompact", this.getView(), oBusyDialog);
                        return oBusyDialog;
                    }.bind(this));
                }

                this._pBusyDialog.then(function (oBusyDialog) {
                    oBusyDialog.open();
                    this.simulateServerRequest();
                }.bind(this));
            },

            simulateServerRequest: function () {
                // simulate a longer running operation
                iTimeoutId = setTimeout(function () {
                    this._pBusyDialog.then(function (oBusyDialog) {
                        oBusyDialog.close();
                    });
                }.bind(this), 5000);
            },

            onDialogClosed: function (oEvent) {
                clearTimeout(iTimeoutId);

                if (oEvent.getParameter("cancelPressed")) {

                } else {

                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("confirmSaveEditOrder"));
                    this.getRouter().navTo("View1", {});
                }
            },

            onSave: function () {

                var flag = this.onChange();
                var that = this;

                // if (filePhoto <= 0) {
                if (idObjectPhoto == "") {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadPhoto"));
                    flag = false;
                }

                // if (fileIdCard <= 0) {
                if (idObjectIdCard == "") {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadIdCard"));
                    flag = false;
                }
                // if (fileLicense <= 0) {
                if (idObjectLicense == "") {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadLicense"));
                    flag = false;
                }
                // if (fileSS <= 0) {
                if (idObjectSS == "") {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadSS"));
                    flag = false;
                }

                if (flag === true) {

                    MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmEditOrder"), {
                        onClose: function (oAction) {

                            if (oAction === "OK") {

                                // var dateymd = this.byId("idCargoDate").getValue();
                                // var separator = dateymd.includes("-");

                                // if (separator === true) {
                                //     var fecha = dateymd;
                                // }
                                // else {
                                //     var array = dateymd.split("/");
                                //     var fecha = array[2] + "-" + array[1] + "-" + array[0];
                                // }
                                fileNameDMS = this.byId("idCard").getValue();

                                var json = {
                                    // "cargo_date": this.byId("idCargoDate").getValue(),
                                    // "cargo_date": "2023-02-16",
                                    // "department_route": this.byId("_IDGenComboBox1").getSelectedKey(),
                                    // "department_route": 11,
                                    // "city_route": this.byId("_IDGenComboBox2").getSelectedKey(),
                                    // "city_route": 11001,

                                    "vehicle_plate": this.byId("idVehiclePlate").getValue(),
                                    "trailer": this.byId("idTrailer").getValue(),

                                    // "capacity": this.byId("idCapacity").getValue(),
                                    // "capacity": 20,

                                    "id_card": this.byId("idCard").getValue(),
                                    "driver_name": this.byId("idDriverName").getValue(),
                                    "driver_last_name": this.byId("idDriverLastName").getValue(),
                                    "cell_phone_number": this.byId("idCellPhoneNumber").getValue(),
                                    "driving_license": this.byId("idDrivingLicense").getValue(),
                                    "remarks": this.byId("idTextAreaRemarks").getValue(),
                                    "driver_photo": idObjectPhoto,
                                    "pdf_id_card": idObjectIdCard,
                                    "pdf_license": idObjectLicense,
                                    "pdf_social_security": idObjectSS,
                                }

                                console.log(json);

                                var oData;
                                var that = this;
                                var idItem = this.byId("_IDGenText12").getText();
                                var urlPut = "/catalog/CargoOrders(" + idItem + ")";
                                var urlGet = "/catalog/CargoOrders?$filter=ID eq " + idItem;

                                $.ajax({
                                    type: 'PUT',
                                    url: urlPut,
                                    contentType: 'application/json; charset=utf-8',
                                    dataType: 'json',
                                    data: JSON.stringify(json),
                                    success: function (dataR, textStatus, jqXHR) {
                                        console.log(dataR);

                                        that.fnexecuteUpload(dataR.ID, json);

                                        jQuery.ajax({
                                            url: urlGet,
                                            type: 'GET',
                                            dataType: "json",
                                            success: function (data) {
                                                console.log(data.value);
                                                console.log(data);
                                                oData = data.value;
                                                that.getView().byId("idCargoDate").setValue(oData[0].cargo_date);
                                                that.getView().byId("_IDGenComboBox1").setValue(oData[0].department_route_code);
                                                that.getView().byId("_IDGenComboBox2").setValue(oData[0].city_route_code);
                                                that.getView().byId("idVehiclePlate").setValue(oData[0].vehicle_plate);
                                                that.getView().byId("idTrailer").setValue(oData[0].trailer);
                                                that.getView().byId("idCapacity").setValue(oData[0].capacity);
                                                that.getView().byId("idCard").setValue(oData[0].id_card);
                                                that.getView().byId("idDriverName").setValue(oData[0].driver_name);
                                                that.getView().byId("idDriverLastName").setValue(oData[0].driver_last_name);
                                                that.getView().byId("idCellPhoneNumber").setValue(oData[0].cell_phone_number);
                                                that.getView().byId("idDrivingLicense").setValue(oData[0].driving_license);
                                                that.getView().byId("idTextAreaRemarks").setValue(oData[0].remarks);

                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                // TODO improve error handling
                                                sap.ui.commons.MessageBox.alert("Failed to retrieve data: " + textStatus + "\n" + errorThrown);
                                            }
                                        });

                                    }, error: function (jqXHR, textStatus, errorThrown) {
                                        var arr = [];
                                        console.log(JSON.stringify(jqXHR));
                                    }
                                });

                            }

                        }.bind(this)
                    });

                } else {

                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("blackFields"));
                }

            },

            //Validate blank fields
            onChange: function () {
                var flag = true;
                var cargoDate = this.getView().byId("idCargoDate").getValue();
                var department_route = this.byId("_IDGenComboBox1").getValue();
                var city_route = this.byId("_IDGenComboBox2").getValue();
                var vehicle_plate = this.byId("idVehiclePlate").getValue();
                var trailer = this.byId("idTrailer").getValue();
                var capacity = this.byId("idCapacity").getValue();
                var id_card = this.byId("idCard").getValue();
                var driver_name = this.byId("idDriverName").getValue();
                var driver_last_name = this.byId("idDriverLastName").getValue();
                var cell_phone_number = this.byId("idCellPhoneNumber").getValue();
                var driving_license = this.byId("idDrivingLicense").getValue();

                if (cargoDate == "") {
                    this.getView().byId("idCargoDate").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idCargoDate").setValueState('Success');
                }

                if (department_route == "") {
                    this.getView().byId("_IDGenComboBox1").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("_IDGenComboBox1").setValueState('Success');
                }

                if (city_route == "") {
                    this.getView().byId("_IDGenComboBox2").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("_IDGenComboBox2").setValueState('Success');
                }

                if (vehicle_plate == "") {
                    this.getView().byId("idVehiclePlate").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idVehiclePlate").setValueState('Success');
                }

                if (trailer == "") {
                    this.getView().byId("idTrailer").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idTrailer").setValueState('Success');
                }

                if (capacity == "") {
                    this.getView().byId("idCapacity").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idCapacity").setValueState('Success');
                }

                if (id_card == "") {
                    this.getView().byId("idCard").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idCard").setValueState('Success');
                }

                if (driver_name == "") {
                    this.getView().byId("idDriverName").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idDriverName").setValueState('Success');
                }

                if (driver_last_name == "") {
                    this.getView().byId("idDriverLastName").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idDriverLastName").setValueState('Success');
                }

                if (cell_phone_number == "") {
                    this.getView().byId("idCellPhoneNumber").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idCellPhoneNumber").setValueState('Success');
                }

                if (driving_license == "") {
                    this.getView().byId("idDrivingLicense").setValueState('Error');
                    flag = false;
                } else {
                    this.getView().byId("idDrivingLicense").setValueState('Success');
                }

                return flag;
            },

            //Help value Department
            onDepartment: function (oEvent) {

                var voModelJSON = new sap.ui.model.json.JSONModel();
                var voModelDepartment = {
                    ListModelDepartment: [{}]
                };
                var oLista = this.getView().byId("_IDGenComboBox1");

                jQuery.ajax({
                    url: "/catalog/Department",
                    type: 'GET',
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        voModelJSON.setData(data.value);
                        voModelDepartment.ListModelDepartment = data.value;
                        voModelJSON.setData(voModelDepartment);

                        //Llevar los datos a la tabla
                        console.log(voModelDepartment);
                        oLista.setModel(voModelJSON);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // TODO improve error handling
                        MessageBox.alert(this.getView().getModel("i18n").getResourceBundle().getText("errorHelpValueDepartment"), + ": " + textStatus + "\n" + errorThrown);
                    }
                });
            },

            //Help value Department
            onCity: function (oEvent) {

                var oValidatedComboBox = oEvent.getSource(),
                    sSelectedKey = oValidatedComboBox.getSelectedKey(),
                    sValue = oValidatedComboBox.getValue();
                var urlGet = "/catalog/City?$filter=department_code eq " + sSelectedKey;

                var voModelJSON = new sap.ui.model.json.JSONModel();
                var voModelCity = {
                    ListModelCity: [{}]
                };
                var oLista = this.getView().byId("_IDGenComboBox2");

                jQuery.ajax({
                    url: urlGet,
                    type: 'GET',
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        voModelJSON.setData(data.value);
                        voModelCity.ListModelCity = data.value;
                        voModelJSON.setData(voModelCity);

                        //Llevar los datos a la tabla
                        console.log(voModelCity);
                        oLista.setModel(voModelJSON);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // TODO improve error handling
                        MessageBox.alert("Failed to retrieve data: " + textStatus + "\n" + errorThrown);
                    }
                });
            },
        });
    });