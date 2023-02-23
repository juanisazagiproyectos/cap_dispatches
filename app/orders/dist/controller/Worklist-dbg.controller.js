sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    'sap/m/MessageToast',
    'sap/m/MessageBox'

], function (BaseController, JSONModel, formatter, Filter, FilterOperator, exportLibrary, Spreadsheet, MessageToast, MessageBox) {
    "use strict";

    var EdmType = exportLibrary.EdmType;

    return BaseController.extend("com.orders.orders.controller.Worklist", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit: function () {
            var oViewModel;

            // keeps the search state
            this._aTableSearchState = [];

            // Model used to manipulate control states
            oViewModel = new JSONModel({
                worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
                shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                tableNoDataText: this.getResourceBundle().getText("tableNoDataText")
            });
            this.getRouter().getRoute("worklist").attachPatternMatched(this._onObjectMatched, this);
            this.setModel(oViewModel, "worklistView");

        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Triggered by the table's 'updateFinished' event: after new table
         * data is available, this handler method updates the table counter.
         * This should only happen if the update was successful, which is
         * why this handler is attached to 'updateFinished' and not to the
         * table's list binding's 'dataReceived' method.
         * @param {sap.ui.base.Event} oEvent the update finished event
         * @public
         */
        onUpdateFinished: function (oEvent) {
            // update the worklist's object counter after the table update
            var sTitle,
                oTable = oEvent.getSource(),
                iTotalItems = oEvent.getParameter("total");
            // only update the counter if the length is final and
            // the table is not empty
            if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
            } else {
                sTitle = this.getResourceBundle().getText("worklistTableTitle");
            }
            this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
        },

        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
         * @public
         */
        onPress: function (oEvent) {
            // The source is the list item that got pressed
            this._showObject(oEvent.getSource());
        },

        /**
         * Event handler for navigating back.
         * Navigate back in the browser history
         * @public
         */
        onNavBack: function () {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        },


        onSearch: function (oEvent) {
            if (oEvent.getParameters().refreshButtonPressed) {
                // Search field's 'refresh' button has been pressed.
                // This is visible if you select any main list item.
                // In this case no new search is triggered, we only
                // refresh the list binding.
                this.onRefresh();
            } else {
                var aTableSearchState = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [new Filter("ID", FilterOperator.Contains, sQuery)];
                }
                this._applySearch(aTableSearchState);
            }

        },

        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh: function () {
            var oTable = this.byId("table");
            oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject: function (oItem) {
            this.getRouter().navTo("object", {
                objectId: oItem.getBindingContext().getPath().substring("/CargoOrders".length)
            });
        },

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
        _applySearch: function (aTableSearchState) {
            var oTable = this.byId("table"),
                oViewModel = this.getModel("worklistView");
            oTable.getBinding("items").filter(aTableSearchState, "Application");
            // changes the noDataText of the list in case there are no filter results
            if (aTableSearchState.length !== 0) {
                oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
            }
        },

        createPress: function (oEvent) {
            // sap.ui.getCore().DataModel = this.getView();
            // this.getRouter().navTo("DetailCreate", {});
            this.getRouter().navTo("DetailCreate", {}, true)
        },

        /**
        * Event handler for event of button "Delete"
        * 
        */
        onDelete: function () {

            var oSelected = this.byId("table").getSelectedItem();

            if (oSelected) {
                var orderID = oSelected.getBindingContext().getObject().order_id;

                MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("deleteItemOrder") + ": " + orderID + "?", {
                    onClose: function (oAction) {

                        if (oAction === "OK") {

                            oSelected.getBindingContext().delete("$auto").then(function () {
                                MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Order")
                                    + " " + orderID + " " +
                                    this.getView().getModel("i18n").getResourceBundle().getText("deleteSuccess"));
                            }.bind(this), function (oError) {
                                MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("deleteError")
                                    + ": ", oError);
                            });
                        }
                    }.bind(this)
                });
            } else {
                MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("selectRow"));
            }
        },

        /**
         * Event handler for event of button "Export"
         * 
         */
        onExport: function () {
            var aCols, oRowBinding, oSettings, oSheet, oTable;
            var fileName = this.getView().getModel("i18n").getResourceBundle().getText("reportExport") + '.xlsx';

            if (!this._oTable) {
                this._oTable = this.byId('table');
            }

            oTable = this._oTable;
            oRowBinding = oTable.getBinding('items');
            aCols = this.createColumnConfig();

            oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: 'Level'
                },
                dataSource: oRowBinding,
                fileName: fileName,
                worker: false // We need to disable worker because we are using a MockServer as OData Service
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },

        /**
        * Set data export
        * 
        */
        createColumnConfig: function () {
            var aCols = [];

            aCols.push({
                label: 'Status',
                property: 'status_order ',
                type: EdmType.String
            });

            aCols.push({
                label: 'Order',
                type: EdmType.Number,
                property: 'order_id',
                scale: 0
            });

            aCols.push({
                label: 'Cargo date',
                property: 'cargo_date',
                type: EdmType.String
            });

            aCols.push({
                label: 'City',
                property: 'city_route_code',
                type: EdmType.String
            });

            aCols.push({
                label: 'Department',
                property: 'department_route_code',
                type: EdmType.String
            });

            aCols.push({
                label: 'Vehicle plate',
                property: 'vehicle_plate',
                type: EdmType.String
            });

            aCols.push({
                label: 'Trailer',
                property: 'trailer',
                type: EdmType.String
            });

            aCols.push({
                label: 'Capacity',
                property: 'capacity',
                type: EdmType.String
            });

            aCols.push({
                label: 'ID card',
                property: 'id_card',
                type: EdmType.String
            });

            aCols.push({
                label: 'Driver name',
                property: 'driver_name',
                type: EdmType.String
            });

            aCols.push({
                label: 'Driver last name',
                property: 'driver_last_name',
                type: EdmType.String
            });

            aCols.push({
                label: 'Driving license',
                property: 'driving_license',
                type: EdmType.String
            });

            aCols.push({
                label: 'Cell phone number',
                property: 'cell_phone_number',
                type: EdmType.String
            });

            return aCols;
        },
    });
});
