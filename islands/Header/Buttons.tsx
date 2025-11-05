import { default as MenuButtonComponent } from "$store/components/header/Buttons/Menu.tsx";
import { default as SearchButtonComponent } from "$store/components/header/Buttons/Search.tsx";
import { default as FloatingHeaderSearchButtonComponent } from "$store/components/header/Buttons/FloatingHeaderSearch.tsx";
import { default as EmptySearchButtonComponent } from "$store/components/header/Buttons/EmptySearchButton.tsx";

export function MenuButton() {
    return <MenuButtonComponent />;
}

export function SearchButton() {
    return <SearchButtonComponent />;
}

export function FloatingHeaderSearchButton() {
    return <FloatingHeaderSearchButtonComponent />;
}

export function EmptySearchButton() {
    return <EmptySearchButtonComponent />;
}