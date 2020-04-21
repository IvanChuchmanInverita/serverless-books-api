# Serverless Books API with DynamoDB 

This example demonstrates how to manage books in the library using Serverless, NestJS and DynamoDB

## Setup

```bash
npm install
serverless dynamodb install
```

## Run service offline
To run DynamoDB locally it requires Java Runtime Engine (JRE) version 6.x or newer. After that can be run by command:
```bash
npm run start:offline
```

## Deploy to AWS

```bash
npm run deploy
```

## Usage

You can create, retrieve, update, or delete books using the REST endpoints as described by hosted Swagger documentation