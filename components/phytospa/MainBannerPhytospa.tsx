import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";

export interface Props {
  /** @title Banner Principal PhytoSpa */
  image: {
    desktop: ImageWidget;
    tablet: ImageWidget;
    mobile: ImageWidget;
  }
  /** @title Texto do InfoCard */
  text?: string;
  /** @title Texto do Botão InfoCard */
  buttonText?: string;
  /** @title Link do Botão InfoCard */
  buttonLink?: string;
}

const MainBannerPhytospa = ({
  image,
  text,
  buttonText,
  buttonLink
}: Props) => {

  return (
    <div class="w-full">
      <div class="w-full relative">
        <Image
          class="full-tablet:hidden w-full"
          src={image?.desktop}
          width={1920}
          height={826}
          preload={true}
        />
        <Image
          class="full-phone:hidden cs-min-desktop:hidden w-full"
          src={image?.tablet}
          width={1200}
          height={775}
          preload={true}
        />
        <Image
          class="cs-min-tablet:hidden w-full"
          src={image?.mobile}
          width={430}
          height={619}
          preload={true}
        />
        <div class="absolute left-10 bottom-40 full-phone:top-8 full-phone:left-0 full-phone:px-10">
          <div class="gap-5 max-w-[406px] full-phone:max-w-full w-full bg-white/75 p-8 flex flex-col rounded-xl">
            <span class="text-[#3E2A23] text-[32px] font-bold font-montserrat full-phone:text-xl">
              {text}
            </span>
            <a href={buttonLink} class={clx(
              "bg-[#DCA15A] w-[151px] h-[41px] hover:opacity-80",
              "flex justify-center items-center rounded-md",
              "font-montserrat text-sm font-medium text-white"
            )}>
              {buttonText ?? "Nossos serviços"}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBannerPhytospa;