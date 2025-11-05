import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "$store/components/product/AddToCartButton/ProductDetails/commonPDP.tsx";
import { useSignal } from "@preact/signals";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

function AddToCartButtonPDP({ seller, productID, eventParams }: Props) {
  
  const quantity: any = useSignal(1);

  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: quantity
      }],
    });

  return (
    <>
      <div class="w-44 flex items-center justify-center border border-gray-1 rounded-full py-4 px-3 mb-9">
        <span class="font-arial font-normal text-xs text-gray-6 mr-2">
          Quantidade
        </span>
        <div class="flex items-center justify-between">
          <button class="font-montserrat font-normal text-lg" onClick={() => 
            quantity.value > 1 ? quantity.value = quantity.value - 1 : null
          }>
            -
          </button>
          <input type="number" class="max-w-[22px] text-center font-montserrat font-normal text-sm text-gray-3" value={quantity.value} />
          <button class="font-montserrat font-normal text-lg relative top-[1px]" onClick={() => 
            quantity.value = quantity.value + 1
          }>
            +
          </button>
        </div>
      </div>
      <Button onAddItem={onAddItem} eventParams={eventParams} />
    </>
  )
}

export default AddToCartButtonPDP;
