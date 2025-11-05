import { ImageWidget } from "apps/admin/widgets.ts";

export interface BottomInfoProps {
  /**
   * @title Informativo 1
   */
  info1?: {
    /**
     * @title Ícone do Informativo 1
     * @description Insira o ícone SVG do Informativo 1
     */
    icon?: ImageWidget;
    /**
     * @title Título do Informativo 1
     * @description Insira o título do Informativo 1
     */
    title?: string;
    /**
     * @title Texto do Informativo 1
     * @description Insira o texto do Informativo 1 (Procure deixar em uma linha apenas)
     */
    text?: string;
  };
  /**
   * @title Informativo 2
   */
  info2?: {
    /**
     * @title Ícone do Informativo 2
     * @description Insira o ícone SVG do Informativo 2
     */
    icon?: ImageWidget;
    /**
     * @title Título do Informativo 2
     * @description Insira o título do Informativo 2
     */
    title?: string;
    /**
     * @title Texto do Informativo 2
     * @description Insira o texto do Informativo 2 (Procure deixar em uma linha apenas)
     */
    text?: string;
  };
  /**
   * @title Informativo 3
   */
  info3?: {
    /**
     * @title Ícone do Informativo 3
     * @description Insira o ícone SVG do Informativo 3
     */
    icon?: ImageWidget;
    /**
     * @title Título do Informativo 3
     * @description Insira o título do Informativo 3
     */
    title?: string;
    /**
     * @title Texto do Informativo 3
     * @description Insira o texto do Informativo 3 (Procure deixar em uma linha apenas)
     */
    text?: string;
  };
}

export interface CertificateProps {
  /**
  * @title Certificados
  */
  certificates?: {
    /**
    * @title Imagem do Certificado
    */
    image?: ImageWidget;
    /**
    * @title Link do Certificado
    */
    link?: string;
  }
}

export interface ManagedByProps {
  /**
  * @title Texto Operado Por
  */
  operatedByText?: string;
  /**
  * @title Logo Managed By
  */
  image?: ImageWidget;
  /**
  * @title Link Managed By
  */
  link?: string;
}