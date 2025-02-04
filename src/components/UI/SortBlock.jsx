export const SortBlock = ({hidden, options, onChange, value, defaulValue}) => {
    return (
        <>
            <select hidden={hidden}
                    onChange={event => {onChange(event.target.value)}}
                    value={value}
                    className="bg-surfaceLight px-4 py-2 text-highlightText rounded hover:bg-opacity-80 border-2 border-borderDark">

                <option disabled value={''}>{defaulValue}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}
            </select>
        </>
    )
}