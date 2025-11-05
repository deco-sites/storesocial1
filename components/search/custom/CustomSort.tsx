import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(globalThis.window.location.search);
  urlSearchParams.set(SORT_QUERY_PARAM, value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "discount:desc": "Maior desconto",
  "release:desc": "Mais Recentes",
};

const CustomSort = ({ sortOptions }: Props) => {
  const sort = useSort();

  return (
    <>
      <div class="sort-container flex flex-col items-start pr-4">
        <div class="sort-title border-t border-b border-gray-9 py-4 mb-3 w-full flex justify-start">
          <span class="font-arial text-sm uppercase text-gray-6">Ordenar Por</span>
        </div>
        <div class="w-[272px] flex flex-col gap-3 pr-4">
          {sortOptions.map(({ value, label }) => ({
            value,
            label: portugueseMappings[label as keyof typeof portugueseMappings] ??
              label,
          })).filter(({ label }) => label).map(({ value, label }) => (
            <button
              onClick={() => applySort(value)} key={value} value={value}
              class={`w-full cursor-pointer uppercase text-xs font-arial py-2 border hover:bg-gray-3 hover:text-white  ${value === sort
                  ? "bg-gray-3 text-white"
                  : ""} rounded-md border-gray-1 text-gray-6`
              }
            >
              <span class="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomSort;