import React from "react";
import ConditionRadio from "./ConditionRadio";

type Props = {
    condition: string;
    setCondition: React.Dispatch<React.SetStateAction<string>>;
}

// const conditionRadioItems = [
//     {
//         value: "全て"
//     },
//     {
//         value: "未完了"
//     },
//     {
//         value: "完了"
//     }
// ]

const FilterTask: React.VFC<Props> = ({ condition, setCondition }) => {
    return (
        <div className=" w-full flex justify-start ">
            {/* // conditionRadioValues を foreach で回す */}
            {/* その foreach の処理の中で condition と value を比較し checked というプロパティを用意して渡す*/}
            <ConditionRadio condition={condition} setCondition={setCondition} name="condition" value="全て" />
            <ConditionRadio condition={condition} setCondition={setCondition} name="condition" value="未完了" />
            <ConditionRadio condition={condition} setCondition={setCondition} name="condition" value="完了" />
        </div>
    );
};

export default FilterTask;