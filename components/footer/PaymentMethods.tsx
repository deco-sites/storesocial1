import type { Props as PaymentItem } from "$store/components/footer/Footer.tsx";

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4 max-w-64 full-tablet:px-8 full-tablet:max-w-full full-tablet:border-b full-tablet:pb-4 border-gray-1">
          {content.title && 
            <h3 class="font-medium font-montserrat text-gray-4 mb-1 -tracking-tighter text-sm">
              {content.title}
            </h3>
          }
          <ul class="grid grid-cols-3 gap-4 full-tablet:flex full-tablet:gap-2">
            {content.items.map((item: any) => {
              return (
                <li
                  class="border-none"
                  title={item?.label}
                >
                  <img 
                    src={`/image/payment-icons/${item?.label}.webp`}
                    width="44"
                    height="24"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
