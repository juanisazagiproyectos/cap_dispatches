using CatalogService as service from './catalog-service';

//Icon Status
annotate service.StatusOrder with {
    icon @(UI.IsImageURL : true)
};