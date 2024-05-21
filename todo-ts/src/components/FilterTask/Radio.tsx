import React from "react";

type Props = {
    onChange: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    item: {
        value: string;
        className: {
            input: string;
            span: string;
        }
    };
    checked: boolean;
}

const Radio: React.FC<Props> = ({  onChange, name, item, checked }) => { 

    return (
        <label className="mr-2 text-xs font-bold">
            <input type="radio" name={name} value={item.value} className={`radio-common ${item.className.input}`} onChange={(e) => onChange(e.target.value)} checked={checked} />
            <span className={item.className.span}>{item.value}</span>
        </label>
    );
};

export default Radio;