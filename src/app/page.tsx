"use client";

import { useState } from "react";
import UploadForm from "../components/UploadForm";
import FileList from "../components/FileList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadComplete = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Cloudinary File Manager
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <UploadForm onUploadComplete={handleUploadComplete} />
        <FileList key={refreshKey} />
      </div>
    </main>
  );
}
