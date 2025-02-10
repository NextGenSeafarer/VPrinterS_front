import {SortBlock} from "../SortBlock.jsx";
import {Search} from "../Search.jsx";
import {ButtonWithText} from "../ButtonWithText.jsx";
import {useEffect, useState} from "react";

const sortOptions = [
    {value: 'name', name: "Name"},
    {value: 'vps_equipment_id', name: "VPS ID"},
    {value: 'sampling_date', name: "Sampling date"},
    {value: 'new', name: "From newest"},
    {value: 'old', name: "From oldest"},
];

export const EquipmentTableFunctionsBlock = ({
                                                 hidden,
                                                 handleSorting,
                                                 onSearch,
                                                 onShowNewEquipment,
                                                 onDeselect,
                                                 handleActiveSendToPrinter,
                                                 handleSecretCode
                                             }) => {

    const [selectedSort, setSelectedSort] = useState('');
    const [secretCode, setSecretCode] = useState('');

    const handleSortChange = (sort) => {
        setSelectedSort(sort);
        handleSorting(sort);
    }

    return (
        <>
            <div className="flex justify-between mb-4 items-center mt-8 text-xs">
                <div className="flex gap-3">
                    <SortBlock hidden={hidden}
                               options={sortOptions}
                               value={selectedSort}
                               defaulValue={'Sort by'}
                               onChange={handleSortChange}>
                    </SortBlock>
                    <Search hidden={hidden} onSearch={onSearch}
                            placeholder={'Search by name / ID'}></Search>
                    <button
                        className="bg-primaryAccent px-4 py-2 text-surfaceDark rounded hover:bg-opacity-90 border-surfaceDark border-[1px]
                            hover:bg-surfaceDark hover:text-highlightText transition duration-200 ease-in-out hover:translate-x-[2px]"
                        onClick={onShowNewEquipment}
                    >
                        Add equipment
                    </button>
                </div>

                <div className="flex gap-3">
                    <button
                        className={'bg-surfaceDark px-4 py-2 text-highlightText rounded hover:bg-opacity-90 border-surfaceDark border-[1px]\n' +
                            'hover:bg-indigo-400 hover:text-highlightText transition duration-200 ease-in-out hover:translate-x-[2px]'}
                        onClick={() => handleSecretCode(secretCode)}>Check code
                    </button>
                    <input className={'border-primaryAccent min-w-[280px]'}
                           placeholder={'Enter secret code here'}
                           value={secretCode}
                           onChange={(e) => setSecretCode(e.target.value)}
                    />

                    <ButtonWithText hidden={hidden} firstText={'Select all'}
                                    secondText={'Deselect all'} onClick={onDeselect}></ButtonWithText>
                    <button hidden={hidden}
                            className="bg-primaryAccent px-4 py-2 text-surfaceDark rounded hover:bg-opacity-90 border-surfaceDark border-[1px]
                            hover:bg-surfaceDark hover:text-highlightText transition duration-200 ease-in-out hover:translate-x-[2px]"
                            onClick={handleActiveSendToPrinter}
                    >
                        Print selected
                    </button>
                </div>
            </div>
        </>
    )
}