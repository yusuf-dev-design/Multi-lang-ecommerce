package models

type Inventory struct {
    ProductID string `json:"product_id"`
    Stock     int    `json:"stock"`
}