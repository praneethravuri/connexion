import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps = {
  columns: {
    accessorKey: string;
    header: string;
    renderCell?: (item: any) => JSX.Element;
  }[];
  data: any[];
};

const formatDate = (dateInput: Date | string) => {
  let date: Date;
  if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <main className='rounded-lg border border-neutral-800 mt-3 mb-3'>
      <Table className="rounded-lg">
        <TableHeader>
          <TableRow className="hover:bg-neutral-800 border-b border-zinc-600">
            {columns.map((column) => (
              <TableHead className='text-accent' key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow className='hover:bg-neutral-800 border-b border-zinc-600' key={index}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey}>
                  {column.renderCell ? column.renderCell(item) : item[column.accessorKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default DataTable;