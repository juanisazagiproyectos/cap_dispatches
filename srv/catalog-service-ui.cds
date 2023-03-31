using CatalogService as service from './catalog-service';

//Icon Status
annotate service.StatusOrder with {
    icon @(UI.IsImageURL : true)
};

annotate service.StatusOrder with {
    ID          @(
        UI     : {Hidden : true},
        Common : {Text : {
            $value                 : description,
            ![@UI.TextArrangement] : #TextOnly,
        }}
    );
    description @(UI : {HiddenFilter : true});
};

annotate service.InternalStatus with {
    icon @(UI.IsImageURL : true)
};

annotate service.InternalStatus with {
    ID          @(
        UI     : {Hidden : true},
        Common : {Text : {
            $value                 : description,
            ![@UI.TextArrangement] : #TextOnly,
        }}
    );
    description @(UI : {HiddenFilter : true});
};

annotate service.Department with {
    code        @(
        UI     : {Hidden : true},
        Common : {Text : {
            $value                 : description,
            ![@UI.TextArrangement] : #TextOnly,
        }}
    );
    description @(UI : {HiddenFilter : true});
}

annotate service.City with {
    code        @(
        UI     : {Hidden : true},
        Common : {Text : {
            $value                 : description,
            ![@UI.TextArrangement] : #TextOnly,
        }}
    );
    description @(UI : {HiddenFilter : true});
};


