document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('waitlistForm');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = form.querySelector('input[name="email"]').value;
    const phoneNumber = form.querySelector('input[name="phone"]').value;
    const type = form.querySelector('input[name="businessType"]:checked').value;
    
    const data = {
      email: email,
      phoneNumber: phoneNumber,
      type: type === 'reseller' ? 'RESELLER' : 'RETAILER'
    };
    
    try {
      const response = await fetch('https://api.myspotlight.me/api/v1/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      showToast(responseData.message, 'success');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      showToast('An error occurred. Please try again.', 'error');
    }
  });
  
 
  function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white flex items-center ${type === 'success' ? 'bg-blue-500' : 'bg-red-500'}`;
    
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'w-5 h-5 mr-2');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.innerHTML = type === 'success' 
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(messageSpan);
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
});