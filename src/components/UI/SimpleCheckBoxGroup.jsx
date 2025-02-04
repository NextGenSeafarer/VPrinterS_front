import {useState} from "react";

const SimpleCheckBoxGroup = ({checked, text, onOilChange, onTypeSpecificationChange}) => {


    const [selected, setSelected] = useState(checked);
    const [otherText, setOtherText] = useState(text);

    const handleOptionChange = (e) => {
        setSelected(e.target.value);
        onOilChange(e.target.value);
        if (e.target.value !== 'OTHER') {
            onTypeSpecificationChange('')
        }
    };

    const handleOtherTextChange = (e) => {
        const value = e.target.value;
        if (value.length <= 200) {
            setOtherText(value);
            onTypeSpecificationChange(value);
        }
    };

    return (
        <div className="p-6 bg-surfaceLight rounded-lg shadow-lg bg-opacity-70 text-sm">
            <h2 className="text-primaryText text-xl font-semibold mb-4">Oil type</h2>

            <div className="flex items-center space-x-6">
                {["ENGINE", "GEARBOX", "HYDRAULIC", "OTHER"].map((item) => (
                    <label
                        key={item}
                        className="flex items-center space-x-2 cursor-pointer text-primaryText"
                    >
                        <input
                            style={{boxShadow: "none"}}
                            type="radio"
                            name="options"
                            value={item}
                            checked={selected === item}
                            onChange={handleOptionChange}
                            className="form-radio h-5 w-5"
                        />
                        <span className="capitalize">{item}</span>
                    </label>
                ))}
            </div>
            {/* Поле для OTHER */}
            {selected === "OTHER" && (
                <div className="mt-4">
                    <input
                        type="text"
                        value={otherText}
                        onChange={handleOtherTextChange}
                        placeholder="Specify your option"
                        maxLength={200}
                        className="w-full p-2 border border-borderLight rounded bg-background text-primaryText"
                    />
                    <span className="text-secondaryText text-xs mt-1 block">
              {200 - otherText.length} characters remaining
            </span>
                </div>
            )}

        </div>
    );
};

export default SimpleCheckBoxGroup;
