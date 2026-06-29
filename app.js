// API Base URL - Change this if your backend is on a different server
const API_BASE_URL = 'http://localhost:8000';

// ============================================================
// VOLUNTEER REGISTRATION FORM
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const volunteerForm = document.getElementById('volunteerForm');
  
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('vol_name').value.trim();
      const email = document.getElementById('vol_email').value.trim();
      const phone = document.getElementById('vol_phone').value.trim();
      const age = parseInt(document.getElementById('vol_age').value);
      const occupation = document.getElementById('vol_occupation').value;
      const city = document.getElementById('vol_city').value.trim();
      const organization = document.getElementById('vol_organization').value.trim();
      const availability = document.getElementById('vol_availability').value;
      
      // Get selected interests
      const interestCheckboxes = document.querySelectorAll('#volunteerForm .interest-chip-wrap input[type="checkbox"]:checked');
      const interests = Array.from(interestCheckboxes).map(cb => cb.nextElementSibling.textContent.trim());
      
      // Validate required fields
      if (!name || !email || !phone || !age || !occupation || !city) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Prepare payload
      const payload = {
        name,
        email,
        phone,
        age,
        occupation,
        city,
        organization: organization || null,
        availability: availability || null,
        interests
      };
      
      try {
        const submitBtn = volunteerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';
        
        const response = await fetch(`${API_BASE_URL}/api/volunteers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert(`✅ Registration successful! Your Volunteer ID is: ${data.id}`);
          volunteerForm.reset();
          // Clear checkboxes
          document.querySelectorAll('#volunteerForm .interest-chip-wrap input[type="checkbox"]').forEach(cb => cb.checked = false);
        } else {
          alert(`❌ Error: ${data.detail || 'Registration failed'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Network error. Please make sure the backend is running on http://localhost:8000');
      } finally {
        const submitBtn = volunteerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-hand-holding-heart"></i> Register as Volunteer';
      }
    });
  }
});

// ============================================================
// NGO REGISTRATION FORM
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const ngoForm = document.getElementById('ngoForm');
  
  if (ngoForm) {
    ngoForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form values
      const organization_name = document.getElementById('ngo_name').value.trim();
      const registration_number = document.getElementById('ngo_reg_number').value.trim();
      const organization_type = document.getElementById('ngo_type').value;
      const focus_area = document.getElementById('ngo_focus').value;
      const contact_person = document.getElementById('ngo_contact_person').value.trim();
      const city = document.getElementById('ngo_city').value.trim();
      const email = document.getElementById('ngo_email').value.trim();
      const phone = document.getElementById('ngo_phone').value.trim();
      const about = document.getElementById('ngo_about').value.trim();
      
      // Validate required fields
      if (!organization_name || !registration_number || !organization_type || !focus_area || !contact_person || !city || !email || !phone) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Prepare payload
      const payload = {
        organization_name,
        registration_number,
        organization_type,
        focus_area,
        contact_person,
        city,
        email,
        phone,
        about: about || null
      };
      
      try {
        const submitBtn = ngoForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';
        
        const response = await fetch(`${API_BASE_URL}/api/ngos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert(`✅ NGO Registration successful! Your NGO ID is: ${data.id}`);
          ngoForm.reset();
        } else {
          alert(`❌ Error: ${data.detail || 'Registration failed'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Network error. Please make sure the backend is running on http://localhost:8000');
      } finally {
        const submitBtn = ngoForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-building-ngo"></i> Register NGO';
      }
    });
  }
});

// ============================================================
// CONTACT FORM
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('contact_name').value.trim();
      const email = document.getElementById('contact_email').value.trim();
      const subject = document.getElementById('contact_subject').value;
      const message = document.getElementById('contact_message').value.trim();
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Prepare payload
      const payload = {
        name,
        email,
        subject,
        message
      };
      
      try {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert('✅ Message sent successfully! We\'ll get back to you soon.');
          contactForm.reset();
        } else {
          alert(`❌ Error: ${data.detail || 'Failed to send message'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Network error. Please make sure the backend is running on http://localhost:8000');
      } finally {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      }
    });
  }
});

// ============================================================
// LOAD DASHBOARD STATS
// ============================================================
document.addEventListener('DOMContentLoaded', async function() {
  const statsContainer = document.getElementById('dashboardStats');
  
  if (statsContainer) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
      const stats = await response.json();
      
      if (response.ok) {
        // Update stats in the dashboard
        const volunteersEl = document.getElementById('stat_volunteers');
        const ngosEl = document.getElementById('stat_ngos');
        const messagesEl = document.getElementById('stat_messages');
        
        if (volunteersEl) volunteersEl.textContent = stats.volunteers;
        if (ngosEl) ngosEl.textContent = stats.ngos;
        if (messagesEl) messagesEl.textContent = stats.messages;
      }
    } catch (error) {
      console.log('Could not load dashboard stats:', error);
    }
  }
});
