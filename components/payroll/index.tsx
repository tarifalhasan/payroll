"use client";

import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationCircle,
} from "react-icons/fa";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { Table, TableCell, TableRow } from "../ui/Table";

interface EmployeeData {
  name: string;
  title: string;
}

interface GenericData<T extends string[]> {
  rows: Array<{
    employee: EmployeeData;
    jobs: number;
    projectType: string;
    price: string;
  }>;
  columns: T;
  attributeDefinitions: {
    [key in T[number]]: {
      type: "string" | "number";
      description: string;
    };
  };
}

interface PayrollApprovalProps<T extends string[] = string[]> {
  month: string;
  year: number;
  data: GenericData<T>;
  errorFixMessage?: string;
  periodMessage?: string;
  approveButtonLabel: string;
  errorFixMessageType: "destructive" | "success";
}

const PayrollApproval = <T extends string[] = string[]>({
  month,
  year,
  data,
  errorFixMessage,
  periodMessage,
  approveButtonLabel,
  errorFixMessageType,
}: PayrollApprovalProps<T>) => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-wrap gap-5 items-center justify-between pb-4 border-b">
          <div className="flex items-center">
            <button>
              <FaChevronLeft />
            </button>
            <button>
              <FaChevronRight />
            </button>
            <span className="font-semibold text-lg ml-4">
              {month} {year}
            </span>
          </div>
          <div>
            <Alert variant={errorFixMessageType}>
              <div className="inline-flex items-center gap-1">
                {errorFixMessageType === "destructive" ? (
                  <FaExclamationCircle />
                ) : (
                  <FaCheckCircle />
                )}{" "}
                {errorFixMessage}
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
                {data.columns.map((label, index) => (
                  <TableCell
                    key={index}
                    className={`w-1/${data.columns.length} font-semibold text-sm`}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </thead>
            <tbody className="text-gray-700">
              {data.rows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <div>
                      <p className=" font-semibold">{row.employee.name}</p>
                      <p className=" text-sm font-normal">
                        {row.employee.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>{row.jobs}</p>
                  </TableCell>
                  <TableCell>
                    <p>{row.projectType}</p>
                  </TableCell>
                  <TableCell>
                    <p>{row.price}</p>
                  </TableCell>
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
