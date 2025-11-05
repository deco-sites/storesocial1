import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "site/components/ui/NewSlider.tsx";
import CollapsibleText from "site/utils/CollapsibleText.tsx";
import { useId } from "site/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface BannerWithLocationName {
  /** @title Imagem do banner */
  image: ImageWidget;
  /** @title Nome da Localização */
  location: string;
}

export interface Props {
  /** @title Título do texto com ver mais */
  title?: string;
  /** 
   * @title Texto com ver mais 
   * @format textarea
  */
  text?: string;
  /** @title Banner com Localização */
  banner: BannerWithLocationName[];
}


const TextBannerPhytoSpa = ({ title, text, banner }: Props) => {

  const id = useId();

  return (
    <>
      <div class="text-wrapper max-w-[1200px] mx-auto my-12 flex flex-col items-center justify-center text-center full-tablet:px-10 full-phone:px-4">
        <h1 class="font-semibold text-[#3E2B24] text-[32px]">
          {title ?? "Conheça o PhytoSPA"}
        </h1>
        <CollapsibleText content={text ?? ""} />
      </div>
      <div
        id={id} 
        class="relative max-w-[1360px] mx-auto grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr] sm:min-h-min lg-laptop:px-10 full-phone:px-0"
      >
        <Slider class="carousel col-span-full row-span-full w-full gap-6">
          {banner?.map((item, index) => {
            return (
              <Slider.Item index={index} class="relative carousel-item overflow-hidden max-w-[1360px] h-[640px] w-full">
                <Image
                  class="h-full object-cover rounded-2xl full-phone:rounded-none"
                  src={item?.image}
                  width={1360}
                  height={640}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div class="w-full absolute bottom-8 flex justify-center items-center">
                  <span class="bg-white text-black py-2 font-medium text-base px-4 rounded-xl shadow-md">
                    {item?.location}
                  </span>
                </div>
              </Slider.Item>
            )
          })}
        </Slider>

        <div class="flex items-center justify-center z-10 col-start-1 row-start-2 absolute left-8 top-0">
          <Slider.PrevButton class="flex justify-center items-center">
            <Icon size={40} id="PhytospaLeft" strokeWidth={1} />
          </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-center z-10 col-start-3 row-start-2 absolute right-8 lg-laptop:right-16 full-phone:right-8 top-0">
          <Slider.NextButton class="flex justify-center items-center">
            <Icon size={40} id="PhytospaRight" strokeWidth={1} />
          </Slider.NextButton>
        </div>

        <ul class="carousel justify-center col-span-full z-10 row-start-4 full-phone:relative full-phone:top-6 full-phone:h-7">
          {banner?.map((_, index) => (
            <li class={`carousel-item Home-banner-dots-${index + 1}-cy`}>
              <Slider.Dot index={index}>
                <div class="py-5">
                  <div
                    class="bg-gray-7 w-8 h-1 group-disabled:animate-progress group-disabled:bg-[#282828] bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  />
                </div>
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <Slider.JS rootId={id} infinite />

      </div>
    </>
  )
}

export default TextBannerPhytoSpa;