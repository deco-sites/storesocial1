import { SendEventOnView } from "$store/components/Analytics.tsx";
import AddToCartButtonPDP from "$store/islands/AddToCartButton/vtexPDP.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductFields from "$store/components/product/ProductFields.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {

  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const {
    productID,
    offers,
    name = "",
    isVariantOf,
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  const cientificName = product?.isVariantOf?.additionalProperty?.find(item => item.name === "Nome Científico")?.value;

  return (
    <div class="flex flex-col" id={id}>
      {/* Code and name */}
      <div class="Product-info-cy">
        <h1>
          <span class="font-normal text-gray-3 text-2xl font-montserrat">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
                ? isVariantOf?.name
                : name}
          </span>
        </h1>
        {cientificName && (
          <span class="cientific-name font-light italic font-montserrat text-lg text-gray-3">
            {cientificName}
          </span>
        )}
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-end">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-gray-1 text-base font-arial font-normal">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class={`font-normal text-2xl ${availability === "https://schema.org/InStock" ? "text-primary" : "text-gray-3"}`}>
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {availability !== "https://schema.org/InStock" && (
            <span class="font-arial uppercase font-normal bg-gray-3 text-xs text-white py-1 px-3 rounded-md">
              Esgotado
            </span>
          )}
          {(listPrice ?? 0) > price && (
            <div class="bg-primary rounded-[6px] mb-1 w-11 h-5 flex items-center justify-center">
              <span class="text-white font-arial leading-none py-1 px-[6px] text-sm font-normal">
                {listPrice && price
                  ? `-${Math.round(((listPrice - price) / listPrice) * 100)}% `
                  : ""}
              </span>
            </div>
          )}
        </div>
        {availability === "https://schema.org/InStock" && (
          <span class="font-arial font-normal text-sm text-gray-6">{`(ou em até ${installments})`}</span>
        )}
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonPDP
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                </>
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Product Fields Collapse */}
      <ProductFields page={page} />
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
