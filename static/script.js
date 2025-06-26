// Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const imageGallery = document.getElementById('imageGallery'); // updated for multiple images
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('errorMsg');
const removeBtn = document.getElementById('removeBtn');
const reviewInput = document.getElementById('reviewInput');
const reviewSuccess = document.getElementById('reviewSuccess');
const submitReview = document.getElementById('submitReview');
const starRating = document.getElementById('starRating');
const allReviewsContainer = document.getElementById('allReviews');

// Camera modal elements
const openCameraBtn = document.getElementById('openCameraBtn');
const cameraModal = document.getElementById('cameraModal');
const cameraFeed = document.getElementById('cameraFeed');
const captureBtn = document.getElementById('captureBtn');
const closeCamera = document.getElementById('closeCamera');
let mediaStream = null;

// Array to hold image data
let imageDataList = [];

// Maximum number of images allowed in preview (uploads + captures)
const MAX_IMAGES = 3;

// Image Preview Logic for multiple images with limit
function handleFiles(files) {
  errorMsg.textContent = '';

  // Count current images in gallery
  let currentCount = imageGallery.querySelectorAll('.img-box').length;
  let availableSlots = MAX_IMAGES - currentCount;

  if (!files || files.length === 0) {
    errorMsg.textContent = '❌ No files selected.';
    previewContainer.style.display = 'none';
    return;
  }

  if (availableSlots <= 0) {
    errorMsg.textContent = `❌ You can only add up to ${MAX_IMAGES} images.`;
    return;
  }

  if (files.length > availableSlots) {
    errorMsg.textContent = `❌ You can only add ${availableSlots} more image(s).`;
  }

  loading.style.display = 'block';
  previewContainer.style.display = 'none';

  let processed = 0;
  Array.from(files).slice(0, availableSlots).forEach((file, index) => {
    if (!file.type.startsWith('image/')) {
      errorMsg.textContent = '❌ Please upload valid image files.';
      processed++;
      if (processed === Math.min(files.length, availableSlots)) {
        loading.style.display = 'none';
      }
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      // Create a unique ID for each image
      const imageId = `img-${index}-${Date.now()}-${Math.random()}`;
      imageDataList.push({ id: imageId, src: reader.result });

      // Create image preview element
      const imgBox = document.createElement('div');
      imgBox.className = 'img-box';
      imgBox.setAttribute('data-image-id', imageId);
      imgBox.innerHTML = `
        <img src="${reader.result}" class="preview-img" alt="Preview Image" />
        <button class="remove-btn" type="button" data-image-id="${imageId}">🗑️ Remove</button>
      `;
      imageGallery.appendChild(imgBox);

      processed++;
      if (processed === Math.min(files.length, availableSlots)) {
        setTimeout(() => {
          loading.style.display = 'none';
          previewContainer.style.display = 'block';
          sessionStorage.setItem('imageGallery', imageGallery.innerHTML);
        }, 500);
      }
    };
    reader.readAsDataURL(file);
  });
}

// Restore images if available in sessionStorage
const savedGallery = sessionStorage.getItem('imageGallery');
if (savedGallery) {
  imageGallery.innerHTML = savedGallery;
  previewContainer.style.display = 'block';
}

// File input change
fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

// Drag & Drop Logic
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('highlight');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('highlight');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('highlight');
  const files = e.dataTransfer.files;
  fileInput.files = files; // update file input for consistency
  handleFiles(files);
});

// Remove image(s) logic for multiple images
imageGallery.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const imageId = e.target.getAttribute('data-image-id');
    const imgBox = document.querySelector(`.img-box[data-image-id="${imageId}"]`);
    if (imgBox) {
      imgBox.remove();
    }
    imageDataList = imageDataList.filter(img => img.id !== imageId);
    sessionStorage.setItem('imageGallery', imageGallery.innerHTML);
    // Hide preview container if no images left
    if (imageGallery.children.length === 0) {
      previewContainer.style.display = 'none';
    }
    errorMsg.textContent = '';
  }
});

// Remove all images button
removeBtn.addEventListener('click', () => {
  fileInput.value = '';
  previewContainer.style.display = 'none';
  imageGallery.innerHTML = '';
  errorMsg.textContent = '';
  loading.style.display = 'none';
  imageDataList = [];
  sessionStorage.removeItem('imageGallery');
});

// --- Camera Modal Functionality ---
if (openCameraBtn && cameraModal && cameraFeed && captureBtn && closeCamera) {
  openCameraBtn.addEventListener('click', async () => {
    // Check if limit reached before opening camera
    let currentCount = imageGallery.querySelectorAll('.img-box').length;
    if (currentCount >= MAX_IMAGES) {
      errorMsg.textContent = `❌ You can only add up to ${MAX_IMAGES} images.`;
      return;
    }
    try {
      cameraModal.style.display = 'block';
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraFeed.srcObject = mediaStream;
    } catch (err) {
      alert('Camera access denied or unavailable.');
    }
  });

  closeCamera.addEventListener('click', () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    cameraModal.style.display = 'none';
  });

  // Capture image from video stream
  captureBtn.addEventListener('click', () => {
    // Check if limit reached before capturing
    let currentCount = imageGallery.querySelectorAll('.img-box').length;
    if (currentCount >= MAX_IMAGES) {
      errorMsg.textContent = `❌ You can only add up to ${MAX_IMAGES} images.`;
      if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
      cameraModal.style.display = 'none';
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image data URL
    const imageDataUrl = canvas.toDataURL('image/png');

    // Add captured image to gallery (consistent with handleFiles)
    const imageId = `img-cam-${Date.now()}-${Math.random()}`;
    const imgBox = document.createElement('div');
    imgBox.className = 'img-box';
    imgBox.setAttribute('data-image-id', imageId);
    imgBox.innerHTML = `
      <img src="${imageDataUrl}" class="preview-img" alt="Captured Image" />
      <button class="remove-btn" type="button" data-image-id="${imageId}">🗑️ Remove</button>
    `;
    imageGallery.appendChild(imgBox);

    // Optionally update imageDataList if you want to keep it in sync
    imageDataList.push({ id: imageId, src: imageDataUrl });

    sessionStorage.setItem('imageGallery', imageGallery.innerHTML);

    // Stop camera and hide modal
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    cameraModal.style.display = 'none';
    previewContainer.style.display = 'block';
    errorMsg.textContent = '';
  });
}

// Star Rating Logic
let currentRating = 0;
const stars = document.querySelectorAll('#starRating span');
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    currentRating = index + 1;
    stars.forEach((s, i) => {
      s.classList.toggle('selected', i <= index);
    });
    // Optionally show the rating value
    const userRating = document.getElementById('userRating');
    if (userRating) userRating.textContent = currentRating + " / 5";
    sessionStorage.setItem('currentRating', currentRating);
  });
});

// Restore star rating from sessionStorage if available
const savedRating = sessionStorage.getItem('currentRating');
if (savedRating) {
  currentRating = parseInt(savedRating, 10);
  stars.forEach((s, i) => {
    s.classList.toggle('selected', i < currentRating);
  });
  const userRating = document.getElementById('userRating');
  if (userRating) userRating.textContent = currentRating + " / 5";
}

// Reviews Logic
let reviews = [];
// Load reviews from sessionStorage if available
const savedReviews = sessionStorage.getItem('reviews');
if (savedReviews) {
  reviews = JSON.parse(savedReviews);
  renderReviews();
}

// Submit review
submitReview.addEventListener('click', () => {
  const reviewText = reviewInput.value.trim();
  if (reviewText.length === 0 || currentRating === 0) return;

  const newReview = {
    rating: currentRating,
    text: reviewText
  };

  reviews.push(newReview);
  sessionStorage.setItem('reviews', JSON.stringify(reviews));
  renderReviews();

  reviewInput.value = '';
  currentRating = 0;
  stars.forEach(s => s.classList.remove('selected'));
  const userRating = document.getElementById('userRating');
  if (userRating) userRating.textContent = '';
  sessionStorage.removeItem('currentRating');
  reviewSuccess.style.display = 'block';
  setTimeout(() => {
    reviewSuccess.style.display = 'none';
    window.location.reload(); // Refresh the page after showing success
  }, 3000);
});

// Render all reviews
function renderReviews() {
  if (!allReviewsContainer) return;
  const list = reviews.map(r => `
    <div class="review-item">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <div class="review-text">${r.text}</div>
    </div>
  `).join('');
  allReviewsContainer.innerHTML = `<h4>📋 All Reviews</h4>` + list;
}

// End session: clear sessionStorage and refresh state
document.getElementById('endSessionBtn').addEventListener('click', () => {
  sessionStorage.clear();
  window.location.reload(); // Optional: refresh to reflect cleared state
});


