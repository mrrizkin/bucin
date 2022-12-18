import { useLocation } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { moveButton, createWhatsappURL, decrypt } from "../utils";
import schema from "../schema";

const Jedor: Component = () => {
  const [data, setData] = createSignal({
    sapaan: "",
    nama: "",
    pesan: "",
    kata_terima: "",
    kata_menolak: "",
    nomor_wa: "",
    pesan_wa: "",
  });
  const query = useLocation().query;
  const hash = decodeURIComponent(query.pesan);
  decrypt(hash).then((result) => {
    let res_data = schema.fromBuffer(result);
    for (let key in res_data) {
      res_data[key] = decodeURIComponent(res_data[key]);
    }
    setData(res_data);
  });
  let ref: HTMLButtonElement;
  function handleClick() {
    moveButton(ref);
  }
  function mau() {
    location.href = createWhatsappURL(data().nomor_wa, data().pesan_wa);
  }
  return (
    <div class="mx-auto h-screen">
      <div class="flex flex-col gap-4 items-center py-8">
        <div class="h-[200px]">
          <iframe
            src="https://giphy.com/embed/c76IJLufpNwSULPk77"
            width="200"
            height="200"
            class="giphy-embed"
          ></iframe>
        </div>
        <h1 class="text-2xl font-bold">
          {data().sapaan || "Hai"}, {data().nama || "Fulanah"}
        </h1>
        <p class="text-xl font-medium">
          {data().pesan || "Mau gak jadi pacar aku?"}
        </p>
      </div>
      <div class="flex gap-4 justify-center">
        <button class="bg-green-500 px-4 py-2 rounded text-white" onClick={mau}>
          {data().kata_terima || "Mau"}
        </button>
        <button
          // @ts-ignore: this is how it's done in the docs
          ref={ref}
          class="bg-red-500 px-4 py-2 rounded text-white transition-all"
          onClick={handleClick}
        >
          {data().kata_menolak || "Gak mau burik!"}
        </button>
      </div>
    </div>
  );
};

export default Jedor;
