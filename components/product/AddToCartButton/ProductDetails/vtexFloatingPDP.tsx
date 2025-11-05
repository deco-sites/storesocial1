import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "$store/components/product/AddToCartButton/ProductDetails/commonFloating.tsx";
import { useSignal } from "@preact/signals";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

function AddToCartButtonFloatingPDP({ seller, productID, eventParams }: Props) {
  
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
    <div class="flex items-center justify-between w-full full-tablet:max-w-[300px] full-tablet:flex-col full-phone:max-w-full lg-phone:max-w-20">
      <div class="min-w-20 full-tablet:w-full full-tablet:max-w-[200px] mr-2 flex items-center justify-center border border-gray-1 rounded-full py-2 px-1 full-tablet:mb-1 full-tablet:mr-0">
        <div class="flex items-center justify-between">
          <button class="font-montserrat font-normal text-lg" onClick={() => 
            quantity.value > 1 ? quantity.value = quantity.value - 1 : null
          }>
            -
          </button>
          <input type="number" class="max-w-[22px] text-center font-montserrat font-normal text-sm text-gray-3" value={quantity.value} />
          <button class="font-montserrat font-normal text-lg" onClick={() => 
            quantity.value = quantity.value + 1
          }>
            +
          </button>
        </div>
      </div>
      <Button onAddItem={onAddItem} eventParams={eventParams} />
    </div>
  )
}

export default AddToCartButtonFloatingPDP;
