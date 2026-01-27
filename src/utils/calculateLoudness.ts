/**
 * Calculates the RMS value and relative loudness in decibels from a time-domain audio buffer.
 * 
 * @param timeDomainData - Uint8Array containing time-domain data (values 0-255).
 *                         Expected length is 2048 (from AnalyserNode with fftSize 2048).
 * @returns An object containing the calculated RMS value and the loudness in decibels.
 */
export function calculateLoudness(timeDomainData: Uint8Array): { rms: number; decibels: number } {
    const bufferLength = timeDomainData.length;

    // 1. Calculate the sum of squares of the signal
    let sumOfSquares = 0;
    for (let i = 0; i < bufferLength; i++) {
        // Normalize the 8-bit unsigned integer (0-255) to a float range (-1.0 to 1.0).
        // 128 is the zero-crossing point (silence).
        const normalizedValue = (timeDomainData[i] - 128) / 128.0;
        sumOfSquares += normalizedValue * normalizedValue;
    }

    // 2. Calculate Root Mean Square (RMS)
    // RMS = sqrt(mean of squares)
    const rms = Math.sqrt(sumOfSquares / bufferLength);

    // 3. Calculate separate Decibel value relative to full scale (dBFS)
    // db = 20 * log10(rms)
    // Handle silence: if rms is 0 or extremely small, log10 returns -Infinity.
    // We use a small epsilon for safety, although the clamp will handle the final output.
    const epsilon = 1e-9;
    let decibels = 20 * Math.log10(rms + epsilon);

    // 4. Clamp the output to a sane range for UI/Backend
    // Range: -60dB (noise floor/silence) to 0dB (peak)
    const minDecibels = -60;
    const maxDecibels = 0;

    if (decibels < minDecibels) {
        decibels = minDecibels;
    } else if (decibels > maxDecibels) {
        decibels = maxDecibels;
    }

    // Return formatted values
    return {
        rms: rms, // Raw RMS value (0.0 to 1.0)
        decibels: decibels // Clamped decibel value (-60 to 0)
    };
}
