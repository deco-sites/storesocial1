import { useState } from "preact/hooks";
import type { Props as PropsCupom } from "$store/components/header/Header.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  /**
   * @title Texto da Campanha
   * @description Insira o texto da campanha
   * @default -10% na primeira compra
   */

  couponCampaignText?: string;

  /**
   * @title Texto do Cupom
   * @description Insira o texto do Cupom
   * @default CUPOM10
   */

  couponName?: string;
}

function CopyCouponButton({
  cupom,
}: PropsCupom) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyCouponToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }

    return document.execCommand("copy", true, text);
  }

  const handleCopyCouponClick = () => {
    copyCouponToClipboard(cupom?.couponName).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    }).catch((err) => {
      alert("Ocorreu um erro ao copiar o cupom. Tente novamente mais tarde.");
    });
  };

  return (
    <div className="button-copy-coupon-wrapper">
      <button
        className={`button-copy-coupon flex items-center justify-between rounded-[25px] w-[244px] h-[32px] ${isCopied ? "bg-blue-flag border-blue-flag" : "bg-transparent border-gray-4"} border-[1px] border-solid px-[4px] group relative transition-all overflow-hidden`}
        onClick={handleCopyCouponClick}
      >
        <div class={`
          absolute z-10 flex items-center bg-primary h-full w-full text-white text-[11px] font-arial rounded-[25px] pl-6 transition-all translate-x-full ${!isCopied && "group-hover:-translate-x-1"}
        `}>
          Clique para copiar: CUPOM5
        </div>
        <div className={`button-copy-coupon-label ${isCopied ? "pl-2" : "pl-[25px]"}`}>
          {isCopied ? (
            <span class="text-[11px] relative bottom-[2px] text-white font-arial -tracking-tighter">
              <span class="uppercase">{cupom?.couponName}</span> copiado com sucesso
            </span>
          ) : (
            <span
              class={`text-[11px] relative bottom-[2px] text-gray-4 font-arial uppercase -tracking-tighter`}>
              {cupom?.couponCampaignText}
            </span>
          )}
        </div>
        {isCopied ? (
          <Icon id="PercentBlue" size={24} />
        ) : (
          <Icon id="Percent" className="z-20" size={24} />
        )}
      </button>
    </div>
  );
}

export default CopyCouponButton;
