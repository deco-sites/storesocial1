import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const aceiteState = useSignal(false);
  const errorText = useSignal("");
  const successText = useSignal("");
  const regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const aceite = aceiteState.value;
      const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value.toLowerCase();
      const form: any = document.querySelector('.form-control');

      if (email !== "" && regex.test(email) && aceite == true) {
        await invoke.vtex.actions.masterdata.createDocument({
          data: { email, aceite },
          acronym: "NL"
        });
        successText.value = "Inscrito com sucesso!";
        errorText.value = "";
        form.reset();
        setTimeout(() => {
          successText.value = "";
        }, 5000);
      }

      else if (!regex.test(email) && aceite == true) {
        errorText.value = "Digite um e-mail válido";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      }

      else if (!regex.test(email) && aceite == false) {
        errorText.value = "Digite um e-mail válido e aceite a política de privacidade para se inscrever";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      }

      else if (aceite == false && email !== "" && regex.test(email)) {
        errorText.value = "É necessário aceitar a política de privacidade para se inscrever";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      }

    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="bg-gray-2 flex justify-center py-9 full-phone:pb-20">
      <div class="flex full-tablet:flex-col justify-start items-center max-w-[1210px] w-full">
        <div class="flex flex-col full-tablet:text-center full-tablet:mb-5 gap-1 min-w-64">
          {content?.title && (
            <h4 class={tiled ? "text-xl uppercase font-montserrat font-normal -tracking-tighter" : "text-lg"}>
              {content?.title}
            </h4>
          )}
          {content?.description && (
            <div class="font-montserrat -tracking-tighter text-xs uppercase font-normal">
              {content?.description}
            </div>
          )}
        </div>
        <div class="flex flex-col w-full gap-4 ml-8 full-tablet:ml-0 relative">
          <form
            class="form-control"
            onSubmit={handleSubmit}
          >
            <div class="flex flex-col justify-start full-tablet:justify-center items-start full-tablet:items-center flex-wrap gap-3">
              <div class="flex items-center justify-start full-tablet:flex-col full-phone:w-full px-4">
                <input
                  name="email"
                  type="email"
                  class="Footer-input-newsletter-cy w-full min-w-[556px] full-tablet:min-w-0 full-tablet:w-72 full-phone:w-full border-[1px] full-tablet:mb-2  border-gray-1 rounded-full h-12 mr-4 full-tablet:mr-0 px-5 placeholder:font-arial placeholder:text-gray-4 text-xs placeholder:-tracking-tighter"
                  placeholder={content?.form?.placeholder || "Digite seu email"}
                />
                <button
                  type="submit"
                  class="Footer-submit-newsletter-cy min-w-[336px] full-tablet:min-w-0 full-tablet:w-72 full-phone:w-full h-12 text-white uppercase font-montserrat -tracking-tighter text-xs bg-primary hover:opacity-80 rounded-full"
                  disabled={loading}
                >
                  {content?.form?.buttonText || "Inscrever"}
                </button>
              </div>
              <div class="flex items-center justify-between full-phone:px-4">
                <input
                  type="checkbox"
                  name="aceite"
                  onClick={() => {
                    aceiteState.value = !aceiteState.value
                  }}
                  class="Footer-accept-newsletter-cy mr-1"
                />
                {content?.form?.helpText && (
                  <div
                    class="Footer-policy-newsletter-cy text-xs font-montserrat font-normal full-tablet:max-w-72 full-phone:max-w-full -tracking-tighter text-gray-4"
                    dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
                  />
                )}
              </div>
            </div>
            {errorText.value !== "" && (
              <p class="text-red-500 absolute full-phone:text-center full-phone:px-4 -bottom-5 full-phone:-bottom-10 text-xs font-montserrat font-bold -tracking-tighter">
                {errorText.value}
              </p>
            )}
            {successText.value !== "" && (
              <p class="text-green-700 absolute full-phone:text-center full-phone:px-4 -bottom-5 full-phone:-bottom-10 text-xs font-montserrat font-bold -tracking-tighter">
                {successText.value}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
