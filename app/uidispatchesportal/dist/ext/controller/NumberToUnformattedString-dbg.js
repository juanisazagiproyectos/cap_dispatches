sap.ui.define([], function () {
    "use strict";

    return {
        keepOnlyNumericCharacters: function (sFormattedNumber) {
            //Comes in already formatted as "2,021"...
            return sFormattedNumber.replace(/\D/g, "");
        }
    };
});