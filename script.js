// Charts Initialization
function initCharts() {
  // Backend Chart
  new Chart(
    document.getElementById('backendChart'),
    {
      type: 'bar',
      data: {
        labels: ['PHP/Laravel', 'CodeIgniter', 'Python', 'MySQL', 'REST APIs'],
        datasets: [{
          label: 'Proficiency',
          data: [95, 90, 75, 85, 80],
          backgroundColor: [
            'rgba(25, 118, 210, 0.8)',
            'rgba(25, 118, 210, 0.8)',
            'rgba(25, 118, 210, 0.8)',
            'rgba(25, 118, 210, 0.8)',
            'rgba(25, 118, 210, 0.8)'
          ],
          borderColor: [
            'rgba(25, 118, 210, 1)',
            'rgba(25, 118, 210, 1)',
            'rgba(25, 118, 210, 1)',
            'rgba(25, 118, 210, 1)',
            'rgba(25, 118, 210, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  );

  // Frontend Chart
  new Chart(
    document.getElementById('frontendChart'),
    {
      type: 'radar',
      data: {
        labels: ['React', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'TypeScript'],
        datasets: [{
          label: 'Frontend Skills',
          data: [80, 85, 90, 85, 70],
          backgroundColor: 'rgba(25, 118, 210, 0.2)',
          borderColor: 'rgba(25, 118, 210, 1)',
          pointBackgroundColor: 'rgba(25, 118, 210, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(25, 118, 210, 1)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    }
  );

  // Tools Chart
  new Chart(
    document.getElementById('toolsChart'),
    {
      type: 'doughnut',
      data: {
        labels: ['Git', 'Docker', 'AWS', 'CI/CD', 'VS Code'],
        datasets: [{
          label: 'Tools',
          data: [90, 75, 65, 70, 95],
          backgroundColor: [
            'rgba(25, 118, 210, 0.8)',
            'rgba(66, 165, 245, 0.8)',
            'rgba(100, 181, 246, 0.8)',
            'rgba(144, 202, 249, 0.8)',
            'rgba(179, 229, 252, 0.8)'
          ],
          borderColor: [
            'rgba(25, 118, 210, 1)',
            'rgba(66, 165, 245, 1)',
            'rgba(100, 181, 246, 1)',
            'rgba(144, 202, 249, 1)',
            'rgba(179, 229, 252, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    }
  );
}

// Modal Functions
function openModal() {
  document.getElementById('resumeModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('resumeModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('resumeModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Download resume as PDF
function downloadResume() {
  const btn = document.querySelector('#resumeModal .btn');
  const originalHTML = btn.innerHTML;
  
  // Show loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
  btn.disabled = true;
  
  // Get the resume content
  const element = document.querySelector('.resume-content');
  
  // PDF options
  const opt = {
    margin: [10, 15],
    filename: 'Kunal_Jain_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      scrollY: 0,
      windowHeight: element.scrollHeight,
      useCORS: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      putOnlyUsedFonts: true,
      compress: true
    },
    pagebreak: { mode: 'avoid-all' }
  };
  
  // Generate PDF
  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      // Restore button state
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    })
    .catch((error) => {
      console.error('PDF generation failed:', error);
      btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
      btn.disabled = false;
    });
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const form = e.target;
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      const alertBox = document.getElementById('formAlert');
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec';
      
      fetch(scriptURL, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          alertBox.style.display = 'block';
          alertBox.className = 'alert alert-success';
          alertBox.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
          
          // Reset form
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-error';
        alertBox.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error! Message not sent. Please try again later.';
      })
      .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide alert after 5 seconds
        setTimeout(() => {
          alertBox.style.display = 'none';
        }, 5000);
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll to top button visibility
  window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.pageYOffset > 300) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }
  });

  // Initialize charts
  initCharts();
});