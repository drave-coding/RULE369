import React from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DataChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Production by Domain</CardTitle>
        </CardHeader>
        {/* Reduced height */}
        <CardContent className="h-[200px]">
          <div className="h-full">
            <PieChart />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Sales Over the Last 6 Months</CardTitle>
        </CardHeader>
        {/* Reduced height */}
        <CardContent className="h-[200px]">
          <div className="h-full">
            <BarChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataChart;
