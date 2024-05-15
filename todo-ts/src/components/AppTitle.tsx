import React from "react";

type Props = {
    title: string
};

const AppTitle: React.VFC<Props> = ({ title }) => {
    return (
        <div className='w-full flex justify-center'>
            <h1 className='text-4xl font-bold text-gray-200'>{title}</h1>
        </div>
    );
};

export default AppTitle;