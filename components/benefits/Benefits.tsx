import type { Props } from "$store/components/benefits/interfaces/interfaces.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { clx } from "$store/sdk/clx.ts";

const Benefits = ({ benefitsBar }: Props) => {

  const slideTablet = {
    1: "full-tablet:w-full",
    2: "full-tablet:w-1/2",
    3: "full-tablet:w-1/3",
    4: "full-tablet:w-1/4",
  };

  const slideMobile = {
    1: "full-phone:w-full",
    2: "full-phone:w-1/2",
    3: "full-phone:w-1/3",
    4: "full-phone:w-1/4",
  };

  const id = useId();

  return (
    <>
      <div class="full-tablet:hidden w-full flex justify-between px-40 sm-desktop:px-8 bg-primary py-5">
        {benefitsBar?.map((item): any => {
          return (
            <div class="flex items-center">
              <img src={item.benefit?.icon} class="max-w-14 mr-6" />
              <div class="flex flex-col items-start text-white">
                <span class="font-montserrat text-xl font-semibold -tracking-tighter">
                  {item.benefit?.title}
                </span>
                <span class="font-arial text-sm font-regular">
                  {item.benefit?.shortDescription}
                </span>
              </div>
            </div>
          )
        })
        }
      </div>
      <div id={id} class="cs-min-desktop:hidden w-full flex justify-between bg-primary py-5">
        <Slider class="carousel carousel-end">
          {benefitsBar?.map((item, index): any => {
            return (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  slideTablet[2],
                  slideMobile[1],
                )}
              >
                <div class="flex items-center mx-auto">
                  <img src={item.benefit?.icon} class="max-w-14 mr-6" />
                  <div class="flex flex-col items-start text-white">
                    <span class="font-montserrat text-xl font-semibold -tracking-tighter">
                      {item.benefit?.title}
                    </span>
                    <span class="font-arial text-sm font-regular">
                      {item.benefit?.shortDescription}
                    </span>
                  </div>
                </div>
              </Slider.Item>
            )
          })
          }
        </Slider>
        <SliderJS rootId={id} interval={6000} infinite />
      </div>
    </>
  );
}

export default Benefits;
