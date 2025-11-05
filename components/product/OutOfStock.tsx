import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const errorText = useSignal("");
  const successText = useSignal("");
  const regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if (name !== "" && email !== "" && regex.test(email)) {
        await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
        successText.value = "E-mail cadastrado com sucesso. Avisaremos quando o produto retornar aos estoques."
        errorText.value = "";
        setTimeout(()=>{
          successText.value = "";
          errorText.value = "";
        }, 5000)
      }
      
      else if (name === "" && !regex.test(email)) {
        errorText.value = "Digite seu nome e um e-mail válido";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      }
      
      else if (name !== "" && !regex.test(email)) {
        errorText.value = "Digite um e-mail válido";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      }
      
      else if (name !== "" && regex.test(email)) {
        errorText.value = "Digite seu nome";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      }
      
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2 max-w-[340px]" onSubmit={handleSubmit}>

      <input placeholder="Seu nome" class="input input-bordered mb-4 rounded-full h-[52px]" name="name" />
      <input placeholder="Seu e-mail" class="input input-bordered mb-4 rounded-full h-[52px]" name="email" />

      <button class="btn disabled:loading h-[52px] rounded-full border border-gray-3 text-gray-3 uppercase bg-gray-1" disabled={loading}>Me avise quando voltar</button>
      {errorText.value !== "" && (
        <span class="text-red-500 text-xs font-montserrat font-bold -tracking-tighter">
          {errorText.value}
        </span>
      )}
      {successText.value !== "" && (
        <span class="text-green-700 text-xs font-montserrat font-bold -tracking-tighter">
          {successText.value}
        </span>
      )}
    </form>
  );
}

export default Notify;
