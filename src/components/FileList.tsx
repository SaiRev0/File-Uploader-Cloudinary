"use client";

import { useState, useEffect } from "react";
import { CloudArrowDownIcon } from "@heroicons/react/24/solid";

interface CloudinaryFile {
  public_id: string;
  format: string;
  url: string;
  resource_type: string;
}

export default function FileList() {
  const [files, setFiles] = useState<CloudinaryFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/list-files");
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No files uploaded yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Files in Cloudinary
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map((file) => (
          <div
            key={file.public_id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              {file.resource_type === "image" ? (
                <img
                  src={file.url}
                  alt={file.public_id}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.public_id.split("/").pop()}
              </p>
              <a
                href={file.url}
                download={`${file.public_id.split("/").pop()}.${file.format}`}
                className="mt-2 flex items-center text-sm text-blue-500 hover:underline"
              >
                <CloudArrowDownIcon className="w-4 h-4 mr-1" />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
