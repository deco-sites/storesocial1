import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Testimonial {
  text?: string;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
  user?: {
    avatar?: ImageWidget;
    name?: string;
    position?: string;
    company?: string;
  };
}

export interface Props {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  layout?: {
    variation?: "Grid" | "Slider";
    headerAlignment?: "center" | "left";
  };
}

const Testimonal = ({ image, text, user }: Testimonial) => (
  <div class="flex flex-col items-center text-center">
    {image?.src && (
      <Image
        src={image.src}
        alt={image?.alt}
        width={461}
        height={307}
      />
    )}
    <div class="flex flex-col mt-6 mb-3">
      {user?.name &&
        (
          <p class="text-3xl text-primary font-montserrat uppercase">
            {user?.name}
          </p>
        )}
      {(user?.position || user?.company) &&
        (
          <p class="text-lg">
            {user?.position}, {user?.company}
          </p>
        )}
    </div>
    <h3 class="font-montserrat font-light italic text-xl">
      {text}
    </h3>
    <div class="flex flex-col items-center gap-4">
      {user?.avatar && (
        <Image
          src={user.avatar}
          alt={user?.name}
          width={60}
          height={60}
          class="rounded-full"
        />
      )}
    </div>
  </div>
);

export default function Testimonials(
  props: Props,
) {
  const id = useId();
  const { title, description, testimonials, layout } = {
    ...props,
  };

  return (
    <div class="w-full max-w-[1502px] mx-auto cs-min-desktop:px-16 full-tablet:px-4 py-8 flex flex-col gap-14 cs-min-desktop:gap-20 cs-min-desktop:py-10">
      <Header
        title={title}
        description={description}
        alignment={layout?.headerAlignment || "center"}
      />

      {layout?.variation === "Grid" && (
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {testimonials?.map(({ image, text, user }) => (
            <Testimonal image={image} text={text} user={user} />
          ))}
        </div>
      )}

      {layout?.variation !== "Grid" && (
        <div
          class="relative w-full px-8"
          id={id}
        >
          <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 w-full">
            {testimonials?.map(({ image, text, user }, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col gap-4 carousel-item w-full"
              >
                <Testimonal image={image} text={text} user={user} />
              </Slider.Item>
            ))}
          </Slider>
          <>
            <div class="z-10 absolute -left-2 lg:-left-8 top-1/2">
              <Slider.PrevButton class="btn btn-circle btn-outline">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="z-10 absolute -right-2 lg:-right-8 top-1/2">
              <Slider.NextButton class="btn btn-circle btn-outline">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
          <SliderJS rootId={id} />
        </div>
      )}
    </div>
  );
}
