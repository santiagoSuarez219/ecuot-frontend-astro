export interface InterventionDataSheet {
    _id:                 string;
    description:         string;
    image_description:   string;
    features:            string;
    image_features:      string;
    conflictivity:       string;
    image_conflictivity: string;
    spatialization:      string;
    intervention:        Intervention;
    createdAt:           Date;
    updatedAt:           Date;
    __v:                 number;
}

export interface Intervention {
    _id:              string;
    interventionName: string;
    description:      string;
    hierarchy:        string;
    strategicProject: string;
    internalSystem:   string;
    image:            string;
    datasheet:        string;
    conflicts:        string[];
    news:             string[];
    createdAt:        Date;
    updatedAt:        Date;
    __v:              number;
}
