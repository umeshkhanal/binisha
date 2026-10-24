export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = window.innerWidth < 768 ? 40 : 0;

  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};