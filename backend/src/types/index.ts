//
export interface PropertyInterface extends Document {
    propertyTitle: string;          
    propertyImg: string;            
    propertySlug: string;           
    propertyLocation: string;       
    propertyDescription: string;    
    propertyPrice: number;         
    propertyType: string;          
    propertyStatus: string;         
    propertyArea: number;         
    propertyInStock: boolean;      
}

export interface Search {
    propetyLocation?:string ;
    propetyType?:string;
    propetyStatus?:string;
}