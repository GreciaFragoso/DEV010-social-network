import { getDocs, collection, query, onSnapshot } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase.js';
// eslint-disable-next-line import/no-unresolved
import { setUpPosts } from './post.js';
import addPost from './addPost.js'; // textarea y botón de submit

function feed(/* navigateTo */) {
  const section = document.createElement('section');
  const titleSection = document.createElement('section');
  const titleFeed = document.createElement('h2');
  titleFeed.textContent = 'Feed';
  titleSection.append(titleFeed);
  const titlePosts = document.createElement('h3');
  titlePosts.textContent = 'Posts';
  section.append(titleSection, titlePosts, addPost()); // addPost() imprime el textarea y submit

  const q = query(collection(db, 'Post'));
  const sectionPosts = document.createElement('section');
  const posts = document.createElement('section');
  onSnapshot(q, (querySnapshot) => {
    posts.textContent = ''; // para evitar que se dupliquen las publicaciones con el submit
    querySnapshot.forEach((doc) => {
      const pPosts = document.createElement('p');
      pPosts.textContent = doc.data().Content;
      posts.appendChild(pPosts);
    });
    // console.log(posts);
    sectionPosts.appendChild(posts);
    section.appendChild(sectionPosts);
    return section;
  });
  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     addPost();
  //     const querySnapshot = await getDocs(collection(db, 'Post'));
  //     const posts = setUpPosts(querySnapshot.docs);
  //     section.append(posts);
  //   } else {
  //     setUpPosts([]);
  //     const p = document.createElement('p');
  //     p.textContent = 'Sign in to see posts.';
  //     section.append(p);
  //   }
  // });

  return section;
}

export default feed;
