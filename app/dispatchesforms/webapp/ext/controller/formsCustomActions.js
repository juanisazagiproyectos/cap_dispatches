sap.ui.define([
    "sap/ui/core/library"
], function (coreLibrary) {
    "use strict";

    return {
        //Search-Term: #EditFlowAPI
        onChangeCriticality: function (oEvent) {
            let sActionName = "CatalogService.formsAction";
            let mParameters = {
                contexts: oEvent.getSource().getBindingContext(),
                model: oEvent.getSource().getModel(),
                label: 'Confirm',
                invocationGrouping: true
            };
            this.editFlow.invokeAction(sActionName, mParameters); //SAP Fiori elements EditFlow API
        },
    };
});