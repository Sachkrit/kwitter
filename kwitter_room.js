


var firebaseConfig = {
  apiKey: "AIzaSyAlPv57tBGDaUT83tGNHwvnWHoHZRmOvoQ",
  authDomain: "kwittr-96cf0.firebaseapp.com",
  databaseURL: "https://kwittr-96cf0-default-rtdb.firebaseio.com",
  projectId: "kwittr-96cf0",
  storageBucket: "kwittr-96cf0.appspot.com",
  messagingSenderId: "803233990103",
  appId: "1:803233990103:web:0993dc9836f5d2b8953792"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML = "Welcome" + user_name + "!";
    function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
        purpose: "adding roomname"
      });

      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";

      

    }
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("room name-" + Room_names);
      row = "<div class='room_name' id="+ Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";

      document.getElementById("output").innerHTML += row;

      //End code
      });});}

getData();
function redirectToRoomName(name){
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout(){
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location = "index.html";
}

