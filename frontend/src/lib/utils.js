export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function calculatePasswordStrength(password) {
    if (!password) {
        return {
            strength: "Weak",
            score: 0,
            feedback: "Enter a password"
        };
    }

    let score = 0;
    const feedback = [];

    // Length check (1 point per criteria met)
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    // Uppercase letters
    if (/[A-Z]/.test(password)) {
        score++;
        feedback.push("✓ Uppercase");
    } else {
        feedback.push("Add uppercase letters");
    }

    // Lowercase letters
    if (/[a-z]/.test(password)) {
        score++;
        feedback.push("✓ Lowercase");
    } else {
        feedback.push("Add lowercase letters");
    }

    // Numbers
    if (/[0-9]/.test(password)) {
        score++;
        feedback.push("✓ Numbers");
    } else {
        feedback.push("Add numbers");
    }

    // Special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        score++;
        feedback.push("✓ Special chars");
    } else {
        feedback.push("Add special characters");
    }

    // Determine strength level
    let strength;
    if (score <= 3) {
        strength = "Weak";
    } else if (score <= 6) {
        strength = "Medium";
    } else {
        strength = "Strong";
    }

    return {
        strength,
        score,
        feedback: feedback.slice(0, 3) // Show only first 3 feedback items
    };
}