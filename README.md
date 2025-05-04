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
- **Google Maps Integration:**  
  Enables users to pinpoint the exact location of food donations.
- **Claim Management:**  
  Recipients can claim available posts, and the system tracks the status of each post.
- **Real-Time Notifications:**  
  Alerts users when new posts are available or when their claims are updated.

## Technology Stack

- **Frontend:**  Next.js
- **Backend:**  Node.js
- **Database:**  PostgreSQL
- **Other Tools:** Google Maps API, clear authentication

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


### System Design 

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
    end
    J[(PostgreSQL)]:::db
    K[(MongoDB)]:::db

    %% Connections
    A -->|HTTP Requests| B
    A -->|Fetch Notifications| H
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
    I -->|Store Notifications| K
    H -->|Return Notifications| A
    H -->|check if user exists| J

    %% Styling
    classDef ui fill:#e0f7fa,stroke:#00796b,stroke-width:2px
    classDef server fill:#bbdefb,stroke:#1976d2,stroke-width:2px
    classDef service fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef db fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    linkStyle 0,12 stroke:#00796b,stroke-width:2px
    linkStyle 1,13 stroke:#1976d2,stroke-width:2px
    linkStyle 2,3,4,5,6 stroke:#f57c00,stroke-width:2px
    linkStyle 7,8,9,10,11 stroke:#c2185b,stroke-width:2px


```
