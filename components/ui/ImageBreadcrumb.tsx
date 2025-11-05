import type { ImageWidget } from "apps/admin/widgets.ts";
import Breadcrumbspa from "site/components/ui/Breadcrumbspa.tsx";

export interface Props {
  /** @title Nome da página */
  pageText?: string;
  image: {
    /** @description desktop otimized image */
    desktop: ImageWidget;
    /** @description tablet otimized image */
    tablet: ImageWidget;
    /** @description mobile otimized image */
    mobile: ImageWidget;
  }
}


export default function Phytospaservices({ pageText, image }: Props) {

  const { mobile, tablet, desktop } = image;

  return (
    <div class="relative mb-5">
      <div class="flex w-full">
        <img
          class="w-full hidden cs-min-desktop:block"
          src={desktop}
          width={1920}
          height={537}
        />
        <img
          class="w-full cs-min-desktop:hidden full-tablet:block full-phone:hidden"
          src={tablet}
          width={960}
          height={403}
        />
        <img
          class="w-full cs-min-desktop:hidden full-tablet:hidden full-phone:block"
          src={mobile}
          width={375}
          height={258}
        />
      </div>
      <div class="absolute bottom-6 ml-10 full-phone:ml-3 bg-black/25 m-0">
        <Breadcrumbspa pageText={pageText} />
      </div>
    </div>
  );
}