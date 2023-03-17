sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/bigbagnationalcargo/bigbagnationalcargo/test/integration/FirstJourney',
		'com/bigbagnationalcargo/bigbagnationalcargo/test/integration/pages/BigBagNationalCargoMain'
    ],
    function(JourneyRunner, opaJourney, BigBagNationalCargoMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/bigbagnationalcargo/bigbagnationalcargo') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBigBagNationalCargoMain: BigBagNationalCargoMain
                }
            },
            opaJourney.run
        );
    }
);