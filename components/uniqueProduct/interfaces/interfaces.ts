import type { ImageWidget } from "apps/admin/widgets.ts";

interface UniqueProduct {
  /**
   * @title Imagem do Produto
   */
  image?: ImageWidget;
  /**
   * @title Título do Produto
   */
  title?: string;
  /**
   * @title Subtítulo do Produto
   */
  subtitle?: string;
  /**
   * @title Descrição curta do Produto
   * @format textarea
   */
  shortDescription?: string;
  /**
   * @title Link do Produto
   */
  link?: string;
  /**
   * @title Texto do botão
   */
  ctaText?: string;
}

export interface Props {
  /**
   * @title Destaque de produto único
   */
  uniqueProduct?: UniqueProduct;
}
