import type { ImageWidget } from "apps/admin/widgets.ts";

export interface EmptyCartButtonsProps {
    /** 
    * @title Botão 1
    */
    button1?: {
        /** 
        * @title Esconde/Mostra o botão
        */
        buttonShow?: boolean;
        /** 
        * @title Ícone do botão
        */
        buttonIcon?: ImageWidget;
        /** 
        * @title Texto do botão
        */
        buttonText?: string;
        /** 
        * @title Link do botão
        */
        buttonLink?: string;
    },
    /** 
    * @title Botão 2
    */
    button2?: {
        /** 
        * @title Esconde/Mostra o botão
        */
        buttonShow?: boolean;
        /** 
        * @title Ícone do botão
        */
        buttonIcon?: ImageWidget;
        /** 
        * @title Texto do botão
        */
        buttonText?: string;
        /** 
        * @title Link do botão
        */
        buttonLink?: string;
    },
    /** 
    * @title Botão 3
    */
    button3?: {
        /** 
        * @title Esconde/Mostra o botão
        */
        buttonShow?: boolean;
        /** 
        * @title Ícone do botão
        */
        buttonIcon?: ImageWidget;
        /** 
        * @title Texto do botão
        */
        buttonText?: string;
        /** 
        * @title Link do botão
        */
        buttonLink?: string;
    }
}