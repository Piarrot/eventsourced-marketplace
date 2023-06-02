import { Icon } from "../icons/icon.js";

export function SearchInput() {
    return (
        <div className="border-gray flex w-full items-center rounded-md border-2 bg-white px-2 py-1 text-black">
            <button className="">
                <Icon className="fa-magnifying-glass" />
            </button>
            <input
                className="flex-1 grow bg-white px-2 py-1 outline-none"
                type="text"
                placeholder="Busca..."
            />
        </div>
    );
}
