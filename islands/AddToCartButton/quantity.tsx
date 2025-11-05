import { signal } from "@preact/signals";

export const quantity = signal(1);

const Quantity = () => {
  
  const increment = () => {
    quantity.value = quantity.value + 1;
  }

  const decrement = () => {
    if (quantity.value > 1) {
      quantity.value = quantity.value - 1;
    }
  }
  
  return (
    <div class="w-44 flex items-center justify-between border-gray-5 rounded-full py-4 px-3 mb-9">
      <span class="font-arial font-normal text-xs text-gray-1">
        Quantidade
      </span>
      <div class="flex items-center justify-between">
        <button class="font-montserrat font-normal text-lg" onClick={decrement}>-</button>
        <input type="number" value={quantity.value} />
        <button class="font-montserrat font-normal text-lg" onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Quantity;