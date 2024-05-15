import React from "react";
import ConditionRadio from "./ConditionRadio";

type Props = {
    condition: string;
    setCondition: React.Dispatch<React.SetStateAction<string>>;
}

const FilterTask: React.VFC<Props> = ({ condition, setCondition }) => {
    return (
        <div className=" w-full flex justify-start ">
            <ConditionRadio condition={condition} setCondition={setCondition} name="condition" value="全て" className="radio-common all-radio" />
            <ConditionRadio condition={condition} setCondition={setCondition} name="condition" value="未完了" className="radio-common incomp-radio" />
            <ConditionRadio condition={condition} setCondition={setCondition} name="condition" value="完了" className="radio-common comp-radio" />
        </div>
    );
};

export default FilterTask;