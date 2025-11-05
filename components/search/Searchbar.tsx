/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */
import ProductCard, { Layout as cardLayout, } from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import { type Resolved } from "@deco/deco";
// Editable props
export interface Props {
    /**
     * @title Placeholder
     * @description Search bar default placeholder message
     * @default O que você procura?
     */
    placeholder?: string;
    /**
     * @title Page path
     * @description When user clicks on the search button, navigate it to
     * @default /s
     */
    action?: string;
    /**
     * @title Term name
     * @description Querystring param used when navigating the user
     * @default q
     */
    name?: string;
    /**
     * @title Suggestions Integration
     * @todo: improve this typings ({query: string, count: number}) => Suggestions
     */
    loader: Resolved<Suggestion | null>;
    platform?: Platform;
    cardLayout?: cardLayout;
}
function Searchbar({ placeholder = "O que você procura?", action = "/s", name = "q", loader, platform, cardLayout }: Props) {
    const id = useId();
    const { displaySearchPopup } = useUI();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { setQuery, payload, loading } = useSuggestions(loader);
    const { products = [], searches = [] } = payload.value ?? {};
    const hasProducts = Boolean(products.length);
    const hasTerms = Boolean(searches.length);
    useEffect(() => {
        if (displaySearchPopup.value === true) {
            searchInputRef.current?.focus();
        }
    }, [displaySearchPopup.value]);
    return (<div class="w-full overflow-y-hidden flex align-center h-[32px] border-solid border-gray-1 border-[1px] rounded-[25px] px-[45px]" style={{ gridTemplateRows: "min-content auto" }}>
      <form id={id} action={action} class="flex justify-center align-center w-full">
        <Button type="submit" class="border-[0px] bg-transparent hover:bg-transparent min-h-[32px] h-[32px] pl-0" aria-label="Search" for={id} tabIndex={-1}>
          {loading.value
            ? <span class="loading loading-spinner loading-xs"/>
            : <Icon id="Lupa" size={15}/>}
        </Button>
        <input ref={searchInputRef} id="search-input" class="input focus:outline-0 border-[0px] -tracking-tighter flex-grow h-[32px] w-full p-0 text-[13px] full-phone:text-center full-phone:flex full-phone:w-full" name={name} onInput={(e) => {
            const value = e.currentTarget.value;
            if (value) {
                sendEvent({
                    name: "search",
                    params: { search_term: value },
                });
            }
            setQuery(value);
        }} placeholder={placeholder} role="combobox" aria-controls="search-suggestion" aria-haspopup="listbox" aria-expanded={displaySearchPopup.value} autocomplete="off"/>
      </form>

      <div class={`intelligent-autocomplete max-h-[700px] full-tablet:max-h-[568px] w-full rounded-[25px] max-w-[1065px] shadow-lg absolute overflow-y-scroll bg-white top-[35px] left-0 p-[10px] ${!hasProducts && !hasTerms ? "hidden" : ""}`}>
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
          <div class="flex flex-col gap-6">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({ term }) => (<li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <span>
                      <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01}/>
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: term }}/>
                  </a>
                </li>))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Produtos sugeridos
            </span>
            <ul class="grid grid-cols-2 cs-max-tablet:grid-cols-1 gap-4">
              {products.map((product, index) => (<ProductCard product={product} platform={platform} index={index} layout={cardLayout} itemListName="Suggeestions"/>))}
            </ul>
          </div>
        </div>
      </div>
    </div>);
}
export default Searchbar;
