import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface ServiceProps {
  type?: string;
  label?: string;
  description?: HTMLWidget;
  image: ImageWidget;
  placement: "left" | "right";
}

export interface Props {
  services?: ServiceProps[];
}

const PLACEMENT = {
  left: "flex-col-reverse lg:flex-row-reverse",
  right: "flex-col lg:flex-row",
};

export default function Services({
  services = [
    {
      type: "Service",
      label: "Your Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, elit arcu ultricies massa, quis ornare nisl libero vitae urna.",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3290/488e5dc5-9a24-48c9-9795-09b97394fb5f",
      placement: "left",
    },
  ],
}: Props) {
  return (
    <div class="max-w-[1502px] cs-min-desktop:px-16 full-tablet:px-4 mx-auto flex flex-col pt-16 pb-28 full-phone:pb-9 full-phone:pt-6">
      {services?.map((service, index) => (
        <div
          key={index}
          class={`flex mx-auto ${
            PLACEMENT[service.placement]
          } text-left items-start full-tablet:items-center justify-start gap-16`}
        >
          <img
            class="w-full max-w-[462px]"
            src={service.image}
            alt={service.label}
            decoding="async"
            loading="lazy"
          />
          <div class="w-full gap-4 max-w-[824px]">
            {service.type && <p>{service.type}</p>}
            <p class="font-medium font-montserrat text-5xl full-phone:text-2xl text-gray-3 mb-11">
              {service.label}
            </p>
            <p
              class="text-base-content text-[16px] md:text-[18px]"
              dangerouslySetInnerHTML={{ __html: service.description || "" }}
            >
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
