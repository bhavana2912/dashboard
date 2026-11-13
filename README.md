# Satya School Dashboard

Recreation of the Satya School "Enabling Inclusion" web app (React + Flask + PostgreSQL).

## Run the frontend
    cd frontend && npm install && npm run dev        # http://localhost:5173

## Run the backend
    cd backend && python3 -m venv venv && source venv/bin/activate
    pip install -r requirements.txt
    cp .env.example .env        # then edit .env with your own DB details
    python seed.py              # roles + first admin user (asks password)
    python app.py               # http://127.0.0.1:5000/api/db-check

Never commit `.env`, `venv`, `node_modules`, passwords or real school data.
