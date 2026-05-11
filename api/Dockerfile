FROM python:3.12.13-alpine3.23

WORKDIR /app

# Mise à jour explicite des paquets pour corriger les vulnérabilités
RUN apk update && apk upgrade --no-cache && apk add --no-cache --upgrade curl
RUN pip install --upgrade pip && pip install --upgrade mysql-connector-python fastapi uvicorn pymongo

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
