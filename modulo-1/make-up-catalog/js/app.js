const catalog = "";
let productsListPromise = fetch("http://localhost:3000/products");

fetchData();

function fetchData() {
  let productsListPromise = fetch("http://localhost:3000/products");
  productsListPromise.then((resp) => {
    resp.json().then((products) => {
      catalog = products;
      renderFields(catalog);
      refreshCatalog(catalog);
    });
  });
}

let filterBrandTypes = document.getElementById("filter-brand");
let filterProductTypes = document.getElementById("filter-type");
let sortTypes = document.getElementById("sort-type");
let nameFilter = document.getElementById("filter-name");

document.addEventListener("change", applyFilters, false);

function applyFilters(evt) {
  let filteredCatalog = catalog;

  parseFields(filteredCatalog);

  if (filterBrandTypes.value != "") {
    filteredCatalog = filteredCatalog.filter(
      (item) => item.brand == filterBrandTypes.value
    );
  }

  if (filterProductTypes.value != "") {
    filteredCatalog = filteredCatalog.filter(
      (item) => item.product_type == filterProductTypes.value
    );
  }

  if (sortTypes.value == "") {
    filteredCatalog = filteredCatalog.sort((a, b) => {
      return (
        (a.rating === null) - (b.rating === null) ||
        -(a.rating > b.rating) ||
        +(a.rating < b.rating)
      );
    });
  } else if (sortTypes.value == "price-low") {
    filteredCatalog = filteredCatalog.sort((a, b) => {
      return (
        (a.price === null) - (b.price === null) ||
        -(a.price < b.price) ||
        +(a.price > b.price)
      );
    });
  } else if (sortTypes.value == "price-high") {
    filteredCatalog = filteredCatalog.sort((a, b) => {
      return (
        (a.price === null) - (b.price === null) ||
        -(a.price > b.price) ||
        +(a.price < b.price)
      );
    });
  } else if (sortTypes.value == "name-az") {
    filteredCatalog = filteredCatalog.sort((a, b) => {
      return (
        (a.name === null) - (b.name === null) ||
        -(a.name < b.name) ||
        +(a.name > b.name)
      );
    });
  } else if (sortTypes.value == "name-za") {
    filteredCatalog = filteredCatalog.sort((a, b) => {
      return (
        (a.name === null) - (b.name === null) ||
        -(a.name > b.name) ||
        +(a.name < b.name)
      );
    });
  }

  if (filteredCatalog.length == 0) {
    document.getElementById("catalog").innerHTML = "No products found";
  }

  refreshCatalog(filteredCatalog);
}

function filterByName(evt) {}

function refreshCatalog(products) {
  document.getElementById("catalog").innerHTML = renderProducts(products);
}

function renderFields(products) {
  let brandList = products.map((item) => item.brand);
  let typeList = products.map((item) => item.product_type);

  brands = [...new Set(brandList)];
  types = [...new Set(typeList)];

  types.map((item) => {
    let option = document.createElement("option");
    option.textContent = item;
    option.value = item;
    filterProductTypes.appendChild(option);
  });

  brands.map((item) => {
    let option = document.createElement("option");
    option.textContent = item;
    option.value = item;
    filterBrandTypes.appendChild(option);
  });
}
)

function renderProducts(data) {
  // render page, this will afftect only current catalog
  parseFields(data);
  data.sort((a, b) => {
    return (
      (a.rating === null) - (b.rating === null) ||
      -(a.rating > b.rating) ||
      +(a.rating < b.rating)
    );
  });
  let items = data.map((product) => {
    return productItem(product);
  });

  return `${items.join("")}`;
}

function parseFields(data) {
  // do all processing to child here
  data.map((item) => {
    item.name = item.name.trim();
    item.rating = item.rating === null ? 0 : item.rating;
    item.price = item.price === null ? 0 : +item.price;
    item.category = item.category === null ? "" : item.category;
    item.brand = item.brand === null ? "" : item.brand;
    item.item_type = item.item_type === null ? "" : item.product_type;
  });
}

function productItem(product) {
  const item = `<div class="product" data-name="${product.name}" data-brand="${
    product.brand
  }" data-type="${product.product_type}" tabindex="508">
  <figure class="product-figure">
    <img src="${product.image_link}" width="215" height="215" alt="${
    product.name
  }" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${
      product.brand
    }</span>
<span class="product-brand background-price">R$ ${(product.price * 5.5).toFixed(
    2
  )}</span></div>
  </section>
  ${loadDetails(product)}
</div>`;
  return item;
}

function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">R$ ${(
            product.price * 5.5
          ).toFixed(2)}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.category
          }</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.product_type
          }</div>
        </div>
      </div></section>`;
  return details;
}
