sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/vehiculesecurityreview/vehiculesecurityreview/test/integration/FirstJourney',
		'com/vehiculesecurityreview/vehiculesecurityreview/test/integration/pages/VehiculeSecurityReviewList',
		'com/vehiculesecurityreview/vehiculesecurityreview/test/integration/pages/VehiculeSecurityReviewObjectPage'
    ],
    function(JourneyRunner, opaJourney, VehiculeSecurityReviewList, VehiculeSecurityReviewObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/vehiculesecurityreview/vehiculesecurityreview') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheVehiculeSecurityReviewList: VehiculeSecurityReviewList,
					onTheVehiculeSecurityReviewObjectPage: VehiculeSecurityReviewObjectPage
                }
            },
            opaJourney.run
        );
    }
);