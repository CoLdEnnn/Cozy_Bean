// ===========================
// Scroll Progress Bar
// ===========================
$(document).ready(function() {
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    $('#scrollProgressBar').css('width', scrollPercent + '%');
  });
});

// ===========================
// Toast Notifications
// ===========================
function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toast.setAttribute('aria-live', 'assertive'); // ARIA для тостов
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);

  const toasts = document.querySelectorAll('.toast');
  toasts.forEach((t, i) => {
    t.style.bottom = `${30 + i * 60}px`;
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

document.getElementById('clickableImage').onclick = function() {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('menuSearch');
    const priceFilter = document.getElementById('priceFilter');
    const resetFilterButton = document.getElementById('resetFilter');
    
    const allCardsContainer = document.querySelector('.menu-main section');
    const allCards = Array.from(allCardsContainer.querySelectorAll('.card'));
    
    function saveFilterState(key, value) {
        localStorage.setItem(key, value);
    }

    function loadFilterState(key, defaultValue) {
        return localStorage.getItem(key) || defaultValue;
    }

    function applyFilters() {
        const searchText = searchInput.value.toLowerCase();
        const priceSort = priceFilter.value;
        
        let filteredCards = [...allCards];

        if (searchText) {
            filteredCards = filteredCards.filter(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                return name.includes(searchText) || description.includes(searchText);
            });
        }
        
        if (priceSort !== 'all') {
            filteredCards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.add-to-cart').dataset.price);
                const priceB = parseFloat(b.querySelector('.add-to-cart').dataset.price);

                if (priceSort === 'low') {
                    return priceA - priceB;
                } else if (priceSort === 'high') {
                    return priceB - priceA;
                }
                return 0;
            });
        }

        renderFilteredCards(filteredCards);
    }

    function renderFilteredCards(cards) {
        const drinksContainer = document.getElementById('drinks-section');
        const dessertsContainer = document.getElementById('desserts-section');
        drinksContainer.innerHTML = '';
        dessertsContainer.innerHTML = '';
        
        cards.forEach(card => {
            const containerId = card.closest('.cards-coffee') ? 'drinks-section' : 'desserts-section';
            
            if (containerId === 'drinks-section') {
                drinksContainer.appendChild(card);
            } else {
                dessertsContainer.appendChild(card);
            }
            card.style.display = 'block'; 
        });
        
        const drinksHeader = drinksContainer.previousElementSibling; 
        const dessertsHeader = dessertsContainer.previousElementSibling;

        if (drinksHeader) drinksHeader.style.display = drinksContainer.children.length > 0 ? 'block' : 'none';
        if (dessertsHeader) dessertsHeader.style.display = dessertsContainer.children.length > 0 ? 'block' : 'none';
        
        if (cards.length === 0) {
            if (!document.getElementById('noResults')) {
                const noResults = document.createElement('p');
                noResults.id = 'noResults';
                noResults.textContent = '❌ No results found matching your criteria.';
                allCardsContainer.appendChild(noResults);
            }
        } else {
            document.getElementById('noResults')?.remove();
        }
    }

    function loadAndApplyState() {
        searchInput.value = loadFilterState('menuSearchText', '');
        priceFilter.value = loadFilterState('menuPriceSort', 'all');
        
        applyFilters();
    }

    searchInput.addEventListener('input', () => {
        saveFilterState('menuSearchText', searchInput.value);
        applyFilters();
    });

    priceFilter.addEventListener('change', () => {
        saveFilterState('menuPriceSort', priceFilter.value);
        applyFilters();
    });
    
    resetFilterButton.addEventListener('click', () => {
        saveFilterState('menuSearchText', '');
        saveFilterState('menuPriceSort', 'all');
        loadAndApplyState();
    });

    loadAndApplyState();
});