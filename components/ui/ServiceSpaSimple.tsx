import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  /** @title Backgroud */
  image?: ImageWidget;
  desktop?: {
    width?: string;
    height?: string;
  };
  mobile?: {
    width?: string;
    height?: string;
  };
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format rich-text
   */
  firsttext?: string;
  /**
   * @format rich-text
   */
  time?: string;
  /**
   * @format rich-text
   */
  price?: string;

  linkwhatsapp?: string;
}

export default function ServiceSpaSimple(
  {
    image,
    firsttext = "",
    title = "",
    time = "",
    price = "",
    linkwhatsapp = "",
    desktop,
    mobile,
  }: Props,
) {
  return (
    <div className="flex flex-col sm:border sm:rounded sm:border-[#dbdbdb] sm:min-h-[620px] cs-min-desktop:max-w-[410px] relative">
      <div className="full-phone:hidden justify-center cs-min-tablet:flex full-phone:order-2">
        <img
          class="w-full"
          loading="lazy"
          src={image}
          width={desktop?.width}
          height={desktop?.height}
        />
      </div>
      <div className="full-phone:flex justify-center hidden full-phone:order-2">
        <img
          class="w-full"
          loading="lazy"
          src={image}
          width={mobile?.width}
          height={mobile?.height}
        />
      </div>
      <div
        className="flex flex-row md:justify-start full-phone:order-1 w-full justify-center font-montserrat font-semibold text-2xl cs-min-tablet:px-5 leading-[29px] mt-8 full-phone:mb-3 full-phone:text-lg"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className="flex flex-row pt-12 sm-tablet:pt-2 full-phone:order-3 sm-tablet:text-[.7813rem] md:justify-start w-full justify-center cs-min-tablet:px-5 full-phone:text-sm"
        dangerouslySetInnerHTML={{ __html: firsttext }}
      />
      <div class="flex flex-col cs-min-tablet:absolute bottom-0 w-full cs-min-tablet:px-5 pb-9 full-phone:order-4">
        <div className="flex flex-row w-full bg-[#b9a18c] rounded justify-between mt-3 lg:h-[34px] px-2">
          <div className="flex flex-row items-center">
            <Icon
              className="mr-[5px]"
              id="clock"
              width={22}
              height={22}
            />
            <div class="flex items-center justify-center">
              <div
                className="flex flex-row md:justify-start w-full justify-center"
                dangerouslySetInnerHTML={{ __html: time }}
              />
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div
              className="flex flex-row md:justify-start w-full justify-center items-center"
              dangerouslySetInnerHTML={{ __html: price }}
            />
          </div>
        </div>
        <div className="flex w-full justify-center mt-3">
          <a
            href={linkwhatsapp}
            className="flex flex-row w-full h-10 rounded bg-[#00582e] justify-center items-center hover:opacity-80"
          >
            <div>
              <Icon className="w-6 h-6" id="whatsappbtn" />
            </div>
            <div className="ml-[10px]">
              <span className="font-montserrat font-semibold text-sm text-white">
                Agendar agora
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
