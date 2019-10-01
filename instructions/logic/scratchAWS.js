'use strict';
     
// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
    console.log(message);
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}


function elicitSlot(sessionAttributes, current, intentName, slots, slotToElicit, message){
    console.log("Session attributes in elicitSlot"); console.log(sessionAttributes);
    console.log("Intent name in elicitSlot"); console.log(intentName);
    console.log("Slots in elicitSlot");console.log(slots);
    console.log("Slot to elicit in elicitSlot");console.log(slotToElicit);
    console.log("Message in elicitSlot");console.log(message);
    
    return {
        'sessionAttributes':{
            'currentStep': current,
            // 'msgEnd': false,
            'message': message
        },
        dialogAction: {
            'type': 'ElicitSlot',
            'intentName': intentName,
            'slots': slots,
            'slotToElicit': slotToElicit,
            'message': {'contentType': 'PlainText', 'content': message}
        }
    };
}

 
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    
    
    // Get values into variables
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const status = slots.status;
    const keys = Object.keys(slots);
    console.log(keys[0]);
    const myKey = keys[0];
    let currentStep = intentRequest.sessionAttributes.currentStep;
    const intentName = intentRequest.currentIntent.name;
    
    if(intentRequest.sessionAttributes.currentStep == null){
            intentRequest.sessionAttributes.currentStep = 0;
            currentStep = intentRequest.sessionAttributes.currentStep;
    }
    
    if(typeof intentRequest.sessionAttributes.currentStep == typeof "hey"){
        console.log("It is a fuckin string!!");
        var stepObj = JSON.parse(intentRequest.sessionAttributes.currentStep);
        intentRequest.sessionAttributes.currentStep = stepObj;
        currentStep = intentRequest.sessionAttributes.currentStep;
    }
    
    // Check attributes
    console.log("Dispatch session atters:"); console.log(sessionAttributes);
    
    // leave this here so it can be modified but isn't scoped in
    var message;
    
    // If the status is null or undefined
    if(status == undefined || status == null){
        message = "undefined response";
        // return callback(close(sessionAttributes, 'Fulfilled', {'contentType': 'PlainText', 'content': message_content}))
        return callback(elicitSlot(sessionAttributes, intentName, slots, myKey, message));

        
    }
    // If the status has value
    if(status !== undefined){
        
        // If the current step counter is over the side of instruction array then close function
        if(intentRequest.sessionAttributes.msgEnd ==="true"){
            message = "Thank you for all your hard work. Good job, give yourself a pat on the back.";
            return callback(close(sessionAttributes, "Fulfilled", {'contentType': 'PlainText', 'content': message}));
        }
        
        // Check basic values
        console.log("Input status is: " + status);
        console.log("Response message is:" + message);
        
        
        switch (status) {
            
            case "done":
            case "ready":
            case "next":
            case "complete":
                // code
                message = sessionAttributes.message;
            
                // Increase session step and change varible that refrences that step to change as well
                // intentRequest.sessionAttributes.currentStep += 1;
                intentRequest.sessionAttributes.currentStep = (intentRequest.sessionAttributes.currentStep + 1);
                currentStep = intentRequest.sessionAttributes.currentStep;
                console.log("Current step: "+ currentStep);console.log(typeof currentStep);
                console.log("Current message: " +message);
                callback(elicitSlot(sessionAttributes, currentStep, intentName, slots, myKey, message));
                
                break;
            
            case "repeat":
            case "again":
                // code
                callback(elicitSlot(sessionAttributes, currentStep, intentName, slots, myKey, message));
                break;
            
            case "back":
            case "previous":
                // code
                message = sessionAttributes.message;
                intentRequest.sessionAttributes.currentStep = (intentRequest.sessionAttributes.currentStep - 1);
                currentStep = intentRequest.sessionAttributes.currentStep;
                callback(elicitSlot(sessionAttributes, currentStep, intentName, slots, myKey, message));
                break;
            
            default:
                // code
                message = "Sorry I didnt understand. Could you repeat that?";
                callback(elicitSlot(sessionAttributes, currentStep, intentName, slots, myKey, message));
        }
        
    }
    ///////////////////////////////////////////////////////////
    // If a status does come back undefined or null
    else{
        message = "This came back undefined or null";
        return callback(close(sessionAttributes, "Fulfilled", {'contentType': 'PlainText', 'content': message}));
    }

}
 
// --------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                // console.log("Event");console.log(event);
                // console.log("Context"); console.log(context);
                // console.log("export to callback");console.log(response);
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};