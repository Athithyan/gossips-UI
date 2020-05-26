
console.log('hello world');

const form= document.querySelector('.form');
const loadingElement = document.querySelector('.loading');
const gossipsElement = document.querySelector('.gossips');
const API_URL = 'https://nodejs-five.now.sh/gossips';
loadingElement.style.display='';




form.addEventListener('submit', (event)=>{
loadingElement.style.display='';
    event.preventDefault();
    const formData= new FormData(form);
    const title = formData.get('title');
    const content = formData.get('gossip');

    const gossip = {
title,
content
    };


    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(gossip),
        headers:{
            'content-type':'application/json'
        }
    }).then(response=>response.json())
      .then(createdGossip=>{
          location.reload();
          form.reset();
          listAllGossips();
      });

});

listAllGossips();

function listAllGossips() {
    gossipsElement.innerHTML='';
    fetch(API_URL)
       .then(response => response.json())
       .then (gossips=>{
           gossips.reverse();
         gossips.forEach(gossip => {

             const div = document.createElement('div');
             div.setAttribute('class', 'note');

             const header=document.createElement('h1');
             header.textContent=gossip.name;

             const contents=document.createElement('p');
             contents.textContent=gossip.content;
             
             const date= document.createElement('small');
             date.textContent=new Date(gossip.created).toLocaleString();

             div.appendChild(header);
             div.appendChild(contents);
             div.appendChild(date);

             gossipsElement.appendChild(div);
         });
         loadingElement.style.display='none'
       });
}

$(document).ready(function() {

  /*show postform popup */
 $('#in').click(function() {
   $('#popup').css('display', 'flex');
                    
   $('#popup').addClass('zoomIn');
   $('.left').addClass('zoomIn');
   $("body").css("overflow", "hidden");
  
   setTimeout(function() {
     $('#popup').removeClass('zoomIn');
     $('.left').removeClass('zoomIn');
    }, 1000);
  })

   /*hide postform popup */
 $('#out').click(function() {
   $('#popup').addClass('zoomOut');
   $('.left').addClass('zoomOut');
    
   $('#popup').delay(500).hide(0);
   $("body").css("overflow", "auto");
    
   setTimeout(function() {
     $('#popup').removeClass('zoomOut');
     $('.left').removeClass('zoomOut');
    }, 500);
  })
});
