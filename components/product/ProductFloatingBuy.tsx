import { SendEventOnView } from "$store/components/Analytics.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useId } from "$store/sdk/useId.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import AddToCartButtonFloatingPDP from "$store/islands/AddToCartButton/vtexFloatingPDP.tsx"
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";


interface Props {
  page: ProductDetailsPage | null;
}

const ProductFloatingBuy = ({ page }: Props) => {

  const { product }: any = page;
  const { offers, productID, seller = "1" } = product;
  const { price, listPrice, installments }: any = useOffer(offers);
  const productImageUrl = product?.image[0]?.url;
  const productName = product?.name;
  const cientificName = product?.isVariantOf?.additionalProperty?.find((item: any) => item?.name === "Nome Científico")?.value;
  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });
  const id = useId();

  return (
    <div class="floating-buy-wrapper transition-3s h-40 flex items-center fixed left-0 bottom-0 full-tablet:top-0 opacity-0 -z-10 w-full bg-white border border-t-gray-9">
      <div class="max-w-[1400px] w-full mx-auto px-8 full-phone:px-2 lg-phone:w-full flex items-center justify-between">
        <div class="flex items-center justify-start cs-min-desktop:gap-4 w-full full-tablet:flex-col full-tablet:justify-start">
          <div class="flex items-center full-tablet:items-center justify-start max-w-xl w-full full-tablet:max-w-full">
            <img src={productImageUrl} class="max-w-20 mr-3" />
            <div class="names-wrapper flex flex-col">
              <span class="product-name font-montserrat font-normal text-base full-phone:text-xs text-gray-3">
                {productName}
              </span>
              <span class="cientific-name font-montserrat italic font-light text-sm full-phone:text-xs text-gray-3">
                {cientificName}
              </span>
            </div>
          </div>
          <div class="price-installments-wrapper cs-min-desktop:max-w-64 flex flex-col items-start w-full">
            <div class="flex items-center justify-start">
              {(listPrice ?? 0) > price &&
                <span class="line-through mr-2 mt-1 text-gray-1 text-base full-phone:text-xs font-arial font-normal">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              }
              <span class="font-normal mr-2 text-2xl full-phone:text-base text-primary">
                {formatPrice(price, offers?.priceCurrency)}
              </span>
              {(listPrice ?? 0) > price && (
                <div class="bg-primary rounded-[6px] mt-1 w-11 h-5 flex items-center justify-center">
                  <span class="text-white font-arial leading-none py-1 px-[6px] text-sm font-normal">
                    {listPrice && price
                      ? `-${Math.round(((listPrice - price) / listPrice) * 100)}% `
                      : ""}
                  </span>
                </div>
              )}
            </div>
            <div class="installments">
              <span class="font-arial font-normal text-sm full-phone:text-xs text-gray-6">{`(ou em até ${installments})`}</span>
            </div>
          </div>
        </div>
        <div class="buy-button-quantity w-full max-w-md full-tablet:max-w-[300px] full-phone:max-w-[200px] lg-phone:w-1/3">
          <AddToCartButtonFloatingPDP
            eventParams={{ items: [eventItem] }}
            productID={productID}
            seller={seller}
          />
        </div>
      </div>
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

export default ProductFloatingBuy;