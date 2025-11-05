import Icon from "$store/components/ui/Icon.tsx";
import type { Props as SocialItem } from "$store/components/footer/Footer.tsx";

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col items-center gap-4 py-6">
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
            }`}
          >
            {content.items.map((item: any, index) => {
              return (
                <li>
                  <a
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item?.label} Logo`}
                    class={`Footer-social-link-${index + 1}-cy flex gap-2 items-center`}
                  >
                    <span class="flex justify-center items-center border-[1px] border-gray-4 hover:border-primary hover:text-primary text-gray-4 rounded-full w-8 h-8">
                      <Icon id={item.label} class="w-full h-auto max-w-[15px] max-h-[15px] text-inherit" />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
