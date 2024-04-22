"use client";
import React, { useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import { Input } from '@/components/ui/input'

interface Column {
  accessorKey: string;
  header: string;
}

interface TableInfoProps<T extends object> {
  data: T[];
  columns: Column[];
  title: string;
}

const TableInfo = <T extends object>({ data, columns, title }: TableInfoProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter((item) => {
    // Convert all values to strings and then check if any value contains the search query
    const values = Object.values(item).map((value) => String(value).toLowerCase());
    return values.some((value) => value.includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="mt-5 communities-data-table h-96 overflow-y-auto  text-white p-4 rounded-lg w-full">
      <p className="text-xl font-semibold mt-5 mb-5">{title} Data</p>
      <Input
        type="text"
        placeholder="Search data"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-neutral-950"
      />
      <hr className="border-t border-zinc-800 mx-auto my-4" />
      <DataTable columns={columns} data={filteredData} />
    </div>
  )
}

export default TableInfo