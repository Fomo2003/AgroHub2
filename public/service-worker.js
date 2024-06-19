self.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnkLCa54buY0CjzEwa04fTadyOFHrzAUKgYoeJE4jzw&s', // Replace with your icon path
      badge: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnkLCa54buY0CjzEwa04fTadyOFHrzAUKgYoeJE4jzw&s', // Replace with your badge path
    };
  
    event.waitUntil(self.registration.showNotification('Push Notification', options));
  });
  