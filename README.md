 # FoodWasteManager

FoodWasteManager is a social platform that connects food donors with nearby individuals in need. By enabling donors to post available food resources with an integrated Google Maps feature, we help reduce food waste and build stronger communities.

## Motivation & Goals

- **Motivation:**  
  Reduce food waste and make it easier for communities to share surplus food.
- **Goals:**  
  - Decrease food wastage by connecting donors and recipients.
  - Provide a user-friendly interface for posting and claiming food.
  - Utilize geolocation services for efficient, real-time food sharing.

## Features

- **User Registration & Authentication:**  
  Secure sign-up and login for both donors and recipients.
- **Post Creation:**  
  Donors can create posts that include descriptions, images, and geolocation data.
- **Google Maps Integration(WIP):** 
  Enables users to pinpoint the exact location of food donations.
- **Claim Management:**  
  Recipients can claim available posts, and the system tracks the status of each post.
- **Real-Time Notifications:**  
  Alerts users when new posts are available or when their claims are updated.

## Technology Stack

- **Frontend:**  Next.js, next-auth, tailwind
- **Backend:**  Node.js, Express, fastApi
- **Database:**  PostgreSQL, MongoDb
- **Other Tools:**  Sequel.js, motor, tortoise


### ER Diagram

```mermaid
erDiagram
    USERS {
      int user_id PK "Primary Key"
      varchar name
      varchar email "Unique Email"
      varchar phone
      varchar password_hash
      timestamp created_at
      timestamp updated_at
    }
    
    POSTS {
      int post_id PK "Primary Key"
      int user_id FK "References USERS"
      varchar title
      text description
      double lat "Latitude"
      double lng "Longitude"
      varchar status "Post status (e.g., available, claimed)"
      timestamp created_at
      timestamp updated_at
    }
    
    CLAIMS {
      int claim_id PK "Primary Key"
      int post_id FK "References POSTS"
      int claimer_id FK "References USERS"
      timestamp claimed_at
      varchar status "Claim status (e.g., pending)"
    }
    
    COMMENTS {
      int comment_id PK "Primary Key"
      int post_id FK "References POSTS"
      int user_id FK "References USERS"
      text comment
      timestamp created_at
    }

    LIKES {
      int like_id PK "Primary Key"
      int post_id FK "References POSTS"
      int user_id FK "References USERS"
      timestamp liked_at
    }

    NOTIFICATIONS {
      int notification_id PK "Primary Key"
      int recipient_id FK "References USERS"
      int sender_id FK "References USERS"
      varchar type "e.g., comment, like, claim"
      int reference_id "Can be post_id, comment_id, etc."
      text message
      boolean is_read
      timestamp created_at
    }

    USERS ||--o{ POSTS : "creates"
    POSTS ||--o{ CLAIMS : "has"
    USERS ||--o{ CLAIMS : "claims"
    POSTS ||--o{ COMMENTS : "receives"
    USERS ||--o{ COMMENTS : "writes"
    POSTS ||--o{ LIKES : "liked by"
    USERS ||--o{ LIKES : "likes"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ NOTIFICATIONS : "sends"
``` 
C
### System Design (low level)

```mermaid
    graph LR
    %% Define Components
    A[User Interface]:::ui
    subgraph Express.js Server
        B((Express.js)):::server
        subgraph Express Services
            C[userService]:::service
            D[postService]:::service
            E[likeService]:::service
            F[commentService]:::service
            G[claimService]:::service
        end
    end
    subgraph FastAPI Server
        H((FastAPI)):::server
        I[notificationService]:::service
        CH[chatService]:::service
        WS[websocket]:::service
    end
    J[(PostgreSQL)]:::db
    K[(MongoDB)]:::db

    %% Connections
    A -->|HTTP Requests| B
    A -->|Fetch Notifications| H
    A -->|post/retrieve chat| H
    B -->|HTTP Requests| C
    B -->|HTTP Requests| D
    B -->|HTTP Requests| E
    B -->|HTTP Requests| F
    B -->|HTTP Requests| G
    C -->|Store Data| J
    D -->|Store Data| J
    E -->|Store Data| J
    F -->|Store Data| J
    G -->|Store Data| J
    B -->|Send Notification Event| H
    H -->|HTTP Requests| I
    H -->|HTTP Requests| CH
    H -->|udp| WS
    I -->|Store Notifications| K
    H -->|Return Notifications| A
    I <-->|check if user exists| J  

    %% Styling
    classDef ui fill:#e0f7fa,stroke:#00796b,stroke-width:2px,color:#333333
    classDef server fill:#bbdefb,stroke:#1976d2,stroke-width:2px,color:#333333
    classDef service fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#333333
    classDef db fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#333333
    linkStyle 0 stroke:#00796b,stroke-width:2px
    linkStyle 1,2,13 stroke:#1976d2,stroke-width:2px
    linkStyle 3,4,5,6 stroke:#f57c00,stroke-width:2px
    linkStyle 7,8,9,10,11,14,15,16,12 stroke:#c2185b,stroke-width:2px


```

### System Design (High Level)

```mermaid
 graph LR
    %% Define Components
    A[End Users<br>Web/Mobile]:::client
    subgraph AWS Cloud
        subgraph networking
            B[CloudFront<br>CDN]:::cdn
            D[API Gateway]:::gateway
            E[ALB]:::lb
        end
        subgraph blob storage
            C[S3<br>Static Assets]:::storage
        end
        subgraph backend
            F((Express.js)):::compute
            G((FastAPI)):::compute
        end
        subgraph messaging queues
            H[SQS<br>Events]:::queue
        end
        subgraph db
            I[RDS<br>PostgreSQL]:::db
            J[DocumentDB<br>MongoDB]:::db
        end
        subgraph logging
            K[CloudWatch<br>Monitoring]:::monitor
        end
        subgraph security
            L[IAM<br>Security]:::security
        end
    end

    %% Connections
    A -->|HTTPS| B
    B -->|Static Content| C
    B -->|Dynamic Requests| D
    D -->|Route| E
    E -->|Distribute| F
    E -->|Distribute| G
    F -->|Read/Write| I
    F -->|Read/Write| C
    G -->|Read/Write| J
    G -->|Check User| I
    F -->|Send Events| H
    G -->|Poll Events| H
    G -->|Notifications| D
    F -->|Logs| K
    G -->|Logs| K
    I -->|Logs| K
    J -->|Logs| K
    L -->|Secure| F
    L -->|Secure| G
    L -->|Secure| I
    L -->|Secure| J
    L -->|Secure| C

    %% Styling
    classDef client fill:#e3f2fd,stroke:#0d47a1,stroke-width:2px,stroke-dasharray:5,5,rx:15,ry:15,color:#333333
    classDef cdn fill:#bbdefb,stroke:#1976d2,stroke-width:2px,rx:15,ry:15,color:#333333
    classDef storage fill:#c8e6c9,stroke:#388e3c,stroke-width:2px,rx:15,ry:15,color:#333333
    classDef gateway fill:#90caf9,stroke:#1565c0,stroke-width:2px,rx:15,ry:15,color:#333333
    classDef lb fill:#64b5f6,stroke:#0d47a1,stroke-width:2px,rx:15,ry:15,color:#333333
    classDef compute fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,rx:25,ry:25,color:#333333
    classDef queue fill:#fce4ec,stroke:#d81b60,stroke-width:2px,rx:15,ry:15,color:#333333
    classDef db fill:#ffcdd2,stroke:#c62828,stroke-width:2px,rx:15,ry:15,color:#333333
    classDef monitor fill:#e1bee7,stroke:#7b1fa2,stroke-width:2px,rx:15,ry:15,color:#333333
    classDef security fill:#b2dfdb,stroke:#00695c,stroke-width:2px,rx:15,ry:15,color:#333333

    %% Link Styling
    linkStyle 0 stroke:#0d47a1,stroke-width:2px
    linkStyle 1 stroke:#388e3c,stroke-width:2px
    linkStyle 2 stroke:#1976d2,stroke-width:2px
    linkStyle 3 stroke:#1565c0,stroke-width:2px
    linkStyle 4,5 stroke:#0d47a1,stroke-width:2px
    linkStyle 6,9 stroke:#c62828,stroke-width:2px
    linkStyle 7 stroke:#388e3c,stroke-width:2px
    linkStyle 8 stroke:#d81b60,stroke-width:2px
    linkStyle 10,11 stroke:#ef6c00,stroke-width:2px
    linkStyle 12 stroke:#1565c0,stroke-width:2px
    linkStyle 13,14,15,16 stroke:#7b1fa2,stroke-width:2px
    linkStyle 17,18,19,20,21 stroke:#00695c,stroke-width:2px

```

