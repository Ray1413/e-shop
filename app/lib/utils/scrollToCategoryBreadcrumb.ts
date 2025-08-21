export const scrollToCategoryBreadcrumb = () => {
  try {
    const anchor = document.querySelectorAll("[data-testid=category-breadcrumb]")[0] as HTMLElement;
    if (anchor) {
      window.scrollTo(0, anchor.offsetTop - (68 + 8)); // 68 -> The height of search bar
    }
  } catch (err) {
    console.error(err);
  }
};
