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
import { Button } from '../ui/button';

type DataTableProps = {
  columns: {
    accessorKey: string;
    header: string;
  }[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
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
  const extendedColumns = [...columns, { accessorKey: 'actions', header: 'Actions' }];

    return (
    <main className='rounded-lg border border-neutral-800 mt-3 mb-3'>
      <Table className="rounded-lg">
        <TableHeader>
          <TableRow className="hover:bg-neutral-800 border-b border-zinc-600">
            {extendedColumns.map((column) => (
              <TableHead className='text-accent' key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow className='hover:bg-neutral-800 border-b border-zinc-600' key={index}>
              {extendedColumns.map((column) => (
                <TableCell key={column.accessorKey}>
                  {column.accessorKey === 'createdAt'
                    ? formatDate(item[column.accessorKey])
                    : column.accessorKey === 'actions'
                    ? (
                        <>
                          <Button variant="destructive" onClick={() => onEdit(item)} className="mr-2">Edit</Button>
                          <Button variant="ghost" onClick={() => onDelete(item)}>Delete</Button>
                        </>
                      )
                    : item[column.accessorKey]}
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