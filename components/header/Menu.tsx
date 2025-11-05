import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {

  const selected = useSignal(false);

  return (
    <div class="collapse collapse-plus">
      <input 
        type="checkbox" 
        onChange={() => selected.value = !selected.value}
      />
      <div 
        class={`collapse-title px-0 ${selected.value ? "text-primary" : "text-gray-5"}`}
      >
        {item.name}
      </div>
      <div class="collapse-content px-0">
        {item.children?.map((node) => (
          <ul class="border-y border-gray-1 py-0">
            {node.children?.map((leaf) => (
              <li class="my-4">
                <a href={leaf?.url} class={
                  `${leaf?.identifier === 'ver-todos' ? "font-medium" : ""} font-montserrat -tracking-tighter "text-gray-5" text-sm normal-case`
                }>
                  {leaf?.name}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full min-w-[320px] border-t-0">
      <div class="user-links flex flex-col w-full bg-gray-2 px-4 py-4 gap-2">
        <a href="/account" class="underline font-montserrat text-sm text-gray-4">
          Entre ou cadastre-se
        </a>        
      </div>
      <ul class="px-4 flex-grow flex flex-col max-h-[77vh] overflow-y-auto">
        {items.map((item:any) => item?.children?.length > 0 ? (
          <li class="text-sm font-montserrat tracking-[.05em] text-gray-4 uppercase w-full">
            <MenuItem item={item} />
          </li>
          ) : (
          <li class="my-5 px-0 text-sm font-montserrat tracking-[.05em] text-gray-4 uppercase w-full">
            <a href={item?.url}>
              {item?.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
