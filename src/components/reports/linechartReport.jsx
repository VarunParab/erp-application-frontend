import React from "react";
import { jsPDF } from "jspdf";

const EmployeeBarReport = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add the report content
    doc.setFontSize(16);
    doc.text("Employee Weekly Hours Report", 20, 20);
    doc.setFontSize(12);
    doc.text("Date: November 20, 2024", 20, 30);
    doc.text("===================================================================", 20, 35);

    // Section: Project Progress Analytics
    doc.setFontSize(10);
    doc.text("This report analyzes the weekly work hours logged by the employee over a 3-month period (12 weeks).", 20, 45);
    doc.setFontSize(12);
    doc.text("Performance Summary - ", 20, 55);

    const progressData = [
      ["Week", "Hours Logged"],
      ["Week 1", "40 hrs (Consistent and commendable)"],
      ["Week 2", "36 hrs (Slight dip, within acceptable range)"],
      ["Week 3", "42 hrs (Excellent productivity)"],
      ["Week 4", "38 hrs (Steady performance)"],
      ["Week 5", "44 hrs (High engagement week)"],
      ["Week 6", "37 hrs (Below average, needs review)"],
      ["Week 7", "39 hrs (Consistent work habits)"],
      ["Week 8", "45 hrs (Outstanding contribution)"],
      ["Week 9", "40 hrs (Solid and steady output)"],
      ["Week 10", "43 hrs (Maintained high hours)"],
      ["Week 11", "38 hrs (Normal working range)"],
      ["Week 12", "41 hrs (Good conclusion to the quarter)"]
    ];

    const columnWidths = [30, 70]; // Adjusted widths

    let y = 65; // Initialize y-position for table
    progressData.forEach((row, rowIndex) => {
      let xPosition = 20; // Start at the left margin
      row.forEach((col, colIndex) => {
        doc.text(col, xPosition, y);
        xPosition += columnWidths[colIndex]; // Move to the next column
      });
      y += 8; // Move to the next row
    });

    // Section: Summary
    y += 15; // Add spacing before the summary
    doc.text("Summary:", 20, y);
    doc.text(
      "- Consistency: The employee maintained consistent hours weekly, ranging between 36–45 hours.",
      20,
      y + 10
    );
    doc.text(
      "- High Performance Weeks: Peak engagement was observed in Week 8 with 45 hours logged.",
      20,
      y + 20
    );
    doc.text(
      "- Potential Dips: Weeks 2 and 6 showed slightly lower hours, potentially due to external factors.",
      20,
      y + 30
    );

    // Section: Recommendations for Improvement
    y += 50; // Add spacing before the recommendations
    doc.setFontSize(12);
    doc.text("Recommendations for Improvement", 20, y);
    doc.setFontSize(10);
    doc.text(
      "1. Monitor Workload: Ensure balanced task assignments to avoid burnout during high-performance weeks.",
      20,
      y + 10
    );
    doc.text(
      "2. Review Low-Performance Weeks: Investigate Weeks 2 and 6 for task delays or personal circumstances.",
      20,
      y + 20
    );
    doc.text(
      "3. Acknowledge and Reward: Recognize Weeks 8 and 10 for exemplary dedication",
      20,
      y + 30
    );


    // Save the PDF
    doc.save("Employee_Analytics_Report.pdf");
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Employee Working Report</h2>
      <p>Click the button below to download the Employee working report as a PDF:</p>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default EmployeeBarReport;
