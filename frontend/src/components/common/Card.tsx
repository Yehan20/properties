import { CardProps } from "@/types/types"
import Image from "next/image"
import Map from "../icons/map"



const Card: React.FC<CardProps> = ({ property }) => {
    return (
        <div className="relative mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <Image src={property.propertyImg} className="h-48 w-full object-cover object-center" width={300} height={300} alt="Product Image" />
            <span className="absolute top-3 left-1 capitalize bg-white rounded-full text-xs font-semibold px-3 py-2">{property.propertyStatus}</span>
            <div className="p-4 text-start">
                <h2 className="mb-2 text-[18px] font-semibold">{property.propertyTitle}</h2>
                <p className="mb-2 -ml-1 font-semibold gap-2 capitalize items-center text-[14px] text-gray-600 flex">
                <span className="text-blue-500 inline "> <Map /> </span>
                {  property.propertyLocation}</p>
                <p className="ml-auto mb-2 text-base capitalize font-semibold text-blue-500">{property.propertyType}</p>
                <div className="flex justify-between  items-center">
                    <p className="mr-2 text-sm font-semibold capitalize">LKR : {property.propertyPrice.toLocaleString()}</p>
                    <p className="text-[10px] font-semibold capitalize">{property.propertyArea} 
                        <span className="text-gray-500 "> sq ft</span></p>

                </div>
            </div>
        </div>
    )
}

export default Card