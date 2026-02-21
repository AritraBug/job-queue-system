# 🚀 Job Service – Production-Ready Microservices Job Management System

A production-ready Spring Boot microservice for managing job listings, built using modern backend architecture and deployed on cloud infrastructure.

This project demonstrates real-world backend development practices including:
- Environment-based configuration (dev & prod)
- Cloud PostgreSQL integration
- RabbitMQ message queue integration
- CORS-secured frontend integration
- Dockerized build process
- Deployment on Render Cloud

---

## 🏗 Architecture Overview

Frontend (Render Static Site)
        ↓
Spring Boot Job Service (Render Web Service)
        ↓
PostgreSQL (Render Managed Database)
        ↓
RabbitMQ (CloudAMQP)

This system follows a microservices-ready design and production deployment workflow.

---

# 📌 Features

- Create Job
- Update Job
- Delete Job
- Get All Jobs
- Get Job by ID
- Persistent storage using PostgreSQL
- Asynchronous messaging using RabbitMQ
- Production profile configuration
- Environment-variable based secrets management
- CORS-secured frontend integration
- Containerized build via Docker

---

# 🛠 Tech Stack

Backend:
- Java 17+
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- RabbitMQ
- Maven

Infrastructure:
- Render (Web Service Deployment)
- Render Managed PostgreSQL
- CloudAMQP (RabbitMQ Hosting)
- Docker
- GitHub

Frontend:
- React (Vite)
- Axios
- Render Static Site Hosting

---

# 📁 Project Structure

job-service/
│
├── src/main/java/com/aritra/job_service/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── config/
│   │    └── CorsConfig.java
│   └── JobServiceApplication.java
│
├── src/main/resources/
│   ├── application.properties
│   └── application-prod.properties
│
├── pom.xml
└── Dockerfile

---

# ⚙️ Environment Configuration

The application uses environment variables for production deployment.

Render Environment Variables:

DATABASE_URL=jdbc:postgresql://<host>:5432/job_service  
SPRING_DATASOURCE_USERNAME=job_service_user  
SPRING_DATASOURCE_PASSWORD=********  
SPRING_PROFILES_ACTIVE=prod  

RABBIT_HOST=chameleon-01.lmq.cloudamqp.com  
RABBIT_PORT=5672  
RABBIT_USERNAME=********  
RABBIT_PASSWORD=********  

---

# 📄 application-prod.properties

spring.datasource.url=${DATABASE_URL}  
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}  
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}  
spring.datasource.driver-class-name=org.postgresql.Driver  

spring.jpa.hibernate.ddl-auto=update  
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect  

logging.level.root=INFO  

---

# 🔐 CORS Configuration

Location: src/main/java/com/aritra/job_service/config/CorsConfig.java

@Configuration  
public class CorsConfig {  

    @Bean  
    public CorsFilter corsFilter() {  
        CorsConfiguration config = new CorsConfiguration();  
        config.addAllowedOrigin("https://your-frontend.onrender.com");  
        config.addAllowedHeader("*");  
        config.addAllowedMethod("*");  

        UrlBasedCorsConfigurationSource source =  
                new UrlBasedCorsConfigurationSource();  

        source.registerCorsConfiguration("/**", config);  
        return new CorsFilter(source);  
    }  
}  

---

# 🐳 Docker Build

The backend uses a Dockerized build via Spring Boot Maven plugin.

Build process:
- Maven builds jar
- Docker image generated
- Render deploys container automatically

---

# 🚀 Deployment Steps

Backend Deployment (Render Web Service):

1. Push project to GitHub  
2. Create new Web Service on Render  
3. Connect GitHub repository  
4. Add environment variables  
5. Deploy  

Backend URL example:
https://your-backend-name.onrender.com  

---

Frontend Configuration:

Create `.env` file inside frontend root:

VITE_API_BASE_URL=https://your-backend-name.onrender.com  

Create src/config.js:

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  

Update API calls:

axios.get(`${API_BASE_URL}/jobs`)  

---

Frontend Deployment (Render Static Site):

1. Push frontend to GitHub  
2. Create Static Site on Render  
3. Build Command:
   npm install && npm run build  
4. Publish Directory:
   dist  

Frontend URL example:
https://your-frontend-name.onrender.com  

---

# 🧪 API Endpoints

GET     /jobs          → Get all jobs  
GET     /jobs/{id}     → Get job by ID  
POST    /jobs          → Create new job  
PUT     /jobs/{id}     → Update job  
DELETE  /jobs/{id}     → Delete job  

---

# 📈 Production Improvements

- Profile-based configuration
- Secure environment variables
- Controlled CORS
- Structured logging
- Microservice-ready design
- Message queue integration

---

# 🎯 Resume Highlights

This project demonstrates:
- Cloud deployment experience
- Backend microservice architecture
- PostgreSQL production configuration
- RabbitMQ integration
- Environment variable management
- Dockerized build process
- Full-stack integration
- Production debugging and configuration handling

---

# 👨‍💻 Author

Developed by Aritra Sarkhel  
B.Tech CSE – Full Stack & Backend Development Enthusiast  