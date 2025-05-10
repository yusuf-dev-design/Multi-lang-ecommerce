package main

import (
    "github.com/gin-gonic/gin"
    "log"
    "net/http"
    "inventory-service/handlers"
    "inventory-service/postgres"
    "inventory-service/redis"
)

func main() {
    r := gin.Default()

    // Initialize Redis and PostgreSQL
    redisClient := redis.Connect()
    db := postgres.Connect()

    // Setup routes
    r.GET("/stock/:product", func(c *gin.Context) {
        handlers.GetStock(c, db, redisClient)
    })

    r.POST("/update", func(c *gin.Context) {
        handlers.UpdateStock(c, db, redisClient)
    })

    log.Println("Starting Inventory Service on port 8081...")
    if err := http.ListenAndServe(":8081", r); err != nil {
        log.Fatalf("Could not start service: %v\n", err)
    }
}