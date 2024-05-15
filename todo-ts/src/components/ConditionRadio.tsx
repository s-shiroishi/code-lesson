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

    type colorListObjType = {
        '全て': string[];
        '未完了': string[];
        '完了': string[];
    };

    const colorListObj: colorListObjType = {
        '全て': ['all-radio', 'hover:text-purple-700'],
        '未完了': ['incomp-radio', 'hover:text-red-700'],
        '完了': ['comp-radio', 'hover:text-green-700']
    };

    return (
        <label className="mr-2 text-xs font-bold">
            <input type="radio" name={name} value={value} className={`radio-common ${colorListObj[value as keyof colorListObjType][0]}`} onChange={filterHandler} checked={condition === value} />
            <span className={colorListObj[value as keyof colorListObjType][1]}>{value}</span>
        </label>
    );
};

export default ConditionRadio;