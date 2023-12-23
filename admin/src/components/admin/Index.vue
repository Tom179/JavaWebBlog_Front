<template>
    <div class="center-container">
      <transition name="custom-fade" appear>
        <h2 key="welcomeText" class="animated-text">欢迎来到MyBlog个人博客系统</h2>
      </transition>
    </div>
  </template>
  
  <style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(120, 120, 120, 0.5); 
    background-image: url('../../assets/1102604.jpg');
    background-size: cover; /* 图片等比例缩放，覆盖整个容器 */
    background-position: center; /* 图片居中显示 */
    height: 100vh; 
  }
  
  .animated-text {
    text-align: center;
    font-size: 60px;
    transform-origin: center center;
  }
  
  .custom-fade-enter-active, .custom-fade-leave-active {
    animation: fadeInOut 5s;
  }
  
  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  </style>
  