export interface News {
    _id:          string;
    newsName:     string;
    description:  string;
    newsDate:     Date;
    intervention: Intervention;
    image:        string;
    createdAt:    Date;
    updatedAt:    Date;
    __v:          number;
}

export interface Intervention {
    _id:              string;
    interventionName: string;
    description:      string;
    hierarchy:        string;
    strategicProject: string;
    internalSystem:   string;
    image:            string;
    datasheet:        null | string;
    conflicts:        string[];
    news:             string[];
    createdAt:        Date;
    updatedAt:        Date;
    __v:              number;
}