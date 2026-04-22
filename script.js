let stores = {
    "Fashion": {
        "TK Maxx": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e9/TK_Maxx_Logo.svg",
            "location": "51.5087191446419, -0.222051807278557"
        },
        "H&M": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
            "location": "51.50822384574147, -0.22124111547930242"
        },
        "Mark & Spencer": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/7/79/M%26S_logo.svg",
            "location": "51.5085185947701, -0.2201582107850606"
        },
        "Nike": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
            "location": "51.50757079115594, -0.221202620890127"
        }
    },
    "Electronics": {
        "Currys": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/4/42/Currys_Logo.svg",
            "location": "51.5091618701995, -0.2213687435878406"
        },
        "Apple Store": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            "location": "51.50732208823729, -0.22081766924017193"
        },
        "Samsung": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Samsung_logo_wordmark.svg",
            "location": "51.50802011008272, -0.22185833523161844"
        },
        "Google Store": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            "location": "51.50708711474536, -0.22198076388200055"
        }
    },
    "Food": {
        "McDonald's": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg",
            "location": "51.507916253545325, -0.22352857861054082"
        },
        "Starbucks": {
            "logo": "https://upload.wikimedia.org/wikipedia/sco/d/d3/Starbucks_Corporation_Logo_2011.svg",
            "location": "51.507770596042526, -0.2234098908615062"
        },
        "Subway": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Subway_bi_%282002%29.svg",
            "location": "51.50650034209011, -0.22325407600459124"
        },
        "KFC": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/b/bf/KFC_logo.svg",
            "location": "51.50700376891394, -0.22014461452306852"
        }
    },
    "Parking": {
        "Level 1": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/5/56/Parking_sign_India.svg",
            "location": "51.50941521274275, -0.220524739460807"
        },
        "Level 2": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/5/56/Parking_sign_India.svg",
            "location": "51.50941521274275, -0.220524739460807"
        },
        "Electric Parking": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/7/72/UA_road_sign_7.23.svg",
            "location": "51.50942661257587, -0.22088054673312071"
        },
        "Disabled Parking": {
            "logo": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Brunei_road_sign_-_Disabled_Parking.svg",
            "location": "51.50926467313368, -0.22081816623627581"
        }
    }
};

const menu = document.getElementById('menu');
const menuIcon = document.querySelector('.lucide-menu');
menuIcon.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Function for picking stores category and displaying them
const storeList = document.getElementById('store-list');
const categoryButtons = {
    Fashion: document.getElementById('fashion-btn'),
    Electronics: document.getElementById('electronics-btn'),
    Food: document.getElementById('eat-drink-btn'),
    Parking: document.getElementById('parking-btn')
};

function showStores(category) {
    const selectedStores = stores[category];
    if (!selectedStores) return;

    storeList.innerHTML = '';

    Object.entries(selectedStores).forEach(([storeName, storeData]) => {
        const storeItem = document.createElement('div');
        storeItem.className = 'flex items-center justify-center h-8';

        const logo = document.createElement('img');
        logo.src = storeData.logo;
        logo.alt = `${storeName} Logo`;
        logo.className = 'h-full';

        const name = document.createElement('p');
        name.className = 'ml-4';
        name.textContent = storeName;

        storeItem.appendChild(logo);
        storeItem.appendChild(name);
        
        // Click to go store
        storeItem.style.cursor = 'pointer';
        storeItem.addEventListener('click', () => {
            const m = markers[storeName];
            if (m) {
                map.setView(m.getLatLng(), 18, { animate: true });
            }
        });
        
        storeList.appendChild(storeItem);
    });
}

function searchStores(q) {
    console.log(q);
    const results = document.getElementById('results');
    results.innerHTML = '';
    if (!q) return;

    Object.entries(stores).forEach(([category, categoryStores]) => {
        Object.entries(categoryStores).forEach(([storeName, storeData]) => {
            if (storeName.toLowerCase().includes(q.toLowerCase())) {
                const resultItem = document.createElement('div');
                resultItem.className = 'flex items-center justify-center h-8 py-2 text-xl';

                const logo = document.createElement('img');
                logo.src = storeData.logo;
                logo.alt = `${storeName} Logo`;
                logo.className = 'h-full';

                const name = document.createElement('p');
                name.className = 'ml-4';
                name.textContent = storeName;

                resultItem.style.cursor = 'pointer';
                resultItem.addEventListener('click', () => {
                    const m = markers[storeName];
                    if (m) {
                        map.setView(m.getLatLng(), 18, { animate: true });
                    }
                });

                resultItem.appendChild(logo);
                resultItem.appendChild(name);
                results.appendChild(resultItem);
            }
        });
    });
}

categoryButtons.Fashion.addEventListener('click', () => showStores('Fashion'));
categoryButtons.Electronics.addEventListener('click', () => showStores('Electronics'));
categoryButtons.Food.addEventListener('click', () => showStores('Food'));
categoryButtons.Parking.addEventListener('click', () => showStores('Parking'));

showStores('Fashion');

// Map & markers

var map = L.map('map').setView([51.508281956753514, -0.22166609203941642], 16);

L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', {
    minZoom: 0,
	maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.508281956753514, -0.22166609203941642],
    {
        icon: L.icon({
            iconUrl: 'https://openguessr.com/img/pins/player_pin0.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
            className: 'store-marker-icon'
        })
    }
).addTo(map).bindPopup('<strong>You are here</strong>').openPopup();

const markers = {};
function addMarker() {
    Object.entries(stores).forEach(([category, categoryStores]) => {
        Object.entries(categoryStores).forEach(([storeName, storeData]) => {
            const parts = storeData.location.split(',').map(s => s.trim());
            const lat = parseFloat(parts[0]);
            const lng = parseFloat(parts[1]);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

            const icon = L.icon({
                iconUrl: storeData.logo,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
                className: 'store-marker-icon'
            });

            const marker = L.marker([lat, lng], { icon }).addTo(map);
            marker.bindPopup(`<strong>${storeName}</strong><br>${category}`);
            markers[storeName] = marker;
        });
    });
}

addMarker();

// Popup for accessibility
const popup = document.getElementById('popup');
const infoBtn = document.getElementById('info-btn');

infoBtn.addEventListener('click', () => {
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

// Bigger Text
const textBtn = document.getElementById('text-btn');
textBtn.addEventListener('change', () => {
    document.body.classList.toggle('text-3xl', textBtn.checked);
});

// TTS
const ttsbtn = document.getElementById('tts-btn');
ttsbtn.addEventListener('change', () => {
    if (ttsbtn.checked) {
        const utterance = new SpeechSynthesisUtterance();
        const text = document.body.textContent || '';
        utterance.text = 'Welcome to the AMAP shopping centre, ' + text;
        speechSynthesis.speak(utterance);
    }
});
