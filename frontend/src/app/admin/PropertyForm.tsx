"use client";

import {  useFormik } from "formik";
import * as Yup from "yup";

import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import {storage} from '@/firebase/firebase'
import Store from "@/store/store";
import { createProperty } from "@/store/propertySlice";
import { useRouter } from "next/navigation";
import { useState } from "react";


// Yup validation schema
const validationSchema = Yup.object({

  propertyTitle: Yup.string().required("Property Title is required"),

  propertyImg: Yup.mixed().required("Property Image is required"),

  propertySlug: Yup.string()

    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphenated")
    .required("Property Slug is required"),

  propertyLocation: Yup.string().required("Property Location is required"),

  propertyDescription: Yup.string().required("Property Description is required"),

  propertyPrice: Yup.number()
    .positive("Price must be a positive number")
    .required("Property Price is required"),

  propertyType: Yup.string().required("Property Type is required"),
  propertyStatus: Yup.string().required("Property Status is required"),

  propertyArea: Yup.number()
    .positive("Area must be a positive number")
    .required("Property Area is required"),

  propertyInStock: Yup.boolean(),
});

export default function PropertyForm() {

  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      propertyTitle: "",
      propertyImg: "",
      propertySlug: "",
      propertyLocation: "",
      propertyDescription: "",
      propertyPrice: "",
      propertyType: "",
      propertyStatus: "",
      propertyArea: "",
      propertyInStock: false,
    },
    validationSchema,
    onSubmit: async(values) => {
         
         setLoading(true);
          
          console.log("Form submitted:", values);
          const imageRef = ref(storage,`files/${Date.now()}.${values.propertyImg}`)

       
          // upload image to firebase
          const uploaded= await uploadBytes(imageRef,values.propertyImg as unknown as File);

          // Get Url
          const imageURL = await getDownloadURL(uploaded.ref) 

          const newProperty = await Store.dispatch(createProperty({...values, propertyImg:imageURL}));
          
          if(newProperty.payload) {
              router.push('/');      
          }
          else {
            setLoading(false)
            setErrorMessage('The property name and slug name exists in another property')
          }
        

          setTimeout(()=>{
               setErrorMessage("");
          },2000)
           
    },
  });




  return (
    <form onSubmit={formik.handleSubmit}  className="grid grid-cols-1 py-4 sm:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="propertyTitle"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Title
        </label>
        <div className="mt-2">
          <input
            id="propertyTitle"
            name="propertyTitle"
            type="text"
            placeholder="Enter property title"
            className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
       
            value={formik.values.propertyTitle}
          />
          {formik.touched.propertyTitle && formik.errors.propertyTitle && (
            <div className="text-sm text-red-600">{formik.errors.propertyTitle}</div>
          )}
        </div>
      </div>

      {/* Property Image */}
      <div className="m-0">
        <label
          htmlFor="propertyImg"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Image
        </label>
        <div className="mt-2">
          <input
            id="propertyImg"
            name="propertyImg"
            type="file"
            accept="image/*"
            className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-300 rounded-md"
            onChange={(e) => formik.setFieldValue("propertyImg", e.target.files?.[0] )}
       
          />
          {formik.touched.propertyImg && formik.errors.propertyImg && (
            <div className="text-sm text-red-600">{formik.errors.propertyImg}</div>
          )}
        </div>
      </div>

      {/* Property Slug */}
      <div>
        <label
          htmlFor="propertySlug"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Slug
        </label>
        <div className="mt-2">
          <input
            id="propertySlug"
            name="propertySlug"
            type="text"
            placeholder="example-property"
            className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
       
            value={formik.values.propertySlug}
          />
          {formik.touched.propertySlug && formik.errors.propertySlug && (
            <div className="text-sm text-red-600">{formik.errors.propertySlug}</div>
          )}
        </div>
      </div>

      {/* Property Location */}
      <div>
        <label
          htmlFor="propertyLocation"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Location
        </label>
        <div className="mt-2">
          <select
            id="propertyLocation"
            name="propertyLocation"
            className="block w-full text-sm p-2.5 border bg-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
       
            value={formik.values.propertyLocation}
          >
            <option value="" disabled >
              Select Location
            </option>
            <option value="galle">Galle</option>
            <option value="colombo">Colombo</option>
            <option value="kandy">Kandy</option>
          </select>
          {formik.touched.propertyLocation && formik.errors.propertyLocation && (
            <div className="text-sm text-red-600">{formik.errors.propertyLocation}</div>
          )}
        </div>
      </div>

      {/* Property Description */}
      <div>
        <label
          htmlFor="propertyDescription"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Description
        </label>
        <div className="mt-2">
          <textarea
            id="propertyDescription"
            name="propertyDescription"
            placeholder="Enter a detailed description"
            rows={4}
            className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
       
            value={formik.values.propertyDescription}
          />
          {formik.touched.propertyDescription && formik.errors.propertyDescription && (
            <div className="text-sm text-red-600">{formik.errors.propertyDescription}</div>
          )}
        </div>
      </div>

      {/* Property Price */}
      <div>
        <label
          htmlFor="propertyPrice"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Price (LKR)
        </label>
        <div className="mt-2">
          <input
            id="propertyPrice"
            name="propertyPrice"
            type="number"
            placeholder="Enter property price"
            className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
       
            value={formik.values.propertyPrice}
          />
          {formik.touched.propertyPrice && formik.errors.propertyPrice && (
            <div className="text-sm text-red-600">{formik.errors.propertyPrice}</div>
          )}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label
          htmlFor="propertyType"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Type
        </label>
        <div className="mt-2">
          <select
            id="propertyType"
            name="propertyType"
            className="block w-full text-sm p-2.5 border bg-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
       
            value={formik.values.propertyType}
          >
            <option value="" disabled >
              Select Type
            </option>
            <option value="single family">Single Family</option>
            <option value="villa">Villa</option>
          </select>
          {formik.touched.propertyType && formik.errors.propertyType && (
            <div className="text-sm text-red-600">{formik.errors.propertyType}</div>
          )}
        </div>
      </div>

      {/* Property Status */}
      <div>
        <label
          htmlFor="propertyStatus"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Status
        </label>
        <div className="mt-2">
          <select
            id="propertyStatus"
            name="propertyStatus"
            className="block w-full text-sm p-2.5 border bg-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
       
            value={formik.values.propertyStatus}
          >
            <option value="" disabled >
              Select Status
            </option>
            <option value="for sale">For Sale</option>
            <option value="for rent">For Rent</option>
          </select>
          {formik.touched.propertyStatus && formik.errors.propertyStatus && (
            <div className="text-sm text-red-600">{formik.errors.propertyStatus}</div>
          )}
        </div>
      </div>

      {/* Property Area */}
      <div>
        <label
          htmlFor="propertyArea"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property Area (sq ft)
        </label>
        <div className="mt-2">
          <input
            id="propertyArea"
            name="propertyArea"
            type="number"
            placeholder="Enter property area"
            className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
       
            value={formik.values.propertyArea}
          />
          {formik.touched.propertyArea && formik.errors.propertyArea && (
            <div className="text-sm text-red-600">{formik.errors.propertyArea}</div>
          )}
        </div>
      </div>

      {/* Property In Stock */}
      <div className="">
        <label
          htmlFor="propertyInStock"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Property In Stock
        </label>
        <div className="mt-2">
          <input
            id="propertyInStock"
            name="propertyInStock"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            onChange={formik.handleChange}
       
            checked={formik.values.propertyInStock}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-1/2 block mx-auto py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-300"
        >
          {loading ?"Adding ... Dont Close the Page" :"Add Property"}
        </button>
        {errorMessage  && <p className="text-red-500 mt-4 text-current text-center font-bold"> {errorMessage}</p> }
      </div>
    </form>
  );
}
