import { useScript } from "@deco/deco/hooks";
export type Item = {
    label: string;
    href: string;
};
export type Section = {
    label: string;
    items: Item[];
};
export default function FooterItems({ sections, }: {
    sections: Section[];
    justify: boolean;
}) {
  const onLoad = () => {
    const el = document.querySelector("#cookies-adopt") as HTMLElement;
    el.addEventListener(
      "click",
      () => {
        //@ts-ignore
        globalThis.window.sendAdoptCommand("open");
      },
      false,
    );
  };
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Desktop view */}
          <ul class="full-tablet:hidden flex flex-row justify-between w-[60%]">
            {sections.map((section, index) => (<li class={`Footer-itemSection-${index + 1}-cy min-w-52`}>
                <div class="flex flex-col gap-2">
                  <span class="font-medium font-montserrat text-gray-4 mb-1 -tracking-tighter text-sm">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-4 flex-wrap text-xs`}>
                    {section.items?.map((item, index) => (
                      <li>
                        <a
                          target={item.label === "Trabalhe Conosco" || item.label === "Troca Fácil"
                            ? "_blank"
                            : "_self"}
                          href={item.href}
                          class={`Footer-itemlabel-${
                            index + 1
                          }-cy block font-montserrat font-regular text-gray-3 -tracking-tighter hover:text-primary`}
                        >
                          {item.label}
                        </a>
                      </li>))}
                    {section.label === "Área do Cliente" && (<>
                        <button id="cookies-adopt" class="block font-montserrat font-regular text-left text-gray-3 -tracking-tighter hover:text-primary">
                          Preferências de Cookies
                        </button>
                        <script type="module" dangerouslySetInnerHTML={{
                        __html: useScript(onLoad),
                    }}/>
                      </>)}
                  </ul>
                </div>
              </li>))}
          </ul>

          {/* Tablet & Mobile view */}
          <ul class="flex flex-col cs-min-desktop:hidden">
            {sections.map((section, index) => (<li class={`Footer-itemSection-${index + 1}-cy px-8 py-5 first-of-type:border-t border-b`}>
                <div class="collapse collapse-arrow rounded-none">
                  <input id={section.label} type="checkbox" class="min-h-[0]"/>
                  <label htmlFor={section.label} class="collapse-title min-h-[0] !p-0 flex gap-2 font-montserrat text-gray-4 -tracking-tighter text-sm">
                    <span>{section.label}</span>
                  </label>
                  <div class="collapse-content px-0">
                    <ul class={`flex flex-col gap-1 pt-2`}>
                      {section.items?.map((item, index) => (
                        <li>
                          <a
                            href={item.href}
                            class={`Footer-itemlabel-${
                              index + 1
                            }-cy block font-montserrat text-gray-3 -tracking-tighter text-sm py-1 link link-hover`}
                            target={index === 2 || index === 4 ? "_blank" : "_self"}
                          >
                            {item.label}
                          </a>
                        </li>))}
                    </ul>
                  </div>
                </div>
              </li>))}
          </ul>
        </>)}
    </>);
}
