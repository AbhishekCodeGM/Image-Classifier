from flask import Flask, request, render_template, jsonify
from PIL import Image
import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
import os
import sqlite3
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Setup device and constants
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
DATABASE_PATH = 'database/fruit_reviews.db'

class FruitModel(nn.Module):
    def __init__(self, alpha=0.7, num_fruits=2):
        super().__init__()
        self.alpha = alpha
        self.base = torchvision.models.resnet18(weights=None)  # Updated from pretrained=False
        self.base.fc = nn.Identity()

        self.block1 = nn.Sequential(
            nn.Linear(512, 256), nn.ReLU(), nn.Dropout(0.2), nn.Linear(256, 128)
        )
        self.block2 = nn.Sequential(
            nn.Linear(128, 128), nn.ReLU(), nn.Dropout(0.1), nn.Linear(128, num_fruits)
        )
        self.block3 = nn.Sequential(
            nn.Linear(128, 32), nn.ReLU(), nn.Dropout(0.1), nn.Linear(32, 2)
        )

    def forward(self, x):
        x = self.base(x)
        x = self.block1(x)
        return self.block2(x), self.block3(x)

def get_db():
    """Create database connection with row factory"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        logger.error(f"Database connection error: {e}")
        raise

def init_db():
    """Initialize database tables"""
    try:
        os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
        conn = get_db()
        cursor = conn.cursor()

        # Create predictions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fruit_type TEXT NOT NULL,
                health_status TEXT NOT NULL,
                confidence REAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        # Create reviews table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_name TEXT NOT NULL,
                product_type TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
                review_text TEXT NOT NULL,
                source_url TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        conn.commit()
        logger.info("Database tables created successfully")
    except sqlite3.Error as e:
        logger.error(f"Database initialization error: {e}")
        raise
    finally:
        conn.close()

# Initialize Flask app and model
app = Flask(__name__, static_folder='static', template_folder='templates')

try:
    model = FruitModel(num_fruits=2).to(device)
    model.load_state_dict(torch.load('fruit_classifier2.pth', map_location=device))
    model.eval()
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    raise

# Define image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=(0.5, 0.5, 0.5), std=(0.5, 0.5, 0.5))
])

# Class names
fruit_classes = ['Guava', 'Pomegranate']
health_classes = ['Healthy', 'Rotten']

# Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/profile-update')
def profile_update():
    return render_template('profileUpdate.html')

@app.route('/image-identifier')
def image_identifier():
    return render_template('ImageIdentifier.html')

@app.route('/predict', methods=['POST'])
def predict():
    CONFIDENCE_THRESHOLD = 80.0  # Set minimum confidence threshold to 90%
    
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
        
    file = request.files['image']
    if not file.filename:
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Process image
        img = Image.open(file.stream).convert('RGB')
        img_tensor = transform(img).unsqueeze(0).to(device)
        
        # Get predictions
        with torch.no_grad():
            fruit_logits, health_logits = model(img_tensor)
            
            # Calculate confidence scores first
            fruit_probs = torch.softmax(fruit_logits, dim=1)[0]
            health_probs = torch.softmax(health_logits, dim=1)[0]
            
            fruit_conf = torch.max(fruit_probs).item() * 100
            health_conf = torch.max(health_probs).item() * 100
            
            # Check confidence threshold
            if fruit_conf < CONFIDENCE_THRESHOLD or health_conf < CONFIDENCE_THRESHOLD:
                return jsonify({
                    'error': 'Low confidence prediction',
                    'message': 'Unable to make a confident prediction. Please try with a clearer image.',
                    'confidence': {
                        'fruit': round(fruit_conf, 2),
                        'health': round(health_conf, 2)
                    }
                }), 400
            
            # Get class predictions
            fruit_pred = torch.argmax(fruit_logits, dim=1).item()
            health_pred = torch.argmax(health_logits, dim=1).item()

        # Store prediction in database only if confidence is high enough
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO predictions (fruit_type, health_status, confidence, created_at)
            VALUES (?, ?, ?, ?)
        ''', (fruit_classes[fruit_pred], health_classes[health_pred], fruit_conf, datetime.now()))
        conn.commit()
        conn.close()

        logger.info(f"Prediction made: {fruit_classes[fruit_pred]} ({fruit_conf:.2f}% confidence)")
        return jsonify({
            'fruit': fruit_classes[fruit_pred],
            'status': health_classes[health_pred],
            'confidence': {
                'fruit': round(fruit_conf, 2),
                'health': round(health_conf, 2)
            }
        })

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/reviews', methods=['POST'])
def add_review():
    try:
        data = request.json
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO reviews (product_name, product_type, rating, review_text, source_url)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data['productName'],
            data['productType'],
            data['rating'],
            data['reviewText'],
            data['sourceUrl']
        ))
        
        conn.commit()
        logger.info(f"Review added for {data['productName']}")
        return jsonify({'success': True})
    except Exception as e:
        logger.error(f"Error adding review: {e}")
        return jsonify({'error': str(e)}), 400
    finally:
        conn.close()

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM reviews ORDER BY created_at DESC')
        reviews = cursor.fetchall()
        
        return jsonify([{
            'productName': row['product_name'],
            'productType': row['product_type'],
            'rating': row['rating'],
            'reviewText': row['review_text'],
            'sourceUrl': row['source_url'],
            'createdAt': row['created_at']
        } for row in reviews])
    except Exception as e:
        logger.error(f"Error fetching reviews: {e}")
        return jsonify({'error': str(e)}), 400
    finally:
        conn.close()

if __name__ == '__main__':
    try:
        logger.info("Initializing application...")
        init_db()
        logger.info("Starting Flask application...")
        app.run(debug=True)
    except Exception as e:
        logger.error(f"Application startup failed: {e}")
        raise