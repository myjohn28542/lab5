// index.js

let e = false;

let M=0;
let F=0;
let O=0;

let firebaseConfig = {
    apiKey: "AIzaSyAvJLxLGqdCrobg9XY5X-i6sNOUe2MYL6s",
    authDomain: "localhost",
    projectId: "john-23152",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

console.log('Hi');

$('#save').click(()=> {
    e = false
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;
    let sex = $('input[name=gender]:checked', '#contact').val();
    let email = document.getElementById("email").value;
    let detail = document.getElementById("detail").value;

    //checked validation


    if(!(first.match('^[a-zA-Z]{3,16}$')) || first == "") {
        console.log('F');
        e = true;
        document.querySelector('#fe').textContent = "Please enter a valid First name."
    }else{
        document.querySelector('#fe').textContent = ""

    }

    if(!(last.match('^[a-zA-Z]{3,16}$')) || last == "") {
        console.log('L');
        e = true;
        document.querySelector('#le').textContent = "Please enter a valid Last name."
    }else{
        document.querySelector('#le').textContent = ""

    }

    function validateEmail($email) {
        let emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        return emailReg.test( $email );
      }

    if( !validateEmail(email) || email == "") {
         console.log('email'); 
         document.querySelector('#ee').textContent = "Please enter a valid Email Address."

         e = true;
    }else{
        document.querySelector('#ee').textContent = ""

    }



    if(e){
        console.log('error');
        document.querySelector('#se').textContent = "Please enter a valid Info."

    }else{
        document.querySelector('#se').textContent = ""


    db.collection("users")
    .add({

        Name: first + " " + last,
        // LName: last,
        Gender: sex,
        Email: email,
        Detail: detail,
        
        // Name: $('#name').val(),
        // Gender: $( "input:checked" ).val(),
        // Email: $('#email').val(),
        // Detail: $('#detail').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        
        console.log(first);
        console.log(last);
        console.log(sex);
        console.log(email);
        console.log(detail);
        
        $('#first').val('')
        $('#last').val('')
        $('input[id="male"]').prop('checked', true);
        $('#email').val('')
        $('#detail').val('')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    }
    
    

})

db.collection('users').orderBy("Name").onSnapshot(doc =>{
    let table = $('tbody')[0]
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    $("tbody tr").remove()
    // gpa = 0
    // credit = 0
    doc.forEach(item => { 
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secoundCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        let str = String(item.data().Email)
        let mail = ""
        
        for (let i = 0; i < str.length; i++) {
            if (i==0||str[i]=='@'||str[i]=='.') {
                mail += str[i]
            } else {
                mail +='x'
            }
            
        }
        firstCell.textContent = item.data().Name
        if(item.data().Gender == 1){
            secoundCell.textContent = "Male";
            M++;
        }else if(item.data().Gender == 2){
            secoundCell.textContent = "Female";
            F++;
        }else if(item.data().Gender == 3){
            secoundCell.textContent = "Other";
            O++;
        }
        thirdCell.textContent = mail
        // gpa += (item.data().grade * item.data().credit)
        // credit += item.data().credit

        console.log(M)

        //chart

        let MP = (M/(M+F+O))*100;
        let FP = (F/(M+F+O))*100;
        let OP = (O/(M+F+O))*100;

        let options = {
            title: {
                text: "User Gender Ratio in Website"
            },
            subtitles: [{
                text: "As of February, 2020"
            }],
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label}  - {y}%",
                dataPoints: [
                    { y: MP, label: "Male" },
                    { y: FP, label: "Female" },
                    // { y: 1.49, label: "Windows 8" },
                    // { y: 6.98, label: "Windows XP" },
                    // { y: 6.53, label: "Windows 8.1" },
                    // { y: 2.45, label: "Linux" },
                    // { y: 3.32, label: "Mac OS X 10.12" },
                    { y: OP, label: "Others" }
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options);
        

  
    })
    // console.log(gpa/credit)
    M = 0;
    F = 0;
    O = 0;

    // $('h4').text(gpa/credit)
})



  
//     })
//     console.log(gpa/credit)
//     $('h4').text(gpa/credit)
// })

// db.collection('users').where('grade', '>', 3).get().then(res =>{
//     res.forEach(item => console.log(item.data()))
// })