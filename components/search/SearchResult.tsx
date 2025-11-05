import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import EmptySearch from "$store/components/search/EmptySearch.tsx";
import NotFound from "$store/components/error/NotFound.tsx";
import HideShowFiltersDesktop from "$store/islands/HideShowFiltersDesktop.tsx";
import CustomSort from "$store/islands/CustomSort.tsx";
import CustomPagination from "$store/components/search/custom/CustomPagination.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const id = useId();
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;


  return (
    <>
      <div class="w-full px-16 full-tablet:px-4 mx-auto">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          displayFilter={layout?.variant === "drawer"}
          pageInfo={pageInfo}
        />

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <>
              <aside class="sort-wrapper overflow-hidden min-w-[272px] w-[272px] transition-3s hide">
                <CustomSort sortOptions={sortOptions} />
              </aside>
              <aside class="filters-wrapper overflow-hidden min-w-[272px] w-[272px] transition-3s hide">
                <Filters filters={filters} />
              </aside>
              <HideShowFiltersDesktop />
            </>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <CustomPagination pageInfo={pageInfo} />
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {

  if (!page) {
    return <NotFound />;
  }

  if (!page?.products.length) {
    return <EmptySearch />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
