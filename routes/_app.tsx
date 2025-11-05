import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
const sw = () => addEventListener("load", () => navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));
export default defineApp(async (_req, ctx) => {
    const revision = await Context.active().release?.revision();
    return (<>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin"/>

        {/* Tailwind v3 CSS file */}
        <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet"/>

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")}/>
        {/*Start of phytoterapicasdc Zendesk Widget script*/}
        <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=c3e912b8-3a06-44a6-a8b9-57d77242de0d"> </script>
        {/*End of phytoterapicasdc Zendesk Widget script*/}
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script type="module" dangerouslySetInnerHTML={{ __html: `(${sw})();` }}/>
    </>);
});
