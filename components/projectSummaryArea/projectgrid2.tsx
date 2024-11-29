"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProjectGrid2 = () => {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Request Area</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          This section can be used for request-specific content or additional
          functionality in the future.
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectGrid2;
