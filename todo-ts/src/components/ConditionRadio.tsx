// 親コンポーネントのフォルダを作成してそこに配置する
import React from "react";

type Props = {
    condition: string;
    setCondition: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    value: string;
    className?: string;
}

const ConditionRadio: React.VFC<Props> = ({ condition, setCondition, name, value, className }) => { // className未使用

    const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCondition(e.target.value);
    };

    // 下記の修正を行うとこれが不要になります
    type colorListObjType = {
        '全て': string[];
        '未完了': string[];
        '完了': string[];
    };

    // FilterTask の conditionRadioItems にもつ
    const colorListObj: colorListObjType = {
        '全て': ['all-radio', 'hover:text-purple-700'],
        '未完了': ['incomp-radio', 'hover:text-red-700'],
        '完了': ['comp-radio', 'hover:text-green-700']
    };

    return (
        <label className="mr-2 text-xs font-bold">
            {/* condition === value の比較は親コンポーネントで行い、boolean でもらって check の出し分けを行う */}
            {/* condition は要らなくなります */}
            <input type="radio" name={name} value={value} className={`radio-common ${colorListObj[value as keyof colorListObjType][0]}`} onChange={filterHandler} checked={condition === value} />
            {/* こちらも親コンポーネントから受け取る */}
            <span className={colorListObj[value as keyof colorListObjType][1]}>{value}</span>
        </label>
    );
};

export default ConditionRadio;