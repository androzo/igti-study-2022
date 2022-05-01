// http://makeup-api.herokuapp.com/api/v1/products.json

// set default view
updateProductCatalog("rating");

let filterBrandTypes = document.getElementById("filter-brand");
filterBrandTypes.addEventListener("change", filterBrand, false);
let filterProductTypes = document.getElementById("filter-type");
filterProductTypes.addEventListener("change", filterType, false);
let sort = document.getElementById("sort-type");
sort.addEventListener("change", sortCatalog, false);
let nameFilter = document.getElementById("filter-name");
nameFilter.addEventListener("change", searchName, false);

function searchName(event) {
  let section = document.getElementById("catalog");
  let section1 = document.getElementById("catalog");

  console.log(section.childNodes.length);
  for (var i = 0; i < section.childNodes.length; i++) {
    var data = section.childNodes[i].dataset;
    if (!data.name.toLowerCase().includes(event.target.value.toLowerCase())) {
      section.removeChild(section.childNodes[i]);
      i--;
      //section.childNodes[i].style.visibility = "hidden";
    }
  }
}

function sortCatalog(event) {
  let brandFilter = document.getElementById("filter-brand");
  let brandSelected = brandFilter.options[brandFilter.selectedIndex].value;
  let typeFilter = document.getElementById("filter-type");
  let typeSelected = typeFilter.options[typeFilter.selectedIndex].value;
  let filterString = "";

  if (brandSelected != "") {
    filterString += "&brand=" + brandSelected;
  }

  if (typeSelected != "") {
    filterString += "&product_type=" + typeSelected;
  }

  if (filterString != "") {
    updateProductCatalog(event.target.value, filterString);
  } else {
    updateProductCatalog(event.target.value);
  }
}

function renderTypes(obj) {
  arrayList = [];
  for (const elem in obj) {
    if (!arrayList.includes(obj[elem].product_type)) {
      arrayList.push(obj[elem].product_type);
    }
  }
  for (const elem of arrayList) {
    const option = document.createElement("option");
    option.textContent = elem;
    option.value = elem;
    // prevent adding what was already added
    if (!filterProductTypes.innerHTML.includes(elem)) {
      filterProductTypes.appendChild(option);
    }
  }
}

function renderBrands(obj) {
  arrayList = [];
  for (const elem in obj) {
    if (!arrayList.includes(obj[elem].brand)) {
      arrayList.push(obj[elem].brand);
    }
  }
  for (const elem of arrayList) {
    const option = document.createElement("option");
    option.textContent = elem;
    option.value = elem;
    // prevent adding what was already added
    if (!filterBrandTypes.innerHTML.includes(elem)) {
      filterBrandTypes.appendChild(option);
    }
  }
}

function filterBrand(event) {
  let sortBy = document.getElementById("sort-type");
  let sortSelected = sortBy.options[sortBy.selectedIndex].value;
  let typeFilter = document.getElementById("filter-type");
  let typeSelected = typeFilter.options[typeFilter.selectedIndex].value;
  console.log("\nFilter brand triggered!  ");
  console.log("brand: " + event.target.value);
  console.log("type: " + typeSelected);
  console.log("sort: " + sortSelected);

  let filterString = "";

  if (event.target.value != "") {
    filterString += "&brand=" + event.target.value;
  }

  if (typeSelected != "") {
    filterString += "&product_type=" + typeSelected;
  }

  if (filterString != "") {
    updateProductCatalog(event.target.value, filterString);
  } else {
    updateProductCatalog(event.target.value);
  }
}

function filterType(event) {
  let sortBy = document.getElementById("sort-type");
  let sortSelected = sortBy.options[sortBy.selectedIndex].value;
  let brandFilter = document.getElementById("filter-brand");
  let brandSelected = brandFilter.options[brandFilter.selectedIndex].value;
  console.log("\nFilter type triggered!  ");
  console.log("brand: " + brandSelected);
  console.log("type: " + event.target.value);
  console.log("sort: " + sortSelected);
  let filterString = "";

  if (brandSelected != "") {
    filterString += "&brand=" + brandSelected;
  }

  if (event.target.value != "") {
    filterString += "&product_type=" + event.target.value;
  }

  if (filterString != "") {
    updateProductCatalog(event.target.value, filterString);
  } else {
    updateProductCatalog(event.target.value);
  }
}

function updateProductCatalog(sortBy, filter) {
  let base_url = "http://localhost:3000/products";
  if (filter) {
    url = base_url + "?" + filter;
  } else {
    url = base_url;
  }
  let productsListPromise = fetch(url);
  productsListPromise.then((resp) => {
    resp.json().then((products) => {
      let catalog = renderProducts(products, sortBy);
      document.getElementById("catalog").innerHTML = catalog;
    });
  });
}

function renderProducts(products, sortBy) {
  // parse
  products.map((product) => {
    validateFields(product);
    return product;
  });

  renderBrands(products);
  renderTypes(products);

  // sorting
  if (sortBy == "price-asce") {
    sortByPriceAsc(products);
  } else if (sortBy == "price-desc") {
    sortByPriceDesc(products);
  } else if (sortBy == "name-asce") {
    sortByNameAsce(products);
  } else if (sortBy == "name-desc") {
    sortByNameDesc(products);
  } else {
    // default
    sortByRating(products);
  }

  // map list to products
  let items = products.map((product) => {
    return productItem(product);
  });
  return `${items.join("")}`;
}

function sortByRating(obj) {
  obj.sort((a, b) => {
    return (
      (a.rating === null) - (b.rating === null) ||
      -(a.rating > b.rating) ||
      +(a.rating < b.rating)
    );
  });
}

function sortByNameAsce(obj) {
  obj.sort((a, b) => {
    return (
      (a.name === null) - (b.name === null) ||
      -(a.name < b.name) ||
      +(a.name > b.name)
    );
  });
}

function sortByNameDesc(obj) {
  obj.sort((a, b) => {
    return (
      (a.name === null) - (b.name === null) ||
      -(a.name > b.name) ||
      +(a.name < b.name)
    );
  });
}

function sortByPriceAsc(obj) {
  obj.sort((a, b) => {
    return (
      (a.price === null) - (b.price === null) ||
      -(a.price < b.price) ||
      +(a.price > b.price)
    );
  });
}

function sortByPriceDesc(obj) {
  obj.sort((a, b) => {
    return (
      (a.price === null) - (b.price === null) ||
      -(a.price > b.price) ||
      +(a.price < b.price)
    );
  });
}

var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "GBP",
});

function validateFields(obj) {
  // price number and convert
  obj.price = parseFloat(obj.price * 5.5).toFixed(2);
  // new Intl.NumberFormat("pt-BR", {
  //   style: "currency",
  //   currency: "BRL",
  // }).format(obj.price);

  obj.price = Number(obj.price);

  // trim name
  obj.name = obj.name.trim();

  // replace null values
  obj.rating = obj.rating === null ? 0 : obj.rating;
  obj.price = obj.price === null ? 0 : obj.price;
  obj.category = obj.category === null ? "" : obj.category;
  obj.brand = obj.brand === null ? "" : obj.brand;
  obj.product_type = obj.product_type === null ? "" : obj.product_type;
  return obj;
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
<span class="product-brand background-price">R$ ${product.price.toFixed(
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
          <div class="details-bar-bg" style="width= 250">R$ ${product.price.toFixed(
            2
          )}</div>
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
