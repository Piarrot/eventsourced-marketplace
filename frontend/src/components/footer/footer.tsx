import { Icon } from "../common/icons/icon.tsx";
import { FooterSearch } from "./footer-search.js";
import { FooterUserArea } from "./footer-user-area.js";

export function Footer() {
    return (
        <footer className="bg-primary absolute bottom-0 left-0 flex h-24 w-full items-center justify-between gap-4 px-4 text-white shadow-md lg:relative">
            <Icon className="fa-filter" size="16px" />
            <FooterSearch />
            <FooterUserArea />
        </footer>
    );
}
