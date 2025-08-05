// Notification sound utility for transaction alerts

export const playNotificationSound = async (type: 'success' | 'error' | 'info' = 'success') => {
  console.log('🔊 Attempting to play notification sound:', type);
  
  try {
    // Check if AudioContext is supported
    if (!window.AudioContext && !(window as any).webkitAudioContext) {
      console.warn('AudioContext not supported in this browser');
      return;
    }
    
    // Create audio context for better browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    console.log('🔊 AudioContext created, state:', audioContext.state);
    
    // Resume audio context if suspended (required for some browsers)
    if (audioContext.state === 'suspended') {
      console.log('🔊 AudioContext suspended, attempting to resume...');
      await audioContext.resume();
      console.log('🔊 AudioContext resumed, new state:', audioContext.state);
    }
    
    // Wait a bit for audio context to be ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Generate a more noticeable notification sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different notification types
    const frequencies = {
      success: 800, // Slightly lower pitch for better compatibility
      error: 400,   // Lower pitch for errors
      info: 600     // Medium pitch for info
    };
    
    const frequency = frequencies[type];
    console.log('🔊 Setting frequency:', frequency);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Set higher volume and longer duration for better noticeability
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Increased volume
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0); // Longer duration
    
    console.log('🔊 Starting oscillator...');
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.0); // 1 second duration
    
    console.log('🔊 Notification sound played successfully:', type);
    
  } catch (error) {
    console.warn('🔊 Primary sound method failed:', error);
    
    // Try alternative method with HTML5 Audio
    try {
      console.log('🔊 Trying alternative sound method...');
      
      // Create a simple beep using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
      console.log('🔊 Alternative notification sound played successfully');
    } catch (altError) {
      console.warn('🔊 Alternative sound method also failed:', altError);
      
      // Try the simplest possible method
      try {
        console.log('🔊 Trying simplest sound method...');
        
        // Create a very simple beep
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        
        console.log('🔊 Simplest sound method worked!');
      } catch (finalError) {
        console.error('🔊 All sound methods failed:', finalError);
      }
    }
  }
};

export const showTransactionNotification = async (type: 'received' | 'sent', amount: number, description?: string) => {
  // Play notification sound
  await playNotificationSound('success');
  
  // Show toast notification
  const message = type === 'received' 
    ? `💰 Received $${amount.toFixed(2)}${description ? ` - ${description}` : ''}`
    : `💸 Sent $${amount.toFixed(2)}${description ? ` - ${description}` : ''}`;
    
  // Return the message for toast to use
  return message;
};

export const showErrorNotification = (message: string) => {
  playNotificationSound('error');
  return message;
};

export const showInfoNotification = (message: string) => {
  playNotificationSound('info');
  return message;
}; 