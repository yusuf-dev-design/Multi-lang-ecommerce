package handlers

import (
    "context"
    "fmt"
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "github.com/go-redis/redis/v8"
    "github.com/jackc/pgx/v5/pgxpool"
    "inventory-service/models"
)

func GetStock(c *gin.Context, db *pgxpool.Pool, rdb *redis.Client) {
    productID := c.Param("product")

    // Check cache first
    cachedStock := rdb.Get(context.Background(), productID).Val()
    if cachedStock != "" {
        c.JSON(http.StatusOK, gin.H{"product": productID, "stock": cachedStock, "source": "cache"})
        return
    }

    // Fallback to DB
    var inv models.Inventory
    err := db.QueryRow(context.Background(), "SELECT product_id, stock FROM inventory WHERE product_id = $1", productID).Scan(&inv.ProductID, &inv.Stock)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        return
    }

    // Cache result
    rdb.Set(context.Background(), productID, strconv.Itoa(inv.Stock), 0)

    c.JSON(http.StatusOK, gin.H{"product": inv.ProductID, "stock": inv.Stock, "source": "database"})
}

func UpdateStock(c *gin.Context, db *pgxpool.Pool, rdb *redis.Client) {
    var input struct {
        ProductID string `json:"product_id"`
        Change    int    `json:"change"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Update DB
    _, err := db.Exec(context.Background(),
        "UPDATE inventory SET stock = stock + $1 WHERE product_id = $2",
        input.Change, input.ProductID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update inventory"})
        return
    }

    // Invalidate cache
    rdb.Del(context.Background(), input.ProductID)

    c.JSON(http.StatusOK, gin.H{"message": "Inventory updated", "product": input.ProductID})
}