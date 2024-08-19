import React, { useEffect, useState } from "react"

import { Table } from "./Table"

// import { IndeterminateCheckbox } from "./IntermediateCheckbox"
import { fetchPaginatedData } from "./certificate_api"
import AddCertificate from "./AddCertificate"
import EditCertificate from "./EditCertificate"
import { db, storage } from "../api"
import toast from "react-hot-toast"



const Certificate = () => {
  const [modal, showModal] = useState(false)


  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(0)
  const [certificate, setCertificate] = useState()
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 5, //default page size
  });


  const loadData = async () => {
    const result = await fetchPaginatedData(pagination.pageIndex, pagination.pageSize);
    setCertificate(result)
  };



  const handleDelete = async (data) => {

    if (data.image) {
      await storage.deleteFile('66b6b129002629cece9f', data.image)
    }
    const promise = db.deleteDocument("66b6ba35003bd0a4efa4", "66b6ba3f002b5d818ab7", data.$id)
    promise.then(res => {
      toast.success("Delete successfull 🎉")
      loadData()
    });

  }




  useEffect(() => {
    loadData()
  }, [pagination])



  const columns = React.useMemo(
    () => [
      // {
      //   id: 'select',
      //   header: ({ table }) => (
      //     <IndeterminateCheckbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler(),
      //       }}
      //     />
      //   ),

      //   cell: ({ row }) => (
      //     <div className="px-1">
      //       <IndeterminateCheckbox
      //         key={row.id}
      //         {...{
      //           checked: row.getIsSelected(),
      //           disabled: !row.getCanSelect(),
      //           indeterminate: row.getIsSomeSelected(),
      //           onChange: row.getToggleSelectedHandler(),
      //         }}
      //       />
      //     </div>
      //   ),
      // },
      {
        header: 'Title',
        accessorKey: "title",
        cell: (info) => info.getValue(),

      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: (info) => <p>{info.getValue().substring(0, 20)}...</p>,
      },
      {
        header: 'Actions',
        id: 'actions',
        accessorKey: 'actions',
        cell: (info) => <div className="p-3 flex gap-2 ">
          <button className="text-slate-800 hover:text-blue-600 text-sm bg-green-200  border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={() => {
            setEdit(true)
            setEditId(info.row.original)
            // form(info)

          }}>
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLineCap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            </span>
            <span>Edit</span>
          </button>
          <button className="text-slate-800 hover:text-blue-600 text-sm bg-red-200 hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={() => handleDelete(info.row.original)}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLineCap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </span>
            <span>Delete</span>
          </button>
        </div>
      }
    ],
    []
  )


  return (
    <>
      <div className='w-full flex items-center justify-between flex-wrap'>
        <p className='text-bold text-[28px]'>Certificate</p>
        <button
          type='submit'
          className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white  shadow-md shadow-primary'
          onClick={() => showModal((true))}
        >Create Certificate</button>
      </div>
      {certificate && <Table columns={columns} rows={certificate} pagination={pagination} setPagination={setPagination} />}


      {modal && <AddCertificate showModal={showModal} loadData={loadData} />}
      {edit && <EditCertificate showModal={setEdit} setEditId={setEditId} editId={editId} loadData={loadData} />}


    </>
  )
}

export default Certificate