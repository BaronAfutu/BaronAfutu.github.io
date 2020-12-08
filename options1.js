window.onload = initAll
const N_OF_ITEMS = 100;

function initAll(){
    setupPage();
}

var setupPage = ()=>{
    var options = '';
    options = window.location.search.replace('?','');
    var sub = options.split('=');

    if(sub[0]=='add'){
        if(sub[1]==''){
            var view = document.getElementById('addNew');
            view.style.display = 'block';
        }
        else{
            var itemN = parseInt(sub[1])
            if(itemN>N_OF_ITEMS){
                console('Report ptoperly');
                return
            }
            var view = document.getElementById('addSub');
            view.style.display = 'block';
            view.innerHTML = '<h1>'+itemN+'</h1>'
        }
    }
    else if(sub[0] == 'price'){
        var itemN = parseInt(sub[1])
        if(itemN>N_OF_ITEMS){
            console('Report ptoperly');
            return
        }
        var view = document.getElementById('changePrice');
        view.style.display = 'block';
        view.innerHTML = '<h1>'+itemN+'</h1>'
    }
}

var addItem = (inForm)=>{
    /**
     * DON'T SAVE THE SAME ITEM TWICE
     * VIEW SUMMARY OF ADDED ITEM DETAILS BEFORE COMMITING TO COOKIES
     * 
     */
    console.log('submitted');
    var itemName = inForm['itemName'].value;
    if(itemName == ''){
        alert('Fields cannot be empty');
        return;
    }
    var end = inForm['subItem'].length;
    var newItem = {
        name: itemName,
        subItem:{}
    }

    for(var i=1;i<end;i++){
        if(inForm['price'][i].value == '' || inForm['subItem'][i].value==''){
            alert('Fields cannot be empty');
            return;
        }
        newItem['subItem'][inForm['subItem'][i].value] = parseFloat(inForm['price'][i].value);
    }

    ITEMS.push(newItem)
    console.log(ITEMS[ITEMS.length-1])
    store();

    return false;
}

var addField = (caller)=>{
    var container = caller.parentNode;
    var c = document.getElementById('fd');
    var inputFields = container.getElementsByTagName('input');
    var inputs = [];
    var end=inputFields.length

    for(var i=0;i<end;i++){
        inputs.push(inputFields[i].value);
    }
    //console.log(inputs)
    container.innerHTML+= '\n<p><input type="text" name="subItem" placeholder="Kind" required>'+
                        '&nbsp;:&nbsp;'+
                        '<input type="number" name="price" placeholder="Price" required></p>';
    
    for(var i=0;i<end;i++){
        inputFields[i].value = inputs[i];
    }
    return false;
}