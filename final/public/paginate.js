const paginationElement = document.getElementById("pagination");
const total = paginationElement.dataset.total;
const filter = paginationElement.dataset.filter;

if (total > 1) {
  for (let index = 1; index <= total; index++) {
    const a = document.createElement("a");
    a.href = filter ? `?page=${index}&filter=${filter}` : `?page=${index}`;
    a.textContent = index;

    paginationElement.appendChild(a);
  }
}
