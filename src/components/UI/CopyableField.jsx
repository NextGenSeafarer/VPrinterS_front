import { useState } from 'react';
import { BiCopy, BiCheck } from 'react-icons/bi';

const CopyableField = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    return (
        <div
            onClick={handleCopy}
            className={`flex items-center justify-between w-full p-2 border transition duration-500 rounded-md cursor-pointer
            ${copied ? 'bg-green-300' : 'bg-primaryText'}`}>
            <span className="text-surfaceDark">{text}</span>
            <button
                className="p-1 text-surfaceDark transition-transform duration-400 relative"
            >
                {copied ? <BiCheck size={20} className="text-surfaceDark" /> : <BiCopy size={20} />}
                {copied ? <div className={'absolute -bottom-9 right-0 text-nowrap text-highlightText'} >Copied to clipboard!</div> : null}
            </button>
        </div>
    );
};

export default CopyableField;
