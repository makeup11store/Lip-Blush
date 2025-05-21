let currentIndex = 0;
const slider = document.getElementById('testimonial-slider');
const slides = document.querySelectorAll('.testimonial');
const dotsContainer = document.getElementById('dots');

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function createDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

createDots();







const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartIcon = document.querySelector("#navbar .fa-shopping-cart");
const confirmButton = document.getElementById("confirm-order");

let cart = [];

document.querySelectorAll(".pro").forEach((productCard, index) => {
  const addButton = productCard.querySelector(".cart");
  addButton.addEventListener("click", () => {
    const name = productCard.querySelector("h5").innerText;
    const price = parseFloat(productCard.querySelector("h4").innerText.replace('$', ''));
    const image = productCard.querySelector("img").src;

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    renderCart();
    cartOverlay.classList.remove("hidden");
  });
});

cartIcon.addEventListener("click", () => {
  cartOverlay.classList.toggle("hidden");
  updateTotal();
});

function renderCart() {
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <p>${item.name}</p>
        <p>$${item.price.toFixed(2)}</p>
        <input type="number" value="${item.quantity}" min="1" style="width: 50px;">
      </div>
      <div class="cart-item-actions">
        <button data-index="${index}" class="delete-item"><i class="fa fa-trash"></i></button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
    updateTotal();
  });

  
  cartItemsContainer.querySelectorAll("input").forEach((input, i) => {
    input.addEventListener("change", (e) => {
      cart[i].quantity = parseInt(e.target.value) || 1;
      updateTotal();
      
    });
  });

  
  cartItemsContainer.querySelectorAll(".delete-item").forEach(button => {
    button.addEventListener("click", () => {
      const i = parseInt(button.dataset.index);
      cart.splice(i, 1);
      renderCart();
      updateTotal();
    });
  });
}

confirmButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    console.log("Order confirmed:", cart);
    alert("Thank you for your purchase!");
    cart = [];
    renderCart();
    cartOverlay.classList.add("hidden");
  }
});


const closeCartBtn = document.getElementById("close-cart");
closeCartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("hidden");
});


function updateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

document.querySelectorAll(".cart").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); 
    addToCart(index);
  });
});




  const menuIcon = document.getElementById('mobile-menu-icon');
  const navbar = document.getElementById('navbar');

  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

