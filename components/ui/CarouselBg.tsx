import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description Image's link url */
  link?: string;
  /**
   * @format rich-text
   */
  title?: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      link: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      link: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      link: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: true,
};

function BannerItem({
  image,
  lcp,
  id,
}: {
  image: Banner;
  lcp?: boolean;
  id: string;
}) {
  const { alt, mobile, desktop, link, title = "" } = image;

  return (
    <div className="h-[260px] lg:h-[830px] lg:mt-[10px] w-full items-center flex">
      <div className="flex justify-around relative h-[260px] lg:h-[830px] pl-[12px] pr-[12px] pb-[20px] top-[10px]">
        <div className="bg-[#3e2b23] h-[260px] w-[50%] absolute left-0 bottom-[110px] lg:bottom-[500px] lg:h-[500px] rounded">
        </div>
        <div className="bg-[#dca15a] h-[260px] w-[50%] absolute right-0 top-[185px] rounded lg:h-[500px] lg:top-[220px]">
        </div>
        <a
          id={id}
          href={link ?? "#"}
          aria-label={alt}
          class="relative overflow-y-hidden w-full"
        >
          <Picture preload={lcp}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={mobile}
              width={430}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={desktop}
            />
            <img
              class="w-full h-auto max-w-[1920px]"
              loading={lcp ? "eager" : "lazy"}
              src={desktop}
              alt={alt}
            />
          </Picture>
        </a>
      </div>
      <div className="flex lg:bottom-[150px] lg:-[relative] lg:left-[60px] lg:relative flex-col xsm-tablet:hidden" dangerouslySetInnerHTML={{ __html: title }}/>
    </div>
  );
}

function Dots({ images, interval = 0 }: Props) {
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
      <ul class="carousel justify-center col-span-full z-10 row-start-4 full-phone:relative full-phone:top-6 full-phone:h-7">
        {images?.map((_, index) => (
          <li class={`carousel-item Home-banner-dots-${index + 1}-cy`}>
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

function Buttons() {
  return (
    <>
      <div class="full-tablet:hidden flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="w-12 h-12 rounded-full bg-white flex justify-center items-center Home-banner-prevbutton-cy">
          <Icon width={14} height={10} id="ArrowLeft" strokeWidth={3} />
        </Slider.PrevButton>
      </div>
      <div class="full-tablet:hidden flex items-center justify-center z-10 col-start-3 row-start-2 absolute">
        <Slider.NextButton class="w-12 h-12 rounded-full bg-white flex justify-center items-center Home-banner-nextbutton-cy">
          <Icon width={14} height={10} id="ArrowRight" strokeWidth={3} />
        </Slider.NextButton>
      </div>
    </>
  );
}

function CarouselBg(props: Props) {
  const id = useId();
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="relative grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => {
          const params = { promotion_name: image.alt };
          return (
            <Slider.Item
              index={index}
              class={`carousel-item w-full Home-banner-${index + 1}-cy`}
            >
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
              <SendEventOnClick
                id={`${id}::${index}`}
                event={{ name: "select_promotion", params }}
              />
              <SendEventOnView
                id={`${id}::${index}`}
                event={{ name: "view_promotion", params }}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots images={images} interval={interval} />}

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default CarouselBg;
