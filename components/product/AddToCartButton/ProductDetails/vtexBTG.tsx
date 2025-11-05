import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./commonBTG.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  actualProductID: string;
  btgProductID: string;
  quantity1: number;
  quantity2: number;
}

function AddToCartButtonBTG({ seller, actualProductID, btgProductID, quantity1, quantity2 }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [
        {
          id: actualProductID,
          seller: seller,
          quantity: quantity1
        },
        {
          id: btgProductID,
          seller: seller,
          quantity: quantity2
        }
      ],
    });

  return <Button onAddItem={onAddItem} />;
}

export default AddToCartButtonBTG;
