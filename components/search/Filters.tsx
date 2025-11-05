import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import FilterRange from "$store/islands/FilterRangePrice.tsx";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";


function uniq(a: any) {
  return a.sort().filter(function (item: string, pos: any, ary: any) {
    return !pos || item != ary[pos - 1];
  });
}

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class={`text-xs ${selected ? "text-gray-3" : "text-gray-6"} font-arial -tracking-tighter`}>{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {

  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  if (key === "price") {
    const val: number = values.length;
    let x: string[];
    let arr: number[] = [];
    let min: number;
    let max: number;

    for (let i = 0; i < val; i++) {
      x = values[i].value.split(':');
      for (let j = 0; j < x.length; j++) {
        arr.push(Number(x[j]));
      }
    }

    arr = uniq(arr);
    min = Math.min(...arr);
    max = Math.max(...arr);

    const url: string | undefined = values[0]?.url?.split('&filter.price')[0];
    const urlChanged: string | undefined = values[0]?.url?.split('&filter.price=')[1];
    const minMax: string[] | undefined = urlChanged?.split('%3A');

    return values.length > 0 ? (
      <>
        <FilterRange
          min={min}
          max={max}
          currentUrlFilterPrice={url}
          currentMinFacet={Number(minMax[0])}
          currentMaxFacet={Number(minMax[1])}
        />
      </>
    ) : null
  }

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>

      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {

  const urlParams = globalThis.window.location?.search;
  const countFilters = urlParams ? (urlParams.match(/filter/g) || []).length : null;

  return (
    <>
      { countFilters !== null && (
        <div class="flex items-center justify-between min-w-[255px] border-t border-solid border-t-gray-9 full-tablet:px-4 mr-4">
          <span class="font-arial text-sm -tracking-tighter py-4 uppercase text-gray-6">
            Filtros {countFilters !== null ? `(${countFilters})` : ""}
          </span>
          <button 
            class="button-clear-filter font-arial gap-2 flex -tracking-tighter text-gray-6 text-sm items-center justify-between uppercase py-1 px-3 border rounded-full border-solid border-gray-1"
            onClick={()=> 
              globalThis.window.location.href = globalThis.window.location.pathname
            }
          >
            <Icon id="ClearFilter" size={11} />
            Limpar
          </button>
        </div>
      )}
      <ul class="flex flex-col min-w-[272px] full-tablet:px-4 pr-4">
        {filters
          .filter(isToggle)
          .map((filter) => {

            const toggleOpen = useSignal(false);

            return (
              <li class={`${filter.label === "Preço" ? "order-last" : ""} flex flex-col first:border-t border-b border-gray-9 py-5`}>
                <span
                  onClick={() => { toggleOpen.value = !toggleOpen.value }}
                  class={`${!toggleOpen.value ? "plus" : "less"} uppercase cursor-pointer -tracking-tighter font-arial font-bold text-xs text-gray-3`}
                >
                  {filter.label === "Preço" ? "Faixa de Preço" : filter.label}
                </span>
                {/* Necessário usar arbitrário no tailwind pra que o efeito transition funcione */}
                <div class={`${!toggleOpen.value ? "h-0 pt-0" : "h-auto pt-4"} overflow-hidden transition-3s`}>
                  <FilterValues {...filter} />
                </div>
              </li>
            )
          })}
      </ul>
    </>
  );
}

export default Filters;
