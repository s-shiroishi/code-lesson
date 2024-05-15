import React from "react";

type Props = {
    condition: string;
    setCondition: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    value: string;
    className?: string;
}

const ConditionRadio: React.VFC<Props> = ({ condition, setCondition, name, value, className }) => {

    const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCondition(e.target.value);
    };

    const selectColor = (value: string) => {
        if (value === '全て') {
            return 'hover:text-purple-700';
        } else if (value == '未完了') {
            return 'hover:text-red-700';
        } else if (value === '完了') {
            return 'hover:text-green-700';
        }
    }

    return (
        <label className="mr-2 text-xs font-bold">
            <input type="radio" name={name} value={value} className={className} onChange={filterHandler} checked={condition === value} />
            <span className={selectColor(value)}>{value}</span>
        </label>
    );
};

export default ConditionRadio;