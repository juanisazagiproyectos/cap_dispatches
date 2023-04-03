sap.ui.define(
    [
        'sap/ui/core/Control'
    ], function (Control) {

        return Control.extend('com.loosebagnationalcargo.loosebagnationalcargo.control.Signature2', {

            metadata: {
                properties: {
                    "width": {
                        type: "sap.ui.core.CSSSize",
                        defaultValue: "400px"
                    },
                    "height": {
                        type: "sap.ui.core.CSSSize",
                        defaultValue: "100px"
                    },
                    "bgcolor": {
                        type: "sap.ui.core.CSSSize",
                        defaultValue: "white"
                    }
                }
            },

            onInit: function () {

            },

            renderer: function (oRM, oControl) {
                debugger;
                oRM.write("<div");
                oRM.addStyle("width", oControl.getProperty("width"));
                oRM.addStyle("height", oControl.getProperty("height"));
                oRM.addStyle("background-color", oControl.getProperty("bgcolor"));
                oRM.addStyle("border", "1px solid black");
                oRM.writeStyles();
                oRM.write(">");
                oRM.write("<canvas id='signature1' " + 
                                "width='" + oControl.getProperty("width") + "' " + 
                                "height = '" + oControl.getProperty("height") + "'");
                oRM.write("></canvas>");
                oRM.write("</div>");
            },

            onAfterRendering: function () {
                debugger;
                var canvas = document.querySelector("canvas#signature1");
                try {
                    this.signaturePad = new SignaturePad(canvas);
                } catch (e) {
                    console.error(e);
                }
            },

            clear: function () {
                this.signaturePad.clear();
            }

        });

    });