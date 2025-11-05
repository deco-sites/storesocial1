import { clx } from "site/sdk/clx.ts";
import { type Section } from "@deco/deco/blocks";
export interface Props {
    /**@title Conteúdo da página */
    content: Section[];
}
function Sectiongrid({ content }: Props) {
    return (<div class={clx("full-tablet:grid auto-rows-auto mt-10 full-phone:grid-cols-1", "grid-flow-row full-tablet:grid-cols-2", "cs-min-desktop:grid-cols-3 max-w-[1360px] mx-auto", "px-[45px] full-phone:px-3 gap-5", "cs-min-desktop:flex justify-center flex-wrap")}>
      {content &&
            content.map((section) => <section.Component {...section.props}/>)}
    </div>);
}
export default Sectiongrid;
