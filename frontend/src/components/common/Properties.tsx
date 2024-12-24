"use client";

import { useState } from "react";
import Card from "@/components/common/Card";

import { Property } from "@/types/types";
import Loader from "@/components/common/Loader";

interface PropertiesProps {
    properties: Property[];
    status: string;
}

const Properties: React.FC<PropertiesProps> = ({ properties, status }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate total pages
    const totalPages = Math.ceil(properties.length / itemsPerPage);

    // Get properties for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProperties = properties.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    if (status !== "success") {
        return <Loader />;
    }

    return (
        <div className="mx-auto max-w-7xl">
            {/* Properties */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.length > 0 &&
                    currentProperties.map((property: Property) => (
                        <Card key={property._id} property={property} />
                    ))}
            </div>

            {/* Pagination Controls */}
            {properties.length > 0 && (
                <div className="flex justify-center items-center space-x-2 mt-4 py-5">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`px-3 py-2 rounded-md ${currentPage === page
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages
                            ? "bg-gray-300"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            )}

            {properties.length === 0 && (
                <div className="py-4">
                    <h2 className="text-2xl font-semibold text-center text-blue-500">
                        No Properties Available
                    </h2>
                </div>
            )}
        </div>
    );
};

export default Properties;
