class Cart {
    constructor() {
        this.items = this.loadCart();
        this.renderCart();
    }

    loadCart() {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({...product, quantity: 1});
        }

        this.saveCart();
        this.renderCart();
        this.notify('Товар добавлен в корзину!');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }

        const item = this.items.find(i => i.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.renderCart();
        }
    }

    getTotalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.renderCart();
    }

    renderCart() {
        const cartCount = document.getElementById('cartCount');
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        cartCount.textContent = this.getTotalCount();

        while (cartItemsContainer.firstChild) {
            cartItemsContainer.removeChild(cartItemsContainer.firstChild);
        }

        if (this.items.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-cart';
            empty.textContent = 'Корзина пуста';
            cartItemsContainer.appendChild(empty);
        } else {
            this.items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                const img = document.createElement('img');
                img.className = 'cart-item-image';
                img.src = item.image;
                img.alt = item.name;
                cartItem.appendChild(img);

                const details = document.createElement('div');
                details.className = 'cart-item-details';

                const title = document.createElement('div');
                title.className = 'cart-item-title';
                title.textContent = item.name;
                details.appendChild(title);

                const price = document.createElement('div');
                price.className = 'cart-item-price';
                price.textContent = `${item.price} руб.`;
                details.appendChild(price);

                const qtyControls = document.createElement('div');
                qtyControls.className = 'quantity-controls';

                const minusBtn = document.createElement('button');
                minusBtn.className = 'quantity-btn';
                minusBtn.textContent = '-';
                minusBtn.addEventListener('click', () => this.updateQuantity(item.id, item.quantity - 1));
                qtyControls.appendChild(minusBtn);

                const qtySpan = document.createElement('span');
                qtySpan.textContent = item.quantity;
                qtyControls.appendChild(qtySpan);

                const plusBtn = document.createElement('button');
                plusBtn.className = 'quantity-btn';
                plusBtn.textContent = '+';
                plusBtn.addEventListener('click', () => this.updateQuantity(item.id, item.quantity + 1));
                qtyControls.appendChild(plusBtn);

                details.appendChild(qtyControls);
                cartItem.appendChild(details);

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-item';
                removeBtn.textContent = 'Удалить';
                removeBtn.addEventListener('click', () => this.removeItem(item.id));
                cartItem.appendChild(removeBtn);

                cartItemsContainer.appendChild(cartItem);
            });
        }

        cartTotal.textContent = this.getTotalPrice();
    }

    notify(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: #fff;
            padding: 1rem;
            border-radius: 5px;
            z-index: 3000;
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

const cart = new Cart();
