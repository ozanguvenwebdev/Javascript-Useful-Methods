// CUSTOM FUNCTIONS MADE BY ME

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }


function deleteAnimationSession(id) {
    var selectedSession = document.getElementById("session-" + id);
    selectedSession.classList.add("delete-session-box");
    setTimeout(() => {
        selectedSession.classList.add("display-none");
      }, 700); // ANİMASYON BOZULMASIN DİYE SONRADAN 'display:none' EKLİYORUM
    selectedSession.remove();
    console.log('selectedSession :>> ', selectedSession);
}

function deleteAnimationChat(id) {
  console.log('girdi :>> ');
    var selectedChatbox = document.getElementById("chatbox-" + id);
    console.log('selectedChatbox :>> ', selectedChatbox);
    selectedChatbox.classList.add("disappear-chatbox");
    setTimeout(() => {
        selectedChatbox.classList.add("display-none");
      }, 700); // ANİMASYON BOZULMASIN DİYE SONRADAN 'display:none' EKLİYORUM
}


async function deleteSessionAsync(id) {

    const response = await fetch('/fetch-delete-session/', {
        method: "POST",
        headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
           'session_id': id,
        }),
      })
    //   .then(response => response.json())
    //   console.log(response)
    //   .then(data => {
    //     console.log(data);
    //   });
}

function getFirstSession() {

  console.log("**************getFirstSession girdi")
  const elements = document.getElementsByClassName("hvr-radial-out custom-session display-none");
  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].remove();
  }

  var firstLiId = document.getElementById("session-ul").getElementsByTagName("li")[0].id
  console.log('firstLiId :>> ', firstLiId);
  var idNumber = firstLiId.slice(-2);
  console.log('idNumber :>> ', idNumber);
  var redirectUrl = "/chatbot/session-" + idNumber + "/"
  console.log('redirectUrl :>> ', redirectUrl);
  window.location = redirectUrl
  console.log('newLocation :>> ', newLocation);

  console.log('getFirstSession Bitti :>> ');
}


function deleteSession(sessionId) {

    var currentUrl = window.location.href;

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "grey",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteAnimationSession(sessionId); //SOLDAKİ SESSION YOK ETME FONKSİYONU

            // CHATBOXIN display:block OLDUĞU DURUMDA ÇALIŞIP HATALARI ÖNLÜYOR 
            if (window.location.href.indexOf(sessionId.toString()) > -1) {
                console.log("your url contains the name franky");
                try {
                  deleteAnimationChat(sessionId);
                } catch (error) {
                  console.error(error);
                  // Expected output: ReferenceError: nonExistentFunction is not defined
                  // (Note: the exact output may be browser-dependent)
                }
              }

            console.log("animasyon çalıştı")

            deleteSessionAsync(sessionId);

            console.log("delete async çalıştı")

            getFirstSession()
            console.log('firstSession :>> ', firstSession);


            Swal.fire({
                title: "Deleted!",
                text: "Session has been deleted.",
                icon: "success"
            });

        }
    });
  // window.location.reload()
}


function bringTrueFalseQuestion(id) {
  sweetLoader();
  var id = id.toString()
  fetch('http://165.227.149.52:8080/create-quiz-tf/' + id + '/')
  .then(res => {
    return res.json();
  })
  .then(data => {
    var fields = data.split('.');
    // var question = fields[0];
    // console.log('question :>> ', question);
    var answer = fields[1];
    // console.log('answer :>> ', answer);
    answer = getAnswerInParantheses(answer)
    // console.log('answer :>> ', answer);
    trueFalseAlert(data, answer)
  })
}


function bringOpenEndedQuestion(id) {
  sweetLoader();
  var id = id.toString()
  fetch('http://165.227.149.52:8080/create-quiz-oe/' + id + '/')
  .then(res => {
    return res.json();
  })
  .then(data => {
    // console.log('data :>> ', data);
    var fields = data.split('?');

    var question = fields[0];
    // console.log('question :>> ', question);
    var answer = fields[1];
    answer = getAnswerInParantheses(answer)
    console.log('answer :>> ', answer);
    answer = answer.toLowerCase()
    console.log('answer :>> ', answer);

    openEndedAlert(question, answer)
  })
}


function openEndedAlert(question, answer){
  // Swal.fire({
  //   title: question,
  //   input: "text",
  //   inputAttributes: {
  //     autocapitalize: "off"
  //   },
  //   showCancelButton: true,
  //   confirmButtonText: "Look up",
  //   showLoaderOnConfirm: true,
  //   preConfirm: async (login) => {
  //     try {
  //       const githubUrl = `
  //         https://api.github.com/users/${login}
  //       `;
  //       const response = await fetch(githubUrl);
  //       if (!response.ok) {
  //         return Swal.showValidationMessage(`
  //           ${JSON.stringify(await response.json())}
  //         `);
  //       }
  //       return response.json();
  //     } catch (error) {
  //       Swal.showValidationMessage(`
  //         Request failed: ${error}
  //       `);
  //     }
  //   },
  //   allowOutsideClick: () => !Swal.isLoading()
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: `${result.value.login}'s avatar`,
  //       imageUrl: result.value.avatar_url
  //     });
  //   }
  // });
}



function trueFalseAlert(data, answer){
  var fields = data.split('.');
  var question = fields[0];
  var answer = fields[1];
  answer = getAnswerInParantheses(answer)
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: question + "?",
    // text: data,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "True",
    cancelButtonText: "False",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed && answer == "True") {
      swalWithBootstrapButtons.fire({
        title: "Correct!",
        text: "The answer is true.",
        icon: "success"
      });
    } else if (result.isDismissed && answer == "False") {
      swalWithBootstrapButtons.fire({
        title: "Correct!",
        text: "The answer is true.",
        icon: "success"
      });
    } else {
      swalWithBootstrapButtons.fire({
        title: "Wrong!",
        text: "Your answer is incorrect.",
        icon: "error"
      });
    }
  });
}




function getAnswerInParantheses(answer){
  var regExp = /\(([^)]+)\)/;
  var matches = regExp.exec(answer);
  return matches[1];
}

function sweetLoader() {
  let timerInterval;
  Swal.fire({
    title: "Wait until the question is ready!",
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  })
}
