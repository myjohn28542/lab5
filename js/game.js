let enter =document.querySelector('.enter');
let reset = document.querySelector('.reset');
let q = Math.floor(Math.random()*100+1);
let count , i=1;
let hint = [];
console.log(q);

let easy =document.querySelector('#ez');
let med =document.querySelector('#nor');
let hard =document.querySelector('#hard');

document.getElementById("num").disabled = true;
document.getElementById("enter").disabled = true;

function start(){
    document.getElementById("num").disabled = false;
    document.getElementById("enter").disabled = false;

}



easy.addEventListener('click',function(){
    document.querySelector('#mode').textContent ='';
    count = 10;
    document.querySelector('#hp').textContent = ""+count+"";
    console.log(count);
    start();
});

med.addEventListener('click',function(){
    document.querySelector('#mode').textContent ='';
    count = 8;
    document.querySelector('#hp').textContent = ""+count+"";
    console.log(count);
    start();
});

hard.addEventListener('click',function(){
    document.querySelector('#mode').textContent ='';
    count = 5;
    document.querySelector('#hp').textContent = ""+count+"";
    console.log(count);
    start();
});




enter.addEventListener('click',function(){

    if(i<count){
        let n = document.getElementById("num").value = document.getElementById("num").value;;
        console.log(n);
        document.querySelector('#hp').textContent = ""+count-i+"";
    
    if(n<101 && n>0){
        
        i++;
        document.getElementById("myForm").reset();
        document.getElementById("num").focus();
        console.log('ok');
        if(n == q){
            console.log('point');
            document.querySelector('#result').textContent = "You Win";
            document.getElementById("num").disabled = true;
            document.getElementById("enter").disabled = true;
        }else{
            hint.push(n);
            document.querySelector('#hint').textContent = hint;
            document.querySelector('#result').textContent = "Wrong";

            if(n > q){
                document.querySelector('#hint2').textContent = "too high";
            }
            if(n < q){
                document.querySelector('#hint2').textContent = "too low";
            }


        }
    }else{
        console.log('fail');
        document.querySelector('#result').textContent = "Please Enter Number 1-100!!!";

    }

    
    

    }else{
        document.querySelector('#result').textContent = "Game Over!!!";

        document.getElementById("num").disabled = true;
        document.getElementById("enter").disabled = true;
        

    }
    
    console.log(i);
    

});

reset.addEventListener('click',function(){

    location.reload(true)
    start();
});