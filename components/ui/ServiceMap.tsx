import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface SquareProps {
  title?: string;
  /**
   * @format rich-text
   */
  time: string;
  /**
   * @format rich-text
   */
  price: string;

  linkwhatsapp: string;
}

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
  services?: SquareProps[];
}

function SquareService({ linkwhatsapp, price, time, title }: SquareProps) {
  return (
    <div className="flex flex-col w-full border rounded border-[#dbdbdb] py-[6px] px-3">
      <h3 className="font-bold full-phone:min-h-12 sm-phone:min-h-0">
        {title}
      </h3>
      <div className="flex flex-row sm-tablet:flex-col sm-tablet:w-full items-center gap-2">
        <div className="flex flex-row w-full bg-[#b9a18c] rounded justify-between items-center mt-3 sm-tablet:mt-0 h-10 max-w-44 sm-tablet:max-w-full px-2">
          <div className="flex flex-row items-center">
            <Icon
              className="mr-[5px]"
              id="clock"
              width={22}
              height={22}
            />
            <div>
              <div
                className="flex flex-row md:justify-start w-full justify-center items-center whitespace-nowrap text-xs cs-min-lg-desktop:text-sm"
                dangerouslySetInnerHTML={{ __html: time }}
              />
            </div>
          </div>
          <div>
            <div
              className="flex flex-row justify-between w-full items-center text-xs"
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

export default function ServiceSpaSimple(
  {
    image,
    firsttext = "",
    title = "",
    services,
    desktop,
    mobile,
  }: Props,
) {
  return (
    <div className="flex flex-col sm:border sm:rounded sm:border-[#dbdbdb] min-h-[620px] cs-min-desktop:max-w-[410px] relative">
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
        className="flex flex-row md:justify-start w-full justify-center font-montserrat font-semibold text-2xl cs-min-tablet:px-5 leading-[29px] mt-8 full-phone:order-1 full-phone:text-lg full-phone:mb-3"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className="flex flex-row pt-12 sm-tablet:pt-2 sm-tablet:text-[.7813rem] md:justify-start w-full justify-center cs-min-tablet:px-5 full-phone:order-3 full-phone:text-sm"
        dangerouslySetInnerHTML={{ __html: firsttext }}
      />
      <div className="grid grid-cols-1 full-phone:grid-cols-2 md-phone:grid-cols-1 cs-min-tablet:px-5 py-9 w-full bottom-0 gap-2 full-phone:order-4">
        {services &&
          services.map((service) => (
            <SquareService
              title={service.title}
              price={service.price}
              time={service.time}
              linkwhatsapp={service.linkwhatsapp}
            />
          ))}
      </div>
    </div>
  );
}
