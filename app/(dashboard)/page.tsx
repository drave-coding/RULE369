import DataChart from "@/components/DataChart";
import { Datagrid } from "@/components/dataGrid";
import TopSection from "@/components/TopSection";



export default function DashBoardPage() {
  return(
    
    <div className=" max-w-screen-2xl mx-auto w-full pl-10 pr-10 pb-10 pt-3 " >
      <TopSection/>
      <Datagrid/>
      <DataChart/>
    </div>
    
  )
}
