import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    card?: CardLayout;
  };
}

function ProductGallery({ products, layout, offset }: Props) {
  const platform = usePlatform();

  return (
    <div class={`product-grid grid grid-cols-4 sm-desktop:grid-cols-3 full-tablet:grid-cols-2 md-phone:grid-cols-1 items-center gap-10 sm-desktop:gap-2`}>
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          index={offset + index}
          layout={layout?.card}
          platform={platform}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
