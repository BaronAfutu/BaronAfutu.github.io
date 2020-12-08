window.onload = initAll;

function initAll(){
    if(cookieVal('set0')!=0 && cookieVal('set0')!=''){
        readItems();
    }//LOADING ITEMS
    
    fillGallery();//fill block choice will be dependent on cookie
   //pageNumbers();
}

var fillGallery = ()=>{
    let views =  document.getElementsByName('view');
    views[0].style.display='block';
    views[0].innerHTML='';
    //All items will be displayed at once
    let start = 0;
    let end = ITEMS.length // (ITEMS.length<ITEMS_PER_PAGE)?ITEMS.length:ITEMS_PER_PAGE;
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
                    '<a href="options.html?price='+itemID+'" onclick="changePrice('+itemID+')"><button>Change Price</button></a>&nbsp;'+
                    '&nbsp;<a href="options.html?add='+itemID+'" onclick="addItem('+itemID+')"><button>Add Item</button></a>'+
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

var showPrice2 = (index)=>{
    item = ITEMS[index];
    let container = document.getElementById('priceListing');
    let display = container.getElementsByTagName('div');
    var prices = '',options = '';
    for(x in item.subItem){
        prices+= x+': GHc '+ parseFloat(item.subItem[x]).toFixed(2) +'<br>';
    }
    options = '<a href="javascript:void(0)" onclick="addItem('+index+')"><button>Change Price</button></a>&nbsp;'+
    '&nbsp;<a href="javascript:void(0)" onclick="addItem('+index+')"><button>Add Item</button></a>'
    
    display[0].innerHTML = item.name;
    display[1].innerHTML = prices;
    display[2].innerHTML = options;
    
    container.parentNode.style.display = 'block';
}

var closeTheForm = (caller)=>{
    caller.parentNode.parentNode.style.display = "none";
}

var listItems = (search)=>{
    // Declare variables
    var list = document.getElementById('list');
    list.innerHTML = '';
    
    var input = search.value.toUpperCase();
    if(input=='')return;

    ITEMS.forEach((item,index/*,theArray*/)=>{
    //print(value.name) //THE PRINT FUNCTION LITERALLY PRINTS THE PAGE //CAN BE USED FOR RECEIPT PRINTING
        if(item.name.toUpperCase().indexOf(input)>-1){
            list.innerHTML+='<span onclick = showPrice2('+index+')>'+item.name+'</span><br>'
        }
    })
}