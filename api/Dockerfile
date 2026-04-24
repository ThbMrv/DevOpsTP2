FROM python:3.12-alpine

WORKDIR /app

RUN apk add --no-cache curl
RUN pip install mysql-connector-python fastapi uvicorn pymongo

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
