import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  firstitem?: {
    image: ImageWidget;
    title?: string;
    text?: string;
  };
  seconditem?: {
    image: ImageWidget;
    title?: string;
    text?: string;
  };
  thirditem?: {
    image: ImageWidget;
    title?: string;
    text?: string;
  };
  fourthitem?: {
    image: ImageWidget;
    title?: string;
    text?: string;
  };
}

export default function ServicesTypes(
  { firstitem, seconditem, thirditem, fourthitem }: Props,
) {
  return (
    <div className="flex w-full lg:justify-center">
      <div className="flex w-full flex-col lg:flex-row mb-[40px] mt-[40px] ml-[28px] mr-[28px] lg:ml=[40px] lg:mr-[40px]">
        <div className="flex flex-row w-full">
          <div className="w-[50%] mr-[15px] lg:flex lg:flex-col-reverse lg:justify-center">
            <div className="xsm-tablet:hidden lg:flex lg:justify-center lg:mt-[10px]">
              <a>
                <img src="/image/cta.png" />
              </a>
            </div>
            <div className="lg:flex lg:justify-center">
              <img
                loading="lazy"
                src={firstitem?.image}
                width={144}
                height={144}
              />
            </div>
            <div className="lg:flex lg:flex-col">
              <div className="lg:flex lg:justify-center">
                <p className="font-montserrat sont-semibold text-[16px] text-[#dca15a]">
                  {firstitem?.title}
                </p>
              </div>
              <div className="lg:flex lg:justify-center">
                <h1 className="font-montserrat text-sm text-[#3e2b24]">
                  {firstitem?.text}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-[50%] ml-[15px] lg:flex lg:flex-col-reverse">
            <div className="xsm-tablet:hidden lg:flex lg:justify-center lg:mt-[10px]">
              <a>
                <img src="/image/cta.png" />
              </a>
            </div>
            <div className="lg:flex lg:justify-center">
              <img
                loading="lazy"
                src={seconditem?.image}
                width={144}
                height={144}
              />
            </div>
            <div className="lg:flex lg:flex-col">
              <div className="lg:flex lg:justify-center">
                <p className="font-montserrat sont-semibold text-[16px] text-[#dca15a]">
                  {seconditem?.title}
                </p>
              </div>
              <div className="lg:flex lg:justify-center">
                <h1 className="font-montserrat text-sm text-[#3e2b24]">
                  {seconditem?.text}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[50%] mr-[15px] lg:flex lg:flex-col-reverse">
            <div className="xsm-tablet:hidden lg:flex lg:justify-center lg:mt-[10px]">
              <a>
                <img src="/image/cta.png" />
              </a>
            </div>
            <div className="lg:flex lg:justify-center">
              <img
                loading="lazy"
                src={thirditem?.image}
                width={144}
                height={144}
              />
            </div>
            <div className="lg:flex lg:flex-col">
              <div className="lg:flex lg:justify-center">
                <p className="font-montserrat sont-semibold text-[16px] text-[#dca15a]">
                  {thirditem?.title}
                </p>
              </div>
              <div className="lg:flex lg:justify-center">
                <h1 className="font-montserrat text-sm text-[#3e2b24]">
                  {thirditem?.text}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-[50%] ml-[15px] lg:flex lg:flex-col-reverse">
            <div className="xsm-tablet:hidden lg:flex lg:justify-center lg:mt-[10px]">
              <a>
                <img src="/image/cta.png" />
              </a>
            </div>
            <div className="lg:flex lg:justify-center">
              <img
                loading="lazy"
                src={fourthitem?.image}
                width={144}
                height={144}
              />
            </div>
            <div className="lg:flex lg:flex-col">
              <div className="lg:flex lg:justify-center">
                <p className="font-montserrat sont-semibold text-[16px] text-[#dca15a]">
                  {fourthitem?.title}
                </p>
              </div>
              <div className="lg:flex lg:justify-center">
                <h1 className="font-montserrat text-sm text-[#3e2b24]">
                  {fourthitem?.text}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
