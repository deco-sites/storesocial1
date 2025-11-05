import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div class="flex items-start justify-between">
      <Image
        {...image}
        src={image.src.replace("55-55", "255-255")}
        style={{ aspectRatio: "144 / 144" }}
        width={144}
        height={144}
        class="h-full object-contain"
      />

      <div class="flex flex-col ml-[16px] mr-[23px]">
        <div class="flex justify-between items-start">
          <span class="product-name-minicart font-montserrat text-xs leading-3 h-[36px] -tracking-tighter text-gray-4">{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="bg-transparent hover:bg-transparent mt-[5px] p-0 ml-[23px] border-0 shadow-none min-h-0 h-auto"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <Icon id="MinicartTrash" width={14} height={17} />
          </Button>
        </div>
        <div class="flex flex-col items-start mt-4 mb-3">
          <span class="line-through text-gray-3 font-arial text-[12px] h-[18px]">
            {list > sale ? formatPrice(list, currency, locale) : null}
          </span>
          <span class="text-[16px] font-bold font-arial text-primary h-6">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>

        <QuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const analyticsItem = itemToAnalyticsItem(index);
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analyticsItem) {
              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                },
              });
            }
          })}
        />
      </div>
    </div>
  );
}

export default CartItem;
