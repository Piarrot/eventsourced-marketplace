import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
    return <div className="rows grid min-h-screen">{children}</div>;
}
