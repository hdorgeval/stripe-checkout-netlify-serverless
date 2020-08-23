function createProductFromTemplate(item) {
    const template = document.querySelector('template#product');
    const product = template.content.cloneNode(true);
    product.querySelector('h2').innerText = item.name;
    product.querySelector('.description').innerText = item.description;
    product.querySelector('.price').innerText = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: item.currency
    }).format((item.amount / 100).toFixed(2));
    product.querySelector('[name=sku]').value = item.sku;

    const img = product.querySelector('img');
    img.src = item.image;
    img.alt = item.name;

    return product;
}

export async function loadProducts() {

    const products = document.querySelector('#products');
    products.innerText = 'loading products...';
    
    const data = await fetch('/.netlify/functions/get-products')
    .then(resp => resp.json())
    .catch(err => console.error(err));

    products.innerText = '';

    data.forEach( item => {
        products.appendChild(createProductFromTemplate(item))
    })
    
}