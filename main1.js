window.onload = initAll;

function initAll(){
    if(cookieVal('set0')!=0 && cookieVal('set0')!=''){
        readItems();
    }//LOADING ITEMS
    
    fillGallery();
   /*window.onbeforeunload = function(){
       return "";
   };*/  
}

var fillGallery = ()=>{
    let views =  document.getElementsByName('view');
    views[0].style.display='block';
    views[0].innerHTML='';
    //All items will be displayed at once
    let start = 0;
    let end = ITEMS.length;
    for(var i=start;i<end;i++){
        createCard(i,ITEMS[i],views[0]);
    }
};


var createCard = (itemID,item,htmlLocation)=>{
    prices = '';
    for(x in item.subItem){
        prices+= x+': GHc '+ parseFloat(item.subItem[x]).toFixed(2) +'<br>';
    }
    let cardString = '<div name="card" class="card" id="card-'+itemID+'" onclick="showPrice(this)">'+
                    '<div class="item">'+//Cards Will showcase image above name
                    item.name +
                    '</div>'+
                    '<div class="subItem hide">'+
                    prices+
                    '</div>'+
                    '<div class="options hide">'+//Thinking about replacing cardID below with card
                    '<a href="options.html?price='+itemID+'"><button>Change Details</button></a>&nbsp;'+
                    '</div>'+
                '</div>';
    htmlLocation.innerHTML+=cardString;
}

var showPrice = (card)=>{
    let container = document.getElementById('priceListing');
    let display = container.getElementsByTagName('div');
    let source = card.getElementsByTagName('div');
    
    for(var i=0,n=display.length;i<n;i++){
        display[i].innerHTML = source[i].innerHTML;
    }
    container.parentNode.style.display = 'block';
}

var closeTheForm = (caller)=>{
    caller.parentNode.parentNode.style.display = "none";
}

var listCards = (search)=>{
    // Declare variables
    var input = search.value.toUpperCase();
    cards = document.getElementsByName('card');
    
    var name = '';

    for(var i=0,end=cards.length;i<end;i++){
        name = cards[i].getElementsByTagName('div')[0].innerHTML;
        if(name.toUpperCase().indexOf(input)>-1){
            cards[i].style.display = 'block';
        }
        else{
            cards[i].style.display = 'none';
        }
    }
}

var showSearch = ()=>{
    var cont = document.getElementById('searchBar');
    cont.style.display = 'block';
    window.location.replace('#searchBar')
    cont.getElementsByTagName('input')[0].focus();
}