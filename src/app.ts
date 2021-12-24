import './style.css';
import axios from 'axios';
// import { any } from 'joi';
require('babel-core/register');
require('babel-polyfill');

const body = document.querySelector('body');
const domLogin = document.querySelector('.login');
const domAvatar = document.querySelector('.avatar');
const domPublicRepos = document.querySelector('.publicRepos');
const domFollowers = document.querySelector('.followers');
const domPopup = document.querySelector('.popup');
const closePopup = document.querySelector('.close');

function closeBlockPopup() {
    domPopup.classList.remove('popupView');
}

closePopup.addEventListener('click', closeBlockPopup);

function setUser(attribute, dataUser) {
    attribute.textContent = dataUser;
}

function openCartUser(user) {
    console.log(user.data.login);
    console.log(domLogin);

    domPopup.classList.add('popupView');
    domAvatar.setAttribute('src', user.data.avatar_url);
    setUser(domLogin, user.data.login);
    setUser(domPublicRepos, user.data.public_repos);
    setUser(domFollowers, user.data.followers);
}

const getUser = async (event) => {
    try {
        const user = await axios.get(`https://api.github.com/user/${event.target.id}`);
        openCartUser(user);
    } catch (error) {
        console.error(error);
    }
};

function createUser(user) {
    const div = document.createElement('div');
    const login = document.createElement('p');
    login.textContent = user.login;
    const avatar = document.createElement('img');
    avatar.setAttribute('src', user.avatar_url);
    avatar.setAttribute('id', user.id);
    div.appendChild(login);
    div.appendChild(avatar);
    div.classList.add('userGit');
    body.appendChild(div);
    div.addEventListener('click', getUser);
}

const getUsers = async () => {
    try {
        const data = await axios.get('https://api.github.com/users');
        data.data.forEach((user) => {
            createUser(user);
        });
    } catch (error) {
        console.error(error);
    }
};
getUsers();
