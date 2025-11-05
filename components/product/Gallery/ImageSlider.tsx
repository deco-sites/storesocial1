import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {

  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  return (
    <div class="max-w-[570px]">
      <div id={id} class="flex flex-col justify-center">
        {/* Image Slider */}
        <div class="relative flex justify-center">
          <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full image-hover-zoom hover:cursor-crosshair"
              >
                
                <Image
                  class="w-full max-w-full"
                  sizes="(max-width: 640px)"
                  // style={{ aspectRatio }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={570}
                  height={570}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton
            class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
            disabled
          >
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
            disabled={images.length < 2}
          >
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>


        {/* Dots */}
        <ul class="carousel carousel-center gap-1 px-4">
          {images.map((img, index) => (
            <li class="carousel-item min-w-[63px] sm:min-w-[100px]">
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio }}
                  class="group-disabled:border-base-300 border rounded "
                  width={63}
                  height={87.5}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}
