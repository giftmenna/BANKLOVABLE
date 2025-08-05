// Notification sound utility for transaction alerts

export const playNotificationSound = async (type: 'success' | 'error' | 'info' = 'success') => {
  try {
    // Create audio context for better browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Resume audio context if suspended (required for some browsers)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    // Generate a more noticeable notification sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different notification types
    const frequencies = {
      success: 1000, // Higher pitch for success (more noticeable)
      error: 400,    // Lower pitch for errors
      info: 600      // Medium pitch for info
    };
    
    oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Set higher volume and longer duration for better noticeability
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Increased volume
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0); // Longer duration
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.0); // 1 second duration
    
    console.log('🔊 Notification sound played:', type);
    
  } catch (error) {
    console.warn('Could not play notification sound:', error);
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