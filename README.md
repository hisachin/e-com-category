# Context

An application to manage categories in a tree structure

#### Data Sample:
##### 
    -Women
        - Clothing
            - Dresss
                - Causal Dresses
                - Party Dresses
        - T-Shirts
            - Printed T-shirts
            - Causal T-Shirts
            - Plain T-Shirts
    -Men
        - Footwear
            - Branded
            - Non Branded
        - T-Shirts
            - Printed T-shirts
            - Causal T-Shirts
            - Plain T-Shirts
        - Shirts
            - Party Shirts
            - Causal Shirts
            - Plain Shirts


## Setup Project

Follow these steps to start working on the project:

Clone the repo

```

```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```


## Commands to run the application

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# run all tests
npm test

```

### API Endpoints

**Category routes**:
`POST /v1/categories` - create a category
`GET /v1/categories` - get categories
`PATCH /v1/categories/:categoryId` - update category
`DELETE /v1/categories/:categoryId` - delete category