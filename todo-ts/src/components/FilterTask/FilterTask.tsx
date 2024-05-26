import React from "react";
import Radio from "./Radio";
type Props = {
    condition: string;
    setCondition: React.Dispatch<React.SetStateAction<string>>;
}

const FilterTask: React.FC<Props> = ({ condition, setCondition }) => {
    const conditionRadioItems = [
        {
            value: "全て",
            className: {
                "input": "all-radio",
                "span": "hover:text-purple-700"
            }
        },
        {
            value: "未完了",
            className:{
                "input": "incomp-radio",
                "span": "hover:text-red-700"
            }
        },
        {
            value: "完了",
            className: {
                "input": "comp-radio",
                "span": "hover:text-green-700"
            }
        }
    ];

    return (
        <div className=" w-full flex justify-start ">
            {conditionRadioItems.map((conditionRadioItem) => (
                <Radio key={conditionRadioItem.value} onChange={setCondition} name="condition" item={conditionRadioItem} checked={condition === conditionRadioItem.value} />
            ))}
        </div>
    );
};

export default FilterTask;
