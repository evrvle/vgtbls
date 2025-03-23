/**
 * Rick Roll intro sound effect
 * This is a small WAV file encoded as a base64 string that mimics the intro to "Never Gonna Give You Up"
 */
const RICK_INTRO_BASE64 = "UklGRioFAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQYFAACBApMCogKuArUCtwK1ArACqAKcAo4CfQJqAlUCPgImAg0C8wHXAbsBnQF+AWABQAEgAQAB4ADAAKAAgABgAEAAIAABAOH/wf+i/4P/Y/9E/yX/Bv/o/sn+q/6N/m/+Uf4z/hb++P3c/b/9o/2H/Wv9T/0z/Rj9/fzi/Mf8rfyT/Hn8X/xG/C38FPz8++P7y/u0+537hvtw+1n7RPsu+xj7A/vv+tv6x/q0+qH6j/p9+mz6XPpM+j36MPoh+hP6Bvr5+e357Pnh+db5y/nB+bj5rvml+Z35lfmO+Yf5gPl6+XX5b/lq+Wb5YvlV+VH5Tvk9+Tr5OPky+TD5Lfkr+Sn5KPkn+Sb5Jfkl+Sf5KvksOS85NDk5OT85RjlMOVQ5WzljOWs5dDl9OYc5kTmbOaY5sTm9Ock51TnhOe46+joGOxQ7ITsvOz47TTtdO2w7fTuNO547rzPAM9Az4TPoM+4z9DP3M/sz+zP6M/kz9zP1M/Iz7zPrM+Yz4TPZM9IzyjPCM7kzsDOmM5wzkTOGM3szbzNkM1gzTDM/MzIzJTMYMwszPfEu5C7XLski9CYCIycX8BF1DEgG+f+y+Wjyc+vD5ADdOtaSz4nIwsEEuwi17q/qqv+lluFN25vUeQAABwAVABcAFgARAAsABgABAPz/9//x/+z/5//i/93/2P/U/9D/zP/I/8T/wf+9/7r/uP+1/7P/sf+v/63/rP+q/6n/qP+n/6b/pf+k/6T/o/+j/6P/o/+j/6P/o/+k/6T/pf+m/6f/qP+p/6r/rP+t/6//sP+y/7T/tv+4/7r/vf+//8H/xP/H/8r/zf/Q/9P/1//a/97/4f/l/+n/7f/w//T/+P/8/wAABAAIAAwAEQAVABkAHQAiACYAKgAuADMANgA7AD8AQwBHAEwAUABUAFgAXQBhAGUAaQBtAHIAdgB6AH4AggCGAIoAjgCSAJYAmgCeAKIApQCpAK0AsQC0ALgAvADAAMMAyADMANcA4QDrAPQA/gAIARIBGwElAS8BOAFCAEQAQAAsABgABQDx/93/yv+2/6P/kP99/2r/WP9F/zL/IP8N//r+6P7W/sP+sv6g/o/+ff5s/lr+Sf45/ij+F/4H/vf95/3X/cj9uP2p/Zr9i/18/W79YP1S/UX9N/0q/R39EP0D/fb86vze/NL8xvy6/K/8pPyZ/I78g/x5/G/8ZfxZ/G/8efyE/I/8mvyk/K/8uvzF/ND82/zm/PH8/fwI/RT9H/0r/Tb9Qv1O/Vn9Zf1w/Xz9h/2T/Z79qv21/cH9zf3Y/eT97/37/Qf+Ev4e/in+Nf5B/kz+WP5j/m/+e/6H/pL+nv6p/rX+wP7M/tf+4/7u/vr+Bf8R/xz/Jv8y/z3/SP9U/1//a/93/4L/jv+Z/6X/sP+8/8f/0//e/+n/9f8AAAwAFwAjAC4AOgBFAFEAXABnAHMAfgCJAJQAnwCqALYAwQDMANcA4gDtAPgAAwEOARkBJAEuATkBRAFOAVkBYwFuAXgBgwGNAZgBogGrAbYBvwHJAdIB3AHlAe4B9wEAAggCEQIZAiICKwIzAjwCRAJMAlQCXAJFAi4CFwL/AecBzwG3AZ4BhQFtAVQBOwEkAYsAdABdAEcAMAAZAAMA7P/W/77/qP+S/3v/ZP9O/zf/If8K/6EAiACBAAAAAAAAAAAA";

/**
 * Function to convert base64 to an Audio object
 */
function createRickIntroSound() {
    // Convert base64 to binary
    const binary = atob(RICK_INTRO_BASE64);
    
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
    audio.volume = 0.5;
    
    return audio;
}

// Export the function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createRickIntroSound };
} 