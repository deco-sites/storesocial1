import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "$store/sdk/clx.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      tablet?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
}

function Dots({ products, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full z-10 row-start-4 w-full">
        {products?.map((_, index) => (
          <li class={`carousel-item Home-productShelf-dot-${index + 1}-cy`}>
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="bg-gray-7 w-8 h-1 group-disabled:animate-progress group-disabled:bg-primary bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function ProductShelf({
  products,
  interval,
  title,
  description,
  layout,
  cardLayout,
  dots
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "cs-min-desktop:w-full",
    2: "cs-min-desktop:w-1/2",
    3: "cs-min-desktop:w-1/3",
    4: "cs-min-desktop:w-1/4",
    5: "cs-min-desktop:w-1/5",
  };

  const slideTablet = {
    1: "full-tablet:w-full",
    2: "full-tablet:w-1/2",
    3: "full-tablet:w-1/3",
    4: "full-tablet:w-1/4",
    5: "full-tablet:w-1/5",
  };

  const slideSmallTablet = {
    1: "sm-tablet:w-full",
    2: "sm-tablet:w-1/2",
    3: "sm-tablet:w-1/3",
    4: "sm-tablet:w-1/4",
    5: "sm-tablet:w-1/5",
  };

  const slideMobile = {
    1: "full-phone:w-full",
    2: "full-phone:w-1/2",
    3: "full-phone:w-1/3",
    4: "full-phone:w-1/4",
    5: "full-phone:w-1/5",
  };
  return (
    <div class="w-full max-w-[1502px] mx-auto flex flex-col gap-6 py-10 lg-desktop:px-8 full-phone:px-0">
      <Header
        title={title || ""}
        description={description || ""}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class="flex justify-between items-center relative flex-wrap"
      >
        <Slider class="carousel carousel-end justify-between sm-tablet:carousel-end cs-min-desktop:min-w-[346px]">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                `Home-productShelf-${index + 1}-cy`,
                "carousel-item",
                "cs-min-desktop:min-w-[346px]",
                "cs-lg-tablet:min-w-[322px]",
                "cs-md-tablet:min-w-[322px]",
                slideDesktop[4],
                slideTablet[3],
                slideSmallTablet[2],
                slideMobile[1],
              )}
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <>
            <div class="Home-productShelf-prevButton-cy absolute full-tablet:hidden -left-5 top-[35%] block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="Home-productShelf-prevbutton-cy absolute w-12 h-12 bg-white shadow-md rounded-full flex justify-center items-center z-20">
                <Icon width={14} height={10} id="ArrowLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="Home-productShelf-nextButton-cy absolute full-tablet:hidden right-8 top-[35%] block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="Home-productShelf-nextbutton-cy absolute w-12 h-12 bg-white shadow-md rounded-full flex justify-center items-center z-20">
                <Icon width={14} height={10} id="ArrowRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}
        {dots && <Dots products={products} interval={interval} />}
        <SliderJS rootId={id} interval={interval && interval * 1e3} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
