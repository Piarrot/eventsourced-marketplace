import { AuthProvider, IAuthContext } from "../contexts/auth-context.ts";
import { FetchProvider, IFetchContext } from "../contexts/fetch-context.ts";

export const StoryWithPadding = (Component: any) => (
    <div style={{ padding: "20px" }}>
        <Component />
    </div>
);

export function withFetchMock(mock: Partial<IFetchContext>, children: any) {
    return (
        <FetchProvider value={mock as IFetchContext}>{children}</FetchProvider>
    );
}

export function withAuthMock(mock: Partial<IAuthContext>, children: any) {
    return <AuthProvider value={mock as IAuthContext}>{children}</AuthProvider>;
}
