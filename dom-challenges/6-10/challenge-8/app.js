/**
 * Write your challenge solution here
 */

let cart = [
  // { title: "Jeans", quantity: 0, price: 0, totalPrice: 0 }
];

const allBtnAdd = document.querySelectorAll(".btnAdd");
const emptyCardElement = document.querySelector(".empty-cart");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

allBtnAdd.forEach((button) => {
  button.addEventListener("click", function () {
    const price = getPrice(button);
    const title = getItemName(button);

    AddToCart({ title, price });
  });
});

function AddToCart(product) {
  let found = false;
  cart = cart.map((item) => {
    if (item.title === product.title) {
      found = true;
      const currentTotal = Number(item["totalPrice"]) || 0;
      const currentPrice = Number(product.price) || 0;
      return {
        ...item,
        totalPrice: (currentTotal + currentPrice).toFixed(2),
        quantity: item.quantity + 1,
      };
    }
    return item;
  });

  if (!cart.length || !found) {
    cart.push({
      title: product.title,
      price: Number(product.price),
      quantity: 1,
      totalPrice: Number(product.price),
    });
  }

  updateShoppingCartList();
  updateTotal();
}

function updateShoppingCartList() {
  cartItemsElement.innerHTML = "";

  if (cart.length === 0) {
    cartItemsElement.appendChild(emptyCardElement);
  } else {
    cart.map(showItem);
  }
}

function updateQty({ title }, operation) {
  let updatedQty;
  let updatedTotal;
  cart = cart.map((item) => {
    if (item.title === title) {
      if (operation === "Add") {
        console.log(item.totalPrice);
        console.log(item.quantity);
        updatedQty = parseInt(item.quantity) + 1;
        updatedTotal = (Number(item.totalPrice) + Number(item.price)).toFixed(
          2
        );
      } else {
        updatedQty = parseInt(item.quantity) - 1;
        updatedTotal = (Number(item.totalPrice) - Number(item.price)).toFixed(
          2
        );
      }

      return {
        ...item,
        quantity: updatedQty,
        totalPrice: updatedTotal,
      };
    }
    return item;
  });

  updateTotal();

  return { updatedQty, updatedTotal };
}

function showItem(item) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = item.title;
  cartItem.appendChild(title);

  const showPriceDiv = document.createElement("div");
  showPriceDiv.classList.add("show-price");

  const plusButton = document.createElement("button");
  plusButton.classList.add("counter-button");
  plusButton.textContent = "+";

  const qty = document.createElement("label");
  qty.classList.add("qty");
  qty.textContent = item.quantity;

  const minusButton = document.createElement("button");
  minusButton.classList.add("counter-button");
  minusButton.textContent = "-";

  const price = document.createElement("label");
  price.classList.add("price");
  price.textContent = item.totalPrice;

  plusButton.addEventListener("click", () => {
    const { updatedQty, updatedTotal } = updateQty(item, "Add");
    qty.textContent = updatedQty;
    price.textContent = updatedTotal;
  });
  minusButton.addEventListener("click", () => {
    const { updatedQty, updatedTotal } = updateQty(item, "Remove");

    if (!updatedQty) {
      deleteItem(item);
      cartItemsElement.removeChild(cartItem);
    }
    qty.textContent = updatedQty;
    price.textContent = updatedTotal;
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", function () {
    deleteItem(item);
    cartItemsElement.removeChild(cartItem);
  });

  showPriceDiv.appendChild(plusButton);
  showPriceDiv.appendChild(qty);
  showPriceDiv.appendChild(minusButton);
  showPriceDiv.appendChild(price);
  showPriceDiv.appendChild(removeButton);

  cartItem.appendChild(showPriceDiv);

  cartItemsElement.appendChild(cartItem);
}

function deleteItem({ title }) {
  cart = cart.filter((item) => item.title !== title);
  updateTotal();
}

function updateTotal() {
  console.log(cart);
  const totalAmount = cart.reduce((sum, item) => {
    return sum + Number(item.totalPrice);
  }, 0);

  cartTotalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;

  console.log(totalAmount);
}

function getPrice(button) {
  return getSiblings(button)[2].textContent.toString().split("$").join("");
}

function getItemName(button) {
  return getSiblings(button)[1].textContent.toString().trim();
}

const getSiblings = (node) =>
  [...node.parentNode.children].filter((c) => c !== node);
