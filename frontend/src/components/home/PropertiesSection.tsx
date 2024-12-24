"use client"
import { useAppSelector } from "@/hooks/redux_selectors";
import Properties from "../common/Properties";

export default function PropertiesSection(){
    const { properties, status } = useAppSelector(state => state.Properties);
    return (
        <Properties properties={properties} status={status}/>
    )
}