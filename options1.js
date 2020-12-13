window.onload = initAll
const N_OF_ITEMS = 100;

function initAll(){
    if(cookieVal('set0')!=0 && cookieVal('set0')!=''){
        readItems();
    }
    setupPage();
    //console.log(ITEMS)
}

var setupPage = ()=>{
    var options = '';
    options = window.location.search.replace('?','');//.search return qurey params
    var sub = options.split('=');

    if(sub[0]=='add'){
        if(sub[1]==''){//add new item
            var view = document.getElementById('addNew');
            view.style.display = 'block';
        }
        else{//add subItem
            //BLANK PAGE
        }
    }
    else if(sub[0] == 'price'){//change item price
        var itemN = parseInt(sub[1])
        var item = ITEMS[itemN];

        if(itemN>N_OF_ITEMS){
            console('Report properly');//PAY ATTENTION HERE
            return;
        }
        inForm = document.forms['changePrice'];
        inForm['itemName'].value = item['name'];
        inForm['itemN'].value = itemN;

        subFields = inForm.getElementsByTagName('div')['subFields'];
        
        for(subItem in item['subItem']){
            subFields.innerHTML+='\n<p><input type="text" name="subItem" value="'+subItem+'" required>'+
                                '&nbsp;:&nbsp;'+
                                '<input type="number" name="price" value="'+item['subItem'][subItem]+'" step="0.1" required></p>';

        }

        
        var view = document.getElementById('changePrice');
        view.style.display = 'block';
    }
}

var addItem = (inForm)=>{
    /**
     * DON'T SAVE THE SAME ITEM TWICE
     * VIEW SUMMARY OF ADDED ITEM DETAILS BEFORE COMMITING TO COOKIES
     * 
     */
    //console.log('submitted');
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
    //console.log(ITEMS[ITEMS.length-1])
    store();

    //Clearing fields
    inForm['itemName'].value = '';
    for(var i=1;i<end;i++){
        inForm['subItem'][i].value = ''
        inForm['price'][i].value = '';
    }
    //sending message
    var mess = inForm.getElementsByTagName('div')['message'];
    mess.innerHTML = 'Item Added!!';
    mess.style.color = 'green';
    return false;
}

var changeDetails = (inForm)=>{
/**
     * DON'T SAVE THE SAME ITEM TWICE
     * VIEW SUMMARY OF ADDED ITEM DETAILS BEFORE COMMITING TO COOKIES
     * 
     */
    //console.log('submitted');
    var itemN = inForm['itemN'].value;
    var itemName = inForm['itemName'].value;
    if(itemName == ''){
        alert('Fields cannot be empty');
        return false;
    }
    var end = inForm['subItem'].length;
    var newItem = {
        name: itemName,
        subItem:{}
    }

    for(var i=1;i<end;i++){
        if(inForm['price'][i].value == '' || inForm['subItem'][i].value==''){
            alert('Fields cannot be empty');
            returnfalse ;
        }
        newItem['subItem'][inForm['subItem'][i].value] = parseFloat(inForm['price'][i].value);
    }

    ITEMS[itemN] = newItem;
    //console.log(ITEMS[itemN])
    store();

    //sending message
    var mess = inForm.getElementsByTagName('div')['message'];
    mess.innerHTML = 'Prices Updated!!';
    mess.style.color = 'green';
    console.debug()
    return false;
}

var addField = (caller)=>{
    var container = caller.parentNode;
    var inputFields = container.getElementsByTagName('input');
    var inputs = [];
    var end=inputFields.length

    for(var i=0;i<end;i++){
        inputs.push(inputFields[i].value);
    }
    //console.log(inputs)
    container.innerHTML+= '\n<p><input type="text" name="subItem" placeholder="Kind" required>'+
                        '&nbsp;:&nbsp;'+
                        '<input type="number" name="price" placeholder="Price" step="0.1" required></p>';
    
    for(var i=0;i<end;i++){
        inputFields[i].value = inputs[i];
    }
    return false;
}
