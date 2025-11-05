import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator full-tablet:flex full-tablet:items-center">
      <span
        class={`indicator-item bg-primary top-[5px] full-tablet:top-[5px] right-[0px] w-[18px] h-[18px] p-0 rounded-[15px] text-white badge badge-secondary badge-sm ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="bg-transparent hover:bg-transparent text-gray-4 hover:text-primary p-0 max-w-[23px] max-h-[23px] min-h-0 border-none"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon id="Cart" size={23} class="text-inherit" />
      </Button>
    </div>
  );
}

export default CartButton;
