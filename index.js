const ROCKETS_URL = "https://api.spacexdata.com/v3/rockets";

const rocketsContainer = document.querySelector(".rockets");
const rocketDetailsContainter = document.querySelector(".rocket-details");

const fetchRockets = async () => {
  const response = await fetch(ROCKETS_URL);
  //   console.log(response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const rockets = await response.json();
  //   console.log("rockets: ", rockets);
  return rockets;
};
fetchRockets().then((rockets) => {
  console.log(rockets);
  rocketsContainer.innerHTML = rockets
    .map((rocket) => {
      return `<li data-rocket-id="${rocket.rocket_id}">${rocket.rocket_name}</li>`;
    })
    .join("");
});
const fetchSingleRocket = async (rocketId) => {
  const response = await fetch(`${ROCKETS_URL}/${rocketId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const singleRocket = await response.json();

  return singleRocket;
};

const clickRocket = async (event) => {
  //   console.log("Target: ", event.target.dataset.rocketId);
  const rocketId = event.target.dataset.rocketId;
  const rocket = await fetchSingleRocket(rocketId);
  console.log(rocket);
  console.log("flickr_images: ", rocket.flickr_images);
  const rocketImages = rocket.flickr_images
    .map((image) => {
      return `<img width= "300" src ="${image}"/>`;
    })
    .join("");

  console.log("rocketImages: ", rocketImages);
  rocketDetailsContainter.innerHTML = `<h1>${rocket.rocket_name}</h1> <p>${rocket.description}</p> <div>${rocketImages}</div>`;
};
clickRocket();

rocketsContainer.addEventListener("click", clickRocket);









// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// fetchUsersBtn.addEventListener("click", async () => {
//   try {
//     const users = await fetchUsers();
//     renderUserListItems(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// async function fetchUsers() {
//   const baseUrl = "https://jsonplaceholder.typicode.com";
//   const userIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = userIds.map(async (userId) => {
//     const response = await fetch(`${baseUrl}/users/${userId}`);
//     return response.json();
//   });

//   const users = await Promise.all(arrayOfPromises);
//   return users;
// }

// function renderUserListItems(users) {
//   const markup = users
//     .map(
//       (user) => `<li class="item">
//         <p><b>Name</b>: ${user.name}</p>
//         <p><b>Email</b>: ${user.email}</p>
//         <p><b>Company</b>: ${user.company.name}</p>
//       </li>`
//     )
//     .join("");
//   userList.innerHTML = markup;
// }







// const fetchUsers = async () => {
//     const baseUrl = "https://jsonplaceholder.typicode.com";
//     const firstResponse = await fetch(`${baseUrl}/users/1`);
//     const secondResponse = await fetch(`${baseUrl}/users/2`);
//     const thirdResponse = await fetch(`${baseUrl}/users/3`);
  
//     const firstUser = await firstResponse.json();
//     const secondUser = await secondResponse.json();
//     const thirdUser = await thirdResponse.json();
  
//     console.log(firstUser, secondUser, thirdUser);
//   };
  
//   fetchUsers();