import type { Props } from "$store/components/institutional/interfaces/interfaces.ts";

const BeOurConsultantBenefits = ({ benefitsBar, leftButton, rightButton }: Props) => {

  return (
    <>
      <div class="full-tablet:grid full-tablet:grid-cols-2 full-tablet:gap-10 full-phone:grid-cols-1 w-full cs-min-desktop:flex justify-between px-28 lg-desktop:px-8 bg-gray-8 py-5">
        {benefitsBar?.map((item): any => {
          return (
            <div class="flex items-start full-tablet:mx-auto max-w-72">
              <img src={item.benefit?.icon} class="max-w-14 mr-6" />
              <div class="flex flex-col items-start text-gray-3">
                <span class="font-montserrat text-xl font-semibold -tracking-tighter">
                  {item.benefit?.title}
                </span>
                <span class="font-arial text-sm font-regular text-gray-6" dangerouslySetInnerHTML={{ __html: item.benefit?.shortDescription }} />
                {item.benefit?.flag && (
                  <span class="font-arial text-[10px] mt-2 px-2 py-1 font-regular text-white bg-primary rounded-md">
                    {item.benefit?.flag}
                  </span>
                )}
              </div>
            </div>
          )
        })
        }
      </div>
      <div class="buttons-wrapper mb-10 flex items-center justify-between full-phone:flex-col px-16 full-tablet:px-4 mt-10 full-phone:gap-5">
        {leftButton?.activate && (
          <a href={leftButton?.link} class="transition-3s cs-md-tablet:mr-5 hover:opacity-70 border-px mx-auto w-full max-w-[425px] h-12 flex items-center justify-center uppercase tracking-[.05em] border-gray-4 font-montserrat font-medium text-xs rounded-full bg-primary text-white">
            {leftButton?.label}
          </a>
        )}
        {rightButton?.activate && (
          <a href={rightButton?.link} class="transition-3s hover:opacity-70 border-px mx-auto w-full max-w-[425px] h-12 flex items-center justify-center uppercase tracking-[.05em] border-gray-4 font-montserrat font-medium text-xs rounded-full bg-primary text-white">
            {rightButton?.label}
          </a>
        )}
      </div>
    </>
  );
}

export default BeOurConsultantBenefits;