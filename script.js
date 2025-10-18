document.addEventListener("DOMContentLoaded", () => {
    // Select product cards using the product-card wrapper we added in the HTML
    const productCards = document.querySelectorAll(".product-card .card");
    const totalDisplay = document.querySelector(".total");

    function parsePrice(text) {
        if (!text) return 0;
        return parseFloat(text.replace(/\$/g, "").replace(/,/g, "").trim()) || 0;
    }

    function updateTotal() {
        let total = 0;
        productCards.forEach((card) => {
            const priceEl = card.querySelector(".unit-price");
            const qtyEl = card.querySelector(".quantity");
            const price = parsePrice(priceEl ? priceEl.textContent : "0");
            const quantity = parseInt(qtyEl ? qtyEl.textContent : "0") || 0;
            total += price * quantity;
        });

        if (totalDisplay) totalDisplay.textContent = `${total} $`;
    }

    productCards.forEach((card) => {
        const plusBtn = card.querySelector(".icon-btn[aria-label='increase']");
        const minusBtn = card.querySelector(".icon-btn[aria-label='decrease']");
        const quantitySpan = card.querySelector(".quantity");
        const deleteBtn = card.querySelector(".icon-btn[aria-label='delete']");
        const heartBtn = card.querySelector(".icon-btn[aria-label='like']");

        if (plusBtn && quantitySpan) {
            plusBtn.addEventListener("click", () => {
                let quantity = parseInt(quantitySpan.textContent) || 0;
                quantitySpan.textContent = quantity + 1;
                updateTotal();
            });
        }

        if (minusBtn && quantitySpan) {
            minusBtn.addEventListener("click", () => {
                let quantity = parseInt(quantitySpan.textContent) || 0;
                if (quantity > 0) {
                    quantitySpan.textContent = quantity - 1;
                    updateTotal();
                }
            });
        }

            if (deleteBtn) {
                deleteBtn.addEventListener("click", () => {
                    const wrapper = card.closest(".product-card");
                    if (wrapper) wrapper.remove();
                    updateTotal();
                });
            }

            if (heartBtn) {
                heartBtn.addEventListener("click", () => {
                    // Toggle the heart color by toggling class on the inner <i>
                    const heartIcon = heartBtn.querySelector('.fa-heart');
                    if (heartIcon) heartIcon.classList.toggle('text-danger');
                    // Also reflect pressed state for accessibility
                    const pressed = heartBtn.getAttribute('aria-pressed') === 'true';
                    heartBtn.setAttribute('aria-pressed', (!pressed).toString());
                });
            }
    });

    updateTotal(); // Initial total
});
