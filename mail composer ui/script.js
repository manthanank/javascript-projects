document.getElementById('mailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
  
    // Here you can perform actions like sending the email or handling the data
    
    // For example, log the data to the console
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Message:', message);
  
    // You can add your logic to send the email or process the form data here
    // This is a basic example, actual sending of emails would require a backend implementation
  
    // Reset the form after submission
    document.getElementById('mailForm').reset();
  });
  