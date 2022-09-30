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
