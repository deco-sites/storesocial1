import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];
  const imageLink = item?.identifier;

  return (
    <>
      <li class="group flex items-center peer">
        <a href={url} class="py-6">
          <span class="group-hover:text-primary dv-full-desktop:text-[12px] dv-lg-desktop:text-[11px] dv-sm-desktop:text-[10px] lg-laptop:text-[9px] leading-none font-montserrat uppercase tracking-[.05em]">
            {name}
          </span>
        </a>

        {children && children.length > 0 &&
          (
            <>
              <div
                class="absolute hidden overcontent bg-gray-2 z-40 w-full min-h-[410px] border-t border-b-2 hover:flex group-hover:flex"
                style={{ top: "72px", left: "0px" }}
              >
                <div class="items-start justify-left flex w-full max-w-[1472px] mx-auto py-[20px]">
                  <div class="w-[50%] flex">
                    <ul class="flex items-start justify-center gap-6">
                      {children.map((node, index) => (
                        <li class="p-6" key={index}>
                          <a
                            class="text-gray-3 hover:text-primary"
                            href={node.url}
                          >
                            <span class="text-[24px] tracking-[.05em] font-semibold font-montserrat">
                              {node.name}
                            </span>
                          </a>

                          <ul class="flex flex-col">
                            {node.children?.map((leaf, index) => {
                              return (
                                <li
                                  key={index}
                                  class={`${
                                    leaf.identifier &&
                                      leaf.identifier !== "hide-mobile"
                                      ? "font-medium"
                                      : leaf.identifier &&
                                          leaf.identifier === "hide-mobile"
                                      ? "cs-min-desktop:hidden"
                                      : ""
                                  }  py-[6.5px]`}
                                >
                                  <a
                                    class="text-gray-5 hover:text-primary font-montserrat"
                                    href={leaf.url}
                                  >
                                    <span class="text-[16px] tracking-[.05em]">
                                      {leaf.name}
                                    </span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {image?.url && (
                    <div class="w-[50%] flex">
                      <a href={imageLink}>
                        <Image
                          class="p-6"
                          src={image.url}
                          alt={image.alternateName}
                          width={459}
                          height={459}
                          loading="lazy"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
      </li>
    </>
  );
}

export default NavItem;
