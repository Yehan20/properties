export interface Property {
    _id?:string;
    propertyTitle: string;
    propertyImg: string;
    propertySlug: string;
    propertyLocation: string;
    propertyDescription: string;
    propertyPrice: number | string;
    propertyType: string;
    propertyStatus: string;
    propertyArea: number | string;
}

export interface PropertiesState {
    properties: Property[];
    searchProperties:Property [] |[];
    status:string;
}
export interface CardProps {
    property: Property;
  }

  export interface SearchParams{
    location?:string;
    status?:string;
    type?:string;
  }
  