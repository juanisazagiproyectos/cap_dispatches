sap.ui.define([
	"sap/m/MessageBox",
	"sap/ui/core/library"
], function(MessageBox, coreLibrary) {
    "use strict";
    //Search-Term: CustomActions
    return {
        messageBox: function() {
            MessageBox.confirm("Approve the order?");
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