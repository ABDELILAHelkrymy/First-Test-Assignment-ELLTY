document.addEventListener("DOMContentLoaded", () => {
  const checkboxItems = document.querySelectorAll(".checkbox-item");
  const allPagesCheckbox = checkboxItems[0]?.querySelector(
    'input[type="checkbox"]'
  );
  const pageCheckboxes = Array.from(checkboxItems)
    .slice(1)
    .map((item) => item.querySelector('input[type="checkbox"]'))
    .filter((cb) => cb);

  const updateMasterCheckbox = () => {
    if (!allPagesCheckbox) return;

    const allChecked = pageCheckboxes.every((cb) => cb.checked);
    const someChecked = pageCheckboxes.some((cb) => cb.checked);

    allPagesCheckbox.checked = allChecked;
    allPagesCheckbox.indeterminate = !allChecked && someChecked;
  };

  if (allPagesCheckbox) {
    allPagesCheckbox.addEventListener("change", (e) => {
      pageCheckboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked;
      });
    });
  }

  pageCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateMasterCheckbox);
  });

  checkboxItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.tagName === "INPUT") return;

      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change"));
      }
    });
  });

  const doneButton = document.querySelector(".done-button");
  if (doneButton) {
    doneButton.addEventListener("click", () => {
      const selected = pageCheckboxes
        .filter((cb) => cb.checked)
        .map((cb) => cb.id);

      console.log("Selected pages:", selected);
    });
  }
});
