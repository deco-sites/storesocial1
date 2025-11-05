import type { Props as TargetProps } from "$store/components/header/Header.tsx";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Icon from "$store/components/ui/Icon.tsx"

interface FreeShippingTopBarProps {
  info: TargetProps;
}

const FreeShippingTopBar = (info: TargetProps): FreeShippingTopBarProps => {

  const { cart } = useCart();
  const { totalizers } = cart.value ?? { items: [] };
  const subTotal = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts = totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const shipping = totalizers?.find((item) => item.id === "Shipping")?.value || 0;
  const total = subTotal + shipping + discounts;
  const remaining = info.target - total;
  const percent = Math.floor((total / info.target) * 100);

  return info.show ? (
    <div className="relative header-progress items-center flex flex-col md:flex-row w-full justify-center gap-2 md:gap-5 bg-blue-bar py-2 text-[0]">
      {info.target &&
        (
          <div className="flex justify-center tracking-[.05em] items-center gap-2 text-gray-4 text-base z-20">
            <Icon id="Frete" width={25.68} height={18} />
            {remaining > 0
              ? (
                <span class="font-arial text-[13px]">
                  Com mais {formatPrice(remaining / 100, info.currency, info.locale)} o frete é por nossa conta!
                  {" "}
                </span>
              )
              : <span className="font-medium font-arial tracking-[.05em] text-[13px]">Parabéns! O frete agora é por nossa conta.</span>}
          </div>
        )}
      {remaining > 0 && (
        <progress
          className="absolute progress rounded-none progress-accent w-full bg-gray-2 h-full"
          value={percent}
          max={100}
        />
      )}
    </div>
  ) : null;
}

export default FreeShippingTopBar;