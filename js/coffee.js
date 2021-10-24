
// class UI {
//     hidePreloader = function() {
//         document.querySelector('.preloader').style.display = "none";
//     }
    
//     showNav = function() {
//         document.querySelector('.nav').classList.toggle('nav-show');
//     }
// }

// jquery fro INPUT value to take in uppercase
$(function() {
    $('input').keyup(function() {
        this.value = this.value.toLocaleUpperCase();
    });
});

// event Listeners
eventListeners();
function eventListeners(){
   const ui = new UI()
    window.addEventListener('load', function () {
       ui.hidePreloader();
    })
    
    // nav btn 
    document.querySelector('.navBtn').addEventListener('click',function(){
        ui.showNav();
    })
    //Control the video
    document.querySelector('.video_switch').addEventListener('click',function(){
        ui.videoControls();
    })
    // submit the form
    document.querySelector('.drink-form').addEventListener('submit',function(event){
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastname = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;
        const gender = document.querySelector('.input-gender').value;

        let value = ui.checkEmpty(name,lastname,email,gender)
     
        if(value){
            let customer = new Customer(name,lastname,email,gender);
            // console.log(customer);
            ui.addCustomer(customer);
            ui.showfeedback('Congratulation ! You are added to list', 'success')
            ui.clearFields();
       
        }else{
            ui.showfeedback('some form values empty','error');
        }    
    })
 
    // display modal
 const links = document.querySelectorAll('.work-item_icon');
 
 links.forEach(function(item){
    //  console.log(item);
     item.addEventListener('click',function(event){
         ui.showModal(event);
     })
 })

  // hide modal
 document.querySelector('.work-modal_close').addEventListener('click',
 function(){
     ui.closeModal();
 })

}

// Constructor function
function UI() {

}

UI.prototype.hidePreloader = function() {
    document.querySelector('.preloader').style.display = "none";
}

UI.prototype.showNav = function() {
    document.querySelector('.nav').classList.toggle('nav-show');
}

// play/pause the video
UI.prototype.videoControls = function () {
    let btn = document.querySelector('.video_switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide')
        document.querySelector('.video_item').pause()
    }
    else{
        btn.classList.remove('btnSlide')
        document.querySelector('.video_item').play()
    }
}

// check for empty values
UI.prototype.checkEmpty = function(name,lastname,email,gender){
      let result;

      if(name === '' || lastname === '' || email === '' || gender === ''){
          result = false;
      } 
      else{
          result = true;
      }

      return result;
}

UI.prototype.showfeedback = function(text,type) {
    const feedback = document.querySelector('.drink-form_feedback');
    
    if( type === 'success'){
       feedback.classList.add('success');
       feedback.innerText = text;
       this.removeAlert('success');

    }else if(type === 'error'){
       feedback.classList.add('error');
       feedback.innerText = text;
       this.removeAlert('error');
    }
}

// remove alert
UI.prototype.removeAlert = function(type){
    setTimeout(function(){
      document.querySelector('.drink-form_feedback').classList.remove(type);
    }, 3000)
}

// add customer
UI.prototype.addCustomer = function(customer){
     const images_01 = [1,2,3]; // for male
     const images_02 = [4,5,6];          // for female
     let random ;
     if(customer.gender === 'MALE'){
         random = Math.floor(Math.random() * images_01.length);
     }
     else{
        random = Math.floor(Math.random() * images_02.length) + 3;
     }
    //  console.log(random);
     const div = document.createElement('div');
     div.classList.add('person');
     div.innerHTML = ` <img src="images/person${random}.jpg" alt="person" class="person_thumbnail" height="80px" width="75px">
     <h4 class="person_name">${customer.name}</h4>
     <h4 class="person_last-name">${customer.lastname}</h4>`

     document.querySelector('.drink-card_list').appendChild(div)
}




// clear fields
UI.prototype.clearFields = function(){
       document.querySelector('.input-name').value = '';
       document.querySelector('.input-lastname').value= '';
       document.querySelector('.input-email').value = '';
       document.querySelector('.input-gender').value = '';
}

// show modal
 UI.prototype.showModal = function(event){
     event.preventDefault();
    //  console.log(event.target.parentElement);
    if(event.target.parentElement.classList.contains('work-item_icon'));
    let id = event.target.parentElement.dataset.id
    // console.log(id);

    const modal = document.querySelector('.work-modal')
    const modalItem = document.querySelector('.work-modal_item');

    modal.classList.add('work-modal-show');
    let result = modalItem.style.backgroundImage = `url(images/work-${id}.jpg)`
    // console.log(result)
 }

 //close Modal
 UI.prototype.closeModal = function(){
    document.querySelector('.work-modal').classList.remove('work-modal-show');
}

// 
function Customer(name , lastname , email , gender){
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.gender = gender;
}