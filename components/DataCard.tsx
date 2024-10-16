"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

// Updated DataCard to accept props
interface DataCardProps {
  title?: string; // Title can be passed as a prop
  children?: ReactNode; // Children to allow custom content inside the card
}
 
const DataCard = ({ title = "Data", children }: DataCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children ? children : "Content"}
      </CardContent>
    </Card>
  );
};

export default DataCard;
