import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


// Define props types for DataTable
type DataTableProps = {
    columns: {
        accessorKey: string;
        header: string;
    }[];
    data: any[]; // Assuming 'any' here, but you should replace it with a more specific type if possible
};

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    return (
        <main className='rounded-lg border border-neutral-800'>
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
                            <TableCell key={column.accessorKey}>{item[column.accessorKey]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </main>
    );
};

export default DataTable;
