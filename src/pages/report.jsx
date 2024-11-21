import React from "react";
import Dashboard from "../components/dashboard"
import EmployeePieReport from "../components/reports/piechartReport";
import EmployeeBarReport from "../components/reports/barchartReport";
import EmployeeLineReport from "../components/reports/linechartReport";
import EmployeePerformanceReport from "../components/reports/performancechartReport";
function Report(){
  return(
    <div className="flex bg-gray-200">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        <EmployeePieReport />
        <EmployeeBarReport />
        <EmployeeLineReport />
        <EmployeePerformanceReport />
      </div>
</div>
  )
}
export default Report;