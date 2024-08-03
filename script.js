// const body = document.addEventListener('DOMContentLoaded', () => {
    
//     const registerForm = document.getElementById('registerForm');

//     registerForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const username = document.getElementById('registerUsername').value
//         const password = document.getElementById('registerPassword').value
//         const email = document.getElementById('registerEmail').value

//         if (!username || !password || !email) {
//             alert('All fields are required.');
//             return;
//         }

//         try {
//             const response = await fetch('/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password, email })
//             });

//             if (response.ok) {
//                 alert('Registration successful');
//                 registerForm.reset(); 
//             } else {
//                 const errorData = await response.json();
//                 alert('Registration failed: ' + (errorData.message || 'Unknown error'));
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             alert('An error occurred during registration. Please try again later.');
//         }
//     });
//   });




