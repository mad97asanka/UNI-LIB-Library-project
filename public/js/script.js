//------------------------------------------------------------ send admin details----------------------------

document.addEventListener('DOMContentLoaded', function () {
    const renderButton = document.getElementById('renderButton');
    const ejsContainer = document.getElementById('ejsContainer');
  
    renderButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/render-ejs', { method: 'GET' });
        const html = await response.text();
        ejsContainer.innerHTML = html;
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
//------------------------------------------------------------------ send staff details -----------------------------

document.addEventListener('DOMContentLoaded', function () {
  const renderButton = document.getElementById('renderButton_staff');
  const ejsContainer = document.getElementById('staff_display');

  renderButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/ren_staff', { method: 'GET' });
      const html = await response.text();
      ejsContainer.innerHTML = html;
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

//---------------------------------------------------------------- send student details -------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const renderButton = document.getElementById('renderButton_stu');
  const ejsContainer = document.getElementById('stu_display');

  renderButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/ren_stu', { method: 'GET' });
      const html = await response.text();
      ejsContainer.innerHTML = html;
    } catch (error) {
      console.error('Error:', error);
    }
  });
});



 //---------------------------------------------- smooth scrolling -------------------

 function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop - 50
    });
  }
}


const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');
    smoothScroll(target);
  });
});


// ------------------------------------------------------auto load admin left panel -----------------

window.onload = async () => {


  try {  
    const ejsContainer1 = document.getElementById('stu_books_display');
    const response2 = await fetch('/Show_books', { method: 'POST' });
    const html2 = await response2.text();
    ejsContainer1.innerHTML = html2;
  } catch (error) {
    console.error('Error fetching books display:', error);
  }

  try {
    const ejsContainer = document.getElementById('adminLeftPanel');
    const response1 = await fetch('/ren_adminLeft', { method: 'GET' });
    const html1 = await response1.text();
    ejsContainer.innerHTML = html1;
  } catch (error) {
    console.error('Error fetching Panel:', error);
  }

 
};

// ----------------------------------------------------------- go back

document.getElementById("goBackLink").addEventListener("click", function(event) {
  event.preventDefault(); 
  window.history.go(-1); 

});

// ----------------------------------------------------------------------------------------------


const searchForm = document.getElementById('searchForm');
const searchResultsContainer = document.getElementById('search_results');

searchForm.addEventListener('submit', async event => {
  event.preventDefault(); 

  try {
    const response = await fetch('/req_book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body: new URLSearchParams(new FormData(searchForm)), 
    });

    const html = await response.text();
    searchResultsContainer.innerHTML = html;
  } catch (error) {
    console.error('Error:', error);
  }
});
