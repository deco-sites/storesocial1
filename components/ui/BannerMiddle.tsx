import type { Banner } from "$store/components/ui/interfaces/interfaces.ts";

export interface Props {
  bannerMiddle?: Banner;
}

const BannerMiddle = ({ bannerMiddle }: Props) => {

  return (
    <>
      <div className="full-phone:hidden max-w-[1502px] mx-auto w-full h-auto lg-desktop:px-8">
        <a href={bannerMiddle?.link} class="Home-bannerMiddle-desktop-cy">
          <img src={bannerMiddle?.desktop} alt={bannerMiddle?.alt} class="w-full" />
        </a>
      </div>
      <div className="cs-min-tablet:hidden w-full h-auto mx-auto">
        <a href={bannerMiddle?.link} class="Home-bannerMiddle-desktop-cy">
          <img src={bannerMiddle?.mobile} alt={bannerMiddle?.alt} class="w-full" />
        </a>
      </div>
    </>
  );
}

export default BannerMiddle;