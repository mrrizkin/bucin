import { Component } from "solid-js";

const Home: Component = () => {
  return (
    <div class="md:w-lg mx-auto p-4">
      <h1 class="mt-8 text-3xl font-bold text-center">
        Selamat datang orang bucin
      </h1>
      <div class="mt-8 flex justify-center">
        <a
          href="/customize"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:(ring-4 outline-none ring-blue-300) font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Buat Senjata Bucin
        </a>
      </div>
    </div>
  );
};

export default Home;
