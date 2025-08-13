export interface Intervention {
  _id: string;
  interventionName: string;
  description: string;
  hierarchy: Hierarchy;
  strategicProject: string;
  internalSystem: InternalSystem;
  image: string;
  datasheet: null | string;
  conflicts: string[];
  news: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface Intervention {
  _id:              string;
  interventionName: string;
  description:      string;
  hierarchy:        Hierarchy;
  strategicProject: string;
  internalSystem:   InternalSystem;
  image:            string;
  datasheet:        null | string;
  conflicts:        string[];
  news:             string[];
  createdAt:        Date;
  updatedAt:        Date;
  __v:              number;
}

export interface Hierarchy {
  _id:            string;
  hierarchyName:  string;
  __v:            number;
  createdAt:      Date;
  updatedAt:      Date;
  systemName:    string;
}


export interface InternalSystem {
  _id: string;
  systemName: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
