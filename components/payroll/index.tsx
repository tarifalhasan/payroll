"use client";

import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import MonthSwitcher from "../ui/DateFns";
import { Table, TableCell, TableRow } from "../ui/Table";
import { Tooltip } from "../ui/Tooltip";

interface Employee {
  name: string;
  title: string;
}

interface PayrollData {
  employees: Employee;
  errorCount?: number;
  salaryType: string;
  baseSalary: string;
}

interface PayrollApprovalProps {
  month?: string;
  year?: number;
  data: PayrollData[];
  approvalText?: string;
  errorFixMessage?: string;
  periodMessage?: string;
  approveButtonLabel?: string;
  employeeColumnLabel?: string;
  errorColumnLabel?: string;
  salaryTypeColumnLabel?: string;
  baseSalaryColumnLabel?: string;
}

const PayrollApproval: React.FC<PayrollApprovalProps> = ({
  month,
  year,
  data,
  approvalText = "Approve payroll",
  errorFixMessage = "Fix errors in employee data to approve this period's payroll.",
  periodMessage = "Period pending approval before 25 Nov 2023",
  approveButtonLabel = "Approve payroll",
  employeeColumnLabel = "Employees",
  errorColumnLabel = "Errors",
  salaryTypeColumnLabel = "Salary Type",
  baseSalaryColumnLabel = "Base Salary",
}) => {
  const currentDate = new Date();
  const initialDate = new Date(currentDate.getFullYear(), 4); // May is represented by index 4
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Handle other logic related to date change if needed
  };

  return (
    <div className=" bg-gray-100 p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <MonthSwitcher
            initialSelectedDate={selectedDate || undefined}
            onDateChange={handleDateChange}
          />
          <div>
            <Alert variant={"destructive"}>
              <div className=" inline-flex items-center gap-1">
                <FaExclamationCircle /> {errorFixMessage}
              </div>
            </Alert>
          </div>
          <Button variant={"primary"}>{approveButtonLabel}</Button>
        </div>
        <div className="text-sm font-semibold text-gray-600 py-4">
          {periodMessage}
        </div>
        <div className="overflow-x-auto mt-6">
          <Table>
            <thead className="bg-gray-200 text-black">
              <TableRow>
                <TableCell className="w-1/3 font-semibold text-sm">
                  {employeeColumnLabel}
                </TableCell>
                <TableCell className="w-1/6 vertical-divider">
                  {errorColumnLabel}
                </TableCell>
                <TableCell className="w-1/4 font-semibold text-sm">
                  {salaryTypeColumnLabel}
                </TableCell>
                <TableCell className="w-1/4 font-semibold text-sm">
                  {baseSalaryColumnLabel}
                </TableCell>
              </TableRow>
            </thead>
            <tbody className="text-gray-700">
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <div>
                      <p className=" font-medium">{row.employees.name}</p>
                      <p className="text-sm text-gray-500">
                        {row.employees.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="border-r border-[#e5e7eb] ">
                    <Tooltip text={errorColumnLabel}>
                      {row.errorCount !== undefined ? (
                        <span className="error-indicator">
                          {row.errorCount}
                        </span>
                      ) : (
                        ""
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell>{row.salaryType}</TableCell>
                  <TableCell>{row.baseSalary}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PayrollApproval;
