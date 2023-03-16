//@ui5-bundle com/cargoordermanagement/cargoordermanagement/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/cargoordermanagement/cargoordermanagement/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("com.cargoordermanagement.cargoordermanagement.Component",{metadata:{manifest:"json"}})});
},
	"com/cargoordermanagement/cargoordermanagement/ext/NumberToUnformattedString.js":function(){sap.ui.define([],function(){"use strict";return{keepOnlyNumericCharacters:function(e){return e.replace(/\D/g,"")}}});
},
	"com/cargoordermanagement/cargoordermanagement/ext/approveCustomActions.js":function(){sap.ui.define(["sap/m/MessageBox","sap/ui/core/library"],function(e,r){"use strict";return{messageBox:function(){e.confirm("Approve the order?")},enabled:function(){return true},enabledForSingleSelect:function(e,r){if(r&&r.length===1){return true}return false}}});
},
	"com/cargoordermanagement/cargoordermanagement/ext/orderidColumn.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m"><Text\n        text="{\n            path: \'order_id\',\n            type: \'any\',\n            formatter: \'handler.keepOnlyNumericCharacters\'\n        }"\n        core:require="{handler: \'com/cargoordermanagement/cargoordermanagement/ext/NumberToUnformattedString\'}"/></core:FragmentDefinition>',
	"com/cargoordermanagement/cargoordermanagement/ext/rejectCustomActions.js":function(){sap.ui.define(["sap/m/MessageBox","sap/ui/core/library"],function(e,n){"use strict";return{messageBox:function(){e.confirm("Reject the order?")},enabled:function(){return true},enabledForSingleSelect:function(e,n){if(n&&n.length===1){return true}return false}}});
},
	"com/cargoordermanagement/cargoordermanagement/i18n/i18n.properties":'# This is the resource bundle for com.cargoordermanagement.cargoordermanagement\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Cargo order management\n\n#YDES: Application description\nappDescription=Cargo order management\n\n# #Entity: CargoOrders\n# Order=Order\n\n# #Buttons\n# Accept=Accept\n# Reject=Reject ',
	"com/cargoordermanagement/cargoordermanagement/manifest.json":'{"_version":"1.49.0","sap.app":{"id":"com.cargoordermanagement.cargoordermanagement","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.9.0","toolsId":"d86a5958-7c4e-4b7d-802c-280d7943620a"},"crossNavigation":{"inbounds":{"cargoordermanagement-display":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"cargoordermanagement","action":"display"}}},"dataSources":{"mainService":{"uri":"catalog/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"4.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.110.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.cargoordermanagement.cargoordermanagement.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"OrdersManagementList","target":"OrdersManagementList"},{"pattern":"OrdersManagement({key}):?query:","name":"OrdersManagementObjectPage","target":"OrdersManagementObjectPage"}],"targets":{"OrdersManagementList":{"type":"Component","id":"OrdersManagementList","name":"sap.fe.templates.ListReport","options":{"settings":{"entitySet":"OrdersManagement","variantManagement":"Page","navigation":{"OrdersManagement":{"detail":{"route":"OrdersManagementObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"columns":{"order_id":{"header":"{{Order}}","width":"10%","template":"com.cargoordermanagement.cargoordermanagement.ext.orderidColumn","properties":["order_id"],"availability":"Default","horizontalAlign":"Right","position":{"placement":"Before","anchor":"DataField::cargo_date"}}}}}}}},"OrdersManagementObjectPage":{"type":"Component","id":"OrdersManagementObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"content":{"footer":{"actions":{}}},"editableHeaderContent":false,"forceGlobalRefresh":true,"entitySet":"OrdersManagement"}}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"dispatches"}}'
}});
