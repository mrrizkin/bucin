const schema = window.avro.Type.forSchema({
  type: "record",
  name: "Bucin",
  fields: [
    { name: "sapaan", type: "string" },
    { name: "nama", type: "string" },
    { name: "pesan", type: "string" },
    { name: "kata_terima", type: "string" },
    { name: "kata_menolak", type: "string" },
    { name: "nomor_wa", type: "string" },
    { name: "pesan_wa", type: "string" },
  ],
});

export default schema;
