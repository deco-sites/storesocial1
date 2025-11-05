import type { ImageWidget } from "apps/admin/widgets.ts";

interface BeOurConsultantBenefit {
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
    /**
     * @title Destaque
     */
    flag?: string;
  };
}

export interface Props {
  /**
   * @title Barra de Benefícios
   */
  benefitsBar?: BeOurConsultantBenefit[];
  /**
   * @title Botão da esquerda
   */
  leftButton?: {
    /**
     * @title Ativar?
     */
    activate?: boolean;
    /**
     * @title Título do botão
     */
    label?: string;
    /**
     * @title Link do botão
     */
    link?: string;
  };
  /**
   * @title Botão da direita
   */
  rightButton?: {
    /**
     * @title Ativar?
     */
    activate?: boolean;
    /**
     * @title Título do botão
     */
    label?: string;
    /**
     * @title Link do botão
     */
    link?: string;
  };
}
