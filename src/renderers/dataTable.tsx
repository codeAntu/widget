interface dataTableProps {
  data: any[]
}

const DataTable: React.FC<dataTableProps> = ({ data }) => {
  return (
    <div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th
                key={key}
                className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx} className='px-6 py-4 whitespace-nowrap'>
                  temp
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
