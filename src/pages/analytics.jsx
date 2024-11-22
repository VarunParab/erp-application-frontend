import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Dashboard from "../components/dashboard";
import PieChart from "../components/Charts/piechart";
import BarChartComponent from "../components/Charts/barchart";
import LineChart from "../components/Charts/linechart";
import PerformanceChart from "../components/Charts/performancechart";

function Analytics() {
  const downloadPDF = () => {
    const pdfContainer = document.getElementById("pdf-container"); // Capture entire content for PDF
    const originalClass = pdfContainer.className; // Save the original layout

    // Temporarily modify layout for the PDF
    pdfContainer.className = "grid grid-cols-1 gap-6";

    html2canvas(pdfContainer).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("analytics.pdf");

      // Restore the original layout
      pdfContainer.className = originalClass;
    });
  };

  return (
    <div className="flex bg-gray-200">
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3 relative">
        {/* Full Content for PDF */}
        <div id="pdf-container">
          {/* Analytics Heading */}
          <h1 className="ml-3 mb-3 text-3xl font-bold">📊 Analytics</h1>

          {/* Grid Content */}
          <div className="grid grid-cols-2 gap-6">
            <PieChart />
            <BarChartComponent />
            <PerformanceChart />
            <LineChart />
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={downloadPDF}
          className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF ↓
        </button>
      </div>
    </div>
  );
}

export default Analytics;
