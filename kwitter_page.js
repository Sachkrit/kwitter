// Your web app's Firebase configuration
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
    room_name = localStorage.getItem("room_name");

    function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0   
      });
      document.getElementById("msg").value = "";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(message_data);
         console.log(firebase_message_id);

         name = message_data ['name'];
         message = message_data ['message'];
         like = message_data ['like'];

         name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";


      row = name_with_tag + message_with_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML += row;

      } });  }); }
getData();

function updateLike(message_id){
      console.log("clicked on like button- " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
