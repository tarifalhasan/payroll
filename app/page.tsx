import PayrollApproval from "@/components/payroll";

export default function Home() {
  const dummyData = [
    {
      employees: { name: "John Doe", title: "Developer" },
      errorCount: 1,
      salaryType: "Fixed",
      baseSalary: "$3,000.00",
    },
    {
      employees: { name: "Alice Johnson", title: "Manager" },
      salaryType: "Hourly",
      baseSalary: "$20.00/hour",
    },
    {
      employees: { name: "Tarif", title: "Developer" },
      salaryType: "Hourly",
      baseSalary: "$60.00/hour",
    },
  ];
  return (
    <div>
      <PayrollApproval month="February" year={2023} data={dummyData} />
    </div>
  );
}
