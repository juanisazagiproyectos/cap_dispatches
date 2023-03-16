sap.ui.define([
	"sap/m/MessageBox",
	"sap/ui/core/library"
], function(MessageBox, coreLibrary) {
    "use strict";
    //Search-Term: CustomActions
    return {
        messageBox: function() {
            MessageBox.confirm("Reject the order?");
        },
        enabled : function() {
            return true;
        },
        enabledForSingleSelect: function(oBindingContext, aSelectedContexts) {
            if (aSelectedContexts && aSelectedContexts.length === 1) {
               return true;
            }
            return false;
        }
    };
});

// "footer": {
//     "actions": {
        // "approveCustomActionFooter": {
        //     "press": "com.cargoordermanagement.cargoordermanagement.ext.approveCustomActions.messageBox",
        //     "enabled": "{= ${ui>/editMode} !== 'Editable'}",
        //     "visible": true,
        //     "text": "{i18n>Accept}"
        // },
        // "rejectCustomActionFooter": {
        //     "press": "com.cargoordermanagement.cargoordermanagement.ext.rejectCustomActions.messageBox",
        //     "enabled": "{= ${ui>/editMode} !== 'Editable'}",
        //     "visible": true,
        //     "text": "{i18n>Reject}"
        // }
    // }
// }

