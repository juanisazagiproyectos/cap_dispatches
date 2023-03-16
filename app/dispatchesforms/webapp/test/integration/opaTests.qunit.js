sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/dispatchesforms/dispatchesforms/test/integration/FirstJourney',
		'com/dispatchesforms/dispatchesforms/test/integration/pages/DispatchesFormsList',
		'com/dispatchesforms/dispatchesforms/test/integration/pages/DispatchesFormsObjectPage'
    ],
    function(JourneyRunner, opaJourney, DispatchesFormsList, DispatchesFormsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/dispatchesforms/dispatchesforms') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDispatchesFormsList: DispatchesFormsList,
					onTheDispatchesFormsObjectPage: DispatchesFormsObjectPage
                }
            },
            opaJourney.run
        );
    }
);