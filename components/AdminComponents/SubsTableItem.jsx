import React from 'react'

const SubsTableItem = ({email,date,mongoId,deleteHandler}) => {
    const emailDate= new Date(date);
  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-4 font-semibold text-gray-900 whitespace-nowrap'>
            {email?email:"no email"}
        </th>
        <td className='px-6 py-4 hidden sm:block'>
            {emailDate.toDateString()}
        </td>
        <td onClick={()=>deleteHandler(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>

    </tr>
  )
}

export default SubsTableItem
