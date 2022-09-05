# book-record-management

This is a book record management server consisting of all the APIs in the Backend needed for management of records and books

## API Docuementation link:-

https://documenter.getpostman.com/view/23019698/VUr1FsRo

# Routes and Endpoints

## /users

GET: Get all list of users ✅ <br>
POST: Create a new user ✅

## /users/{id}

GET: Get a user by id ✅ <br>
PUT: Update a user by id ✅ <br>
DELETE: Delete a user by id ✅ <br>
<span>(check if he/she has an issued book) ( Is there any fine to be paid) </span>

## /users/subscription-details/{id}

GET: Get user subscription details ✅

<ul>
<li>Expiration of subscription</li>
<li>Days left for expiration</li>
<li> Fine if any</li>
</ul>

## /books

GET: Get all books ✅ <br>
POST: Create/Add a new book ✅

## /books/{id}

GET: Get a book by id ✅ <br>
PUT: Update a book by id ✅

## /books/getbook/name/{name}

GET: Get a book by name ✅

## /books/issued/by-user

GET: Get all issued books ✅ <br>

## /books/issued/withFine

GET: Get all issued books with a fine on them ✅ <br>

## Subscription Types

Basic (3 months)
Standard (6 months)
Premium (12 months)

NOTE: dates will be in format mm/dd/yyyy

If the suscription date is 01/08/22
and Subscription type is Standard
the valid till date will be 01/02/23

If the person has an issued book and it is to be returned at 01/02/2023
and they have missed the date of return, then they will get a fine of Rs 100./

If the person has an issued book and it is to be returned at 01/02/2023
and they have missed the date of return and the subscription has also expired,
then they will get a fine of Rs 200./
