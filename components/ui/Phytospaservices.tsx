import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface props {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
}

export default function Phytospaservices({
  image,
  lcp,
  id,
}: {
  image: props;
  lcp?: boolean;
  id: string;
}) {
  const { mobile, desktop } = image;

  return (
    <div className="flex w-full flex-col">
      <div className="w-full flex justify-center mb-[40px] sm:mb-0">
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
            width={1920}
          />
          <img
            class="w-full lg:w-[1920px] h-[620px]"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
          />
        </Picture>
      </div>
      <div className="bottom-[500px] relative flex justify-center lg:bottom-[420px] lg:justify-start lg:left-[300px]">
        <div className="bg-[#ffffff] w-[288px] h-[172px] rounded opacity-[90%]">
          <div className="flex w-full pl-[20px] pr-[20px] h-[71px] flex-col">
            <p className="font-semibold text-[20px]">
              Cuide do seu corpo, mente e espírito no PhytoSpa
            </p>
            <div className="bg-[#dca15a] hover:opacity-80 w-[151px] h-[41px] rounded items-center justify-center flex pt-[20px] pt-[20px]">
              <a className="text-sm text-[#ffffff] pb-[20px]">
                Nossos serviços
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
