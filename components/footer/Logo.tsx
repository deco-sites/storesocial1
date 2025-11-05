import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
    link?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col items-center gap-3">
          <div class="w-56 max-h-11">
            <a href={logo?.link ?? "/"}>
              <Image
                loading="lazy"
                src={logo?.image}
                alt={logo?.description}
                width={228}
                height={45}
              />
            </a>
          </div>
          <div class="">
            {logo?.description}
          </div>
        </div>
      )}
    </>
  );
}
