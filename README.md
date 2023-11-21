# Edge Platform Technical Assignment

Repository directory structure:

- rng:
  A random number generator that generates numbers between 10.000.000.000 and
  999.999.999.999
- metadata:
  Meta data application that adds country of origin from the “phone number” given. So if a
  phone number starts with 31, it’s dutch. If it is dutch, check if it’s a mobile phone number.
- store:
  Database client that saves the generated data to a database.
- types:
  Types that are shared between services.

## General microservice directory structure

Each service directory looks roughly like this:

```sh
service-name
|-- routes
|   |-- domain-x
|   |   |-- route.ts
|   |   |-- route.test.ts
|   |   |-- controller.ts
|   |   |-- controller.test.ts
|   |   |-- validator.ts
|   |-- validators
|   |   |-- validator-x.ts
|   |-- middlewares
|   |   |-- middleware-x.ts
|   |-- routes.ts
|-- core
|   |-- business-logic-x.ts
|   |-- business-logic-x.test.ts
|-- database
|   |-- handlers
|   |   |-- domain-x.ts
|   |   |-- domain-x.test.ts
|   |-- models
|   |   |-- domain-x.ts
|-- events
|   |-- publishers
|   |   |-- domain-x.ts
|   |-- subscribers
|   |   |-- domain-x.ts
|-- types
|   |-- type-x.ts
|-- constants.ts
|-- main.ts
```

- **routes**: includes all the routes exposed by the particular service as well as the controllers and the middlewares organized by domain

- **core**: includes all the core functions and the business logic of the service

- **database**: includes the database models and handlers

- **events**: includes the publishers and subscribers of this service, that are being used for integration events for communicating with the rest of the services

- **types**: includes all the types and interfaces being used by the specific service

## List of potential improvements

More tests should be added to ensure correctness and cover edge cases.

For the message bus functionality, the initialisation and publish/subscribe functions should be abstracted and packaged to make it easier to test and reuse.

Likewise I would rather package the database connection so it is easier to mock for database handler tests in addition to being able to further abstract mongodb to allow for easier migration away from MongoDB if ever necessary.

A logger (and metrics) package should be implemented to better control output formatting and redirect metrics and logs to an observability platform.
