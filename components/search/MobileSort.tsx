import { useMemo, useEffect, useRef } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

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

function MobileSort({ sortOptions }: Props) {
  const sort = useSort();
  const open = useSignal(false);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          open.value = false;
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);  
  useOutsideAlerter(wrapperRef);

  return (
    <div class="relative" ref={wrapperRef}>
      <select
        id="sort"
        name="sort"
        onClick={() => open.value = !open.value}
        onInput={applySort}
        class={`focus:outline-none text-sm max-w-[100%] md-phone:max-w-[90%] uppercase font-arial font-normal text-gray-6 h-[50px] cursor-pointer flex items-center justify-between p-3 border border-gray-1 ${!open.value ? "bg-transparent" : "bg-gray-8"} rounded-md transition-3s`}
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option class="hover:bg-gray-3" key={value} value={value} selected={value === sort}>
            <span class="text-sm uppercase font-arial font-normal text-gray-6">{label}</span>
          </option>
        ))}
      </select>
      <div class="absolute right-1 md-phone:right-5 pr-4 top-[20px] bg-white">
        <Icon
          id={!open.value ? "OrderBy" : "FilterChevronDown"}
          width={!open.value ? 14 : 16}
          height={!open.value ? 14 : 9}
        />
      </div>
    </div>
  );
}

export default MobileSort;