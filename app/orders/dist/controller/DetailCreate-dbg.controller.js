var files = [];
var idObjectPhoto = undefined,
    idObjectIdCard = undefined,
    idObjectLicense = undefined,
    idObjectSS = undefined,
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
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/formatter"
],
    // /**
    // //  * @param {typeof sap.ui.core.mvc.Controller} Controller
    //  */
    function (BaseController, MessageToast, MessageBox, Fragment, syncStyleClass, JSONModel, History, formatter) {
        "use strict";

        var iTimeoutId;

        return BaseController.extend("com.orders.orders.controller.DetailCreate", {

            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            /**
             * Called when the worklist controller is instantiated.
             * @public
             */
            onInit: function () {

                this.getRouter().getRoute("DetailCreate").attachPatternMatched(this._onObjectMatched, this);
                this.onDepartment();
                var voModelJSON = new sap.ui.model.json.JSONModel();
                var voModelDepartment = {
                    ListModelDepartment: [{}]
                };
                var oLista = this.getView().byId("_IDGenComboBox1");
                //Llevar los datos a la tabla
                console.log(voModelDepartment);
                oLista.setModel(voModelJSON);

                var voModelJSON = new sap.ui.model.json.JSONModel();
                var voModelCity = {
                    ListModelCity: [{}]
                };
                oLista = this.getView().byId("_IDGenComboBox2");
                voModelJSON.setData(voModelCity);

                //Llevar los datos a la tabla
                console.log(voModelCity);
                oLista.setModel(voModelJSON);
            },

            /* =========================================================== */
            /* event handlers                                              */
            /* =========================================================== */


            /**
             * Event handler  for navigating back.
             * It there is a history entry we go one step back in the browser history
             * If not, it will replace the current entry of the browser history with the worklist route.
             * @public
             */
            onNavBack: function () {
                var sPreviousHash = History.getInstance().getPreviousHash();
                if (sPreviousHash !== undefined) {
                    // eslint-disable-next-line sap-no-history-manipulation
                    history.go(-1);
                } else {
                    this.getRouter().navTo("worklist", {}, true);
                }
            },

            _onMasterMatched: function () {
            },

            getRouter: function () {
                return this.getOwnerComponent().getRouter();
            },

            onCancel: function () {
                MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmCancelCreateOrder"), {
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            this.getRouter().navTo("worklist", {});
                        }
                    }.bind(this)
                });
            },

            //deleteDocument 
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
            },

            onUpload: function (e) {
                debugger;
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
                        name: "com.orders.orders.fragment.popup",
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
                }.bind(this), 10000);
            },

            onDialogClosed: function (oEvent) {
                clearTimeout(iTimeoutId);

                if (oEvent.getParameter("cancelPressed")) {

                } else {

                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("newOrder"));
                    this.getRouter().navTo("Worklist", {});
                }
            },

            onCreate: function () {

                var flag = this.onChange();
                var that = this;

                if (filePhoto <= 0) {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadPhoto"));
                    flag = false;
                }

                if (fileIdCard <= 0) {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadIdCard"));
                    flag = false;
                }
                if (fileLicense <= 0) {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadLicense"));
                    flag = false;
                }
                if (fileSS <= 0) {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadSS"));
                    flag = false;
                }

                if (flag === true) {

                    MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmCreateOrder"), {
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
                                var city_code = 20;

                                fileNameDMS = that.byId("idCard").getValue();

                                // if (filePhoto === "") {
                                //     MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadPhoto"));
                                //     flag = false;
                                // }
                                // if (idObjectIdCard === "") {
                                //     MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadIdCard"));
                                //     flag = false;
                                // }
                                // if (idObjectLicense === "") {
                                //     MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadLicense"));
                                //     flag = false;
                                // }
                                // if (idObjectSS === "") {
                                //     MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorUploadSS"));
                                //     flag = false;
                                // }
                                debugger;
                                var json = {
                                    // "cargo_date": this.byId("idCargoDate").getValue(),
                                    // "cargo_date": "2023-02-16",
                                    "status_order": 'Pendiente',
                                    // "department_route": parseInt(that.byId("_IDGenComboBox1").getSelectedKey()),
                                    // "department_route": 11,
                                    // "city_route": parseInt(that.byId("_IDGenComboBox2").getSelectedKey()),
                                    // "city_route": 11001,
                                    "vehicle_plate": that.byId("idVehiclePlate").getValue(),
                                    "trailer": that.byId("idTrailer").getValue(),
                                    // "capacity": that.byId("idCapacity").getValue(),
                                    // "capacity": 20,
                                    "id_card": that.byId("idCard").getValue(),
                                    "driver_name": that.byId("idDriverName").getValue(),
                                    "driver_last_name": that.byId("idDriverLastName").getValue(),
                                    "cell_phone_number": that.byId("idCellPhoneNumber").getValue(),
                                    "driving_license": that.byId("idDrivingLicense").getValue(),
                                    "remarks": that.byId("idTextAreaRemarks").getValue(),

                                    "driver_photo": "",
                                    "pdf_id_card": "",
                                    "pdf_license": "",
                                    "pdf_social_security": "",
                                };
                                $.ajax({
                                    type: 'POST',
                                    url: "/catalog/CargoOrders",
                                    contentType: 'application/json; charset=utf-8',
                                    dataType: 'json',
                                    data: JSON.stringify(json),
                                    success: function (dataR, textStatus, jqXHR) {
                                        console.log(dataR);
                                        that.fnexecuteUpload(dataR.ID, json);
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

                debugger;

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
            }

        });

    });