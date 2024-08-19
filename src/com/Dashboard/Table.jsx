import React from 'react'

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'


export function Table({ columns, rows, pagination, setPagination }) {


    // const [rowSelection, setRowSelection] = React.useState({})






    const table = useReactTable({
        data: rows.data || [],
        columns,
        state: {
            // rowSelection,
            pagination

        },
        enableRowSelection: true, //enable row selection for all rows
        onPaginationChange: setPagination,
        // onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true, //turn off client-side pagination
        rowCount: rows?.pagination?.total_records || 0, //pass 
        autoResetPageIndex: false,
        // toResetSelectedRows: true,
        debugTable: true,
    })

    return (


        < div className="p-6 sm:overflow-hidden overflow-scroll px-0" >

            <table className='w-full min-w-max table-auto text-left bg-[#1c1c24] p-4
      '>

                <thead>
                    {table.getHeaderGroups().map((headerGroup,index) => {
                    
                        return <tr key={index} >
                            {headerGroup.headers.map(header => {
                                return (
                                    <>
                                        <th key={header.id} colSpan={header.colSpan} className='  p-4 text-left'>
                                            {header.isPlaceholder ? null : (
                                                <p className='block antialiased font-sans text-lg text-blue-gray-900 font-normal leading-none opacity-70'>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                </p>
                                            )}

                                        </th>

                                    </>
                                )
                            })}
                        </tr>
                    }
                    )}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id} className='p-4 text-left'>
                                            <p className='block antialiased font-sans text-md font-bold leading-normal text-blue-gray-900 font-normal'>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </p>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="flex items-center gap-5 mt-3 bg-[#1c1c24] p-4">
                <button
                    className="border rounded p-2 font-bold"
                    onClick={() => table.firstPage(1)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-2 font-bold"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-2 font-bold"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-2 font-bold"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-2">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-2">
                    |   Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                {/* <div>
                    {Object.keys(rowSelection).length} of{' '}
                    {pagination.pageSize} Total Rows Selected
                </div> */}
            </div>




        </div >




    )
}





