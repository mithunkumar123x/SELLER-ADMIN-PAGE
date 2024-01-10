const URL = "https://crudcrud.com/api/a65e8e133fdc4355a6c4eb36370c5426/ItemsInfo";

// To display existing items
window.addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await axios.get(URL);
    console.log(res.data);

    for (let i = 0; i < res.data.length; i++) {
      showOnScreen(res.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});

// Show data on the browser page
function showOnScreen(obj) {
  let list;
  if (obj.DailyUse === "food") {
    list = document.getElementById("foodList");
  } else if (obj.DailyUse === "Electric items") {
    list = document.getElementById("electronicList");
  } else if (obj.DailyUse === "care") {
    list = document.getElementById("careList");
  } else if (obj.DailyUse === "other") {
    list = document.getElementById("orderList");
  }

  list.innerHTML += `<li id=${obj._id}>Name: ${obj.items} - Price: ${obj.sellingPrice} Rs - <button onclick="deleteFun('${obj._id}')">Delete</button></li>`;
}

// After submit button
async function onsubmit1(event) {
  event.preventDefault();

  try {
    let myObj = {
      sellingPrice: event.target.nprice.value,
      items: event.target.nitems.value,
      DailyUse: event.target.nuse.value,
    };

    let op = await axios.post(URL, myObj);
    showOnScreen(op.data);

    event.target.nprice.value = "";
    event.target.nitems.value = "";
    event.target.nuse.selectedIndex = 0;
  } catch (err) {
    console.log(err);
  }
}

// Delete Function
async function deleteFun(objId) {
  try {
    console.log("You Deleted a Item ");

    let del = await axios.delete(`${URL}/${objId}`);
    let todel = document.getElementById(objId);
    todel.remove();
  } catch (err) {
    console.log(err);
  }
}
