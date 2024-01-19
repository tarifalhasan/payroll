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

export interface PayrollData {
  employees: Employee;
  errorCount?: number;
  salaryType: string;
  baseSalary: string;
}

export interface PayrollApprovalProps {
  month?: string;
  year?: number;
  data: PayrollData[];
}

const PayrollApproval: React.FC<PayrollApprovalProps> = ({
  month,
  year,
  data,
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
                <FaExclamationCircle /> Fix errors in employee data to approve
                this subcompany&apos;s payroll period.
              </div>
            </Alert>
          </div>
          <Button>Approve payroll</Button>
        </div>
        <div className="text-sm font-semibold text-gray-600 py-4">
          Period pending approval before 25 Nov 2023
        </div>
        <div className="overflow-x-auto mt-6">
          <Table>
            <thead className="bg-gray-200 text-black">
              <TableRow>
                <TableCell className="w-1/3 font-semibold text-sm">
                  Employees
                </TableCell>
                <TableCell className="w-1/6 vertical-divider">Errors</TableCell>
                <TableCell className="w-1/4 font-semibold text-sm">
                  Salary type
                </TableCell>
                <TableCell className="w-1/4 font-semibold text-sm">
                  Base salary
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
                    <Tooltip text="Error">
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
