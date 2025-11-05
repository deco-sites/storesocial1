export interface Props {
  /** 
   * @title Título da página 
   */
  pageTitle: string;
  /** 
   * @title Texto da página 
   * @format textarea
   */
  pageText: string;
}

const SpaRichText = ({ pageTitle, pageText }: Props) => {

  return (
    <div class="w-full sm-tablet:px-12 full-phone:px-3 text-center">
      <h1 class="text-[#3E2B24] font-montserrat font-bold text-[32px] full-phone:text-2xl">
        {pageTitle ?? ""}
      </h1>
      <p class="text-black font-montserrat font-normal text-base">
        {pageText ?? ""}
      </p>
    </div>
  )
}

export default SpaRichText;