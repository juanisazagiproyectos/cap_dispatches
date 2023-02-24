sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.vehiculesecurityreview.vehiculesecurityreview',
            componentId: 'VehiculeSecurityReviewObjectPage',
            entitySet: 'VehiculeSecurityReview'
        },
        CustomPageDefinitions
    );
});