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
  firstservicetitle?: string;
  /**
   * @format rich-text
   */
  firsttime?: string;
  /**
   * @format rich-text
   */
  firstprice?: string;

  firstlinkwhatsapp?: string;
  /**
   * @format rich-text
   */
  secondservicetitle?: string;
  /**
   * @format rich-text
   */
  secondtime?: string;
  /**
   * @format rich-text
   */
  secondprice?: string;

  secondlinkwhatsapp?: string;
}

export default function ServiceSpaSimple(
  {
    image,
    firsttext = "",
    title = "",
    firstservicetitle = "",
    firsttime = "",
    firstprice = "",
    firstlinkwhatsapp = "",
    secondservicetitle = "",
    secondtime = "",
    secondprice = "",
    secondlinkwhatsapp = "",
  }: Props,
) {
  return (
    <div className="ml-[12px] mr-[12px] mt-[60px]">
      <div
        className="flex flex-row  md:justify-start  w-full justify-center"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="flex justify-center">
        <img
          loading="lazy"
          src={image}
        />
      </div>
      <div
        className="flex flex-row  md:justify-start  w-full justify-center"
        dangerouslySetInnerHTML={{ __html: firsttext }}
      />
      <div className="flex flex-col w-[50%] border rounded">
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: firstservicetitle }}
        />
        <div className="flex flex-row w-full bg-[#b9a18c] rounded justify-between mt-3">
          <div className="flex flex-row">
            <Icon
              className="ml-[5px] mr-[5px]"
              id="clock"
              width={22}
              height={22}
            />
            <div>
              <div
                className="flex flex-row  md:justify-start  w-full justify-center"
                dangerouslySetInnerHTML={{ __html: firsttime }}
              />
            </div>
          </div>
          <div>
            <div
              className="flex flex-row  md:justify-start  w-full justify-center"
              dangerouslySetInnerHTML={{ __html: firstprice }}
            />
          </div>
        </div>
        <button className="flex w-full justify-center mt-3">
          <div className="flex flex-row w-full h-10 rounded bg-[#00582e] justify-center items-center hover:opacity-80">
            <div>
              <Icon
                className="w-6 h-6"
                id="whatsappbtn"
              />
            </div>
            <div className="">
              <div
                href={firstlinkwhatsapp}
                className="font-montserrat font-semibold text-sm text-white ml-[10px]"
              >
                Agendar agora
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className="flex flex-col w-[50%] border rounded">
        <div
          className="flex flex-row  md:justify-start  w-full justify-center"
          dangerouslySetInnerHTML={{ __html: secondservicetitle }}
        />
        <div className="flex flex-row w-full bg-[#b9a18c] rounded justify-between mt-3">
          <div className="flex flex-row">
            <Icon
              className="ml-[5px] mr-[5px]"
              id="clock"
              width={22}
              height={22}
            />
            <div>
              <div
                className="flex flex-row  md:justify-start  w-full justify-center"
                dangerouslySetInnerHTML={{ __html: secondtime }}
              />
            </div>
          </div>
          <div>
            <div
              className="flex flex-row  md:justify-start  w-full justify-center"
              dangerouslySetInnerHTML={{ __html: secondprice }}
            />
          </div>
        </div>
        <div className="flex w-full justify-center mt-3">
          <a
            href={secondlinkwhatsapp}
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
