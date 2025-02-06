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

## Database Structure

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
    
    USERS ||--o{ POSTS : "creates"
    POSTS ||--o{ CLAIMS : "has"
    USERS ||--o{ CLAIMS : "claims"
    POSTS ||--o{ COMMENTS : "receives"
    USERS ||--o{ COMMENTS : "writes"
