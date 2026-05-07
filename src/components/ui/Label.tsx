
// import { twMerge } from "tailwind-merge";
// import { clsx } from "clsx";

import React from "react";

interface LabelProps {
    htmlFor?: string;
    children: React.ReactNode;
    className?: string;
}

const Label = React.memo(({ htmlFor, children, className }: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`mb-1.5 block text-sm font-medium text-gray-400 ${className}`}
        //   className={
        //     clsx(
        //     twMerge(
        //       "mb-1.5 block text-sm font-medium text-gray-400",
        //       className,
        //     ),
        //   )
        // }

        >
            {children}
        </label>
    );
});

export default Label;
