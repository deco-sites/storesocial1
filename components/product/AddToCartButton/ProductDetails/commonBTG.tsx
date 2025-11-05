import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";

export interface Props {
  /** @description: sku name */
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({ onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButtonPDP(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button {...btnProps} class="btn no-animation border-px w-full max-w-[340px] h-10 flex items-center justify-center uppercase -tracking-tighter font-montserrat font-medium text-xs rounded-full border-primary text-white bg-primary hover:bg-primary hover:opacity-80">
      Comprar os 2 juntos
    </Button>
  );
}