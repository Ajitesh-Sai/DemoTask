const email = document.getElementById('email');
const password = document.getElementById('password');
const btnSignin = document.getElementById('btnSignin');
const btnSignup = document.getElementById('btnSignup');
const loginDiv = document.getElementById('loginDiv');
const ordersDiv = document.getElementById('ordersDiv');
const btnSignout = document.getElementById('btnSignout');
const orders = document.getElementById("orders");

// const database = firebase.database();
// const rootRef = database.ref('orders');


btnSignin.addEventListener('click', e => {
    const emailValue = email.value;
    const passwordValue = email.value;
    const auth = firebase.auth();

    const promise = new Promise(auth.signInWithEmailAndPassword(emailValue, passwordValue))
   
    
    promise.catch(e => console.log(e.message));
});

btnSignup.addEventListener('click', e => {
    const emailValue = email.value;
    const passwordValue = email.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(emailValue, passwordValue);
    promise.catch(e => console.log(e.message));
});


btnSignout.addEventListener('click', e => {
    e.preventDefault();
    console.log("about to sign out");    
    firebase.auth().signOut().then(() => {console.log("signed out")}).catch(e => console.log(e));
    console.log("logged out");
    loginDiv.style.display='block';
    ordersDiv.style.display='none';
});

firebase.auth().onAuthStateChanged (firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        loginDiv.style.display='none';
        ordersDiv.style.display='block';
        axios.get('https://orders-2f321.firebaseio.com/orders.json')
        .then(res => {
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            
            for(i=0; i<fetchedOrders.length; i++){
                var orderEach = document.createElement("div");
                var tagh2 = document.createElement("h2");
                var field = document.createTextNode(fetchedOrders[i]["name"] + ":");
                tagh2.appendChild(field);
                tagh2.style.fontWeight="bold";
                orderEach.appendChild(tagh2);


                var tag = document.createElement("p");
                field = document.createTextNode("Order ID- "+fetchedOrders[i]["orderId"]);
                tag.appendChild(field);
                orderEach.appendChild(tag);

                tag = document.createElement("p");
                field = document.createTextNode("User- "+fetchedOrders[i]["user"]);
                tag.appendChild(field);
                orderEach.appendChild(tag); 

                tag = document.createElement("select");

                let option1 = document.createElement("option");
                option1.value="Placed";
                option1.text="Placed";
                let option2 = document.createElement("option");
                option2.value="Shipped";
                option2.text="Shipped";
                let option4 = document.createElement("option");
                option4.value="Return";
                option4.text="Return";
                let option3 = document.createElement("option");
                option3.value="Delivered";
                option3.text="Delivered";
                
                tag.add(option1);
                tag.add(option2);
                tag.add(option3);
                tag.add(option4);
                tag.style.paddingLeft="10px";
                
                orderEach.appendChild(tag);

                let btn = document.createElement("button");
                btn.name = i;
                btn.innerHTML = "Publish Changes";
                btn.className="btn btn-primary";
                btn.style.width="170px";
                btn.style.margin="5px";

                btn.addEventListener('click', e=> {
                    let updatedOrder = {
                        orderId: fetchedOrders[0]["orderId"],
                        name: fetchedOrders[0]["name"],
                        tracking: tag.options[e.selectedIndex].value,
                        user: fetchedOrders[0]["user"]
                        }
                    console.log("sadas", tag.options[e.selectedIndex].value);
                })

                orderEach.appendChild(btn);
                orderEach.style.boxSizing = "border-box";
                orderEach.style.border = "0.1px solid lightgray";
                
                orderEach.style.boxShadow="2px 2px 2px darkgray";
                orderEach.style.margin = "10px";
                orderEach.style.padding = "5px";

                orders.appendChild(orderEach)             
                
            }
                  
        })


    }else {
        console.log('not logged in');
    }
});
