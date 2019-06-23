'use strict';

const xhr = new XMLHttpRequest();
const xhrUsers = new XMLHttpRequest();

xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);


xhr.addEventListener('load', () => {
  xhrUsers.send();
  xhrUsers.addEventListener('load', () => {
    const todosList = JSON.parse(xhr.response);
    const usersList = JSON.parse(xhrUsers.response);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    thead.innerHTML = `<tr>
                          <th>Title</th>
                          <th>Name</th>
                          <th>Is Completed</th>
                       </tr>`;
    table.appendChild(thead);
    for(let item of todosList) {
      let rowNode = document.createElement('tr');
      const user = usersList.find(userObj => userObj['id'] === item['userId']);
      rowNode.innerHTML = `
      <td>
        ${item.title}
      </td>
      <td>
        ${user.name}
      </td>
      <td>
        ${item.completed}
      </td>
    `;
      tbody.appendChild(rowNode);
    }
    table.appendChild(tbody);
    document.body.insertAdjacentElement("afterbegin", table);
  });
});

xhr.send();
