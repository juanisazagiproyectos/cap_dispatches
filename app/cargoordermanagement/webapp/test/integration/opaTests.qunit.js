sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/cargoordermanagement/cargoordermanagement/test/integration/FirstJourney',
		'com/cargoordermanagement/cargoordermanagement/test/integration/pages/OrdersManagementList',
		'com/cargoordermanagement/cargoordermanagement/test/integration/pages/OrdersManagementObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdersManagementList, OrdersManagementObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/cargoordermanagement/cargoordermanagement') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdersManagementList: OrdersManagementList,
					onTheOrdersManagementObjectPage: OrdersManagementObjectPage
                }
            },
            opaJourney.run
        );
    }
);