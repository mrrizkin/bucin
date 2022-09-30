import { useLocation, useParams } from "@solidjs/router";
import { Component } from "solid-js";
import { moveButton, createWhatsappURL } from "../utils";

const Jedor: Component = () => {
  const params = useParams();
  const loc = useLocation();
  const { sapaan, nama, pesan, kata_terima, kata_menolak, pesan_wa } =
    loc.query;
  let ref: HTMLButtonElement;
  function handleClick() {
    moveButton(ref);
  }
  function mau() {
    location.href = createWhatsappURL(params.id, pesan_wa);
  }
  return (
    <div class="w-lg mx-auto h-screen">
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
          {sapaan || "Hai"}, {nama || "Fulanah"}
        </h1>
        <p class="text-xl font-medium">{pesan || "Mau gak jadi pacar aku?"}</p>
      </div>
      <div class="flex gap-4 justify-center">
        <button class="bg-green-500 px-4 py-2 rounded text-white" onClick={mau}>
          {kata_terima || "Mau"}
        </button>
        <button
          // @ts-ignore: this is how it's done in the docs
          ref={ref}
          class="bg-red-500 px-4 py-2 rounded text-white transition-all"
          onClick={handleClick}
        >
          {kata_menolak || "Gak mau burik!"}
        </button>
      </div>
    </div>
  );
};

export default Jedor;
