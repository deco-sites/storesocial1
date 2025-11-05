import type { ImageWidget } from "apps/admin/widgets.ts";

interface BenefitsProps {
  /**
   * @title Benefício
   */
  benefit?: {
    /**
     * @title Ícone do Benefício
     */
    icon?: ImageWidget;
    /**
     * @title Título do Benefício
     */
    title?: string;
    /**
     * @title Descrição curta do Benefício
     */
    shortDescription?: string;
  };
}

export interface Props {
  /**
   * @title Barra de Benefícios
   */
  benefitsBar?: BenefitsProps[];
}
