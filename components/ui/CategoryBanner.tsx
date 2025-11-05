import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface Banner {
    /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
    matcher: string;
    /** @description text to be rendered on top of the image */
    title?: string;
    /** @description text to be rendered on top of the image */
    subtitle?: string;
    image: {
        /** @description Image for big screens */
        desktop: ImageWidget;
        /** @description Image for small screens */
        mobile: ImageWidget;
        /** @description image alt text */
        alt?: string;
    };
}
const DEFAULT_PROPS = {
    banners: [
        {
            image: {
                mobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
                desktop: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
                alt: "a",
            },
            title: "",
            matcher: "",
            subtitle: "",
        },
    ],
};
function Banner(props: SectionProps<ReturnType<typeof loader>>) {
    const { banner } = props;
    if (!banner) {
        return null;
    }
    const { title, subtitle, image } = banner;
    return (<div class="relative border-b full-tablet:border-t border-gray-1 min-h-56">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source src={image.mobile} width={360} height={120} media="(max-width: 767px)"/>
        <Source src={image.desktop} width={1440} height={200} media="(min-width: 767px)"/>
        <img class="w-full" src={image.desktop} alt={image.alt ?? title}/>
      </Picture>

      <div class="flex flex-col items-start w-full absolute top-1/3 full-phone:top-[23%] left-0 px-16 full-tablet:px-4">
        <h1>
          <span class="font-semibold font-montserrat text-xl text-gray-3">
            {title}
          </span>
        </h1>
        <h2 class="max-w-xl">
          <span class="text-sm font-normal font-arial text-gray-6">
            {subtitle}
          </span>
        </h2>
      </div>
    </div>);
}
export interface Props {
    banners?: Banner[];
}
export const loader = (props: Props, req: Request) => {
    const { banners } = { ...DEFAULT_PROPS, ...props };
    const banner = banners.find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url));
    return { banner };
};
export default Banner;
