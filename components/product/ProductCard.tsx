import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "$store/sdk/url.ts";
import AddToCartButton from "$store/islands/AddToCartButton/vtex.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
}

const WIDTH = 346;
const HEIGHT = 346;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  index,
}: Props) {
  const { url, productID, name, image: images, offers }: any = product;
  const id = `product-card-${productID}`;
  const [front, back] = images ?? [];
  const { listPrice, price, installments, availability }: any = useOffer(offers);
  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  const cta = (
    <AddToCartButton
      seller="1"
      productID={productID}
      eventParams={{ items: [eventItem] }}
      quantity={1}
    />
  );


  const installmentSplit = installments?.split('x');
  const installmentCount = Number(installmentSplit?.[0]);
  const clusterFlagValue = product?.additionalProperty?.find(item =>
    item.name === "cluster"
    && item.description === "highlight"
  )?.value;

  const newUrl: any = new URL(url);
  newUrl?.searchParams?.delete("skuId")

  return (
    <div
      id={id}
      class={
        `card max-w-[346px] mb-14 lg-desktop:px-3 full-phone:px-0 xsm-phone:px-2 mx-auto card-compact group w-full ${align === "center" ? "text-center" : "text-start"}
                ${l?.onMouseOver?.card === "Move up" && "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"}
            `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure class="relative overflow-hidden" style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>

        {/* Product Images */}
        <a
          href={newUrl && relative(newUrl)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full Home-productCard-linkImage-cy"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 max-w-[346px] max-h-[346px] col-span-full row-span-full rounded w-full ${l?.onMouseOver?.image == "Zoom image"
              ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
              : ""
              }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                class="bg-base-100 max-w-[346px] max-h-[346px] col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            )}
          {clusterFlagValue && (
            <span class="flag-product-cluster absolute uppercase top-2 left-6 px-[10px] py-[9px] rounded-s-lg -rotate-90 font-arial font-bold -tracking-tighter text-[11px] text-white bg-blue-flag">
              {clusterFlagValue}
            </span>
          )}
        </a>
        <figcaption
          class={`Home-productCard-addToCart-cy full-tablet:hidden absolute bottom-0 left-0 w-full flex flex-col bg-white-90 gap-3 p-2 ${l?.onMouseOver?.showCta
            ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
            : "lg:hidden"
            }`}
        >
          {cta}
        </figcaption>
      </figure >
      {/* Prices & Name */}
      < div class="flex-auto flex flex-col p-0 pt-2 gap-0" >
        {l?.hide?.productName && l?.hide?.productDescription
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-0">
              {l?.hide?.productName
                ? (
                  ""
                )
                : (
                  <h2
                    class="truncate text-sm h-[57px] full-phone:text-xs font-montserrat font-semibold text-gray-4"
                    dangerouslySetInnerHTML={{ __html: name ?? "" }}
                  />
                )}
            </div>
          )
        }
        {
          l?.hide?.allPrices
            ? (
              ""
            )
            : (
              <div class="flex flex-col gap-2">
                <div
                  class={`flex flex-row gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}
                >
                  {listPrice > price && (
                    <div class="line-through font-arial text-gray-3 text-base full-phone:text-xs font-normal">
                      {formatPrice(listPrice, offers?.priceCurrency)}
                    </div>
                  )}
                  <div class={`text-base full-phone:text-xs ${availability === "https://schema.org/InStock" ? "text-primary" : "text-gray-3"} font-arial font-bold`}>
                    {formatPrice(price, offers?.priceCurrency)}
                  </div>
                  {availability !== "https://schema.org/InStock" && (
                    <span class="font-arial uppercase font-normal bg-gray-3 text-xs full-phone:text-[8px] text-white py-1 px-3 rounded-md">
                      Esgotado
                    </span>
                  )}
                  {/* Discount % */}
                  {!l?.hide?.discount && listPrice > price && (
                    <div class="bg-primary rounded-md w-10 h-5 flex items-center justify-center">
                      <span class="text-white font-arial leading-none py-1 px-[6px] text-[11px] font-bold">
                        {listPrice && price
                          ? `-${Math.round(((listPrice - price) / listPrice) * 100)}% `
                          : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
        }
        <ul
          class={`installments flex min-h-6 items-center gap-1 w-full ${align === "center" ? "justify-center" : "justify-between"
            }`}
        >
          {(installmentCount > 1 && (
            <li>
              <span class="text-gray-3 font-normal text-sm full-phone:text-xs cs-lg-phone:max-w-[180px] truncate block">
                {`(ou em até ${installments})`}
              </span>
            </li>
          ))}
        </ul>
        <div class="cs-min-desktop:hidden w-full mt-3 Home-productCard-addToCart-cy">
          {cta}
        </div>
      </div >
    </div >
  );
}

export default ProductCard;
