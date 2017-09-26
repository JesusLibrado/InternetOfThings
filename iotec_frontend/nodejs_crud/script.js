$(document).ready(function(){
  function BearObject(myNombre) {
      
      this.name = myNombre;
      this.toJsonString = function () { return JSON.stringify(this); };

  };


  function addBearDemo()
  {
    try
    {


      var myBear = new BearObject(
       $("#nombre").val() 
        
       );
    
      alert(myBear.toJsonString());

       jQuery.ajax({
             type: "POST",
             url: "http://localhost:8126/api/devices",
             headers: {
             'Content-Type':'application/x-www-form-urlencoded'
             
             },
             data: { "name" : $("#nombre").val()
                 
                 },
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (response) {
                  // do something
                  alert (response + " " + response.message);
                  getBearList();
             },
         
             error: function (error) {            
                  // error handler
                  alert("error :" + error.message)
             }

         });

     }
     catch(error)
     {
      alert(error);
     }

  }


  function updateBearDemo()
  {
    try
    {

      var bearId = sessionStorage.bearId;
     
      var myBear = new BearObject(
       $("#nombre").val() 
        
       );
    
      alert(bearId);

       jQuery.ajax({
             type: "PUT",
             url: "http://localhost:8126/api/devices/" + bearId,
             headers: {
             'Content-Type':'application/x-www-form-urlencoded'
             
             },
             data: { "name" : $("#nombre").val()
                 
                 },
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (response) {
                  // do something
                  alert ("Updated : " + " " + response.message);
                  getBearList();
             },
         
             error: function (error) {            
                  // error handler
                  alert("error :" + error.message)
             }

         });

     }
     catch(error)
     {
      alert(error);
     }

  }


  function deleteBearDemo(bearId)
  {
    try
    {


      alert(bearId);

       jQuery.ajax({
             type: "DELETE",
             url: "http://localhost:8126/api/devices/" + bearId,
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (response) {
                  // do something
                  alert (response + " " + response.message);
                  getBearList();
             },
         
             error: function (error) {            
                  // error handler
                  alert("error :" + error.message);

             }

         });

     }
     catch(error)
     {
      alert(error);
     }

  }


  function getOneBearDemo(bearId)
  {
    try
    {

      sessionStorage.bearId = bearId;
    
      alert(bearId);

       jQuery.ajax({
             type: "GET",
             url: "http://localhost:8126/api/devices/" + bearId,
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (response) {
                  // do something
                  $("#nombre").val(response.name);
                  alert (response.name);
                   
             },
         
             error: function (error) {            
                  // error handler
                  alert("error :" + error.message)
             }

         });

     }
     catch(error)
     {
      alert(error);
     }

  }

  function getBearList()
  {
    try
    {


      

       jQuery.ajax({
             type: "GET",
             url: "http://localhost:8126/api/devices",
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (response) {
                 
              $("#divBears").empty()
                 response.forEach(function (tweet) 
                 {
               
                  var nombre = "<div>" +
                   "<button onclick=\"getOneBearDemo('" + tweet._id + "')\"> GET (one) </button> " +
                    " | " + 
                    "" + tweet._id + "" +
                    " | " +  
                    "" + tweet.name + "" +
                    " | " +  
                   
                    "<button onclick=\"deleteBearDemo('" + tweet._id + "')\"> DELETE </button> " +
                         "</div>" 
                     $("#divBears").append(nombre);
                 
                 });
                
                 
             },
         
             error: function (error) {            
                  // error handler
                  alert("error :" + error.message)
             }

         });

     }
     catch(error)
     {
      alert(error);
     }

  }
});

  