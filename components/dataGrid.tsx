"use client";

import DataCard from "./DataCard";

export const Datagrid = () => {
  return (
   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-2 mb-8 mr-3">
      <DataCard />
      <DataCard />
      <DataCard />
      <DataCard />
    </div>
    
  );
};
