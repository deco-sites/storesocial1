import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface InfoCard {
  /** @title Título do Card */
  cardTitle: string;
  /** @title Imagem do Card */
  image: ImageWidget;
  /** @title Texto do Card */
  text: string;
  /** @title Texto do Botão do Card */
  buttonText: string;
  /** @title Link do Botão do Card */
  buttonLink: string;
}

export interface Props {
  /** @title Texto Introdução */
  text: string;
  /** @title Texto de Chamada */
  boldText: string;
  /** @title InfoCards */
  infoCard: InfoCard[];
}

const TextInfoCards = ({ text, boldText, infoCard }: Props) => {

  return (
    <div id="nossos-servicos" class="info-section">
      <div class="max-w-[760px] mx-auto flex flex-col items-center justify-center my-14 full-tablet:px-10 full-phone:px-4">
        <span class="text-[#3E2B24] text-center text-2xl font-medium">
          {text}
        </span>
        <span class="text-[#3E2B24] text-center text-2xl font-bold">
          {boldText}
        </span>
      </div>
      <div class="max-w-[1360px] mx-auto grid grid-cols-4 place-items-start full-phone:grid-cols-2 md-phone:grid-cols-1 gap-20 full-tablet:gap-10 py-14 border-y border-solid border-[#ECECEC] full-tablet:px-10 full-phone:px-4">
        {infoCard.map((item, index) => {
          return (
            <div class="w-full flex flex-col items-center justify-center gap-3" key={index}>
              <span class="font-bold text-2xl full-tablet:text-base text-[#DCA15A] text-center max-w-36 full-tablet:max-w-32 full-tablet:order-2">
                {item?.cardTitle}
              </span>
              <Image
                class="rounded-full p-2 border border-solid border-[#DCA15A] full-tablet:max-w-[132px] full-tablet:max-h-[132px] md-phone:max-w-[260px] md-phone:max-h-[260px] full-tablet:order-1"
                src={item?.image}
                width={260}
                height={260}
                loading="lazy"
              />
              <span class="text-[#3E2B24] text-center text-base full-tablet:text-sm flex items-center justify-center full-tablet:order-3">
                {item?.text}
              </span>
              <a href={item?.buttonLink} class="max-w-[164px] w-full rounded-md mx-auto h-12 flex items-center justify-center full-tablet:order-4 text-sm font-medium text-white bg-[#DCA15A] hover:opacity-80">
                {item?.buttonText ?? "Veja as opções"}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TextInfoCards;