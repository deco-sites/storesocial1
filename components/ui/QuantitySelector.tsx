import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join border border-gray-1 rounded-full w-min px-[18px] h-10">
      <Button
        class="bg-transparent flex min-h-10 h-10 border-0 hover:bg-transparent px-[6px] font-montserrat text-[18px] text-gray-3 join-item"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        -
      </Button>
      <input
        class="input focus:outline-0 font-montserrat text-center text-sm font-medium text-gray-6 min-h-[38px] h-[38px] w-[22px] p-0 join-item [appearance:textfield]"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="bg-transparent flex min-h-10 h-10 border-0 hover:bg-transparent px-[6px] font-montserrat text-[18px] text-gray-3 join-item"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
