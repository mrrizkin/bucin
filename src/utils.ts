export function createWhatsappURL(phone: string, message: string): string {
  let normalizedPhone = phone.replace(/\D/g, "");
  if (!message) {
    return `https://wa.me/${normalizedPhone}`;
  }
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

// move button to random position without going off screen
export function moveButton(button: HTMLButtonElement) {
  button.classList.add("absolute");
  button.classList.add("top-0");
  button.classList.add("left-0");
  const { innerWidth, innerHeight } = window;
  const { width, height } = button.getBoundingClientRect();
  const x = Math.random() * (innerWidth - width);
  const y = Math.random() * (innerHeight - height);
  button.style.transform = `translate(${x}px, ${y}px)`;
}

export async function encrypt(data: string): Promise<string> {
  const key = new Uint8Array(32);
  window.crypto.getRandomValues(key);
  const iv = new Uint8Array(16);
  window.crypto.getRandomValues(iv);
  const algorithm = { name: "AES-CBC", iv };
  const importedKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    algorithm,
    false,
    ["encrypt"]
  );
  const encrypted = await window.crypto.subtle.encrypt(
    algorithm,
    importedKey,
    Buffer.from(data)
  );
  const encryptedBuffer = Buffer.from(encrypted);
  return `${Buffer.from(iv).toString("base64")}:${encryptedBuffer.toString(
    "base64"
  )}:${Buffer.from(key).toString("base64")}`;
}

export async function decrypt(data: string): Promise<string> {
  const [iv, encrypted, key] = data.split(":");
  const algorithm = { name: "AES-CBC", iv: Buffer.from(iv, "base64") };
  const importedKey = await window.crypto.subtle.importKey(
    "raw",
    Buffer.from(key, "base64"),
    algorithm,
    false,
    ["decrypt"]
  );
  const decrypted = await window.crypto.subtle.decrypt(
    algorithm,
    importedKey,
    Buffer.from(encrypted, "base64")
  );
  const decryptedBuffer = Buffer.from(decrypted);
  return decryptedBuffer.toString("utf8");
}
