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

export enum Hierarchy {
  BarrialYSuburbano = "Barrial y Suburbano",
  Ciudad = "Ciudad",
  MetropolitanoYRegional = "Metropolitano y Regional",
  ZonalYCorregimental = "Zonal y Corregimental",
}

export interface InternalSystem {
  _id: string;
  systemName: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
