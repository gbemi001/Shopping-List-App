import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-list-28bb1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputField()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
      let savedItems = Object.entries(snapshot.val())
      clearShoppingListEl()
    
      for (let i = 0; i < savedItems.length; i++) {
        let currentItem = savedItems[i]
        // let currentItemID = currentItem[0]
        // let currentItemValue = currentItem[1]
        addItems(currentItem)
    }  
    } else {
        shoppingListEl.textContent = "No items here...yet."
    }
    
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ''
}

function clearInputField() {
    inputFieldEl.value = ""
}

function addItems(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEL = document.createElement('li')
    newEL.textContent = itemValue
    
    newEL.addEventListener(
        'click', function() {
            let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
            remove(exactLocationOfItemInDB)
        }
    )
    
    shoppingListEl.append(newEL)
}