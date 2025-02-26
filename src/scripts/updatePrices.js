function formatPrice(price) {
  const currency = localStorage.getItem('currency') || 'USD';
  const rates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73
  };
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  };
  const convertedPrice = price * rates[currency];
  return `${symbols[currency]}${convertedPrice.toFixed(2)}`;
}

function updatePrices() {
  document.querySelectorAll('.price-display').forEach(element => {
    const price = element.getAttribute('data-price');
    if (price) {
      element.textContent = formatPrice(parseFloat(price));
    }
  });
}

// Actualizar precios cuando cambie la moneda
window.addEventListener('storage', (e) => {
  if (e.key === 'currency') {
    updatePrices();
  }
});

// Actualizar precios al cargar la página
document.addEventListener('DOMContentLoaded', updatePrices); 