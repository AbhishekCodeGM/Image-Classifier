const produceDatabase = {
  apple: {
    name: "Red Apple",
    health: {
      title: "Health Benefits",
      content: `<p>Apples are packed with powerful nutrients that support overall health:</p>
      <ul>
        <li><strong>High in Fiber:</strong> Promotes digestive health</li>
        <li><strong>Rich in Antioxidants:</strong> Contains quercetin and catechin</li>
        <li><strong>Heart Health:</strong> Helps lower cholesterol levels</li>
        <li><strong>Weight Management:</strong> Low calorie, high satiety</li>
        <li><strong>Vitamin C:</strong> Supports immune system</li>
      </ul>`
    },
    location: {
      title: "Where It's Grown",
      content: `<p><strong>Top Producing States:</strong></p>
      <ul>
        <li><strong>Washington:</strong> Produces 60% of US apples</li>
        <li><strong>New York:</strong> Second largest producer</li>
        <li><strong>Michigan:</strong> Great Lakes climate</li>
        <li><strong>Pennsylvania:</strong> Rich agricultural heritage</li>
        <li><strong>California:</strong> Year-round growing</li>
      </ul>`
    },
    facts: {
      title: "Fun Facts",
      content: `<ul>
        <li><strong>Ancient Origins:</strong> From Kazakhstan, 4,000+ years old</li>
        <li><strong>Variety Count:</strong> Over 7,500 varieties worldwide</li>
        <li><strong>Float Test:</strong> 25% air by volume</li>
        <li><strong>Ripening Power:</strong> Releases ethylene gas</li>
        <li><strong>DNA Complexity:</strong> 57,000 genes</li>
      </ul>`
    }
  },

  banana: {
    name: "Banana",
    health: {
      title: "Health Benefits",
      content: `<p>Bananas offer quick energy and essential nutrients:</p>
      <ul>
        <li><strong>Rich in Potassium:</strong> Supports heart and muscle function</li>
        <li><strong>Good for Digestion:</strong> High in dietary fiber</li>
        <li><strong>Energy Boost:</strong> Natural sugars provide quick fuel</li>
        <li><strong>Vitamin B6:</strong> Helps in neurotransmitter production</li>
        <li><strong>Reduces Cramps:</strong> Potassium reduces muscle cramps</li>
      </ul>`
    },
    location: {
      title: "Where It's Grown",
      content: `<p><strong>Top Producing Countries:</strong></p>
      <ul>
        <li><strong>India:</strong> Largest producer globally</li>
        <li><strong>Ecuador:</strong> Leading exporter</li>
        <li><strong>Philippines:</strong> Major Asian producer</li>
        <li><strong>Brazil:</strong> Grown throughout tropical regions</li>
        <li><strong>Indonesia:</strong> Key regional producer</li>
      </ul>`
    },
    facts: {
      title: "Fun Facts",
      content: `<ul>
        <li><strong>Technically a Berry:</strong> Botanically classified as berries</li>
        <li><strong>Radioactive:</strong> Contains potassium-40, a radioactive isotope</li>
        <li><strong>No True Seeds:</strong> Commercial bananas are seedless</li>
        <li><strong>Grow Upside Down:</strong> Bananas curve toward the sun</li>
        <li><strong>World Favorite:</strong> One of the most consumed fruits globally</li>
      </ul>`
    }
  },

  guava: {
    name: "Guava",
    health: {
      title: "Health Benefits",
      content: `<p>Guavas are tropical fruits loaded with nutrients:</p>
      <ul>
        <li><strong>Vitamin C:</strong> Four times more than oranges</li>
        <li><strong>Fiber-Rich:</strong> Great for digestion</li>
        <li><strong>Boosts Immunity:</strong> Antioxidants and vitamin C</li>
        <li><strong>Heart Friendly:</strong> May help regulate blood pressure</li>
        <li><strong>Skin Health:</strong> Improves complexion and repairs damage</li>
      </ul>`
    },
    location: {
      title: "Where It's Grown",
      content: `<p><strong>Major Growing Regions:</strong></p>
      <ul>
        <li><strong>India:</strong> Largest global producer</li>
        <li><strong>Mexico:</strong> Widely grown and consumed</li>
        <li><strong>Brazil:</strong> Common in tropical farms</li>
        <li><strong>Thailand:</strong> Export-quality varieties</li>
        <li><strong>Pakistan:</strong> Grown in Punjab and Sindh</li>
      </ul>`
    },
    facts: {
      title: "Fun Facts",
      content: `<ul>
        <li><strong>Multiple Colors:</strong> Flesh can be pink, white, or red</li>
        <li><strong>Edible Seeds:</strong> Entire fruit is edible</li>
        <li><strong>Hardy Plant:</strong> Grows in poor soil and drought</li>
        <li><strong>Sweet Aroma:</strong> Intensifies as it ripens</li>
        <li><strong>Guava Tea:</strong> Leaves used in herbal tea for diabetes</li>
      </ul>`
    }
  },

  mango: {
    name: "Mango",
    health: {
      title: "Health Benefits",
      content: `<p>Mangoes are rich in flavor and nutrition:</p>
      <ul>
        <li><strong>Rich in Vitamin A:</strong> Good for eyes and skin</li>
        <li><strong>Boosts Immunity:</strong> Vitamins A, C, and E</li>
        <li><strong>Antioxidants:</strong> Fight free radicals</li>
        <li><strong>Improves Digestion:</strong> Contains enzymes and fiber</li>
        <li><strong>Hydration:</strong> High water content keeps you cool</li>
      </ul>`
    },
    location: {
      title: "Where It's Grown",
      content: `<p><strong>Top Growing Countries:</strong></p>
      <ul>
        <li><strong>India:</strong> Largest producer, famous for Alphonso</li>
        <li><strong>China:</strong> Major Asian producer</li>
        <li><strong>Thailand:</strong> Known for Nam Dok Mai</li>
        <li><strong>Indonesia:</strong> Popular in Southeast Asia</li>
        <li><strong>Mexico:</strong> Key exporter to the US</li>
      </ul>`
    },
    facts: {
      title: "Fun Facts",
      content: `<ul>
        <li><strong>King of Fruits:</strong> Known as the king in India</li>
        <li><strong>Over 500 Varieties:</strong> India alone has hundreds</li>
        <li><strong>Religious Symbol:</strong> Sacred in Hinduism and Buddhism</li>
        <li><strong>Ancient Origins:</strong> Cultivated for over 4,000 years</li>
        <li><strong>National Fruit:</strong> Of India, Pakistan, and the Philippines</li>
      </ul>`
    }
  },

  orange: {
    name: "Orange",
    health: {
      title: "Health Benefits",
      content: `<p>Oranges are a citrus powerhouse:</p>
      <ul>
        <li><strong>High in Vitamin C:</strong> Supports immune health</li>
        <li><strong>Hydrating:</strong> Over 85% water</li>
        <li><strong>Good for Skin:</strong> Helps in collagen production</li>
        <li><strong>Antioxidant-Rich:</strong> Protects against cell damage</li>
        <li><strong>Heart Friendly:</strong> Flavonoids may reduce risk of stroke</li>
      </ul>`
    },
    location: {
      title: "Where It's Grown",
      content: `<p><strong>Major Producing Countries:</strong></p>
      <ul>
        <li><strong>Brazil:</strong> Largest orange producer</li>
        <li><strong>United States:</strong> Florida and California dominate</li>
        <li><strong>India:</strong> Maharashtra and Punjab regions</li>
        <li><strong>China:</strong> Big in Asian markets</li>
        <li><strong>Spain:</strong> Famous for Valencia oranges</li>
      </ul>`
    },
    facts: {
      title: "Fun Facts",
      content: `<ul>
        <li><strong>Not Natural:</strong> Hybrid of pomelo and mandarin</li>
        <li><strong>Multiple Types:</strong> Blood orange, navel, mandarin</li>
        <li><strong>Peel Uses:</strong> Used in zest, oils, and cleaning</li>
        <li><strong>Symbolism:</strong> Represents luck in Chinese culture</li>
        <li><strong>Juice Leader:</strong> Most consumed fruit juice</li>
      </ul>`
    }
  },

  pomegranate: {
    name: "Pomegranate",
    health: {
      title: "Health Benefits",
      content: `<p>Pomegranates are antioxidant-rich superfruits:</p>
      <ul>
        <li><strong>Rich in Polyphenols:</strong> May reduce inflammation</li>
        <li><strong>Heart Healthy:</strong> Improves blood pressure & cholesterol</li>
        <li><strong>Boosts Immunity:</strong> Vitamin C and antibacterial properties</li>
        <li><strong>Digestive Aid:</strong> High fiber content</li>
        <li><strong>Anti-Cancer:</strong> Studied for cancer-fighting potential</li>
      </ul>`
    },
    location: {
      title: "Where It's Grown",
      content: `<p><strong>Main Producing Regions:</strong></p>
      <ul>
        <li><strong>India:</strong> Maharashtra is the leader</li>
        <li><strong>Iran:</strong> Ancient cultivation tradition</li>
        <li><strong>Spain:</strong> Export quality produce</li>
        <li><strong>Afghanistan:</strong> Naturally grown in dry climates</li>
        <li><strong>California:</strong> U.S. commercial production hub</li>
      </ul>`
    },
    facts: {
      title: "Fun Facts",
      content: `<ul>
        <li><strong>Symbol of Fertility:</strong> Seen in many cultures</li>
        <li><strong>Hundreds of Seeds:</strong> 600+ edible arils inside</li>
        <li><strong>Used in Rituals:</strong> Significant in many religions</li>
        <li><strong>Ancient Fruit:</strong> Mentioned in Egyptian and Greek texts</li>
        <li><strong>Juice Dye:</strong> Used as natural textile dye</li>
      </ul>`
    }
  }
};


class ImageIdentifier {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.elements = {
            dropZone: document.getElementById('dropZone'),
            fileInput: document.getElementById('fileInput'),
            preview: document.getElementById('preview'),
            loading: document.getElementById('loading'),
            resultsSection: document.getElementById('resultsSection'),
            resultImage: document.getElementById('resultImage'),
            produceName: document.getElementById('produceName'),
            confidence: document.getElementById('confidence'),
            healthContent: document.getElementById('healthContent'),
            locationContent: document.getElementById('locationContent'),
            factsContent: document.getElementById('factsContent')
        };
    }

    bindEvents() {
        const { dropZone, fileInput } = this.elements;

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFile(file);
            }
        });

        dropZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFile(file);
            }
        });

        // Form submission handler
        const form = document.getElementById('upload-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const file = this.elements.fileInput.files[0];
                if (file) await this.identifyProduce(file);
            });
        }
    }

    handleFile(file) {
        this.showPreview(file);
        this.identifyProduce(file);
    }

    showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.elements.preview.src = e.target.result;
            this.elements.preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    async identifyProduce(file) {
        try {
            this.showLoading(true);
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to identify produce');

            const data = await response.json();
            this.updateResults(data, file);
            this.updateInfoCards(data.fruit.toLowerCase());

        } catch (error) {
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        const { loading, resultsSection } = this.elements;
        loading.style.display = show ? 'block' : 'none';
        if (show) {
            resultsSection.classList.remove('show');
            document.querySelectorAll('.info-card').forEach(card => {
                card.classList.remove('animate');
            });
        }
    }

    showError(message) {
        const { resultsSection } = this.elements;
        resultsSection.innerHTML = `<div class="error-message">${message}</div>`;
        resultsSection.classList.add('show');
    }

    updateResults(data, file) {
        const { resultImage, produceName, confidence, resultsSection } = this.elements;
        resultImage.src = URL.createObjectURL(file);
        produceName.textContent = data.fruit;
        confidence.textContent = `${data.confidence.fruit}% confidence`;
        resultsSection.classList.add('show');
    }

    updateInfoCards(fruitType) {
        const produce = produceDatabase[fruitType];
        if (!produce) {
            console.warn(`No information available for ${fruitType}`);
            return;
        }

        const { healthContent, locationContent, factsContent } = this.elements;
        
        if (healthContent) healthContent.innerHTML = produce.health.content;
        if (locationContent) locationContent.innerHTML = produce.location.content;
        if (factsContent) factsContent.innerHTML = produce.facts.content;

        document.querySelectorAll('.info-card').forEach((card, index) => {
            setTimeout(() => card.classList.add('animate'), index * 200);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageIdentifier();
});