import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Banner {
  /** 
  * @title Imagem do Banner Desktop
  */
  desktop: ImageWidget;
  /** 
  * @title Imagem do Banner Mobile
  */
  mobile: ImageWidget;
  /** 
  * @title Texto alt Desktop e Mobile
  */
  alt: string;
  /** 
  * @title Link dos Banners Desktop e Mobile
  */
  link?: string;
}
