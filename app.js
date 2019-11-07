import 'regenerator-runtime/runtime';
import db from './firebase';

const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
const renderCafe = doc => {
  const li = document.createElement('li');
  const name = document.createElement('span');
  const city = document.createElement('span');
  const cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // deleting data
  cross.addEventListener('click', async e => {
    e.stopPropagation();
    const id = e.target.parentElement.getAttribute('data-id');
    try {
      await db
        .collection('cafes')
        .doc(id)
        .delete();
    } catch (err) {
      console.log(err);
    }
  });
};

// getting data
// document.addEventListener('DOMContentLoaded', async () => {
//   try {
//     const snapshot = await db
//       .collection('cafes')
//       .where('city', '==', 'manchester')
//       .orderBy('name')
//       .get();
//     snapshot.docs.forEach(doc => renderCafe(doc));
//   } catch (err) {
//     console.log(err);
//   }
// });

// real-time listener
db.collection('cafes')
  .orderBy('city')
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === 'added') {
        renderCafe(change.doc);
      } else if (change.type == 'removed') {
        const li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
        cafeList.removeChild(li);
      }
    });
  });

// saving data
document.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    await db.collection('cafes').add({
      name: form.name.value,
      city: form.city.value
    });
    form.reset();
  } catch (err) {
    console.log(err);
  }
});
