import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage | null;
}

const ProductFields = ({ page }: Props) => {

  const product = page?.product;
  const productFields = [
    {
      field: {
        name: "Detalhes",
        value: product?.isVariantOf?.additionalProperty?.find(item => item.name === "DETALHES")?.value
      }
    },
    {
      field: {
        name: "Formas de Uso",
        value: product?.isVariantOf?.additionalProperty?.find(item => item.name === "FORMAS DE USO")?.value
      }
    },
    {
      field: {
        name: "Precauções",
        value: product?.isVariantOf?.additionalProperty?.find(item => item.name === "PRECAUÇÕES")?.value
      }
    },
    {
      field: {
        name: "Terapêutico",
        value: product?.isVariantOf?.additionalProperty?.find(item => item.name === "TERAPÊUTICO")?.value
      }
    },
    {
      field: {
        name: "Cosmético",
        value: product?.isVariantOf?.additionalProperty?.find(item => item.name === "COSMÉTICO")?.value
      }
    },
    {
      field: {
        name: "Emocional",
        value: product?.isVariantOf?.additionalProperty?.find(item => item.name === "EMOCIONAL")?.value
      }
    }
  ]

  return (
    <div class="product-fields-collapse w-full mt-14">
      {productFields.map((item, index) =>    
        {
          return item.field.value !== undefined && (
            <>
              <div class={`Product-collapsable-${index + 1}-cy px-8 py-5 first-of-type:border-t border-b collapse collapse-arrow rounded-none`}>
                <input id={item.field.name} type="checkbox" class="min-h-0" />
                <label for={item.field.name} class="collapse-title min-h-[0] !p-0 flex gap-2 font-montserrat text-gray-4 text-xs">
                  <span class="uppercase">{item.field.name}</span>
                </label>
                <div class="collapse-content px-0">
                  <span class="font-arial font-normal text-xs text-gray-6">{item.field.value}</span>
                </div>
              </div>
            </>
          )
        }
      )}
    </div>
  );
}

export default ProductFields;