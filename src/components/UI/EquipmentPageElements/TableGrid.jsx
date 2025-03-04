const columns = [
    {name: 'Name', units: ''},
    {name: 'VPS ID', units: ''},
    {name: 'Oil Quantity', units: 'liters'},
    {name: 'Unit Service Time', units: 'hours'},
    {name: 'Oil Service Time', units: 'hours'},
    {name: 'Sampling Date', units: ''},
    {name: '', units: ''},
    {name: '', units: ''},

]


export const TableGrid = ({children, className}) => {
    return (
        <>
            <div
                className={`grid grid-cols-7 gap-2 text-primaryText mb-2 border-b border-borderLight pb-2 text-center p-1 ${className}`}>
                {columns.map((column, index) => (
                    <div key={column.name + index} className="font-semibold">
                        {column.name}
                        <div className="text-secondaryAccent text-xs">{column.units}</div>
                    </div>
                ))}
                {children}
            </div>
        </>
    )
}
