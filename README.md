# TP Docker Compose MongoDB + MySQL + FastAPI

## Lancer le projet

```bash
cp .env.example .env
docker compose up -d --build
```

Voir l'état des services :

```bash
docker compose ps
```

## Tester les routes

Route MySQL :

```bash
curl http://localhost:8000/users
```

Route MongoDB :

```bash
curl http://localhost:8000/posts
```

## Vérifier les services healthy

```bash
docker compose ps
```

## Vérifier MySQL

Entrer dans MySQL :

```bash
docker exec -it db_mysql mysql -uroot -prootpass
```

```sql
SHOW DATABASES;
USE ynov_ci;
SHOW TABLES;
SELECT * FROM utilisateurs;
```

## Vérifier MongoDB

Entrer dans Mongo :

```bash
docker exec -it db_mongo mongosh -u admin -p adminpass --authenticationDatabase admin
```

```javascript
show dbs
use blog_db
show collections
db.posts.find().pretty()
```

## Recréer complètement le projet

Supprimer conteneurs + volumes :

```bash
docker compose down -v
```

Relancer :

```bash
docker compose up -d --build
```
