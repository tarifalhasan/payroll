import { cn } from "@/lib/utils";

interface TableProps {
  children: React.ReactNode;
}
export const Table: React.FC<TableProps> = ({ children }) => {
  return <table className="min-w-full bg-white">{children}</table>;
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  //   you can override any of these properties or add
}

export const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={cn(className)}>{children}</tr>;
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  // you can override any of these properties or add
}
export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
}) => {
  return <td className={`px-6 py-4 ${className}`}>{children}</td>;
};
