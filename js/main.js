document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    attachEventListeners();
});

function renderProducts() {
    const grid = document.getElementById('productsGrid');

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        const img = document.createElement('img');
        img.classList.add('product-image');
        img.src = product.image;
        img.alt = product.name;
        card.appendChild(img);

        const title = document.createElement('h3');
        title.classList.add('product-title');
        title.textContent = product.name;
        card.appendChild(title);

 
        const desc = document.createElement('p');
        desc.classList.add('product-description');
        desc.textContent = product.description;
        card.appendChild(desc);


        const price = document.createElement('div');
        price.classList.add('product-price');
        price.textContent = `${product.price} руб.`;
        card.appendChild(price);

   
        const btn = document.createElement('button');
        btn.classList.add('add-to-cart');
        btn.textContent = 'Добавить в корзину';

        btn.addEventListener('click', () => {
            cart.addItem(product);
        });

        card.appendChild(btn);

        grid.appendChild(card);
    });
}

function attachEventListeners() {
    const cartBtn = document.getElementById('cartButton');
    const closeCartBtn = document.getElementById('closeCart');
    const sidebar = document.getElementById('cartSidebar');
    const checkoutBtn = document.getElementById('checkoutButton');
    const modal = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');
    const orderForm = document.getElementById('orderForm');

    cartBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeCartBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.getTotalCount() === 0) {
            alert('Корзина пуста!');
            return;
        }
        sidebar.classList.remove('active');
        modal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    orderForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Заказ создан!');
        cart.clearCart();
        orderForm.reset();
        modal.classList.remove('active');
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}
