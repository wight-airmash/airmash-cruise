const isChatOpen = () => {
  const chatInput = document.querySelector('#chatinput');

  return (
    chatInput !== null && !(chatInput.style.display === 'none' || chatInput.style.display === '')
  );
};

export default isChatOpen;
