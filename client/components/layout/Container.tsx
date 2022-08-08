import React, { FC } from "react";

const Container: FC<{
                        children: React.ReactNode
                    }>
     = ({ children }) => {
    return (
        <div className="mx-auto my-0 max-w-[1120px] w-4/5 px-2.5">
            { children }
        </div>
    );
}
export default Container;