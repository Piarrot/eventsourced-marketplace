import logo from "../../assets/marketplace-logo.svg";
import { HeaderSearch } from "./header-search.js";
import { HeaderUserArea } from "./header-user-area.js";

export function Header() {
    return (
        <header className="flex h-16 items-center justify-center px-4 shadow-md lg:h-24">
            <img className="w-36 lg:w-56" src={logo} alt="Ulthar Marketplace" />
            <HeaderSearch />
            <HeaderUserArea />
        </header>
    );
}
