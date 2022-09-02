'use strict';

const divEl = `<div class="basket hidden">
                        <div class="basketRow basketHeader">
                            <div>Название товара</div>
                            <div>Количество</div>
                            <div>Цена за шт.</div>
                            <div>Итого</div>
                        </div>

                        <div class="basketTotal">
                            Товаров в корзине на сумму:
                            $<span class="basketTotalValue">0</span>
                        </div>
                    </div>`;

const basketEl = document.querySelector('.cartIconWrap');
basketEl.insertAdjacentHTML('beforeend', divEl);

const divBasketEl = document.querySelector('.basket');
basketEl.addEventListener('click', () => {
    divBasketEl.classList.toggle('hidden');
})

const spanNumberOfProducts = document
    .querySelector('.numberOfProducts');

const spanBasketTotalValue = document
    .querySelector('.basketTotalValue');

const divBasketTotalEl = document.querySelector('.basketTotal');

const basket = {
    numberOfProducts: 0,
    numberOfPositions: 0,
    orderSum: 0,
};

function addToCart(product) {
    if (!basket[product.id]) {
        product['count'] = 1;
        basket[product.id] = product;
        basket.numberOfPositions++;
    } else {
        basket[product.id].count++;
    }

    basket.numberOfProducts++;
    basket.orderSum += +product.price;

    spanNumberOfProducts.textContent = basket.numberOfProducts;
    spanBasketTotalValue.textContent = basket.orderSum;

    const item = basket[product.id];
    const divItemEl = `<div class="basketRow productWithId_${item.id}">
                            <div>${item.name}</div>
                            <div>${item.count}</div>
                            <div>${item.price}</div>
                            <div>${item.count * item.price}</div>
                        </div>`;

    if (item.count === 1) {
        divBasketTotalEl
        .insertAdjacentHTML('beforeBegin', divItemEl);
    } else {
        const replacedItem = document.querySelector(`.productWithId_${item.id}`);
        replacedItem.insertAdjacentHTML('beforeBegin', divItemEl);
        replacedItem.remove();
    }
}

document.querySelector('.featuredItems')
    .addEventListener('click', event => {
        if (event.target.tagName != 'BUTTON') {
            return;
        }
        //const divProductEl = event.target.parentNode.parentNode.parentNode;
        const divProductEl = event.target.closest('.featuredItem');

        const product = {
            id: divProductEl.dataset.id,
            name: divProductEl.dataset.name,
            price: divProductEl.dataset.price
        }
        addToCart(product);
    })