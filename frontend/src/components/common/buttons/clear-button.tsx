import { PropsWithChildren } from "react";

type Props = {
    onClick?: () => void;
};

export function ClearButton({ children, onClick }: PropsWithChildren<Props>) {
    return (
        <button
            onClick={onClick}
            className="flex cursor-pointer items-center justify-center gap-1 border-none p-2"
        >
            {children}
        </button>
    );
}
