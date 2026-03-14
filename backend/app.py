from dotenv import load_dotenv
load_dotenv() # Load environment variables before the app starts

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)