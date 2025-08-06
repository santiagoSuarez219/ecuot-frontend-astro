export interface LastInterventionsListResponse {
    _id:              string;
    interventionName: string;
    description:      string;
    hierarchy:        string;
    strategicProject: string;
    internalSystem:   InternalSystem;
    image:            string;
    datasheet:        string;
    conflicts:        string[];
    news:             string[];
    createdAt:        Date;
    updatedAt:        Date;
    __v:              number;
}

export interface InternalSystem {
    _id:        string;
    systemName: string;
    createdAt:  Date;
    updatedAt:  Date;
    __v:        number;
}
