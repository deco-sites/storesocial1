import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "$store/sdk/useId.ts";
import SliderJS from "$store/islands/SliderJS.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

const ProductImageGallery = ({ page }: Props) => {

  const id = useId();
  const images = page?.product?.image;

  return (
    <div>
      <div id={id} class="flex flex-col justify-center">
        <div class="relative flex justify-center">
          <Slider class="carousel carousel-end gap-6">
            {images?.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <img
                  class="w-full h-full mx-auto hover:scale-125 transition-3s"
                  loading={"eager"}
                  src={img.url!}
                  alt={img.alternateName}
                  width={570}
                  height={570}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton
            class="flex items-center justify-center absolute left-2 top-1/2"
          >
            <Icon size={24} id="ArrowLeft" strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="flex items-center justify-center absolute right-2 top-1/2"
          >
            <Icon size={24} id="ArrowRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>


        {/* Dots */}
        <ul class="carousel carousel-center gap-1 mt-5 sm-laptop:w-[662px]">
          {images?.map((img, index) => (
            <li class="carousel-item min-w-[63px] sm:min-w-[100px]">
              <Slider.Dot index={index}>
                <img
                  class="group-disabled:border-primary group-disabled:border border-0"
                  width={107}
                  height={107}
                  loading={"lazy"}
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

export default ProductImageGallery;