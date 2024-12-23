import {Request,Response} from 'express'
import propertyModel from '../model/property'
import { Search } from '../types';



const index = async (req: Request, res: Response) =>{
    try{
        const propertys = await propertyModel.find({}).sort(({createdAt:-1}));
        res.json({propertys:propertys}).status(200)
      }catch (error:unknown) {
          if(error instanceof Error){
              res.json({message:error.message}).status(500)
          }
      }
}


const store = async (req: Request, res: Response) => {
    const {
        propetyTitle,
        propetyImg,
        propetySlug,
        propetyLocation,
        propetyDescription,
        propetyPrice,
        propetyType,
        propetyStatus,
        propetyArea,
        propetyInStock = true,
    } = req.body;

    // Validate required fields
    if (
        !propetyTitle ||
        !propetyImg ||
        !propetySlug ||
        !propetyLocation ||
        !propetyDescription ||
        !propetyPrice ||
        !propetyType ||
        !propetyStatus ||
        !propetyArea
    ) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Check if a property with the same title or slug already exists
     
        if(await propertyModel.findOne({propetyTitle})){
             return res.status(422).json({message:'A property is added for that name'})
        }

        // Create a new property document
        const newProperty =await  propertyModel.create({
            propetyTitle,
            propetyImg,
            propetySlug,
            propetyLocation,
            propetyDescription,
            propetyPrice,
            propetyType,
            propetyStatus,
            propetyArea,
            propetyInStock,
        });

        // Return a success response with the newly created property
        res.status(201).json({
            message: "Property added successfully!",
            property: newProperty,
        });
    } catch (error: unknown) {
        // Handle any errors
    

        res.status(500).json({ error: "Server error while adding property." });
    }
};




const search = async (req: Request, res: Response) => {
    try {

        const { location, status, type } = req.query;
        
        if (!location && !status && !type) {
            return res.status(400).json({
                error: "Invalid query parameters."
            });
        }
       
     
        let searchQuery:Search={};

        if (location) searchQuery.propetyLocation = location as string;
        if (status) searchQuery.propetyStatus = status as string;
        if (type)  searchQuery.propetyType = type as string;

        // Perform the search using the built query
        const properties = await propertyModel.find(searchQuery);

        // Check if any properties were found
        if (properties.length === 0) {
            return res.status(404).json({ message: "No properties found ." });
        }

        // Return the found properties
        return res.status(200).json({  properties });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error while searching properties." });
    }
};

export default{
    store , index , search
   
}


