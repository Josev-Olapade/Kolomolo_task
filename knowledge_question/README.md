# Knowledge questions


## - Explain what are prototypes and how does class inheritance make use of them?

Imagine you have a blueprint for a house. Instead of building every house from scratch, you use the blueprint to create many houses that share the same design.

In JavaScript and TypeScript, **prototypes** are like these blueprints for objects. Every object has a hidden link to another object called its **prototype**. This prototype holds properties and methods that the object can use.

So, if you ask an object for something it doesn’t have, JavaScript will look “up” this prototype chain to find it. This makes sharing behaviors efficient — you don’t need to duplicate the same methods in every object.

---

#### How Does Class Inheritance Use Prototypes?

When you create a **class** in TypeScript and then extend it (inherit), what happens behind the scenes is that the subclass’s prototype links to the superclass’s prototype.

This means:

* The child class (subclass) inherits all the properties and methods of the parent class (superclass).
* When you call a method on an instance of the child class, if it doesn’t find the method on the instance itself, it checks the child class prototype, and if still not found, it looks up to the parent class prototype.
* This chain of prototypes is how inheritance actually works in JavaScript and TypeScript.

---

### Example

```typescript
class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

const myDog = new Dog();
myDog.speak(); // Outputs: Dog barks
```

* `Dog` inherits from `Animal`.
* The `Dog` class’s prototype is linked to `Animal`’s prototype.
* When `myDog.speak()` is called, JavaScript first looks for `speak` on `myDog`, then on `Dog`’s prototype, finds it there, and runs it.
* If `Dog` didn’t have `speak()`, it would look up to `Animal`’s prototype and run that method instead.


---

## - When starting a new project how would you choose between OOP and Functional Programming?

When starting a new project, deciding between **OOP** and **Functional Programming (FP)** depends on the kind of problem you’re solving and the project’s needs.

---

### **Object-Oriented Programming (OOP)**

  OOP organizes code around *objects* — think of objects as things with *data* (properties) and *actions* (methods).
* **When to use it:**

  * When your project models real-world things with clear identities and behaviors, like users, orders, or cars.
  * When you want to group related data and logic together in one place (like a class).
  * When you expect to use inheritance or want to reuse and extend code easily.
  * When the project involves lots of state changes (objects that change over time).
* **Example:** Building a game with characters, inventory, and actions.

---

### **Functional Programming (FP)**

  FP organizes code around *functions* and *data transformations*. It avoids changing data directly (immutability) and favors pure functions (no side effects).
* **When to use it:**

  * When you want your code to be predictable, easier to test, and debug (because functions don’t change state).
  * When your project is about transforming data, pipelines, or calculations.
  * When concurrency or parallel processing is important because immutable data is safer to use across threads.
  * When you want to avoid bugs related to shared state and side effects.
* **Example:** Data processing pipelines, serverless functions, or mathematical computations.

---


I’d start by looking at the problem domain. If the project involves managing entities with behaviors and changing state, OOP fits well because it groups data and methods together. If the project focuses on transforming data through pure functions and needs predictable, side-effect-free code, then Functional Programming might be better. In practice, I’d combine both styles, using OOP to model the system and FP principles inside the logic to keep the code clean and testable.


---


##  - How does `Proxy` work in Typescript and when is it useful?

A `Proxy` takes **two things**:

1. **The target** – the original object
2. **The handler** – an object with “trap” functions that intercept operations

```ts
const user = {
  name: "Alice",
  age: 25
};

const proxy = new Proxy(user, {
  get(target, property) {
    console.log(`Getting ${String(property)}`);
    return target[property as keyof typeof target];
  },
  set(target, property, value) {
    console.log(`Setting ${String(property)} to ${value}`);
    target[property as keyof typeof target] = value;
    return true;
  }
});

proxy.name;         // Logs: Getting name
proxy.age = 30;     // Logs: Setting age to 30
```

---


A `Proxy` in TypeScript lets you wrap an object and intercept how it's used — for example, you can control what happens when properties are read or written. This is useful for things like validation, logging, access control, or building reactive systems. It's like putting a custom behavior layer between your code and the actual object. In real-world apps, I’d use it when I want more control over data access or need to add logic dynamically without changing the original object.


---

## - What patterns/practices/tools would you use to implement simple cache for NoSQL database?

To implement a simple cache for a NoSQL database, I’d use a read-through caching pattern. I’d check the cache first, using Redis or an in-memory store and only hit the database if the data isn’t found. I’d set a TTL to prevent stale data, use consistent key naming, and make sure to invalidate or update the cache when writes happen. For small projects, an in-memory Map or lru-cache could work; for production, I’d go with Redis because it’s fast and scalable.

---

In AWS, I’d implement a simple read-through cache using DynamoDB as the NoSQL database and ElastiCache with Redis as the caching layer. When a request comes in, I’d first check Redis for the data. If it’s not found, I’d fetch it from DynamoDB, cache it in Redis with a TTL, and return it. This setup improves performance and reduces database read costs. I’d also make sure to invalidate the cache on updates to keep the data fresh. Since both services are managed, it's easy to scale and secure with IAM roles.


---


### What libraries do you consider necessary for any application? Which ones do you use most commonly?:

The libraries I consider necessary for any application depend on the type of project, but there are some that I find myself using in projects and some i beleive are necessary because they help with productivity, maintainability, and performance.
For almost any TypeScript app, I find libraries like `axios` for API calls, `zod` or `joi` for schema validation, and `jest` for testing to be essential. Also `dotenv` for environment configs, and `lodash` for utility functions. When dealing with databases, `prisma` for SQL and `mongoose` or `dynamoose` for NoSQL. Tools like `eslint`, `prettier`, and `ts-node-dev` help with maintainability and productivity. These choices helps write clean, testable, and reliable code across different types of projects.

---

## -How would you choose a backend? When would you use HTTP server, serverless functions or Websockets?

When choosing a backend architecture, I think about three key things: the nature of the app, the traffic pattern, and how real-time it needs to be. Based on that, picking between an HTTP server, serverless functions, or WebSockets.

---

### 1. **HTTP Server (e.g., Express, Fastify, NestJS)**

**When to use:**

* Traditional web or API apps
* You control your infrastructure (EC2, containers, etc.)
* Long-running or complex logic
* Stateful logic (e.g. in-memory caching, sessions)

**Why?**

It gives you full control over routes, middleware, state, background tasks, and error handling. You can also bundle logging, auth, and databases more tightly.

---

### 2. **Serverless Functions (e.g., AWS Lambda, Vercel, Netlify Functions)**

**When to use:**

* Apps with unpredictable traffic (auto-scales easily)
* Short, stateless tasks (like sending an email, handling form submission)
* You want to avoid managing servers

**Why?**

They’re cost-effective and scale instantly. Great for microservices, low-latency APIs, or background jobs triggered by events. I just write a function and AWS handles the rest.

---

### 3. **WebSockets (e.g., `ws`, Socket.IO, AWS API Gateway WebSocket)**

**When to use:**

* Real-time apps: chat, gaming, live notifications, collaborative tools
* You need 2-way, persistent communication
* Polling is inefficient or slow

**Why?**

HTTP is one-way: client sends → server responds. But WebSockets allow ongoing communication — the server can push data to the client at any time, which is essential for real-time use cases.

---


If I need full control and the app is stateful or complex, I’d use an HTTP server like Express or NestJS. For event-driven or microservice-style apps that are stateless and need to scale fast, I’d go serverless using AWS Lambda. And if the app is real-time — like a chat app or multiplayer game — I’d go with WebSockets so the client and server can keep a live connection. I choose based on the app’s performance needs, scalability, and whether the connection needs to be short or persistent.

---

## -Code below is supposed to print `[{name: "Tom", id: 0}, {name: "Kate", id: 1}]`. Explain why it doesn't and explain how would you fix it.

```ts
interface Person {
  name: string;
  id: number;
}

class IdGenerator {
  lastId: number = 0;

  getId(): number {
    return this.lastId++;
  }
}

const { getId }: { getId: () => number } = new IdGenerator();

const people: Person[] = ["Tom", "Kate"].map((name: string) => ({
  name,
  id: getId(),
}));
console.log(people);
```

The code doesn’t work as expected because when you pull out the getId method using destructuring, it loses its connection to the class. That means when it tries to use this.lastId, it no longer knows what this is — so it doesn’t count properly.

To fix it, I’d just call the method directly from the class instance, like idGenerator.getId(), so it keeps the right context.

```ts
const idGenerator = new IdGenerator();

const people: Person[] = ["Tom", "Kate"].map((name) => ({
  name,
  id: idGenerator.getId(),
}));
