import { backend } from 'declarations/backend';

// Helper function to show/hide loading spinner
function toggleLoading(show) {
  const loadingElement = document.getElementById('loading');
  if (show) {
    loadingElement.classList.remove('hidden');
  } else {
    loadingElement.classList.add('hidden');
  }
}

// Function to load and display menu items
async function loadMenuItems() {
  try {
    toggleLoading(true);
    const menuItems = await backend.getAllMenuItems();
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    menuItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">CHF ${item.price.toFixed(2)}</p>
      `;
      menuContainer.appendChild(menuItem);
    });
  } catch (error) {
    console.error('Error loading menu items:', error);
  } finally {
    toggleLoading(false);
  }
}

// Function to handle reservation form submission
async function handleReservation(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const date = form.date.value;
  const time = form.time.value;
  const guests = parseInt(form.guests.value);

  try {
    toggleLoading(true);
    const reservationId = await backend.makeReservation(name, email, date, time, guests);
    alert(`Reservation successful! Your reservation ID is: ${reservationId}`);
    form.reset();
  } catch (error) {
    console.error('Error making reservation:', error);
    alert('Failed to make reservation. Please try again.');
  } finally {
    toggleLoading(false);
  }
}

// Function to handle contact form submission
async function handleContact(event) {
  event.preventDefault();
  const form = event.target;
  const name = form['contact-name'].value;
  const email = form['contact-email'].value;
  const message = form.message.value;

  try {
    toggleLoading(true);
    const messageId = await backend.submitContactMessage(name, email, message);
    alert('Thank you for your message. We will get back to you soon.');
    form.reset();
  } catch (error) {
    console.error('Error submitting contact message:', error);
    alert('Failed to submit message. Please try again.');
  } finally {
    toggleLoading(false);
  }
}

// Initialize the application
async function init() {
  // Load menu items
  await loadMenuItems();

  // Add event listeners
  document.getElementById('reservation-form').addEventListener('submit', handleReservation);
  document.getElementById('contact-form').addEventListener('submit', handleContact);
}

// Run initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
