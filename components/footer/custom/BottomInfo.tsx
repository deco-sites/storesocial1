import type { Props as FooterProps } from "$store/components/footer/Footer.tsx";

const BottomInfo = ({ bottomInfo }: FooterProps) => {

  const info1 = bottomInfo?.info1;
  const info2 = bottomInfo?.info2;
  const info3 = bottomInfo?.info3;

  return (
    <div class="w-full flex justify-center items-center">
      <div class="flex items-center full-tablet:flex-col max-w-[1168px] full-tablet:w-[90%] justify-between w-full">
        <div class="flex items-center justify-center full-tablet:max-w-56">
          <img src={info1?.icon} class="w-10 h-11 mr-6" />
          <div class="flex flex-col items-start">
            <p class="font-montserrat font-semibold text-xl text-gray-3">
              {info1?.title}
            </p>
            <p class="font-arial font-normal text-sm text-gray-3">
              {info1?.text}
            </p>
          </div>
        </div>
        <div class="w-[1px] h-10 full-tablet:w-full full-tablet:h-[1px] full-tablet:my-4 bg-gray-1"></div>
        <div class="flex items-center justify-center full-tablet:max-w-56">
          <img src={info2?.icon} class="w-10 h-11 mr-6" />
          <div class="flex flex-col items-start">
            <p class="font-montserrat font-semibold text-xl text-gray-3">
              {info2?.title}
            </p>
            <p class="font-arial font-normal text-sm text-gray-3">
              {info2?.text}
            </p>
          </div>
        </div>
        <div class="w-[1px] h-10 full-tablet:w-full full-tablet:h-[1px] full-tablet:my-4 bg-gray-1"></div>
        <div class="flex items-center justify-center full-tablet:max-w-56">
          <img src={info3?.icon} class="w-10 h-11 mr-6" />
          <div class="flex flex-col items-start">
            <p class="font-montserrat font-semibold text-xl text-gray-3">
              {info3?.title}
            </p>
            <p class="font-arial font-normal text-sm text-gray-3">
              {info3?.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomInfo;
