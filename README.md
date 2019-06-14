# Restaurant App Front End
Front end application using ReactJS and Redux

## Main Features
* Authentication and account creation
* Browse and filter list of restaurants by name, day and time
* Create and remove collection, edit collection name
* Add and remove restaurants in a collection
* send email invitation and add collaborator to a collection

## How to Run
1. Clone the repository
2. Install packages: `npm install`
3. Modify the backend services url in `src/environment/dev.environment.js`
4. Run the app `npm start`
5. Open the url in Google Chrome to minimize any unexpected error (I used Google Chrome in development)

## In the case any unexpected bug occurs
* Please uncomment the following code in `src/app/redux/store` and re-run the app
```javascript
    persistor.purge();
    removeToken();
```

## Used Libraries

### Layout and Components
* reacstrap

### Redux 
* redux-saga : Redux middleware
* reselect : Redux selectors
* redux-persist : Persist redux state in local storage
* redux-logger : Logging redux state

### HTTP Request
* axios

