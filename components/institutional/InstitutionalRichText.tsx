import type { HTMLWidget } from "apps/admin/widgets.ts";
export interface Props {
  /**
  * @title Título
  */
  title?: string;

  /**
  * @title Conteúdo Institucional
  * @default
  */
  content?: HTMLWidget;
}

const InstitutionalRichText = ({ title, content }: Props) => {

  return (
    <div class="max-w-[1085px] mx-auto full-tablet:px-4 mb-20">
      {title && (
        <h1 class="font-montserrat font-medium text-gray-3 text-center text-5xl full-phone:text-2xl mt-16 mb-11">
          {title}
        </h1>
      )}
      {content && (
        <div class="text-institutional w-full font-arial text-base leading-7 text-gray-6" dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}

export default InstitutionalRichText;