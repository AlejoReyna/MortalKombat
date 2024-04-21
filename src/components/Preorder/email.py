from flask import Flask, request
import smtplib
import getpass 

app = Flask(__name__)

@app.route('/send-email', methods=['POST'])
def send_email():
    email = request.json.get('email')
    if email:
        # Código para enviar el correo electrónico
        HOST = "smtp-mail.outlook.com"
        PORT = 587
        FROM_EMAIL = "sender_email@email.me"
        TO_EMAIL = email
        PASSWORD = getpass.getpass("Enter password: ")
        MESSAGE = f"Here goes the message to {email}"

        smtp = smtplib.SMTP(HOST, PORT)
        status_code, response = smtp.ehlo()
        print(f"[*] Echoing the server: {status_code} {response}")
        status_code, response = smtp.starttls()
        print(f"[*] Starting TLS connection: {status_code} {response}")
        status_code, response = smtp.login(FROM_EMAIL, PASSWORD)
        print(f"[*] Logging in: {status_code} {response}")
        smtp.sendmail(FROM_EMAIL, TO_EMAIL, MESSAGE)
        smtp.quit()
        return 'Correo electrónico enviado correctamente'
    else:
        return 'No se proporcionó un correo electrónico válido', 400

if __name__ == '__main__':
    app.run(debug=True)