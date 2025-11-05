import { ProductProps } from "$store/loaders/CustomProductLoader.ts"
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";

export interface Props {
  descriptionContent: string;
  page: ProductDetailsPage | null;
  productAs: ProductProps | null;
}

const ProductTabbedContent = (
  { descriptionContent, productAs }: Props) => {

  const activeDescription = useSignal("active");
  const activeTips = useSignal("hidden");
  const activeTabDescription = useSignal("active");
  const activeTabTips = useSignal("");

  const activateDescription = () => {
    activeDescription.value = "active";
    activeTabDescription.value = "active"
    activeTips.value = "hidden";
    activeTabTips.value = "";
  }
  const activateTips = () => {
    activeTips.value = "active";
    activeTabTips.value = "active";
    activeDescription.value = "hidden";
    activeTabDescription.value = ""
  }
  const realTipsContent = productAs?.productAs[0]?.["DICAS DE USO"];

  return (
    <div class="product-tabbed-info w-full max-w-[1400px] px-8 mx-auto mt-16">
      <div class="tab-buttons flex justify-start gap-1">
        <div class={`description-tab ${activeTabDescription.value} bg-white border py-2 px-5 border-gray-7 rounded-tl-xl rounded-tr-xl relative top-[1px]`}>
          <button onClick={activateDescription} class="uppercase text-gray-6 font-arial font-normal text-sm">Descrição</button>
        </div>
        <div class={`tips-tab ${activeTabTips.value} border bg-white py-2 px-5 border-gray-7 rounded-tl-xl rounded-tr-xl relative top-[1px]`}>
          <button onClick={activateTips} class="uppercase text-gray-6 font-arial font-normal text-sm">Dicas de Uso</button>
        </div>
      </div>
      <div class={`tab-contents-description bg-white pt-7 border-t border-gray-9 relative z-10 ${activeDescription.value}`}>
        <div dangerouslySetInnerHTML={{ __html: descriptionContent }} />
      </div>
      <div class={`tab-contents-tips bg-white pt-7 border-t border-gray-9 z-10 ${activeTips.value}`}>
        <div class="w-full" dangerouslySetInnerHTML={{ __html: realTipsContent }} />
      </div>
    </div>
  );
}

export default ProductTabbedContent;