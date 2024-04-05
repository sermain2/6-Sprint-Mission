import { showError, hideError } from "./utils.js";

const $emailInput = document.getElementById("emailInput");
const $passwordInput = document.getElementById("passwordInput");
const $nicknameInput = document.getElementById("nicknameInput");
const $pwdCheckInput = document.getElementById("passwordCheckInput");

const $emailError = document.getElementById("emailError");
const $nicknameError = document.getElementById("nicknameError");
const $pwdError = document.getElementById("pwdError");
const $pwdCheckError = document.getElementById("pwdCheckError");

const noShowPwdImg = "../assets/lens_x.png";
const showPwdImg = "../assets/lens_show.png";

const $showPassword = document.getElementById("showPassword");
const $showPasswordCheck = document.getElementById("showPasswordCheck");

const showPwdBoolObj = {
  showPassword: false,
  showPasswordCheck: false,
};

$showPassword.addEventListener("click", (e) => {
  if (!showPwdBoolObj.showPassword) {
    showPwdBoolObj.showPassword = true;
    e.target.src = showPwdImg;
    e.target.classList.add("showLens");
    $passwordInput.type = "text";
  } else {
    showPwdBoolObj.showPassword = false;
    e.target.src = noShowPwdImg;
    e.target.classList.remove("showLens");
    $passwordInput.type = "password";
  }
});

$showPasswordCheck.addEventListener("click", (e) => {
  if (!showPwdBoolObj.showPasswordCheck) {
    showPwdBoolObj.showPasswordCheck = true;
    e.target.src = showPwdImg;
    e.target.classList.add("showLens");
    $pwdCheckInput.type = "text";
  } else {
    showPwdBoolObj.showPasswordCheck = false;
    e.target.src = noShowPwdImg;
    e.target.classList.remove("showLens");
    $pwdCheckInput.type = "password";
  }
});

const $loginButton = document.getElementById("loginButton");

const inputValidObj = {
  email: false,
  nickname: false,
  password: false,
  pwdCheck: false,
};

const checkInputValid = () => {
  const { email, nickname, password, pwdCheck } = inputValidObj;
  $loginButton.classList.toggle(
    "enable",
    email && password && nickname && pwdCheck
  );
  $loginButton.classList.toggle(
    "disable",
    !email || !password || !nickname || !pwdCheck
  );
};

$emailInput.addEventListener("focusout", (e) => {
  if (!e.target.value) {
    inputValidObj.email = showError(
      $emailError,
      $emailInput,
      "이메일을 입력해주세요."
    );
  } else if (!e.target.validity.valid) {
    inputValidObj.email = showError(
      $emailError,
      $emailInput,
      "잘못된 이메일 형식입니다."
    );
  } else {
    inputValidObj.email = hideError($emailError, $emailInput);
  }
  checkInputValid();
});

$nicknameInput.addEventListener("focusout", (e) => {
  if (!e.target.value) {
    inputValidObj.nickname = showError(
      $nicknameError,
      $nicknameInput,
      "닉네임을 입력해주세요."
    );
  } else {
    inputValidObj.nickname = hideError($nicknameError, $nicknameInput);
  }
  checkInputValid();
});

$passwordInput.addEventListener("focusout", (e) => {
  if (!e.target.value) {
    inputValidObj.password = showError(
      $pwdError,
      $passwordInput,
      "비밀번호를 입력해주세요."
    );
  } else if (e.target.value.length < 8) {
    inputValidObj.password = showError(
      $pwdError,
      $passwordInput,
      "비밀번호를 8자 이상 입력해주세요."
    );
  } else if ($pwdCheckInput.value && e.target.value !== $pwdCheckInput.value) {
    inputValidObj.password = showError(
      $pwdCheckError,
      $pwdCheckInput,
      "비밀번호가 일치하지 않습니다."
    );
  } else {
    inputValidObj.password = hideError($pwdError, $passwordInput);
  }
  checkInputValid();
});

$pwdCheckInput.addEventListener("focusout", (e) => {
  if (e.target.value !== $passwordInput.value) {
    inputValidObj.pwdCheck = showError(
      $pwdCheckError,
      $pwdCheckInput,
      "비밀번호가 일치하지 않습니다."
    );
  } else if (e.target.value === $passwordInput.value) {
    inputValidObj.pwdCheck = hideError($pwdCheckError, $pwdCheckInput);
  }
  checkInputValid();
});
