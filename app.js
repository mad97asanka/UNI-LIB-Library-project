const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
let alert = require('alert'); 
const path = require('path');
const {ObjectId} = require('mongodb');

//const uri = "mongodb+srv://kavinduLakmal:21871@cluster0.pccgpzv.mongodb.net/?retryWrites=true&w=majority";
//const uri = "mongodb+srv://unilib:1111@cluster0.v71kt4e.mongodb.net/"; my kavindu lakmal acc

const uri = "mongodb+srv://masanka123:1111@cluster0.w7ckyg5.mongodb.net/";
const client = new MongoClient(uri);

var userid; 
var password;

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 8080;

app.set('view engine', 'ejs');



app.set('views', path.join(__dirname, '/views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});


app.listen(port, () => {
 console.log(`Server running on port${port}`);
});




// ==================================================================================== login =================================================
app.post("/ulogin", async (req, res) => {
    
    client.connect();
    
     password = req.body.pword;
     userid = req.body.uid;

     var getfirst = userid[0];

     const userdata = await client.db("unilib").collection("users").findOne({ User_ID: userid, Password: password});
     const staff = await client.db("unilib").collection("Staff_Members").findOne({ ID: userid, Password: password});
     const admin = await client.db("unilib").collection("Admin_Profile").findOne({ User_ID: userid, Password: password});
    if(getfirst == "3"){

    if(userdata){        
        console.log(`loging done as a student`);
        res.sendFile(__dirname + "/public/student_home.html");
       
    }
    else{
        console.log(`login faild! try again!`);
        alert("check details and try again! testing part");
        res.sendFile(__dirname + "/public/login.html");
    }  
}
else if(getfirst == "2"){
    if(staff){        
        console.log(`loging done as a staff`);
        res.sendFile(__dirname + "/public/staff_ht.html");
       
    }
    else{
        console.log(`login faild! try again!`);
        alert("check details and try again!");
        res.sendFile(__dirname + "/public/login.html");
    }  
}

else if (getfirst == "1"){
    if(admin){        
        console.log(`loging done as a admin`);
        res.sendFile(__dirname + "/public/admin_ht.html");
       
    }
    else{
        console.log(`login faild! try again!`);
        alert("check details and try again!");
        res.sendFile(__dirname + "/public/login.html");
    }  
}

else{
    console.log(`login faild! try again!`);
    alert("check user ID and try again!");
    res.sendFile(__dirname + "/public/login.html");
}
 
  
});


//===============================================================================register============================================================


app.post("/regi", async (req, res) => {

    var uId = req.body.uid;
    var name = req.body.name;
    var pw1 = req.body.pw1;
    var pw2 = req.body.pw2;
    var gen = req.body.gender;
    var Age = req.body.age;
    var email = req.body.mail;

    var firsttag = uId[0];

    //console.log(firsttag);

    if (firsttag == "3"){
        if(pw1 == pw2){

    client.connect();
    await client.db("unilib").collection("users").insertOne({

        User_ID: uId,
        User_Name: name,
        Gender: gen,
        Age: Age,
        Email:email,
        Password: pw1,
    });

    console.log(`data has been uploaded`);
    res.sendFile(__dirname + "/public/index.html");
    alert("Welcome to UNI-LIB"); 
}

    else{ 
        console.log(`check db connection`);
        res.sendFile(__dirname + "/public/register.html");
        alert("passwords not matching !");
    }

}
else {
    alert("You have no access to register admin or staff member !");
    res.sendFile(__dirname + "/public/register.html");
}


});

// ===================================================================admin parts ==========================
  //--------------------------------------------------------------------- send adnmin details to admin page----------

  app.get('/render-ejs', async (req, res) => {
    try {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
  
      const db = client.db('unilib');
      const collection = db.collection('Admin_Profile');
  
      const documents = await collection.find({}).toArray();
  
      res.render('admin', { documents });
  
      client.close();
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  //--------------------------------------------------------------------- send staff details to admin page----------

  app.get('/ren_staff', async (req, res) => {
    try {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
  
      const db = client.db('unilib');
      const collection = db.collection('Staff_Members');
  
      const documents = await collection.find({}).toArray();
  
      res.render('staff', { documents });
  
      client.close();
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  //--------------------------------------------------------------------- send student details to admin page----------

  app.get('/ren_stu', async (req, res) => {
    try {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
  
      const db = client.db('unilib');
      const collection = db.collection('users');
  
      const documents = await collection.find({}).toArray();
  
      res.render('student', { documents });
  
      client.close();
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  //------------------------------------------------------------------ admin left panel ---------------

  app.get('/ren_adminLeft', async (req, res) => {

    var firstTag = userid[0];

    if (firstTag == "1"){

      

    try {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
  
      const db = client.db('unilib');
      const collection = db.collection('Admin_Profile');
  
      
      const ad = await collection.findOne({ User_ID: userid });
  
      if (ad) {
        res.render('admin_left', { ad }); 
      } else {
        res.status(404).send('not found');
      }
  
      client.close();
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }

  }

  else if (firstTag == "2"){


    try {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
  
      const db = client.db('unilib');
      const collection = db.collection('Staff_Members');
  
      
      const ad = await collection.findOne({ ID: userid });
  
      if (ad) {
        res.render('admin_left', { ad }); 
      } else {
        res.status(404).send('not found');
      }
  
      client.close();
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }

  }

  else if (firstTag == "3"){

    try {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
  
      const db = client.db('unilib');
      const collection = db.collection('users');
  
      
      const ad = await collection.findOne({ User_ID: userid });
  
      if (ad) {
        res.render('admin_left', { ad }); 
      } else {
        res.status(404).send('not found');
      }
  
      client.close();
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }

  }

  else {
    res.status(500).send('Internal Server Error');
  }

  });



  // --------------------------------------------------------------- update admin details -----------

  app.post("/update_admin", async (req, res) => {

    var adid = req.body.id;
    var Fname = req.body.fname;
    var Lname = req.body.lname;
    var Email = req.body.mail;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
  
    var firstTag = adid[0];


    if (firstTag == "1"){
      if (pass1 === pass2) {
        try {
          await client.connect();
          const collection = client.db("unilib").collection("Admin_Profile");
  
          const result = await collection.updateOne(
            { User_ID: userid },
            {
              $set: {
                User_ID: adid,
                First_Name: Fname,
                Last_Name: Lname,
                Email: Email,
                Password: pass1,
              },
            }
          );
  
          if (result.modifiedCount > 0) {
            console.log("Data has been updated");
            res.sendFile(__dirname + "/public/admin_ht.html");
            alert("Data has been updated successfully!");
          } 
          
          else {
            console.log("No document found for the provided User_ID");
            res.sendFile(__dirname + "/public/index.html");
            alert("No document found for the provided Admin ID (try login again!)");
          }
        } 
        
        catch (error) {
          console.error("Error:", error);
          res.sendFile(__dirname + "/public/index.html");
          alert("An error occurred while updating data");
        } 
        
        finally {
          client.close();
        }
      } 
      
      else {
        console.log("Passwords not matching!");
        res.sendFile(__dirname + "/public/admin_ht.html");
        alert("Passwords not matching!");
      }
    }
    else{
        console.log("admin id should start with number 1 !");
        res.sendFile(__dirname + "/public/admin_ht.html");
        alert("Admin id always should start with number 1 !");
    }
    
  });
  
// ------------------------------------------------------------ staff register -----------------------
  app.post("/staff_regi", async (req, res) => {

    var sId = req.body.id;
    var Fname = req.body.fname;
    var Lname = req.body.lname;
    var Email = req.body.mail;
    var joindate = req.body.jDate;
    var gen = req.body.gender;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;

    var firsttag = sId[0];



    if (firsttag == "2"){
        if(pass1 == pass2){

    client.connect();
    await client.db("unilib").collection("Staff_Members").insertOne({

        ID: sId,
        First_Name: Fname,
        Last_Name: Lname,
        Email: Email,
        Password: pass1,
        Join_Date: joindate,
        Gender: gen,
    });

    alert("Registration Successful!"); 
    console.log(`data has been uploaded`);
    res.sendFile(__dirname + "/public/admin_ht.html");
   
}

    else{ 
        alert("passwords not matching !");
        console.log(`passwords wrong!`);
        res.sendFile(__dirname + "/public/admin_ht.html"); 
    }

}
else {
    alert("Staff ID always should start with 2 ");
    res.sendFile(__dirname + "/public/admin_ht.html");
}


});


// ---------------------------------------- account delete ------------------------------------------

app.post("/delete", async (req, res) => {
    var Id = req.body.id;
  
    var firstTag = Id[0];
  
    if (firstTag === "2") {
      try {
        await client.connect();
        const collection = client.db("unilib").collection("Staff_Members");
  
        const result = await collection.deleteOne({ ID: Id });
  
        if (result.deletedCount > 0) {
          console.log("Document has been deleted");
          res.sendFile(__dirname + "/public/admin_ht.html");
          alert("Account has been deleted successfully!");
        } 
        
        else {
          console.log("No document found for the provided ID");
          res.sendFile(__dirname + "/public/admin_ht.html");
          alert("No account found for the provided ID");
        }
      } 
      
      catch (error) {

        alert("An error occurred while deleting the document");
        console.error("Error:", error);
        res.sendFile(__dirname + "/public/admin_ht.html");
        
      }
      
      finally {
        client.close();
      }
    } 
    

    else if (firstTag === "3") {
        try {
          await client.connect();
          const collection = client.db("unilib").collection("users");
    
          const result = await collection.deleteOne({ Student_ID: Id });
    
          if (result.deletedCount > 0) {
            console.log("Document has been deleted");
            res.sendFile(__dirname + "/public/admin_ht.html");
            alert("Account has been deleted successfully!");
          } 
          
          else {
            console.log("No document found for the provided ID");
            res.sendFile(__dirname + "/public/admin_ht.html");
            alert("No account found for the provided ID");
          }
        } 
        
        catch (error) {
  
          alert("An error occurred while deleting the document");
          console.error("Error:", error);
          res.sendFile(__dirname + "/public/admin_ht.html");
          
        }
        
        finally {
          client.close();
        }
      } 
      
      else if(firstTag=="1") {
        alert("you can not delete Admin Account");
        res.sendFile(__dirname + "/public/admin_ht.html");
      }

      else {
        alert("check the ID and try again !");
        res.sendFile(__dirname + "/public/admin_ht.html");
      }

  });
//==================================================staff page ==================================
  //==========================================================================staff update ======

  app.post("/update_staff", async (req, res) => {

    var id = req.body.sid;
    var Fname = req.body.fname;
   
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
  
    var firstTag = id[0];


    if (firstTag == "2"){
      if (pass1 === pass2) {
        try {
          await client.connect();
          const collection = client.db("unilib").collection("Staff_Members");
  
          const result = await collection.updateOne(
            { ID: id, First_Name: Fname},
            {
              $set: {
                Password: pass1,
              },
            }
          );
  
          if (result.modifiedCount > 0) {
            console.log("Data has been updated");
            res.sendFile(__dirname + "/public/staff_ht.html");
            alert("Data has been updated successfully!");
          } 
          
          else {
            console.log("No document found for the provided User_ID");
            res.sendFile(__dirname + "/public/index.html");
            alert("No document found for the provided staff ID (try login again!)");
          }
        } 
        
        catch (error) {
          console.error("Error:", error);
          res.sendFile(__dirname + "/public/index.html");
          alert("An error occurred while updating data");
        } 
        
        finally {
          client.close();
        }
      } 
      
      else {
        console.log("Passwords not matching!");
        res.sendFile(__dirname + "/public/staff_ht.html");
        alert("Passwords not matching!");
      }
    }
    else{
        console.log("Staff id should start with number 2 !");
        res.sendFile(__dirname + "/public/staff_ht.html");
        alert("staff id always should start with number 2 !");
    }
    
  });

  // ------------------------------------------------------------- update student ---------------------

  app.post("/stu_update", async (req, res) => {

    var id = req.body.id;
    var email = req.body.mail;
   
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
  
    var firstTag = id[0];


    if (firstTag == "3"){
      if (pass1 === pass2) {
        try {
          await client.connect();
          const collection = client.db("unilib").collection("users");
  
          const result = await collection.updateOne(
            { User_ID: id, Email:email},
            {
              $set: {
                Password: pass1,
              },
            }
          );
  
          if (result.modifiedCount > 0) {
            console.log("Data has been updated");
            res.sendFile(__dirname + "/public/staff_ht.html");
            alert("Data has been updated successfully!");
          } 
          
          else {
            console.log("No document found for the provided User_ID");
            res.sendFile(__dirname + "/public/staff_ht.html");
            alert("No document found for the provided student ID (try login again!)");
          }
        } 
        
        catch (error) {
          console.error("Error:", error);
          res.sendFile(__dirname + "/public/staff_ht.html");
          alert("An error occurred while updating data");
        } 
        
        finally {
          client.close();
        }
      } 
      
      else {
        console.log("Passwords not matching!");
        res.sendFile(__dirname + "/public/staff_ht.html");
        alert("Passwords not matching!");
      }
    }
    else{
        console.log("Student id should start with number 3 !");
        res.sendFile(__dirname + "/public/staff_ht.html");
        alert("student id always should start with number 3 !");
    }
    
  });

  // ------------------------------------------------------------- student account delete --------------

  app.post("/delete_stu", async (req, res) => {
    var Id = req.body.id;
  
    var firstTag = Id[0];
  
    if (firstTag === "3") {
      try {
        await client.connect();
        const collection = client.db("unilib").collection("users");
  
        const result = await collection.deleteOne({ User_ID: Id });
  
        if (result.deletedCount > 0) {
          console.log("Account has been deleted");
          res.sendFile(__dirname + "/public/staff_ht.html");
          alert("Account has been deleted successfully!");
        } 
        
        else {
          console.log("No document found for the provided ID");
          res.sendFile(__dirname + "/public/staff_ht.html");
          alert("No account found for the provided ID");
        }
      } 
      
      catch (error) {

        alert("An error occurred while deleting the document");
        console.error("Error:", error);
        res.sendFile(__dirname + "/public/staff_ht.html");
        
      }
      
      finally {
        client.close();
      }
    } 

    else {
      console.log("Student id should start with number 3 !");
      res.sendFile(__dirname + "/public/staff_ht.html");
      alert("student id always should start with number 3 !");
    }
    

  
  });

  // --------------------------------------------------------------- book upload -------------------

  app.post("/add_book", async (req, res) => {

    var bId = req.body.bookid;
    var booktype = req.body.btype;
    var bname = req.body.bookname;
    var auth = req.body.author;
    var date = req.body.bookDate;
    var image = req.body.imag;   

    var firsttag = bId[0];

    if (firsttag == "4"){  

      try{

    client.connect();
    await client.db("unilib").collection(booktype).insertOne({

        Book_ID: bId,
        Book_Name: bname,
        Book_Authors: auth,
        Book_Type: booktype,
        Book_Date: date,
        Book_Cover: image,
    });

    alert("Book Saved Successful!"); 
    console.log(`data has been uploaded`);
    res.sendFile(__dirname + "/public/staff_ht.html");
   
}

    catch (error) {

      alert("An error occurred while Uploading Try again !");
      console.error("Error:", error);
      res.sendFile(__dirname + "/public/staff_ht.html");
      
    }

  }

else {
    alert("Book ID always should start with 4 ");
    res.sendFile(__dirname + "/public/staff_ht.html");
}


});

// ------------------------------------------------------------ remove books ---------------------------


app.post("/delete_book", async (req, res) => {
  var Id = req.body.bid;
  var booktype = req.body.btype;

  var firstTag = Id[0];

  if (firstTag === "4") {
    try {
      await client.connect();
      const collection = client.db("unilib").collection(booktype);

      const result = await collection.deleteOne({ Book_ID: Id });

      if (result.deletedCount > 0) {
        console.log("book has been deleted");
        res.sendFile(__dirname + "/public/staff_ht.html");
        alert("Book has been deleted successfully!");
      } 
      
      else {
        console.log("No book found for the provided ID");
        res.sendFile(__dirname + "/public/staff_ht.html");
        alert("No book found for the provided ID");
      }
    } 
    
    catch (error) {

      alert("An error occurred while deleting the book");
      console.error("Error:", error);
      res.sendFile(__dirname + "/public/staff_ht.html");
      
    }
    
    finally {
      client.close();
    }
  } 

  else {
    alert("Book ID always should start with 4 ");
    res.sendFile(__dirname + "/public/staff_ht.html");
  }

});


// ---------------------------------------------------------------  show all books details ---------

app.post('/all_book', async (req, res) => {


  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db('unilib');

    const collection1 = db.collection('history_books');
     const collection2 = db.collection('science_books');
     const collection3 = db.collection('art_books');
     const collection4 = db.collection('tech_books');
     const collection5 = db.collection('math_books');
     const collection6 = db.collection('commerce_books');
     const collection7 = db.collection('other_books');

    
    //const b1 = await collection1.findOne({ User_ID: userid });

    const documents = await collection1.find({}).toArray();
    const documents2 = await collection2.find({}).toArray();
    const documents3 = await collection3.find({}).toArray();
    const documents4 = await collection4.find({}).toArray();
    const documents5 = await collection5.find({}).toArray();
    const documents6 = await collection6.find({}).toArray();
    const documents7 = await collection7.find({}).toArray();

    if (documents || documents2 || documents3 || documents4 || documents5 || documents6 || documents7){
      res.render('books', { documents, documents2, documents3, documents4, documents5, documents6, documents7 });
    }
    

    client.close();

  } 
  
  catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }

});


// -------------------------------------------------- comments reading ----------------------------------


app.post('/all_com', async (req, res) => {


  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db('unilib');

    const collection = db.collection('Student Comments');

    const documents = await collection.find({}).toArray();
   

    if (documents){
      res.render('Student_coms', { documents});
    }
    

    client.close();

  } 
  
  catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }

});



//=================================================================== student ==================

//------------------------------------------------------------students comment upload --------------------------------------------


app.post("/student_com", async (req, res) => {

  var com = req.body.comment;

  client.connect();
 const result = await client.db("unilib").collection("Student Comments").insertOne({
      User_ID: userid,
      Comment: com
  });

  if(result){
      alert("Your comment has been posted!");
      res.sendFile(__dirname + "/public/student_home.html");
  }

  else{
      alert("pls try again!");
      res.sendFile(__dirname + "/public/student_home.html");
  }



});

//----------------------------------------------------------------


app.post('/Show_books', async (req, res) => {


  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db('unilib');

    const collection1 = db.collection('history_books');
     const collection2 = db.collection('science_books');
     const collection3 = db.collection('art_books');
     const collection4 = db.collection('tech_books');
     const collection5 = db.collection('math_books');
     const collection6 = db.collection('commerce_books');
     const collection7 = db.collection('other_books');

    
    //const b1 = await collection1.findOne({ User_ID: userid });

    const documents = await collection1.find({}).toArray();
    const documents2 = await collection2.find({}).toArray();
    const documents3 = await collection3.find({}).toArray();
    const documents4 = await collection4.find({}).toArray();
    const documents5 = await collection5.find({}).toArray();
    const documents6 = await collection6.find({}).toArray();
    const documents7 = await collection7.find({}).toArray();

    if (documents || documents2 || documents3 || documents4 || documents5 || documents6 || documents7){
      res.render('student_books', { documents, documents2, documents3, documents4, documents5, documents6, documents7 });
    }

    else {
      console.error('Error:');
      res.status(500).send('Internal Server Error');
    }

  }
  
  catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }

});

//----------------------------------------------------------- books search ----------------------------

app.post('/req_book', async (req, res) => {

  var bname = req.body.bookname;
  var booktype = req.body.btype;
  var booktypeString = String(booktype);

  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db('unilib');

    const collection = db.collection(booktypeString);
    
    const documents = await collection.findOne({ Book_Name: bname });

    if (documents) {
      const html = `
        <div class="card">
          <img class="cover-image" src="${documents.Book_Cover}" alt="Cover Image">
          <h3 style="font-size: 15px;">Book Name: ${documents.Book_Name} </h3>
          <h4 style="font-size: 14px;">Book Author : ${documents.Book_Authors} </h4>
          <h5 style="font-size: 12px;">Book ID: ${documents.Book_ID} </h5>
        </div>
      `;
      res.send(html);
    } else {
      res.send('<p>No results found.</p>');
    }
  }
  
  catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});































