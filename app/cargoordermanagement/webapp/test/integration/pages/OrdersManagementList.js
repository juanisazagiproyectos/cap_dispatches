sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.cargoordermanagement.cargoordermanagement',
            componentId: 'OrdersManagementList',
            entitySet: 'OrdersManagement'
        },
        CustomPageDefinitions
    );
});