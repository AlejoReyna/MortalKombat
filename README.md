
<img width="1133" alt="mk-banner" src="https://github.com/user-attachments/assets/6c44f56b-acc8-4997-91a5-d2594db3084a">

# Presale website of the videogame "Mortal Kombat 1"


This website simulates the funcionality of a preorders system, where you inpit your e-mail and in consecuence you get a mail, confirming your preorder. 

## Table of Contents
- [Front-End](#front-end)
- [Back-End](#back-end)

## Front-End - Homepage component



### Dependencies
- `react`: Core library for building the user interface and managing component state
- `next/link`: For client-side navigation between pages
- `axios`: HTTP client for making API requests to the backend
- `react-dom`: Implied dependency for rendering React components in the browser
- `@types/react`: TypeScript type definitions for React (implied by TypeScript usage)

The Homepage component is a React-based user interface for a Mortal Kombat 1 preorder landing page. It features multiple sections showcasing game content and a preorder functionality.

### handlePreorderClick
This function is triggered when the user clicks the "Preorder now!" button. Its sole purpose is to display the pre-order popup by changing the showPopup state to true.
```typescript
const handlePreorderClick = () => {
    setShowPopup(true);
};
```
<hr>

### handleClosePopup
This function is called when the user closes the pre-order popup. It performs two actions:

Hides the popup by setting showPopup to false.
Clears any existing message by setting message to an empty string.

```typescript
const handleClosePopup = () => {
    setShowPopup(false);
    setMessage('');
}; 
```
<hr>

### handleEmailChange 
This function serves as the onChange event handler for the email input. It updates the email state with the current value of the input each time the user modifies the field.
```typescript
const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
};
```
<hr>

### handleFormSubmit
This function is the core of the pre-order functionality:

It prevents the default form submission behavior.
Makes a POST request to '/api/send-email' with the email and action (if it exists).
Handles different server responses:

If the email already exists, it displays a message in the popup.
If the operation is successful or cancelled, it shows an alert and closes the popup.

In case of an error, it displays a generic alert.
```typescript
const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, action?: string) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/send-email',
            { email, action },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.status === 'EXISTING_EMAIL') {
            setMessage(response.data.message);
        } else if (response.data.status === 'SUCCESS') {
            alert(response.data.message);
            setShowPopup(false);
            setMessage('');
        } else if (response.data.status === 'CANCELLED') {
            alert(response.data.message);
            setShowPopup(false);
            setMessage('');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your request');
    }
};
```
<hr> 

### handleUserAction
This function is used to handle user actions when an existing email is detected:

It calls handleFormSubmit with a simulated submit event and the specified action.
Captures and handles any errors that may occur during this process.

```typescript
const handleUserAction = async (action: string) => {
    try {
        await handleFormSubmit(new Event('submit') as any, action);
    } catch (error) {
        console.error('Error processing user action:', error);
        alert('There was an error processing your request');
    }
};
```
<hr> 

### Back-End 

This backend system is designed to handle preorders for Mortal Kombat 1. It provides an API endpoint that processes incoming preorder requests, stores customer information in a database, and sends confirmation emails.

## Key Components

1. API Endpoint
   - Handles POST requests containing customer email addresses
   - Implemented using Next.js serverless functions

2. Database Integration
   - Uses PostgreSQL for data storage
   - Stores preorder email addresses

3. Email Service
   - Utilizes Nodemailer to send confirmation emails
   - Configurable SMTP settings for email dispatch
  
## Dependencies

- `next/server`: For handling server-side responses
- `nodemailer`: For sending emails
- `pg`: PostgreSQL client for Node.js

## Function: POST

### POST Handler for Preorder Processing

This module exports an asynchronous function that handles POST requests for processing preorders. It connects to a database, saves the preorder email, and sends a confirmation email.

### Parameters

- `request`: The incoming HTTP request object

### Returns

- A `NextResponse` object with a JSON body and appropriate status code

### Process Flow

1. **Database Connection**
   - Creates a new connection pool using environment variables
   - Tests the connection with a simple query

2. **Request Parsing**
   - Parses the JSON body from the request
   - Extracts the email address

3. **Email Validation**
   - Checks if an email is provided in the request
   - Returns a 400 error if email is missing

4. **Email Transporter Setup**
   - Creates a nodemailer transporter using SMTP settings from environment variables
   - Verifies the transporter configuration

5. **Database Operation**
   - Connects to the database
   - Inserts the email into the 'preorders' table
   - Releases the database client

6. **Email Sending**
   - Prepares mail options including sender, recipient, subject, and content
   - Sends the email using the configured transporter

7. **Response**
   - Returns a success message if everything completes without errors

### Error Handling

- Catches any errors that occur during the process
- Logs detailed error information to the console
- Returns a 500 error response with error details

### Environment Variables

- `DB_USER`: Database username
- `DB_HOST`: Database host
- `DB_NAME`: Database name
- `DB_PASSWORD`: Database password
- `DB_PORT`: Database port
- `EMAIL_HOST`: SMTP server host
- `EMAIL_PORT`: SMTP server port
- `EMAIL_USER`: SMTP username
- `EMAIL_PASS`: SMTP password
- `EMAIL_FROM`: Sender email address

### Notes

- Uses SSL/TLS with SSLv3 ciphers for email transport
- Closes the database pool connection after completing operations
- Extensive logging is implemented for debugging purposes
