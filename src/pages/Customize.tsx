import { Component, Show, For, createSignal } from "solid-js";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { encrypt } from "../utils";
import schemaAvro from "../schema";

const schema = z.object({
  sapaan: z.string().min(1, { message: "Tidak bisa kosong" }),
  nama: z.string().min(1, { message: "Tidak bisa kosong" }),
  pesan: z.string().min(1, { message: "Tidak bisa kosong" }),
  kata_terima: z.string().min(1, { message: "Tidak bisa kosong" }),
  kata_menolak: z.string().min(1, { message: "Tidak bisa kosong" }),
  nomor_wa: z.number().min(1, { message: "Tidak bisa kosong" }),
  pesan_wa: z.string().min(1, { message: "Tidak bisa kosong" }),
});

const Customize: Component = () => {
  const [generatedUrl, setGeneratedUrl] = createSignal("");
  const { form, errors, touched } = createForm<z.infer<typeof schema>>({
    initialValues: {
      sapaan: "Hai",
      nama: "Fulanah",
      pesan: "Mau gak jadi pacar aku?",
      kata_terima: "Mau",
      kata_menolak: "Gak mau burik!",
      nomor_wa: 81234567890,
      pesan_wa: "Hai, aku mau jadi pacar kamu",
    },
    onSubmit: async (values) => {
      let host = window.location.protocol + "//" + window.location.host;
      for (let key in values) {
        // @ts-ignore: this is string
        if (typeof values[key] === "string") {
          // @ts-ignore: replace ? to encoded ?
          values[key] = encodeURIComponent(values[key]);
        }
      }
      // @ts-ignore: schema need string
      values["nomor_wa"] = values["nomor_wa"].toString();
      let buf = schemaAvro.toBuffer(values);
      let data = await encrypt(buf);
      setGeneratedUrl(host + `/jedor?pesan=${encodeURIComponent(data)}`);
    },
    extend: validator({ schema }), // OR `extend: [validator],`
  });

  function copyToClipboard() {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = generatedUrl();
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      // @ts-ignore: this is string
      dummy.contentEditable = true;
      dummy.readOnly = false;
      let range = document.createRange();
      range.selectNodeContents(dummy);
      let selection = window.getSelection();
      selection!.removeAllRanges();
      selection!.addRange(range);
      element.setSelectionRange(0, 999999);
    } else {
      dummy.select();
    }
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
  return (
    <div class="md:w-lg mx-auto p-4">
      <div class="mt-8">
        <h1 class="font-bold text-3xl">Kostumisasi Tampilan</h1>
      </div>
      <Show when={generatedUrl().length > 0}>
        <div class="flex mt-8 gap-4">
          <a
            target="_blank"
            href={generatedUrl()}
            class="flex-1 text-blue-700 border-blue-700 border hover:bg-gray-200 focus:(ring-4 outline-none ring-blue-300) font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
          >
            Preview
          </a>
          <button
            onClick={copyToClipboard}
            class="text-gray-700 bg-gray-200 border border-gray-700 hover:(border-blue-500 text-blue-500) focus:(ring-4 outline-none ring-blue-300) font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
          >
            Copy URL
          </button>
        </div>
      </Show>
      <div class="mt-8">
        <form use:form>
          <div class="flex gap-4">
            <div class="mb-6 flex-1">
              <label
                for="sapaan"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Sapaan
              </label>
              <input
                type="text"
                name="sapaan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-500 border-blue-500) outline-none block w-full p-2"
              />
              <Show when={errors().sapaan && touched().sapaan}>
                <ErrorMessage errors={errors().sapaan!} />
              </Show>
            </div>
            <div class="mb-6 flex-1">
              <label
                for="nama"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Nama
              </label>
              <input
                type="text"
                name="nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-500 border-blue-500) outline-none block w-full p-2"
              />
              <Show when={errors().nama && touched().nama}>
                <ErrorMessage errors={errors().nama!} />
              </Show>
            </div>
          </div>
          <div class="mb-6">
            <label
              for="pesan"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Pesan
            </label>
            <input
              type="text"
              name="pesan"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-500 border-blue-500) outline-none block w-full p-2"
            />
            <Show when={errors().pesan && touched().pesan}>
              <ErrorMessage errors={errors().pesan!} />
            </Show>
          </div>
          <div class="mb-6">
            <label
              for="pesan_wa"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Pesan WA
            </label>
            <input
              type="text"
              name="pesan_wa"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-500 border-blue-500) outline-none block w-full p-2"
            />
            <Show when={errors().pesan_wa && touched().pesan_wa}>
              <ErrorMessage errors={errors().pesan_wa!} />
            </Show>
          </div>
          <div class="mb-6">
            <label
              for="nomor_wa"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Nomor WA
            </label>
            <div class="flex">
              <div class="bg-gray-50 border-l border-t border-b border-gray-300 text-gray-900 text-sm rounded-l-lg p-2">
                +62
              </div>
              <input
                type="number"
                name="nomor_wa"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:(ring-blue-500 border-blue-500) outline-none block w-full p-2"
              />
            </div>
            <Show when={errors().nomor_wa && touched().nomor_wa}>
              <ErrorMessage errors={errors().nomor_wa!} />
            </Show>
          </div>
          <div class="flex gap-4">
            <div class="mb-6 flex-1">
              <label
                for="kata_terima"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Tombol Menerima
              </label>
              <input
                type="text"
                name="kata_terima"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-500 border-blue-500) outline-none block w-full p-2"
              />
              <Show when={errors().kata_terima && touched().kata_terima}>
                <ErrorMessage errors={errors().kata_terima!} />
              </Show>
            </div>
            <div class="mb-6 flex-1">
              <label
                for="kata_terima"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Tombol Menolak
              </label>
              <input
                type="text"
                name="kata_menolak"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:(ring-blue-500 border-blue-500) outline-none block w-full p-2"
              />
              <Show when={errors().kata_menolak && touched().kata_menolak}>
                <ErrorMessage errors={errors().kata_menolak!} />
              </Show>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:(ring-4 outline-none ring-blue-300) font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Buat halaman
          </button>
        </form>
      </div>
    </div>
  );
};

const ErrorMessage: Component<{ errors: string[] }> = (props) => {
  return (
    <For each={props.errors}>
      {(err: string) => <div class="mt-2 text-xs text-red-500">{err}</div>}
    </For>
  );
};

export default Customize;
