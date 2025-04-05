module.exports = {
  ai_manager: {
    input: "./src/shared/api/schema.yaml", // Путь к спецификации
    output: {
      target: "./src/shared/api/orval/endpoints.ts", // Главный файл
      schemas: "./src/shared/api/orval/models", // Папка для моделей
      client: "axios", // Можно указать axios или fetch
      split: true, // Разделение по сущностям
      mode: "tags", // Использовать теги в OpenAPI как сущности
      prettier: true, // Форматирование с помощью Prettier
      operations: {
        exclude: {
          paths: [
            "/auth/google", // Эндпоинты, содержащие "/auth/google" в пути, не будут сгенерированы
            "/auth/google/redirect",
          ],
        },
      },
      override: {
        mutator: {
          path: "./src/shared/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
}
