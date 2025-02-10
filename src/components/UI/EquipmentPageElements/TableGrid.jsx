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


export const TableGrid = () => {
    return (
        <>
            <div
                className={`grid grid-cols-[240px_repeat(6,_1fr)_80px] gap-2 text-primaryText mb-2 border-b border-borderLight pb-2 text-center`}>
                {columns.map((column, index) => (
                    <div key={column.name + index} className="font-semibold">
                        {column.name}
                        <div className="text-secondaryAccent">{column.units}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
