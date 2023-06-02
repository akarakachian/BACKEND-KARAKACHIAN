const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

// const productos = [
//   {
//     id: 1,
//     nombre: "Vacío - $2000 por kg",
//     precio: 2000,
//     img: "https://d2r9epyceweg5n.cloudfront.net/stores/001/196/355/products/vacio-edit1-1f2ca3b7c4b0d043fc15930371092856-640-0.jpg",
//     cantidad: 1,
//   },
//   {
//     id: 2,
//     nombre: "Tira de asado - $1850 por kg",
//     precio: 1850,
//     img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/323/592/products/tira-de-asado1-be9f8df92df650a7d214935965347421-640-0.webp",
//     cantidad: 1,
//   },
//   {
//     id: 3,
//     nombre: "Chorizo - $1300 por kg",
//     precio: 1300,
//     img: "https://superfreshmarket.com.ve/wp-content/uploads/2021/02/chorizo-parrillero-fresh-Fresh.jpg",
//     cantidad: 1,
//   },
//   {
//     id: 4,
//     nombre: "Molleja - $4000 por kg",
//     precio: 4000,
//     img: "https://supermercadocordial.com.ar/wp-content/uploads/2020/12/mollejas12-600x600.jpg",
//     cantidad: 1,
//   },
// ];

let carrito = JSON.parse(localStorage.getItem("guardo")) || [];

const getProducts = async () => {
  const response = await fetch("datos.json");
  const data = await response.json();

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class= "price>${product.precio} $</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Agregar";
    comprar.className = "Agregar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
      }
      console.log(carrito);
      carritoCounter();
      saveLocal();
    });
  });
};

getProducts();

const saveLocal = () => {
  localStorage.setItem("guardo", JSON.stringify(carrito));
};

// verCarrito.addEventListener("click", () => {
const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h1 class ="modal-header-tittle">Carrito.</h1>
  `;
  modalContainer.append(modalHeader);
  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img.src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio} $</p>
    <p>Cantidad: ${product.cantidad}</p>
    <p> Total: ${product.cantidad * product.precio}</p>
    `;

    modalContainer.append(carritoContent);
    console.log(carrito.length);

    let eliminar = document.createElement("span");

    eliminar.innerText = "❌";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `total a pagar: ${total}$`;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
  const foundId = carrito.find((element) => element.id);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

  cantidadCarrito.innerText = carrito.length;
};

carritoCounter();

const intervalo = setInterval(() => {
  alert("Hey, ¡apurate que se acaban nuestras ofertas!");

  clearInterval(intervalo);
}, 4000);

new Promise((resolve, reject) => {});

Swal.fire({
  title: "Bienvenido a AG Carnicería!",
  text: "Si quieres comprar carne en nuestra carnicería, haz click aquí debajo",
  icon: "success",
  confirmButtonText: "COMPRAR",
  iconHtml: "AG",
});
