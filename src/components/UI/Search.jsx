import {useEffect, useState} from "react";

export const Search = ({hidden, onSearch, placeholder}) => {
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        onSearch(search);
    }, [search]);

    return (
        <>
            <input hidden={hidden}
                   className="bg-surfaceLight px-4 rounded"
                   placeholder={placeholder}
                   onChange={handleChange}
                   value={search}
            />
        </>
    )
}