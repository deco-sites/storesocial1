import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import Slider from "site/components/ui/NewSlider.tsx";
import { useId } from "site/sdk/useId.ts";
import { clx } from "site/sdk/clx.ts";

interface CarouselImg {
  /** @title Imagem do Banner */
  image: ImageWidget;
}

export interface Props {
  /** @title Imagem do Banner */
  carousel: CarouselImg[];
  /** @title Titulo */
  title: string;
  /** 
   * @title Texto 
   * @format textarea
   */
  text: string;
  /** @title Texto do botão */
  buttonText: string;
  /** @title Link do botão */
  buttonLink: string;
}

const BannerSchedule = ({
  carousel,
  title,
  text,
  buttonText,
  buttonLink
}: Props) => {

  const id = useId();

  return (
    <div class="mt-10">
      <div class="flex flex-col gap-5 cs-md-min-tablet:hidden px-4">
        <span class="font-bold text-[26px] text-[#3E2B24] text-center">{title}</span>
        <span class="font-regular text-base text-black text-center" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div class="flex items-center justify-center max-w-[1360px] mx-auto gap-14 full-tablet:gap-12 mt-14 mb-24 lg-laptop:px-10 full-phone:px-2">
        <div
          id={id}
          class="relative grid grid-cols-[48px_1fr_48px] grid-rows-[1fr_48px_1fr_48px] sm:min-h-min max-w-[810px]"
        >
          <Slider class={clx(
            "carousel col-span-full row-span-full w-full gap-6",
            "before:w-1/2 before:h-1/2 before:bg-[#3E2B23] before:absolute before:-top-2 before:-left-2 before:z-10 before:rounded-tl-2xl",
            "after:w-1/2 after:h-1/2 after:bg-[#DCA15A] after:absolute after:-bottom-2 after:-right-2 after:z-10 after:rounded-br-2xl"
          )}>
            {carousel?.map((item, index) => {
              return (
                <Slider.Item index={index} class="relative carousel-item full-phone:px-0 w-full">
                  <Image
                    class="w-full rounded-md z-20"
                    src={item?.image}
                    width={810}
                    height={610}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              )
            })}
          </Slider>

          <div class="flex items-center justify-center z-30 col-start-1 row-start-2 absolute left-8 top-0">
            <Slider.PrevButton class="flex justify-center items-center">
              <Icon size={40} id="PhytospaLeft" strokeWidth={1} />
            </Slider.PrevButton>
          </div>
          <div class="flex items-center justify-center z-30 col-start-3 row-start-2 absolute right-8 top-0">
            <Slider.NextButton class="flex justify-center items-center">
              <Icon size={40} id="PhytospaRight" strokeWidth={1} />
            </Slider.NextButton>
          </div>

          <ul class="carousel justify-center col-span-full z-30 row-start-4 full-phone:relative full-phone:top-6 full-phone:h-7">
            {carousel?.map((_, index) => (
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
        <div class="flex flex-col gap-5 sm-tablet:hidden">
          <span class="font-bold text-[26px] text-[#3E2B24]">{title}</span>
          <span class="font-regular text-base text-black" dangerouslySetInnerHTML={{ __html: text }} />
          <a href={buttonLink} class="max-w-[164px] w-full rounded-md h-12 flex items-center justify-center full-tablet:order-4 text-sm font-medium text-white bg-[#DCA15A] hover:opacity-80">
            {buttonText ?? "Agende agora"}
          </a>
        </div>
      </div>
      <div class="w-full cs-min-tablet:max-w-[290px] mx-auto px-4">
        <a href={buttonLink} class="w-full h-12 gap-2 flex items-center justify-center bg-[#00582E] hover:opacity-80 rounded-md text-white">
          <Icon id="GreenWhatsApp" size={24} strokeWidth={1} />
          {buttonText ?? "Agendar agora"}
        </a>
      </div>
    </div>
  )
}

export default BannerSchedule;