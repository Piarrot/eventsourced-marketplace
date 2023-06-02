import { SearchInput } from "../common/inputs/search-input.js";

export function HeaderSearch() {
    return (
        <div className="hidden lg:block">
            <SearchInput />
        </div>
    );
}
