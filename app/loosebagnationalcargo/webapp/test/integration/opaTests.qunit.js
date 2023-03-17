sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/loosebagnationalcargo/loosebagnationalcargo/test/integration/FirstJourney',
		'com/loosebagnationalcargo/loosebagnationalcargo/test/integration/pages/LooseBagNationalCargoMain'
    ],
    function(JourneyRunner, opaJourney, LooseBagNationalCargoMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/loosebagnationalcargo/loosebagnationalcargo') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheLooseBagNationalCargoMain: LooseBagNationalCargoMain
                }
            },
            opaJourney.run
        );
    }
);