import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import { useMemo } from "preact/hooks";
import type { ProductListingPage } from "apps/commerce/types.ts";
import MobileSort from "$store/components/search/MobileSort.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions" | "pageInfo">
  & {
    displayFilter?: boolean;
  };

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome Decrescente",
  "name:asc": "Nome Crescente",
  "release:desc": "Mais Recentes",
  "discount:desc": "Maior desconto",
};

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

function SearchControls(
  { filters, sortOptions, pageInfo }: Props,
) {
  const open = useSignal(false);
  const openButtonDummy = useSignal(false);
  const openSort = useSignal(false);
  const sort = useSort();
  const sortLabel = sortOptions.find(item => item.value === sort)?.label;
  const labelButton = {
    label: portugueseMappings[sortLabel as keyof typeof portugueseMappings]
  }
  const foundProducts = pageInfo.records;
  const urlParams = globalThis.window.location?.search;
  const countFilters = urlParams ? (urlParams.match(/filter/g) || []).length : null;

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full overflow-y-hidden">
            <div class="flex justify-between items-center mt-8 mb-2">
              <h1 class="px-4 py-3">
                <span class="font-arial text-sm text-gray-3 uppercase">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-start">

        <div class="flex flex-row full-phone:flex-col items-center justify-between mb-10">
          <div class="flex flex-row items-center justify-start max-w-full full-phone:w-full full-phone:gap-2">
            <Button
              onClick={() => {
                openButtonDummy.value = !openButtonDummy.value;
                openSort.value = false
              }}
              class={`full-tablet:hidden dummy-hide-show-filters hover:bg-transparent mr-4 h-[50px] font-arial font-normal text-gray-6 rounded-md min-w-[267px] flex items-center justify-between border border-gray-1 ${!openButtonDummy.value ? "bg-white" : "bg-gray-2"} transition-3s uppercase`}
            >
              Filtrar {countFilters !== null ? `(${countFilters})` : ""}
              <Icon
                id={`${!openButtonDummy.value ? "FilterButton" : "FilterChevronDown"}`}
                width={!openButtonDummy.value ? 14 : 16}
                height={!openButtonDummy.value ? 14 : 9}
              />
            </Button>
            <Button
              class={`cs-min-desktop:hidden mr-2 full-phone:mr-0 hover:bg-white h-[50px] font-arial font-normal text-gray-6 rounded-md w-1/2 sm-phone:w-[120px] flex items-center justify-between border border-gray-1 ${!open.value ? "bg-white" : "bg-gray-2"} transition-3s uppercase`}
              onClick={() => {
                open.value = true;
              }}
            >
              Filtrar
              <Icon
                id={`${!open.value ? "FilterButton" : "FilterChevronDown"}`}
                width={!open.value ? 14 : 16}
                height={!open.value ? 14 : 9}
              />
            </Button>
            <div class="cs-min-desktop:hidden">
              <MobileSort sortOptions={sortOptions} />
            </div>
            <div
              class={`sort-button full-tablet:hidden h-[50px] cursor-pointer flex items-center justify-between w-[272px] p-3 border border-gray-1 ${!openSort.value ? "bg-transparent" : "bg-gray-8"} rounded-md transition-3s`}
              onClick={() => {
                openSort.value = !openSort.value;
                openButtonDummy.value = false
              }}
            >
              <span class="text-sm uppercase font-arial font-normal text-gray-6">{labelButton.label}</span>
              <Icon
                id={!openSort.value ? "OrderBy" : "FilterChevronDown"}
                width={!openSort.value ? 14 : 16}
                height={!openSort.value ? 14 : 9}
              />
            </div>
          </div>
          <div class="products-found full-phone:w-full full-phone:flex full-phone:justify-end full-phone:mt-4">
            <span class="font-arial font-normal text-base text-gray-6">{foundProducts} Produtos</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
