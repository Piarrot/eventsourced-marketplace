import { SearchInput } from "../common/inputs/search-input.tsx";

export function FooterSearch() {
    return (
        <div className="block flex-1 lg:hidden">
            <SearchInput />
        </div>
    );
}
