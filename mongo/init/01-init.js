if (!process.env.MONGO_DB || !process.env.MONGO_APP_USER || !process.env.MONGO_APP_PASSWORD) {
  throw new Error("Mongo init requires MONGO_DB, MONGO_APP_USER and MONGO_APP_PASSWORD");
}

db = db.getSiblingDB(process.env.MONGO_DB);

db.createUser({
  user: process.env.MONGO_APP_USER,
  pwd: process.env.MONGO_APP_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_DB }]
});

db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "title", "author", "content", "tags", "published"],
      properties: {
        id: {
          bsonType: "int",
          minimum: 1
        },
        title: {
          bsonType: "string",
          minLength: 5
        },
        author: {
          bsonType: "string",
          minLength: 3
        },
        content: {
          bsonType: "string",
          minLength: 10
        },
        tags: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "string"
          }
        },
        published: {
          bsonType: "bool"
        }
      }
    }
  }
});

db.posts.insertMany([
  {
    id: NumberInt(1),
    title: "Docker Compose et microservices",
    author: "Thibaud",
    content: "Introduction a l orchestration d une application multi services.",
    tags: ["docker", "compose", "devops"],
    published: true
  },
  {
    id: NumberInt(2),
    title: "FastAPI pour les APIs hybrides",
    author: "Mathieu",
    content: "Expose des donnees MySQL et MongoDB via une API Python moderne.",
    tags: ["fastapi", "python", "backend"],
    published: true
  },
  {
    id: NumberInt(3),
    title: "Modelisation NoSQL",
    author: "Gabin",
    content: "Stocker des articles de blog dans une collection Mongo schema validee.",
    tags: ["mongodb", "nosql", "schema"],
    published: true
  },
  {
    id: NumberInt(4),
    title: "Persistance des volumes Docker",
    author: "David",
    content: "Conserver les donnees entre les redemarrages de conteneurs est essentiel.",
    tags: ["docker", "volumes", "storage"],
    published: true
  },
  {
    id: NumberInt(5),
    title: "Healthchecks metier",
    author: "Emma",
    content: "Verifier la presence attendue des donnees renforce la fiabilite.",
    tags: ["healthcheck", "quality", "monitoring"],
    published: true
  }
]);
