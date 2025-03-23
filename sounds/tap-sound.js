/**
 * Tap sound for owl clicks
 * This is a small WAV file encoded as a base64 string
 */
const TAP_SOUND_BASE64 = "UklGRqQDAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YYADAABdAJUA0wAKASUBNAE5ATcBNAEvASsBJAEZAQwB/wDyAOUA2QDKALwArgCfAJIAhQB4AGsAXgBSAEUAOgAuACMAGQAPAAYA/f/1/+z/5P/c/9X/zv/I/8H/vP+2/7H/rf+o/6T/of+d/5v/mP+X/5T/k/+S/5H/kf+Q/5D/kf+R/5H/kf+T/5T/lf+W/5f/mf+b/5z/nv+g/6L/pP+n/6r/rP+v/7L/tf+4/7z/v//C/8X/yf/N/9D/1P/Y/9z/4P/j/+f/7P/w//T/+P/8/wEABQAJAA4AEgAWABoAHwAjACcAKwAvADQAOAA8AEAARABIAEwAUQBUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIcAiwCPAJIAlgCZAJwAoAGgAZkBiQF4AWgBWAFIATgBKAEYAQgB+ADpANkAygC6AKoAmgCLAHsAbQBdAE4APgAvACEAEgAEAPX/5//Z/8r/vP+v/6H/k/+G/3j/a/9f/1L/Rf85/y3/If8V/wn//v7z/uj+3f7S/sj+vf60/qr+oP6X/o7+hf59/nX+bf5l/l3+Vv5P/kj+QP46/jT+Lv4p/iP+Hv4a/hX+Ef4N/gn+Bf4B/v79+/33/fT98f3u/ev96P3m/eP94f3e/dz92v3Y/db91P3S/dH9z/3O/c392/3Z/df91f3U/dL90P3P/c79zP3L/cr9yf3I/cj9x/3G/cb9xv3F/cX9xf3F/cX9xf3F/cb9xv3G/cf9x/3I/cn9yv3L/cz9zf3O/c/90P3T/dT91f3X/dj92v3b/d3/";

/**
 * Function to convert base64 to an Audio object
 */
function createTapSound() {
    // Convert base64 to binary
    const binary = atob(TAP_SOUND_BASE64);
    
    // Create array buffer
    const arrayBuffer = new ArrayBuffer(binary.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Fill array buffer
    for (let i = 0; i < binary.length; i++) {
        uint8Array[i] = binary.charCodeAt(i);
    }
    
    // Create blob
    const blob = new Blob([uint8Array], { type: 'audio/wav' });
    
    // Create audio element
    const audio = new Audio(URL.createObjectURL(blob));
    audio.volume = 0.3;
    
    return audio;
}

// Export the function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createTapSound };
} 