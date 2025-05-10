package redis

import (
    "context"
    "fmt"
    "os"

    "github.com/go-redis/redis/v8"
)

func Connect() *redis.Client {
    rdb := redis.NewClient(&redis.Options{
        Addr:     os.Getenv("REDIS_ADDR"),
        Password: "",
        DB:       0,
    })

    ctx := context.Background()
    _, err := rdb.Ping(ctx).Result()
    if err != nil {
        fmt.Println("Error connecting to Redis:", err)
        panic(err)
    }

    return rdb
}