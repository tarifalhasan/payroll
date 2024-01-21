import PayrollApproval from "@/components/payroll";

export default function Home() {
  return (
    <div>
      <PayrollApproval
        month="February"
        year={2023}
        data={{
          rows: [
            {
              employee: { name: "Alena Jacobs", title: "Product Designer" },
              jobs: 15,
              projectType: "Construction",
              price: "$30,000.00",
            },
            {
              employee: { name: "Tarif Al Hasan", title: "Developer" },
              jobs: 3,
              projectType: "Construction",
              price: "$20,000.00",
            },
          ],
          columns: ["Employees", "Jobs", "Project Type", "Price"],
          attributeDefinitions: {
            jobs: {
              type: "number",
              description: "Number of jobs",
            },
            projectType: {
              type: "string",
              description: "Type of the project",
            },
            price: {
              type: "string",
              description: "Price of the project",
            },
            // ... definitions for other attributes
          },
        }}
        errorFixMessage="Fix errors in company data to approve this period's orders."
        errorFixMessageType="destructive"
        periodMessage="Period pending approval before 25 Feb 2023"
        approveButtonLabel="Accept Order"
      />
    </div>
  );
}
