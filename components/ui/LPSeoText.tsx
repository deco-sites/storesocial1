import { useSignal } from "@preact/signals";

export interface textProps {
  seoTitle: string;
  seoText?: string;
}

const LPSeoText = (
  {
    seoTitle = "Conheça o PhytoSPA",
    seoText = "aaaaaaaaaaa",
  }: textProps,
) => {
  const textCategoryState = useSignal(false);

  return (
    <div class="w-full mt">
      {seoTitle &&
        (
          <div>
            <div class="flex flex-col mx-auto p-0 w-full px-[6.25rem] py-0 gap-1.5 mb-10 max-w-[1320px] cs-all-tablet:px-5 full-phone:px-3  full-phone:mt-4 full-phone:mb-[30px]">
              <div class=" font-gotham text-[24px] leading-10 font-semibold text-black">
                {seoTitle}
              </div>
              <div
                class={`font-gotham text-[24px] text-black text-base font-normal text-black-2 leading-[18px]  ${
                  textCategoryState.value === true
                    ? "text-complete"
                    : "text-hidden"
                }`}
              >
                {seoText}
              </div>
            </div>
            <div class="class= flex flex-row justify-center ">
              {seoText
                ? (
                  <button
                    onClick={() => {
                      textCategoryState.value = !textCategoryState.value;
                    }}
                    class="full-phone:text-small full-phone:font-medium full-phone:leading-4 underline full-phone:mt-0 text-left uppercase font-medium"
                  >
                    Ver {textCategoryState.value === true
                      ? <span>menos</span>
                      : <span>mais</span>}
                  </button>
                )
                : (
                  ""
                )}
            </div>
          </div>
        )}
    </div>
  );
};

export default LPSeoText;
